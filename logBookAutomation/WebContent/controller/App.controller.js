sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("com.ceat.logbookauto.controller.App", {

			to : function (pageId, context) 
			 {
					var app = this.getView().app;
					
					// load page on demand
					var master = ("SS1" === pageId);
					if (app.getPage(pageId, master) === null) 
					{
						var page = sap.ui.view({
							id : pageId,
							viewName : "com.ceat.logbookauto.view." + pageId,
							type : "XML"
						});
						page.getController().nav = this;
						app.addPage(page,true);
						jQuery.sap.log.info("app controller > loaded page: " + pageId);
					}
					
					// show the page
					app.to(pageId);
					
					// set data context on the page
					if (context) {
						var page = app.getPage(pageId);
						page.setBindingContext(context);
					}
			 },
			 back : function (pageId) 
				{
					this.getView().app.backToPage(pageId);
				}
		});

	}
);