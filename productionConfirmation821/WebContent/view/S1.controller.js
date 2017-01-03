/*jQuery.sap.require("sap.ui.ceat.prodConf.util.Formatter");*/
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.ceat.prodConf.util.Formatter");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ca.ui.dialog.factory");
jQuery.sap.require("sap.ca.ui.dialog.Dialog");
sap.ui.core.mvc.Controller.extend("sap.ui.ceat.prodConf.view.S1", 
		{
			onInit: function() 
					{
						 ////////////////////////////////////////////
				         sap.ui.getCore().appData = {};
				         sap.ui.getCore().appData.mainView = this.getView();
				         sap.ui.getCore().appData.mainView.oBusy = new sap.m.BusyDialog();
						 var batchModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
						 var batchRead = [];
						 batchRead.push(batchModel.createBatchOperation("DEPARTMENTVALSet","GET"));
						 batchRead.push(batchModel.createBatchOperation("SHIFTSet","GET"));
						 batchRead.push(batchModel.createBatchOperation("PLANTDETAILSSet","GET"));
						 batchRead.push(batchModel.createBatchOperation("LOSSTYPESet","GET"));
						 batchModel.addBatchReadOperations(batchRead);
						 sap.ui.getCore().appData.mainView.oBusy.open();
				    	 batchModel.submitBatch(
							      function(data)
							      {
							    	  		sap.ui.getCore().appData.mainView.oBusy.close();
							    	  		var deptModel = new sap.ui.model.json.JSONModel();
							    	  		deptModel.setData(data.__batchResponses[0].data);
							    	  		deptModel.setSizeLimit(2000);
							    	  		
							    	  	/////added by ramees 8/21
							    	  		var lossTypModel = new sap.ui.model.json.JSONModel();
							    	  		lossTypModel.setData(data.__batchResponses[3].data);
							    	  		lossTypModel.setSizeLimit(2000);
							    	  		sap.ui.getCore().appData.secondView.setModel(lossTypModel,"losTypen");
							    	  		/////end of add
							    	  		//DEPARTMENT DROPDOWN//
							    	  		var department = sap.ui.getCore().appData.mainView.byId("department");
							    	  		/*department.bindItems
												       ({
													        path:"/results",
													        template:new sap.ui.core.Item
													        		({
														                 key:"{Stand}",
														                 text:"{Ktext}"
													                })
												       })*/
							    	  		sap.ui.getCore().appData.mainView.plant = data.__batchResponses[2].data.results[0].Werks;
										   
							    	  		//OBJECT HEADER VALUES///
							    	  		var objHeader = sap.ui.getCore().appData.mainView.byId("objHeaderTitle");
							    	  		objHeader.setTitle("Plant  :  "+data.__batchResponses[2].data.results[0].Name1);
							    	  		
							    	  		///////
							    	  		
							    	  		//SHIFT DROPDOWN///
							    	  		var shiftModel = new sap.ui.model.json.JSONModel();
							    	  		shiftModel.setData(data.__batchResponses[1].data);
							    	  		var shift = sap.ui.getCore().appData.mainView.byId("shift");
							    	  		
										    shift.setModel(shiftModel);
										    shift.setSelectedItem(shift.getItems()[0])
							    	  		
										    
										    ///department
							    	  		department.setModel(deptModel);
										    if(department.getItems()[0] != undefined)
										    	{
										    department.setSelectedItem(department.getItems()[0])
										    department.fireSelectionChange(this);
										    	}
							    	  		/////
							    	  		
							    	  		
							    	  		/////////
							    	  		
							    	  		//WORKCENTER DROPDOWN////////
							    	  	/*	var dept = sap.ui.getCore().appData.mainView.byId("department").getItemAt(0).getKey();
							    	  		var deptValue = sap.ui.getCore().appData.mainView.byId("department").getItemAt(0).getText();
											var plant = sap.ui.getCore().appData.mainView.plant;*/
							    	  		/*var oModel2 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
									    	var sPath = "WORKCENTERVAL?WERKS='"+plant+"'&STAND='"+dept+"'";
											oModel2.read(sPath,
															 {
																urlParameters:false,
																context:false,
																async:true,
																success:function(data)
																		{
																				//WORKCENTER DROPDOWN/////
																				var workModel = new sap.ui.model.json.JSONModel();
																				workModel.setData(data);
																    	  		var workcenter = sap.ui.getCore().appData.mainView.byId("workcenter");
																    	  		workcenter.bindItems
																					       ({
																						        path:"/results",
																						        template:new sap.ui.core.Item
																						        		({
																							                 key:"{KYVAL}",
																							                 text:"{Arbpl}"
																						                })
																					       });
																			    workcenter.setModel(workModel);
																			    if(!data.results.length)
																				{
																					sap.ca.ui.message.showMessageBox
																					 ({
																						 	message:"'"+deptValue+"' does not contain any Workcenter!",
																				            type: sap.ca.ui.message.Type.WARNING
																				     });
																				}
																    	  		/////////
													
																		},
																error:function(error)
																		{
																	
																		}
															 });*/
											/////////
							      },
							      function(error)
							      {
							    	   sap.ui.getCore().appData.mainView.oBusy.close();
							    	   sap.m.MessageBox.show(error.message, 
							                   {
							                        icon: sap.m.MessageBox.Icon.ERROR,
							                        title: "Error",
							                        actions: [sap.m.MessageBox.Action.OK],
							                        onClose: function(oAction) 
							                            { 
							                        	 window.location.hash = "";
							                            }
							                   });
							    	  /* sap.ca.ui.message.showMessageBox
							    	   ({
					                       type: sap.ca.ui.message.Type.ERROR,
					                       message: error.message
					                       
					                   },function(evt){
					                	   window.location.hash = "";
					                   });*/
							      }
							    )
						
						// //////////////////////CSS STYLESHEET/////////////////////////////////////////////
						var loginLang = sap.ui.getCore().getConfiguration().getLanguage();
						jQuery.sap.includeStyleSheet(
						jQuery.sap.getModulePath("sap.ui.ceat.prodConf")+ "/resources/css/view.css","style");
						
						/////Setting Intervel to get current time////////
						var objHeader = sap.ui.getCore().appData.mainView.byId("objHeaderTitle");
						var objHeaderStat = sap.ui.getCore().appData.mainView.byId("objHeader_stat");
						var dateTimeModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
						sap.ui.getCore().appData.mainView.oBusy.open();
						dateTimeModel.read("/TIMESTAMPSet",
								  {
										urlParameters:false,
										context:false,
										async:true,
										success:function(data)
												{
													sap.ui.getCore().appData.mainView.oBusy.close();
													objHeader.setNumber(sap.ui.ceat.prodConf.util.Formatter.DateFormat(data.results[0].Sdate));
													objHeaderStat.setText(sap.ui.ceat.prodConf.util.Formatter.TimeFormat(data.results[0].Stime))
													sap.ui.getCore().appData.mainView.finalDate = data.results[0].Sdate;
												},
										error:function(error)
											  {
													sap.ui.getCore().appData.mainView.oBusy.close();
											  }
								  });
						
						//////////////////////
				 },
				 deptChange:function(evt)
				 {
					  var dept = evt.getSource().getSelectedKey();
					  var deptValue = evt.getSource().getSelectedItem().getText();
					  var plant = sap.ui.getCore().appData.mainView.plant;
					  
					  var oModel2 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
			    	  var sPath = "WORKCENTERVAL?WERKS='"+plant+"'&STAND='"+dept+"'";
					  oModel2.read(sPath,
									 {
										urlParameters:false,
										context:false,
										async:true,
										success:function(data)
												{
														//WORKCENTER DROPDOWN/////
														var workModel = new sap.ui.model.json.JSONModel();
														workModel.setData(data);
										    	  		var workcenter = sap.ui.getCore().appData.mainView.byId("workcenter");
										    	  	/*	workcenter.bindItems
															       ({
																        path:"/results",
																        template:new sap.ui.core.Item
																        		({
																	                 key:"{KYVAL}",
																	                 text:"{Arbpl}"
																                })
															       });*/
													    workcenter.setModel(workModel);
													    workcenter.setSelectedItem(workcenter.getItems()[0])
													    if(!data.results.length)
														{
													    	//Messagebox cahange from ca.ui.message to sap.m.MessageBox
													    	sap.m.MessageBox.show("'"+deptValue+"' does not contain any Workcenter!", 
													                   {
													                        icon: sap.m.MessageBox.Icon.WARNING,
													                        title: "Warning",
													                        actions: [sap.m.MessageBox.Action.OK],
													                        onClose: function(oAction) 
													                            { 
													                           
													                            }
													                   })	
													              
												    	  	/*sap.ca.ui.message.showMessageBox
															 ({
																 	message:"'"+deptValue+"' does not contain any Workcenter!",
														            type: sap.ca.ui.message.Type.WARNING
														     });*/
														}
										    	  		/////////
												},
										error:function(error)
												{
											
												}
									 });
				 },
				 handleSubmit:function()
				 {
						var oView = this.getView();
						var empId= sap.ui.getCore().appData.mainView.byId("emp_id");
						var oEntry={};
						var formValid=true;
						$.each($('.mandatory'), function(index, elem)
								 {
									var control = oView.byId(elem.id);
									if (!control.getValue() ) 
									{
										if(!control.hasBeenValidatedBefore)
											{
											var valueStateMsg = control.mProperties.valueStateText+" is mandatory";
											control.mProperties.valueStateText = valueStateMsg
											control.hasBeenValidatedBefore = true;
											}
										
										
									control.setValueState("Error");
									
									
									formValid = false;
								    }
									else if (empId.getValue().length < 8 && empId.getValue().length > 0 ) 
											{
										var valueStateMsg = "Wrong Employee ID";
										empId.mProperties.valueStateText = valueStateMsg
										empId.hasBeenValidatedBefore = true;
										empId.setValueState("Error");	
										formValid = false;
											}
								    else
								     {
								     control.setValueState("None");
								     }
								 })
						if(formValid && oView.byId("workcenter").getSelectedItem())
							{
						oEntry.Werks=sap.ui.getCore().appData.mainView.plant; //plant
						oEntry.Stand=oView.byId("department").getSelectedKey();//department
						oEntry.Arbpl=oView.byId("workcenter").getSelectedItem().getText(); //Workcerter
						oEntry.Stime=oView.byId("shift").getSelectedKey(); //shift
						oEntry.Pernr=oView.byId("emp_id").getValue(); //Employee ID
						var Sdate=sap.ui.getCore().appData.mainView.finalDate;
						sap.ui.getCore().appData.mainView.workcenter=oEntry.Arbpl;
						sap.ui.getCore().appData.mainView.headers=oEntry;
						var oModel2=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
						var sPath = "ORDERDETAILSVAL?WERKS='"+oEntry.Werks+"'&STAND='"+oEntry.Stand+"'&ARBPL='"+oEntry.Arbpl+"'&SDATE='"+Sdate+"'&STIME='"+oEntry.Stime+"'&PERNR='"+oEntry.Pernr+"'";
					    sap.ui.getCore().appData.mainView.oBusy.open();
						oModel2.read(sPath,
										 {
											urlParameters:false,
											context:false,
											async:true,
											success:function(data)
													{
															sap.ui.getCore().appData.mainView.oBusy.close();
															oView.getController().nav.to("S2");		
															var oModelforTable = new sap.ui.model.json.JSONModel();
															oModelforTable.setData(data);
															var material=[];
															var desc=[];
															var wrkCentr=[];
															var str=JSON.stringify(oModelforTable.oData.results);
															str = str.replace(/"Matnr":/g, '"Material":');
															str = str.replace(/"Maktx":/g, '"MaterialDescription":');
															str = str.replace(/"Arbpl":/g, '"WorkCenter":');
															
															str=JSON.parse(str);
															oModelforTable.oData.results=str;
															jQuery.each(oModelforTable.oData.results,
																	function(indx,val)
																	{
																		material[indx]={"text":val.Material};
																		desc[indx]={"text":val.MaterialDescription};
																		wrkCentr[indx]={"text":val.WorkCenter};
																	})
																	
						   /*add a concatinated field for search*/
							/*var dd=oModelforTable.oData.results;
							var all=[]
							$.each(dd,function(indx,val)
								{
							var temp=val.Aufnr +" "+val.Confqty+" "+val.Curstok+" "+val.LGORT+" "+val.Material+" "+val.MaterialDescription+" "+val.Planqty+" "+val.Uoms; 
							all.push({"cct":temp});
							temp="";
								})
							
							
							for(var i=0;i<oModelforTable.oData.results.length;i++)
							{
							oModelforTable.oData.results[i].cct=all[i].cct
							}*/
															/*material object duplicate removal*/	
														    var arr=[];
															var collection=[];
															$.each(material,function(key,val)
																				{
																				if($.inArray(val.text,arr)==-1)
																					{
																						arr.push(val.text);
																						collection.push(val);
																					}
																				})
																				
															/*material desc duplicate removal*/
															var arr=[];
															var descCollection=[];					
															$.each(desc,function(key,val)
																				{
																				if($.inArray(val.text,arr)==-1)
																					{
																						arr.push(val.text);
																						descCollection.push(val);
																					}
																				})			 		
															/*workcenter duplicate removal*/
															var arr=[];
															var wcCollection=[];					
															$.each(wrkCentr,function(key,val)
																				{
																				if($.inArray(val.text,arr)==-1)
																					{
																						arr.push(val.text);
																						wcCollection.push(val);
																					}
																				})			 							
															oModelforTable.oData.Filters=[{"Type":"Material","values":collection},{"Type":"MaterialDescription","values":descCollection},{"Type":"WorkCenter","values":wcCollection}]	
															//added by ramees 21.08
															$.each(oModelforTable.oData.results,function(key,val)
																	{
																		val.Enabled=false;
																		val.Actual=val.Planqty;
																		val.losstypee="Loss Type";
																		val.lossQty=""
																		val.Comment="";
																		val.lossTObj=sap.ui.getCore().appData.secondView.getModel("losTypen").oData.results;
																		if(val.Confind=="false")
																		{
																			val.Confind=false;
																		}
																		else
																		{
																			val.Confind=true;
																		}
																	});
															
															///end of add
															sap.ui.getCore().appData.secondView.setModel(oModelforTable);
															
															
													},
											error:function(error)
													{
															sap.ui.getCore().appData.mainView.oBusy.close();
															
															sap.m.MessageBox.show($(error.response.body).find('message').first().text(), 
													                   {
													                        icon: sap.m.MessageBox.Icon.ERROR,
													                        title: "Error",
													                        actions: [sap.m.MessageBox.Action.OK],
													                        onClose: function(oAction) 
													                            { 
													                           
													                            }
													                   })
															/*sap.ca.ui.message.showMessageBox
															 ({
																 	message:$(error.response.body).find('message').first().text(),
														            type: sap.ca.ui.message.Type.ERROR
														     });*/
													}
										 });
					
						 
							}
						else
							{
							  if(!oView.byId("workcenter").getSelectedItem())
								  {
								  
								  
								 /* sap.ca.ui.message.showMessageBox
									 ({
										 	message:"No Workcenter Avaliable",
								            type: sap.ca.ui.message.Type.ERROR
								     });*/
								  sap.m.MessageBox.show("No Workcenter Avaliable", 
						                   {
						                        icon: sap.m.MessageBox.Icon.ERROR,
						                        title: "Error",
						                        actions: [sap.m.MessageBox.Action.OK],
						                        onClose: function(oAction) 
						                            { 
						                           
						                            }
						                   })
								  
								  }
							}
				 },
				 handleReset:function()
				 {
					 	sap.ui.getCore().appData.mainView.byId("emp_id").setValue("");
				 },
				 handleLinkObjectAttributePress:function()
				 {
					 alert("hiiii")
					 
				 },
				 onBeforeRendering: function() 
				 {
			
					
					 
					 setInterval(function()
								{ 	
						var objHeader = sap.ui.getCore().appData.mainView.byId("objHeaderTitle");
						var objHeaderStat = sap.ui.getCore().appData.mainView.byId("objHeader_stat");
						
						var dateTimeModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
										dateTimeModel.read("/TIMESTAMPSet",
													  {
														urlParameters:false,
														context:false,
														async:true,
														success:function(data)
																{
																	/*objHeader.setNumber(sap.ui.ceat.prodConf.util.Formatter.DateFormat(data.results[0].Sdate));*/
																	objHeaderStat.setText(sap.ui.ceat.prodConf.util.Formatter.TimeFormat(data.results[0].Stime))
																},
														error:function(error)
															  {
															
															  }
													  })
								}, 60000);
				 },
			     onAfterRendering: function() 
			     {
			    	/* document.querySelector('body').addEventListener('click', function(event) {
			    		  if (event.target.className === 'sapMObjectNumberText') 
			    		  {
			    			  sap.ui.getCore().appData.mycal=new sap.ui.unified.Calendar({
			    				  firstDayOfWeek:1
			    				  
			    			  }).addStyleClass("calclass")
			    				var dialog = new sap.m.Dialog({
			    					title: 'Set Date',
			    					contentWidth: "550px",
			    					contentHeight: "300px",
			    					content: sap.ui.getCore().appData.mycal,
			    					beginButton: new sap.m.Button({
			    						text: 'Submit',
			    						press: function () {
			    							var selectedDate= sap.ui.getCore().appData.mycal;
			    							if(selectedDate.getSelectedDates().length)
			    							{
				    							selectedDate=selectedDate.getSelectedDates()[0].getStartDate();
				    							var year=selectedDate.getFullYear();
				    							year=year.toString();
				    							var month=selectedDate.getMonth()+1;
				    							month=month.toString();
				    							if(month<10){month="0"+month}
				    							var date=selectedDate.getDate() >=10?selectedDate.getDate().toString():"0"+selectedDate.getDate();
				    							var finalDate=year+month+date;
				    							sap.ui.getCore().appData.mainView.finalDate=finalDate;
				    							var objHeader = sap.ui.getCore().appData.mainView.byId("objHeaderTitle");
				    							objHeader.setNumber(sap.ui.ceat.prodConf.util.Formatter.DateFormat(finalDate));
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
			    	 
			    				//to get access to the global model
			    				
			    				dialog.open();
			    			}
			    		    // do your action on your 'li' or whatever it is you're listening for
			    		  }
			    		);
			 		*/
				 },
				 onExit: function() 
				 {
							
				 }
});