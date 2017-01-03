jQuery.sap.declare("sap.ui.ceat.prodConf.Component");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
sap.ui.core.UIComponent.extend("sap.ui.ceat.prodConf.Component", {

	
	init : function(){
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var sRootPath = jQuery.sap.getModulePath("sap.ui.ceat.prodConf");
	
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [sRootPath, "i18n/messageBundle.properties"].join("/")
//			bundleUrl : [sRoothPath, mConfig.resourceBundle].join("/")
		});
		
		this.setModel(i18nModel,"i18n");
		sap.ui.getCore().setModel(i18nModel,"i18n");
	},
	
	 metadata:{
		   "config":{
		    "titleResource":"Production Confirmation",
		    "resourceBundle":"i18n/messageBundle.properties",
		    "icon":"sap-icon://card",
		    "favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/Approve_Leave_Requests.ico"
		   }
		 },
	
	createContent : function() {

		
		
		// create root view
		this.mView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.ceat.prodConf.view.App1",
			type : "JS",
			viewData : { component : this }
		});
		
		var oView = this.mView;
	
		return oView;
	}
});