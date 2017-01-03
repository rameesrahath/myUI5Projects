sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "com/ceat/log/util/Formatter"
              ], function(Controller,Formatter) 
              {
					"use strict";
					 return Controller.extend("com.ceat.log.controller.logView", 
					 {
						 	onInit: function() 
						 	{
						 		sap.ui.getCore().viewData = {};
						 		sap.ui.getCore().viewData.tablView = this.getView();
						 		/*var sServiceUrl = $.sap.getModulePath("com.ceat.log", "/model/dummy.json");
							    var post = $.ajax({
							              url : sServiceUrl,
							              type : "GET"
							          });
							    post.done(function(data) 
							       {   
							    	   var oModel = new sap.ui.model.json.JSONModel();
								       if(data.results)
								    	   oModel.setData(data);
								       else
								    	   oModel.setData(JSON.parse(data));
								       sap.ui.getCore().viewData.tablView.setModel(oModel);
							       });*/
						 		
						 		 var m = new sap.ui.model.json.JSONModel
								 		 ({
									            IsLargeLayout: false,
									            IsSmallLayout: true
								 		 });
						         this.getView().setModel(m, "layoutStatus");
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
							onBackButtonPress:function()
							{
								this.nav.back("S1");
							},
							onBeforeRendering: function() 
							{
						
							},
							onAfterRendering: function() 
							{
						
							},
							onExit: function() 
							{
						
							},
							onExcelDownload:function()
							{
								var excelUrl=sap.ui.getCore().appData.mainView.urlData[0]+sap.ui.getCore().appData.mainView.urlData[1]+"&$format=xlsx";
								var encodeUrl = encodeURI(excelUrl);
								sap.m.URLHelper.redirect(encodeUrl,true);
							}
				
					});
				}
);