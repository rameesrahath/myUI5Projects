/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ui.ceat.prodConf.view.StoreSelectDialog");
jQuery.sap
		.require("sap.retail.store.lib.reuse.customControls.SiteSelectDialog");
sap.retail.store.lib.reuse.customControls.SiteSelectDialog.extend(
		"sap.ui.ceat.prodConf.view.StoreSelectDialog", {
			searchSites : function(s, S, e, t, i) {
				retail.store.orderproduct.utils.DataManager.readStores({
					skip : i,
					top : t,
					search : s
				}, function(d) {
					S(d.results);
				}, e);
			}
		});
