sap.ui.define(
				[   'sap/m/MessageBox',
				 	"sap/ui/core/mvc/Controller",
				 	"sap/ui/model/json/JSONModel",
				 	"sap/ui/model/odata/ODataModel",
				 	"com/ceat/log/model/models",
				 	"com/ceat/log/util/Formatter",
				 	"sap/m/BusyDialog"
				], 
				function (MessageBox,Controller,JSONModel,oDataModel,Service,Formatter,oBusy) 
				{
					"use strict";
					return Controller.extend("com.ceat.log.controller.initialView1", 
					{
						onInit:function()
						{
							sap.ui.getCore().appData = {};
							sap.ui.getCore().appData.mainView = this.getView();
							this.dept='';
							var url = "/sap/opu/odata/sap/ZLOGMESSAGE_SRV/";
							var entity = "/APPTYPESet";
							
							jQuery.sap.includeStyleSheet(
							jQuery.sap.getModulePath("com.ceat.log")+ "/css/style.css","style");
							Service.callService(url,entity,
									function(data)
									{
										var typeModel = new JSONModel(data);
										sap.ui.getCore().appData.mainView.setModel(typeModel,"appType");
									},
									function(error)
									{
										
									});
							
							var departmentEntity="/departmentSet";
							Service.callService(url,departmentEntity,
									function(data)
									{
										var typeModel = new JSONModel(data);
										/*typeModel.setSizeLimit(500)*/
										/*typeModel.setData(data);*/
										sap.ui.getCore().appData.mainView.setModel(typeModel,"appDept");
									},
									function(error)
									{
										
									});
							
						},
						onBeforeRendering:function()
						{
							var order1=sap.ui.getCore().appData.mainView.byId("inpt_ordr1");
							var order2=sap.ui.getCore().appData.mainView.byId("inpt_ordr2");
							order1.attachBrowserEvent("keypress", function(e)
									{
					            var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
					            if (!($.inArray(e.which, key_codes) >= 0)) {
					                e.preventDefault();
					            	}
									});
							
							order2.attachBrowserEvent("keypress", function(e)
									{
					            var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
					            if (!($.inArray(e.which, key_codes) >= 0)) {
					                e.preventDefault();
					            	}
									});
						},
						
						appType_change:function(evt)
						{
							this.appType = evt.getSource().getSelectedKey();
							this.appName =evt.getSource().getValue();
							
							if(this.appType=='POC')
								{
								var controls=[this.byId('lblDept'),this.byId('cmbBoxDept'),this.byId('lblOrderNo'),this.byId('inpt_ordr1'),this.byId('inpt_ordr2')];
								jQuery.each(controls,function(indx,obj)
										{
									obj.setVisible(true)
										})
								}
						},
						Dept_change:function(evt)
						{
							this.dept=evt.getSource().getSelectedKey();
						},
						onLogbookViewPress:function(evt)
						{
							var fdate = Formatter.dateFormate(sap.ui.getCore().appData.mainView.byId("DP1").getDateValue());
							var tdate = Formatter.dateFormate(sap.ui.getCore().appData.mainView.byId("DP2").getDateValue());
							/*var uname = sap.ui.getCore().appData.mainView.byId("inpt_createdBy").getValue();
							uname=uname.toUpperCase();*/
							var type = this.appType;
							var department=this.dept;
							var faufnr = sap.ui.getCore().appData.mainView.byId("inpt_ordr1").getValue();
							var taufnr = sap.ui.getCore().appData.mainView.byId("inpt_ordr2").getValue();
							var url = "/sap/opu/odata/sap/ZLOGMESSAGE_SRV/";
							var entity = "POCREPORTS?FDATE='"+fdate+"'&TDATE='"+tdate+"'&ATYPE='"+type+"'&STAND='"+this.dept+"'&FAUFNR='"+faufnr+"'&TAUFNR='"+taufnr+"'";
							sap.ui.getCore().appData.mainView.urlData=[url,entity];
							var that =this;	
							
							var allClear=true;
							var comboBox=sap.ui.getCore().appData.mainView.byId("cmbBox");
							if(comboBox.getSelectedKey() == "")
								{
								allClear=false;
								comboBox.setValueStateText("Application Type Is Mandatory");
								comboBox.setValueState("Error");
								}
							else
								{
								comboBox.setValueState("None");
								}
							
							var date1=sap.ui.getCore().appData.mainView.byId("DP1").getDateValue();
							var date2=sap.ui.getCore().appData.mainView.byId("DP2").getDateValue();
							
							/*if(date2 && !date1)
								{
								allClear=false;
								var date1Obj=sap.ui.getCore().appData.mainView.byId("DP1");
								date1Obj.setValueStateText("From Date is Mandatory")
								date1Obj.setValueState("Error");
								}*/
							var date1Obj=sap.ui.getCore().appData.mainView.byId("DP1");
							var date2Obj=sap.ui.getCore().appData.mainView.byId("DP2");
							
							var d1Valid=date1Obj._bValid;
							var d2Valid=date2Obj._bValid;
							
							if(!d1Valid)
								{
								allClear=false;
								date1Obj.setValueStateText("Invalid Date")
								date1Obj.setValueState("Error");
								}
							else
								{
								date1Obj.setValueState("None");
								}
							
							if(!d2Valid)
							{
							allClear=false;
							date2Obj.setValueStateText("Invalid Date")
							date2Obj.setValueState("Error");
							}
						else
							{
							date2Obj.setValueState("None");
							}
							
							
							if(date1&&date2)
							{
								 if(d1Valid && d2Valid)
									 {
										if(date1>date2)
											{
											
											allClear=false;
											
											
											date1Obj.setValueStateText("To Date Should Be Greater Than From Date")
											date1Obj.setValueState("Error");
											
											date2Obj.setValueStateText("To Date Should Be Greater Than From Date")
											date2Obj.setValueState("Error");
											
											}
										else
											{
											date1Obj.setValueState("None");
											date2Obj.setValueState("None");
											}
									 }	 
							}
						
							if(faufnr && taufnr)
								{
								if(parseInt(faufnr)>parseInt(taufnr))
									{
									allClear=false;
									sap.ui.getCore().appData.mainView.byId("inpt_ordr1").setValueStateText("OrderNo To Should Be Greater Than From")
									sap.ui.getCore().appData.mainView.byId("inpt_ordr1").setValueState("Error");
									sap.ui.getCore().appData.mainView.byId("inpt_ordr2").setValueStateText("OrderNo To Should Be Greater Than From")
									sap.ui.getCore().appData.mainView.byId("inpt_ordr2").setValueState("Error");
									}
								else
									{
									sap.ui.getCore().appData.mainView.byId("inpt_ordr1").setValueState("None");
									sap.ui.getCore().appData.mainView.byId("inpt_ordr2").setValueState("None");
									}
								}
							
							if(allClear)
								{
								sap.ui.getCore().appData.mainView.byId("inpt_ordr1").setValueState("None");
								sap.ui.getCore().appData.mainView.byId("inpt_ordr2").setValueState("None");
								var bzy=new oBusy();
								bzy.open();
							Service.callService(url,entity,
									function(data)
									{
								 bzy.close();
								 var oModel = new JSONModel()
							      
							       oModel.setData(data);
								 
							       sap.ui.getCore().viewData.tablView.setModel(oModel);
							       var tableTitleObj=sap.ui.getCore().viewData.tablView.byId("tableTitle");
							       tableTitleObj.setText("Application Log -" + that.appName);
							       that.nav.to("S2");
									},
									function(error)
									{
										bzy.close();
										var errdetail;
										  if(error.response)
									         {
									         
									          errdetail=$(error.response.body).find('message').first().text();
									         }
									         else
									         {
									         errdetail=error.message;
									         }
										  MessageBox.show(
											      errdetail, {
											          icon: sap.m.MessageBox.Icon.INFORMATION,
											          title: "Information",
											          actions: [sap.m.MessageBox.Action.OK],
											          onClose: function(oAction) { /  do something  / }
											      }
											    );
									});
								}
						}/*,
						onLogbookViewPress: function () 
						{
							this.nav.to("S2");
						}*/
					});
				}
			);