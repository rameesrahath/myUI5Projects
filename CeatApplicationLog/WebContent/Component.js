sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/ceat/log/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.ceat.log.Component", {

		

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */  
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			var sRootPath = jQuery.sap.getModulePath("com.ceat.log");
			
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : [sRootPath, "i18n/i18n.properties"].join("/")
//				bundleUrl : [sRoothPath, mConfig.resourceBundle].join("/")
			});
			
			this.setModel(i18nModel,"i18n");
			sap.ui.getCore().setModel(i18nModel,"i18n");
		
		},
		 metadata:/*{
			   "config":{
			    "titleResource":"LogBook Auto",
			    "resourceBundle":"i18n/i18n.properties",
			    "icon":"sap-icon://card",
			    "favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/Approve_Leave_Requests.ico"
			   }
			 },*/
		 {
				"_version": "1.1.0",
				"sap.app": {
					"_version": "1.1.0",
					"id": "com.ceat.log",
					"type": "application",
					"i18n": "i18n/i18n.properties",
					"applicationVersion": {
						"version": "1.0.0"
					},
					"title": "{{appTitle}}",
					"description": "{{appDescription}}",
					"sourceTemplate": {
						"id": "ui5template.basicSAPUI5ApplicationProject",
						"version": "1.32.0"
					}
				},
				"sap.ui": {
					"_version": "1.1.0",
					"technology": "UI5",
					"icons": {
						"icon": "",
						"favIcon": "",
						"phone": "",
						"phone@2": "",
						"tablet": "",
						"tablet@2": ""
					},
					"deviceTypes": {
						"desktop": true,
						"tablet": true,
						"phone": true
					},
					"supportedThemes": ["sap_hcb", "sap_bluecrystal"]
				},
				"sap.ui5": {
					"_version": "1.1.0",
					"rootView": {
						"viewName": "com.ceat.log.view.logView",
						"type": "XML"
					},
					"dependencies": {
						"libs": {
							"sap.ui.core": {},
							"sap.m": {},
							"sap.ui.layout": {}
						}
					},
					"contentDensities": {
						"compact": true,
						"cozy": true
					},
					"models": {
						"i18n": {
							"type": "sap.ui.model.resource.ResourceModel",
							"settings": {
								"bundleName": "com.ceat.log.i18n.i18n"
							}
						}
					},
					"resources": {
						"css": [{
							"uri": "css/style.css"
						}]
					}
			}},
		createContent : function() {

			
			
			// create root view
			this.mView = sap.ui.view({
				id : "app",
				viewName : "com.ceat.log.view.App",
				type : "JS",
				viewData : { component : this }
			});
			
			var oView = this.mView;
		
			return oView;
		}
	});

});