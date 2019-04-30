sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("cap.estimate.controller.POCM", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function (oEvent) {
			// var that = this;

			// console.log(this.getView().getModel().getProperty("/posting"));
			if (this.validate()) {
				this.getView().getModel().setProperty("/Visited/" + "POCM" + "/status", 2);
				this.getView().getModel().setProperty("/Visited/" + "Others" + "/status", 1);
				this.getView().getModel().setProperty("/navSelectedKey", "Others");
				this.router.navTo("Others");
			}
		},
		validate: function () {
		

			return true;
		},
		backPress: function (oEvent){
			this.router.navTo("Data");
		}

	});

});