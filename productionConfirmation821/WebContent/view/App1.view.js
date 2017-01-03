sap.ui.jsview("sap.ui.ceat.prodConf.view.App1", {

	getControllerName: function () {
		return "sap.ui.ceat.prodConf.view.App1";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		//Setting up fake info data, for local development sap.ushell is not available
		if(!sap.ushell || !sap.ushell.Container){
			sap.ushell = {
				Container : {
					getUser : function(){
						return {
							getId: function(){
								return '83000000042'
								}
							,getFullName: function(){
								return "Fiori Employee";
							}
						}
					}
				}
			}
		}
	//
		
		// create app
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("S1", "sap.ui.ceat.prodConf.view.S1");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
        
		
		
		var detail = sap.ui.xmlview("S2", "sap.ui.ceat.prodConf.view.S2");
		detail.getController().nav = this.getController();
		this.app.addPage(detail,false);

		
		return this.app;
	}
});