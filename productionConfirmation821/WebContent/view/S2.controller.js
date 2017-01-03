sap.ui.controller("sap.ui.ceat.prodConf.view.S2", 
		{
			onInit: function() 
			{
				 		sap.ui.getCore().appData.secondView=this.getView();
				 		sap.ui.getCore().appData.secondView.appData = {};
				 		sap.ui.getCore().appData.secondView.appData.prodArray = [];
						/*var productTable = oView.byId("productTable");
						var sServiceUrl = $.sap.getModulePath("sap.ui.ceat.prodConf", "/model/product_order.json");
					    var post = $.ajax({
					              url : sServiceUrl,
					              type : "GET"
					          });
					  
					    post.done(function(data) 
					       {
					    		var oModel = new sap.ui.model.json.JSONModel();
					    		oModel.setData(data);
					    		oView.setModel(oModel);
					       })*/
					       
				        var m = new sap.ui.model.json.JSONModel({
				            IsLargeLayout: false,
				            IsSmallLayout: true
				        });
				        this.getView().setModel(m, "layoutStatus");
				        this.adjustScreenLayoutResponsively();
				        
				        var oModel = new sap.ui.model.json.JSONModel({
				            enabled : false
				        });
				        this.getView().setModel(oModel, "view");
			},
			onOrientationChange: function(p) 
			{
		        this.adjustScreenLayoutResponsively();
		    },
			adjustScreenLayoutResponsively: function() 
			{
				        if (sap.ui.Device.system.phone) 
				        {
				            return;
				        }
				        var m = this.getView().getModel("layoutStatus");
				        if (sap.ui.Device.media.getCurrentRange(sap.ui.Device.media.RANGESETS.SAP_STANDARD).name !== "Desktop") 
				        {
				            if (m.getProperty("/IsLargeLayout")) 
				            {
				                m.setProperty("/IsLargeLayout", false);
				                m.setProperty("/IsSmallLayout", true);
				            }
				        } 
				        else 
				        {
				            if (m.getProperty("/IsSmallLayout")) 
				            {
				                m.setProperty("/IsLargeLayout", true);
				                m.setProperty("/IsSmallLayout", false);
				            }
				        }
		    },
			_applyFilter: function(oFilter) 
			{
				// Get the table (last thing in the VBox) and apply the filter
				var aVBoxItems = this.getView().byId("idVBox").getItems();
				/*
				var oTable = aVBoxItems[aVBoxItems.length-1];
				*/
				var gg=this.getView().byId("productTable");
				/*oTable.getBinding("items").filter(oFilter);*/
				gg.getBinding("items").filter(oFilter);
			},
			handleFacetFilterReset: function(oEvent) 
			{
				var oFacetFilter = sap.ui.getCore().byId(oEvent.getParameter("id"));
				var aFacetFilterLists = oFacetFilter.getLists();
				for(var i=0; i < aFacetFilterLists.length; i++) {
					aFacetFilterLists[i].setSelectedKeys();
				}
				this._applyFilter([]);
			},
			handleListClose: function(oEvent) {
				// Get the Facet Filter lists and construct a (nested) filter for the binding
				var oFacetFilter = oEvent.getSource().getParent();
				var mFacetFilterLists = oFacetFilter.getLists().filter(function(oList) {
						return oList.getSelectedItems().length;
					});
	 
				if(mFacetFilterLists.length) {
					// Build the nested filter with ORs between the values of each group and
					// ANDs between each group
					var oFilter = new sap.ui.model.Filter(mFacetFilterLists.map(function(oList) {
						return new sap.ui.model.Filter(oList.getSelectedItems().map(function(oItem) {
							return new sap.ui.model.Filter(oList.getTitle(), "EQ", oItem.getText());
						}), false);
					}), true);
					this._applyFilter(oFilter);
				} else {
					this._applyFilter([]);
				}
			},
			onSearch : function(oEvent) {
				var filters = [];
				
				var query = oEvent.getParameter("query");
				if ( query.length >= 0) {
					var filter = [new sap.ui.model.Filter("MaterialDescription",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Material",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Aufnr",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Uoms",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Planqty",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Curstok",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Confqty",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("WorkCenter",sap.ui.model.FilterOperator.Contains, query),
					              new sap.ui.model.Filter("Remqty",sap.ui.model.FilterOperator.Contains, query),]
					
					//filters.push(filter);
					filters=new sap.ui.model.Filter(filter,false)
				}
				// UPDATE LIST BINDING

				var myTable = this.getView().byId("productTable");
				myTable.getBinding("items").filter(filters);
			},
			onValueChange:function(evt)
			{
				/*var selectedKey = evt.getSource().getSelectedKey();
				var modelParent=evt.getSource().getParent();
				var path=modelParent.getBindingContext().sPath;
				path=path.split("/")[2];
				myViewModel=sap.ui.getCore().appData.secondView.getModel();
				myViewModel.oData.results[path].losstypee=selectedKey;
				*/
				/*var oEntry = {};
				var prodArray = sap.ui.getCore().appData.secondView.appData.prodArray;
				if(evt.getSource())
				{
					var object = evt.getSource().getParent().getBindingContext().getObject();
					var clickedElementId=evt.getSource().sId;
					clickedElementId=clickedElementId.split("-")[2];
					if(!prodArray.length)
					{
						oEntry.Aufnr = object.Aufnr;
						oEntry.Arbpl=object.WorkCenter;
						if(clickedElementId == "orderProductsInputOrderQuantityTablet" || clickedElementId == "prod_Qty")
							{
						oEntry.Prdqty = evt.getSource().getValue();
							}
						else if(clickedElementId == "lossTypeDesk" || clickedElementId == "lossType")
						{
							oEntry.Losstype = evt.getSource().getSelectedKey();
						}
						else if(clickedElementId == "loss_QtyDesk" || clickedElementId == "loss_Qty")
							{
							oEntry.Lossquan = evt.getSource().getValue();
							}
						else if(clickedElementId=="remarksDesk" || clickedElementId=="remarks")
							{
							oEntry.Remarks = evt.getSource().getValue();
							}
						prodArray[0] = oEntry;
						oEntry = {};
					}
					else
					{
						var flag = true;
						for(var i=0;i<prodArray.length;i++)
						{
							if(prodArray[i].Aufnr == object.Aufnr)
							{
								flag = false;
								prodArray[i].Arbpl=object.WorkCenter;
								if(clickedElementId == "orderProductsInputOrderQuantityTablet" || clickedElementId == "prod_Qty")
								{
									prodArray[i].Prdqty = evt.getSource().getValue();
								}
							else if(clickedElementId == "lossTypeDesk" || clickedElementId == "lossType")
							{
								prodArray[i].Losstype = evt.getSource().getSelectedKey();
							}
							else if(clickedElementId == "loss_QtyDesk" || clickedElementId == "loss_Qty")
								{
								prodArray[i].Lossquan = evt.getSource().getValue();
								}
							else if(clickedElementId=="remarksDesk" || clickedElementId=="remarks")
								{
								prodArray[i].Remarks = evt.getSource().getValue();
								}
							}
						}
						if(flag)
						{
							oEntry = {};
							oEntry.Aufnr = object.Aufnr;
							oEntry.Arbpl=object.WorkCenter;
							if(clickedElementId == "orderProductsInputOrderQuantityTablet" || clickedElementId == "prod_Qty")
							{
						oEntry.Prdqty = evt.getSource().getValue();
							}
						else if(clickedElementId == "lossTypeDesk" || clickedElementId == "lossType")
						{
							oEntry.Losstype = evt.getSource().getSelectedKey();
						}
						else if(clickedElementId == "loss_QtyDesk" || clickedElementId == "loss_Qty")
							{
							oEntry.Lossquan = evt.getSource().getValue();
							}
						else if(clickedElementId=="remarksDesk" || clickedElementId=="remarks")
							{
							oEntry.Remarks = evt.getSource().getValue();
							}
							prodArray[prodArray.length] = oEntry;
						}
					}
				}
				else
				{
					var object = evt.getSource().getBindingContext().getObject();
					for(var i=0;i<prodArray.length;i++)
					{
						if(prodArray[i].Aufnr == object.Aufnr)
						{
							sap.ui.getCore().appData.secondView.appData.prodArray.splice(i,1)
						}
					}
				}
*/			},
			onNavBack:function()
			{
				var that=this;
				sap.m.MessageBox.confirm(
						"Do you really want to exit?", 
						{
							  title: "Production Order Confirmation",
					          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					          onClose: function(oAction) 
					          		   {
					          		   		if(oAction == "YES")
					          		   		{
					          		   		sap.ui.getCore().appData.secondView.appData.prodArray=[];
					          		   		that.getView().getController().nav.back("S1");
					          		   		}
					          		   }
						}
						)
				
			},
			onBeforeRendering: function() 
			{
				
				/*set losstype dropdown*/
				/* var lModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
		    	  var sPath = "LOSSTYPESet";
		    	  lModel.read(sPath,
								 {
									urlParameters:false,
									context:false,
									async:false,
									success:function(data)
											{
													//LossType Dropdown/////
													var lossModel = new sap.ui.model.json.JSONModel();
													lossModel.setData(data.results);
									    	  		var lossTypeDropDown = sap.ui.getCore().appData.secondView.byId("lossType");
									    	  		var lossTypeDropDownDesk = sap.ui.getCore().appData.secondView.byId("lossTypeDesk");
									    	  		
									    	  		lossTypeDropDown.bindItems
												       ({
													        path:"/",
													        template:new sap.ui.core.Item
													        		({
														                 key:"{Losstype}",
														                 text:"{Losstype}"
													                })
												       });
									    	  		lossTypeDropDown.setModel(lossModel);
									    	  		lossTypeDropDownDesk.bindItems
												       ({
													        path:"/results",
													        template:new sap.ui.core.Item
													        		({
														                 key:"{Losstype}",
														                 text:"{Losstype}"
													                })
												       });
									    	  		lossTypeDropDownDesk.setModel(lossModel);
												   
									    	  		/////////
											},
									error:function(error)
											{
										
											}
								 });
   	  	*/
		
			},
			onAfterRendering: function() 
			{
		
			},
			onExit: function() 
			{
		
			},
			onPressEdit:function(evt)
			{
			
			},
			checkwithQty:function(evt)
			{
				var ele=evt.oSource;
				var currentValue = parseInt(ele.getValue());
				var path=ele.getBindingContext().sPath.split("/")[2];
				var myViewModel=sap.ui.getCore().appData.secondView.getModel();
				myViewModel=myViewModel.oData.results;
				var maxValue=parseInt(myViewModel[path].Planqty);
				var setValue=maxValue;
				var percentTobeAdded=(maxValue*25)/100;
				maxValue = maxValue + percentTobeAdded;
				maxValue = Math.floor(maxValue)
				if(currentValue>maxValue)
					{ 
					ele.setValue(setValue);
					var message="The Actual Quantity Should be Less Than or Equal to "+maxValue;
					
					/*sap.ca.ui.message.showMessageBox(
			        {
			         message:message,
			         type: sap.ca.ui.message.Type.INFO,
			         
			        });*/
					
					
					sap.m.MessageBox.show(message, 
			                   {
			                        icon: sap.m.MessageBox.Icon.INFORMATION,
			                        title: "Info",
			                        actions: [sap.m.MessageBox.Action.OK],
			                        onClose: function(oAction) 
			                            { 
			                           
			                            }
			                   })
					
					}
				
				
			},
			handleSubmit:function()
			{
				sap.m.MessageBox.confirm(
						"Save the data?", 
						{
							  title: "Confirm Production Order",
					          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					          onClose: function(oAction) 
					          		   {
					          		   		if(oAction == "YES")
					          		   		{
					          		   			var itemObj=[];
					          		   		    var oEntry=sap.ui.getCore().appData.mainView.headers;
					          		   		    var workCenter=sap.ui.getCore().appData.mainView.workcenter;
					          		   		    delete oEntry.Arbpl;
					          		   		    oEntry.Sdate=sap.ui.getCore().appData.mainView.finalDate;
					          		   		    ////addded by rameez 8.22
					          		   		    var secondViewData=sap.ui.getCore().appData.secondView.getModel();
					          		   		    var secondViewData=secondViewData.oData.results;
					          		   		    oEntry.Shfttime=secondViewData[0].Shfttime;
					          		   		    var furtherProceed=false;
					          		   		    $.each(secondViewData,function(indx,val)
					          		   		    		{
					          		   		    	     if(val.Enabled)
					          		   		    	     	 {
					          		   		    	    	 furtherProceed=true;
					          		   		    	    	 var oHead={};
					          		   		    	    	 oHead.Aufnr=val.Aufnr;
					          		   		    	    	 oHead.Arbpl=val.WorkCenter;
					          		   		    	    	 oHead.Prdqty=val.Confqty;
					          		   		    	    	 oHead.Losstype=val.losstypee;
					          		   		    	         if(val.lossQty=="")
					          		   		    	        	 {
					          		   		    	        oHead.Lossquan=0; 
					          		   		    	        	 }
					          		   		    	         else
					          		   		    	        	 {
					          		   		    	        oHead.Lossquan= parseInt(val.lossQty)
					          		   		    	        	 }
					          		   		    	    	
					          		   		    	    	 oHead.Remarks=val.Comment;
					          		   		    	    	 itemObj.push(oHead);
					          		   		    	    	 
					          		   		    	    	 }
					          		   		    		})
					          		   		    if(furtherProceed)
					          		   		    	{
					          		   		    ///end of add
					          		   		    oEntry.HEADERTOITEM=itemObj;
					          		   		    
					          		   		    var oModel2=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
					          		   		    oModel2.create("/PRODUCTIONCNFHRDSet",oEntry,null,
					        		                
					          					   function(data)
					          					      {
					          		   		          sap.ui.getCore().appData.secondView.appData.prodArray = [];
					          		   		          var msg="";
					          		   		          jQuery.each(data.HEADERTOITEM.results,
					          		   		        		  function(indx,val)
					          		   		        		  {
					          		   		        	  			msg=msg+val.Message+"\n";
					          		   		        	  	 })
					          		   		        	  	 
					          		   		          sap.m.MessageBox.show(msg, 
											               {
											                    icon:sap.m.MessageBox.Icon.INFORMATION,
											                    title: "Information",
											                    actions: [sap.m.MessageBox.Action.OK],
											                    onClose: function(oAction) 
											                        { 
											                    	var oModel2=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRODUCTIONCONF_SRV/");
					          							        	var Sdate=sap.ui.getCore().appData.mainView.finalDate;
					          							        	var sPath = "ORDERDETAILSVAL?WERKS='"+oEntry.Werks+"'&STAND='"+oEntry.Stand+"'&ARBPL='"+workCenter+"'&SDATE='"+Sdate+"'&STIME='"+oEntry.Stime+"'&PERNR='"+oEntry.Pernr+"'";
					          										
					          									    sap.ui.getCore().appData.mainView.oBusy.open();
					          										oModel2.read(sPath,
					          														 {
					          															urlParameters:false,
					          															context:false,
					          															async:true,
					          															success:function(data)
					          																	{
					          																			sap.ui.getCore().appData.mainView.oBusy.close();
					          						
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
																							var dd=oModelforTable.oData.results;
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
																							}
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
					          																			oModelforTable.oData.Filters=[{"Type":"Material","values":material},{"Type":"MaterialDescription","values":desc},{"Type":"WorkCenter","values":wcCollection}]	
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
											               });
					          						 /* sap.ca.ui.message.showMessageBox(
					          							        {
					          							         message:msg,
					          							         type: sap.ca.ui.message.Type.INFO,
					          							         
					          							        },function(){
					          							        
					          							         });*/
					          				          },
					          				       function(error)
					          				          {
					          				        	
					          				        	sap.m.MessageBox.show(error.response.body, 
					          				                   {
					          				                        icon: sap.m.MessageBox.Icon.ERROR,
					          				                        title: "Error",
					          				                        actions: [sap.m.MessageBox.Action.OK],
					          				                        details:error.response.body,
					          				                        onClose: function(oAction) 
					          				                            { 
					          				                           
					          				                            }
					          				                   })
					          				             /*sap.ca.ui.message.showMessageBox(
					          				               {
					          				            	   message:error.message,
					          				            	   type: sap.ca.ui.message.Type.ERROR,
					          				            	   details:error.response.body
					          				                });*/
					          				         }
					          				 
					          				        );
					          			/////added		  
					          		   		}
					          		   		else
					          		   			{
					          		   					/*sap.ca.ui.message.showMessageBox(
				          				               {
				          				            	   message:"There is No Orders Selected",
				          				            	   type: sap.ca.ui.message.Type.INFO,
				          				            	   details:"Please Choose any of the order by Tapping on the Toggle Button on Actual"
				          				                });*/
					          		   					
					          		   					
					          		   				sap.m.MessageBox.show("There is No Orders Selected", 
					          				                   {
					          				                        icon: sap.m.MessageBox.Icon.INFORMATION,
					          				                        title: "Information",
					          				                        actions: [sap.m.MessageBox.Action.OK],
					          				                        details:"Please Choose any of the order by Tapping on the Toggle Button on Actual",
					          				                        onClose: function(oAction) 
					          				                            { 
					          				                           
					          				                            }
					          				                   })
					          		   			}
					          		   			/*sap.ui.getCore().appData.mainView.getController().handleReset();
					          		   		*/
					          		   		}
					          		   }
						}
					);
			}

});