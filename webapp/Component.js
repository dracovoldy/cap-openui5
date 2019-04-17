sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"cap/estimate/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("cap.estimate.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
		},
		
		createContent:function(){
		
		var appView = new sap.ui.view('idappView',{
			id: 'idappView',
			viewName:'cap.estimate.view.App',
			type:sap.ui.core.mvc.ViewType.JS
		});
		
		return appView;
	}	
		
		
	});

});