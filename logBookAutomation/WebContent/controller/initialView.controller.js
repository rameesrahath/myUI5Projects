sap.ui.define(["sap/m/MessageBox",
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/json/JSONModel",
			   "sap/ui/model/odata/ODataModel",
			   "sap/m/BusyDialog",
			   "com/ceat/logbookauto/util/Formatter",
			   "sap/ui/unified/Calendar"
               ], function (messageBox,Controller,jsonModel,odataModel,oBusy,myFormatter,calen) {
	"use strict";
	return Controller.extend("com.ceat.logbookauto.controller.initialView", {
		/**
	*@memberOf com.ceat.logbookauto.controller.initialView
	*/

		onInit:function()
		{
			var batchModel,
				batchRead,
				busyDialog,
				initialView;
			sap.ui.getCore().appData = {};
			initialView= this.getView();
			sap.ui.getCore().appData.initialView = initialView;
			jQuery.sap.includeStyleSheet(
					jQuery.sap.getModulePath("com.ceat.logbookauto")+ "/css/style.css","style");
			
		    batchModel= new odataModel("/sap/opu/odata/sap/ZLOGBOOKAUTOMATION_SRV/");
			batchRead = [];
			batchRead.push(batchModel.createBatchOperation("/PlantSet","GET"));
			batchRead.push(batchModel.createBatchOperation("/DepartmentSet","GET"));
			batchRead.push(batchModel.createBatchOperation("/ShiftSet","GET"));
			batchRead.push(batchModel.createBatchOperation("/TimestampSet","GET"));
			
			batchModel.addBatchReadOperations(batchRead);
			
			
			
			 batchModel.submitBatch(
			          function(data)
			          {
			        	  
			        	  var plantModel = new jsonModel(data.__batchResponses[0].data.results);
			        	  var departmentModel = new jsonModel(data.__batchResponses[1].data);
			        	  var shiftModel = new jsonModel(data.__batchResponses[2].data);
			        	  var dateModel = new jsonModel(data.__batchResponses[3].data.results);
			   

			        	  initialView.setModel(plantModel,"plantmodel");
			        	  initialView.setModel(departmentModel,"departmentmodel");
			        	  initialView.setModel(shiftModel,"shiftmodel");
			        	  initialView.setModel(dateModel,"datemodel");
			        	  
			        	  var shiftCbox  = initialView.byId("initScreenShiftCombo");
			        	  
			        	  shiftCbox.setSelectedItem(shiftCbox.getItems()[0])
			        	  
			        	  
			          },
			          function(error)
			          {
			        	  
			        	  
			          })
			          
			         
			          
		},
		introPressforDate:function()
		{
			var myView     = this.oView;
			var myCalender=new calen(
					{
				  firstDayOfWeek:1
				    }).addStyleClass("calclass");
			
			var dialog = new sap.m.Dialog(
					{
						title: 'Set Date',
						/*contentWidth: "550px",
						contentHeight: "300px",*/
						content: myCalender,
						beginButton: new sap.m.Button({
						text: 'Submit',
						press: function ()
								{
								
								if(myCalender.getSelectedDates().length)
									{
			   							var selectedDate=myCalender.getSelectedDates()[0].getStartDate();
			   							var year=selectedDate.getFullYear();
			   							year=year.toString();
			   							var month=selectedDate.getMonth()+1;
			   							month=month.toString();
			   							if(month<10){month="0"+month}
			   							var date=selectedDate.getDate() >=10?selectedDate.getDate().toString():"0"+selectedDate.getDate();
			   							var finalDate=year+month+date;
			   							sap.ui.getCore().appData.dateChanged=true;
			   							sap.ui.getCore().appData.finalDate=finalDate;
			   							var header     = myView.byId("plantDateObjHeader");
			   							header.setIntro(com.ceat.logbookauto.util.Formatter.dateFormatter(finalDate));
			   						
			   							dialog.close();
									}
						}
					}),
					endButton: new sap.m.Button({
						text: 'Cancel',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
			dialog.open();
	 
		},
		onLogbookViewPress: function () 
		{
			
			 
			var secondView;
			var busyDialog = new oBusy();
			var myView     = this.oView;
			var header     = myView.byId("plantDateObjHeader");
			var department = myView.byId("initScreenDeptCombo");
			var shift      = myView.byId("initScreenShiftCombo");
			
			var date     = header.getIntro();
			var plant    = header.getTitle();
			var deptKey  = department.getSelectedKey();
			var deptName = department._lastValue;
            var shiftKey = shift.getSelectedKey();
			var shiftName= shift._lastValue;
			var plantKey = this.getView().getModel("plantmodel").oData[0].Werks;
			if(deptKey != "" && shiftKey != "")
				{
			department.setValueState("None");
			shift.setValueState("None");	
				var previousLogBlankData={
										 "Deprt":"",
										 "Dlcla":"",
										 "Dlclp":"",
										 "Dlclr":"",
										 "Dloea":"",
										 "Dloep":"",
										 "Dloer":"",
										 "Drclr":"",
										 "Faccn":"",
										 "Facnm":"",
										 "Facrm":"",
										 "Fisft":"",
										 "Indsp":"",
										 "Lbact":"",
										 "Lbaid":0,
										 "Lbdat":"",
										 "Lbpln":"",
										 "Ldodc":"",
										 "Ldoth":"",
										 "Ldtdc":"",
										 "Ldtth":"",
										 "Lt1cn":"",
										 "Lt1nm":"",
										 "Lt1rm":"",
										 "Message":"",
										 "Mimpr":"",
										 "Mkaiz":"",
										 "Mpabs":"",
										 "Mpavl":"",
										 "Mpgvn":"",
										 "Mpkyk":"",
										 "Mpofc":"",
										 "Mprcn":"",
										 "Mprct":"",
										 "Mptot":"",
										 "Mtccn":"",
										 "Mtcnm":"",
										 "Mtcrm":"",
										 "Nrmis":"",
										 "Pmpwr":"",
										 "Ptopr":"",
										 "Qihup":"",
										 "Qirej":"",
										 "Qirwk":"",
										 "Qiscp":"",
										 "Shift":"",
										 "TOELOSS":{"results":[{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""},{"Arbpl":"","Itmno":"","Losnm":"","Timeh":"","Lostp":""}]},
										 "TOPLOSS":{"results":[{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""},{"Itmno":"","Ldcsr":"","Losnm":"","Remrk":"","Timeh":""}]},
										 "Werks":""
										 };
				
				var mainViewData=[date,plant,deptKey,shiftKey,deptName,shiftName,plantKey];
				var headerModel=new jsonModel();
				var myObj={
						"shift":mainViewData[5],
						"plant":mainViewData[1],
						"department":mainViewData[4],
						"shiftKey":mainViewData[3],
						"date":mainViewData[0],
						"departmentKey":mainViewData[2],
						"plantKey":mainViewData[6]};
				headerModel.setData(myObj);
				
				var lossTypeObject = [{"key":"MECHANICAL","value":"Mechanical"},
				                      {"key":"ELECTRICAL","value":"Electrical"},
				                      {"key":"INSTRUMENTATION","value":"Instrumentation"},
				                      {"key":"UTILITY","value":"Utility"},
				                      {"key":"OTHER","value":"Other"}];
				var lossTypeModel = new jsonModel();
				lossTypeModel.setData(lossTypeObject);
	
				secondView=sap.ui.getCore().appData.secondView;
				secondView.setModel(headerModel,"headermodel");
				secondView.setModel(lossTypeModel,"lossmodel");
				
				var oModel=new odataModel("/sap/opu/odata/sap/ZLOGBOOKAUTOMATION_SRV/");
				var sPath1="WorkcenterData?Werks='"+mainViewData[6]+"'&Stand='"+mainViewData[2]+"'";
				var sPath2 = "LogBookSet(Lbdat='"+mainViewData[0]+"',Werks='"+mainViewData[6]+"',Deprt='"+mainViewData[2]+"',Shift='"+mainViewData[3]+"')?$expand=TOELOSS,TOPLOSS";
				var that=this;
				busyDialog.open();
				oModel.read(sPath1,
						 {
							urlParameters:false,
							context:false,
							async:true,
							success:function(data)
									{
								busyDialog.close();
								var workcenterModel = new jsonModel(data);
								secondView.setModel(workcenterModel,"workcentermodel");
								busyDialog.open();
								/////Second Call for the Previous Shift Data
								oModel.read(sPath2,
										 {
											urlParameters:false,
											context:false,
											async:true,
											success:function(data)
													{
												var previousLogData;
												
												busyDialog.close();
												sap.ui.getCore().appData.engProcessDecisionKey=data.Lbaid;
												if(data.Lbaid=="0")
													{
													previousLogData = new jsonModel(previousLogBlankData);
													
													}
												else
													{
													previousLogData = new jsonModel(data);
													
													}
												
												secondView.setModel(previousLogData,"previouslogmodel");
												var objectPageHeader = secondView.byId('ObjectPageLayout');
												var firstSection     = objectPageHeader.getSections()[0];
												jQuery.sap.delayedCall(
																		700,
																		objectPageHeader,
																		objectPageHeader.scrollToSection, [firstSection.getId()]);
												that.nav.to("SS2");	
													},
											error :function(error)
													{
												
												busyDialog.close();	
												var errdetail;
										    	if(error.response)
											         {
											         
											          errdetail=$(error.response.body).find('message').first().text();
											         }
											         else
											         {
											         errdetail=error.message;
											         }
										    	  messageBox.show(
										    			       errdetail, 
												    			 {
															          icon: sap.m.MessageBox.Icon.ERROR,
															          title: "Error",
															          actions: [sap.m.MessageBox.Action.OK],
															          onClose: function(oAction)
															          { 
															        	  
															          }
										    			       }
													    );		
													}
													
											})
													
								
								
								
									},
							error:function(error)
							{
								busyDialog.close();
							}
						 })
			
				
			
				
				}
			else
				{
				var valueStateMsg = "Field is Mandatory";
				if(department.getSelectedKey()=="")
					{
					department.mProperties.valueStateText = valueStateMsg;
					department.hasBeenValidatedBefore = true;
					department.setValueState("Error");
					}
				else
					{
					department.setValueState("None");
					
					}
				
				if(shift.getSelectedKey()=="")
					{
					shift.mProperties.valueStateText = valueStateMsg;
					shift.hasBeenValidatedBefore = true;
					shift.setValueState("Error");
					}
				else
					{
					shift.setValueState("None");
					}
				}
			
		}
	
	
	});
});