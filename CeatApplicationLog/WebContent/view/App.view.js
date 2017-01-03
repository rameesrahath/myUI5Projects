sap.ui.jsview("com.ceat.log.view.App", {

	getControllerName: function () {
		return "com.ceat.log.controller.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
	
		
		// create app
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("S1", "com.ceat.log.view.initialView1");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
        
		
		
		var detail = sap.ui.xmlview("S2", "com.ceat.log.view.logView");
		detail.getController().nav = this.getController();
		this.app.addPage(detail,false);

		
		return this.app;
	}
});