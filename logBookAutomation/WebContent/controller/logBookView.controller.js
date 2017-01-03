sap.ui.define(["sap/m/MessageBox",
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/odata/ODataModel",
               "sap/m/BusyDialog",
               "com/ceat/logbookauto/util/Formatter"
], function(messageBox,Controller,jsonModel,odataModel,oBusy,myFormatter) {
	"use strict";

	return Controller.extend("com.ceat.logbookauto.controller.logBookView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.ceat.logbookauto.view.logBookView
		 */
		onInit: function() 
			{
			
			sap.ui.getCore().appData.secondView=this.getView();
			
			},
			onBackButtonPress:function()
			{
				
				this.nav.back("SS1");
			},
			handleFinalSubmit:function()
			{
				
 messageBox.show(
	       "Save the Data?", 
	 {
          icon: sap.m.MessageBox.Icon.INFORMATION,
          title: "Save",
          actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
          onClose: function(oAction)
          { 
        	  if(oAction == 'OK')
        		  {
			        		  
							        		
				var TOPLOSS          = [];
				var TOELOSS          = [];
				var myView           = sap.ui.getCore().appData.secondView;
				var oModel           = new odataModel("/sap/opu/odata/sap/ZLOGBOOKAUTOMATION_SRV/");
				var processLossTable = myView.byId("idProcessLossTable");
				var engineeringTable = myView.byId("idEngnrngLossTable");
				var modelToSend      = myView.getModel("previouslogmodel").oData; 
				var tableRowsProc    = processLossTable.getItems();
				var tableRowsEng     = engineeringTable.getItems();
				var headerModel      = myView.getModel("headermodel");
				var formatter        = com.ceat.logbookauto.util.Formatter;
				var that             = myView;
				$.each(tableRowsProc,
					   function(index,value)
					   {
					        var Losnm   = "PL";
					        var Itmno   = index+1;
					        
							var cellArry = value.getCells();
							var Ldcsr    = cellArry[0]._lastValue;
							var Remrk    = cellArry[1]._lastValue;
							var Timeh    = cellArry[2]._lastValue;
							
							if(Ldcsr != "" || Remrk != "" || Timeh != "")
								{
									var myObj    ={"Losnm":Losnm,"Itmno":Itmno,"Ldcsr":Ldcsr,"Remrk":Remrk,"Timeh":Timeh}
									TOPLOSS.push(myObj);
								}
							
					      
					   })
					   
				 $.each(tableRowsEng,
				        function(index,val)
				        {
						    var Losnm   = "EL";
					        var Itmno   = index+1;
					        
							var cellArry = val.getCells();
							var Arbpl    = cellArry[0].getSelectedKey();
							var Lostp    = cellArry[1].getSelectedKey();
							var Timeh    = cellArry[2]._lastValue;
							
							if(Arbpl != "" || Lostp != "" || Timeh != "")
								{
									var myObj    ={"Losnm":Losnm,"Itmno":Itmno,"Arbpl":Arbpl,"Lostp":Lostp,"Timeh":Timeh}
									TOELOSS.push(myObj);
								}
				        })
				 delete modelToSend.__metadata;       
				 modelToSend.TOELOSS={};
				 modelToSend.TOPLOSS={};
				 
				 if(TOELOSS.length)
					 modelToSend.TOELOSS=TOELOSS;
				 else
					 modelToSend.TOELOSS=[{"Itmno":0,"Losnm":"EL"}];
				 
				 if(TOPLOSS.length)
				     modelToSend.TOPLOSS=TOPLOSS;
				 else
					 modelToSend.TOPLOSS=[{"Itmno":0,"Losnm":"PL"}]; 
				 
				
				 modelToSend.Deprt  = headerModel.oData.departmentKey;
				 modelToSend.Werks  = headerModel.oData.plantKey;	   	
				 modelToSend.Lbdat	= headerModel.oData.date;
				 modelToSend.Shift	= headerModel.oData.shiftKey;
				 modelToSend.Mpabs  = formatter.checkNull(modelToSend.Mpabs);
				 modelToSend.Mpavl  = formatter.checkNull(modelToSend.Mpavl);
				 modelToSend.Mpgvn  = formatter.checkNull(modelToSend.Mpgvn);
				 modelToSend.Mprcn  = formatter.checkNull(modelToSend.Mprcn);
				 modelToSend.Mprct  = formatter.checkNull(modelToSend.Mprct);
				 modelToSend.Mptot  = formatter.checkNull(modelToSend.Mptot);
				 modelToSend.Pmpwr  = formatter.checkNull(modelToSend.Pmpwr);
				 modelToSend.Lbaid  = 0;
		   		   oModel.create("/LogBookSet",modelToSend,null,
		                function(data)
					      {
		   			messageBox.show(
						      data.Message, {
						          icon: sap.m.MessageBox.Icon.SUCCESS,
						          title: "Success",
						          actions: [sap.m.MessageBox.Action.OK],
						          onClose: function(oAction) 
						          { 
						        	  sap.ui.getCore().appData.secondView.getController().nav.to("SS1");   
						          }
						      }
						    );
		   			   				
					      },
					      function(error)
					      {
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
								        	  sap.ui.getCore().appData.secondView.getController().nav.to("SS1"); 
								          }
					    			       }
								    );		
					      })
					      
					      
        		  }
          }
  }
);
			     
			},
			handleReset:function()
			{
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
						sap.ui.getCore().appData.resetLogData    = new jsonModel(previousLogBlankData);
				
				this.getView().setModel(sap.ui.getCore().appData.resetLogData,"previouslogmodel");
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.ceat.logbookauto.view.logBookView
		 */
			onBeforeRendering: function()
			{
				
		
			},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.ceat.logbookauto.view.logBookView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.ceat.logbookauto.view.logBookView
		 */
		//	onExit: function() {
		//
		//	}

	});

});