sap.ui.jsview("com.ceat.logbookauto.view.App", {

	getControllerName: function () {
		return "com.ceat.logbookauto.controller.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
	
		
		// create app
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("SS1", "com.ceat.logbookauto.view.initialView");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
        
		
		
		var detail = sap.ui.xmlview("SS2", "com.ceat.logbookauto.view.logBookView");
		detail.getController().nav = this.getController();
		this.app.addPage(detail,false);

		
		return this.app;
	}
});