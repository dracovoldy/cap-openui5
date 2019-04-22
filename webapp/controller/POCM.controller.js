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
				this.router.navTo("Others");
			}
		},
		validate: function () {
			//validate
			// var count = 0;
			// if (this.getView().byId("MIDDL_MultiCombo").getSelectedKeys().length === 0) {
			// 	this.getView().byId("MIDDL_MultiCombo").setValueState("Information");
			// 	this.getView().byId("MIDDL_MultiCombo").setValueStateText("Input Required");
			// 	this.getView().byId("MIDDL_MultiCombo").focus();
			// 	count++;
			// 	// return false;
			// }
			// if (this.getView().byId("dev_comments").getValue().trim() === "") {
			// 	this.getView().byId("dev_comments").setValueState("Information");
			// 	this.getView().byId("dev_comments").setValueStateText("Input Required");
			// 	this.getView().byId("dev_comments").focus();
			// 	count++;
			// 	// return false;
			// }

			// if(count > 0){
			// 	return false;
			// }
			// this.getView().byId("MIDDL_MultiCombo").setValueState("None");
			// this.getView().byId("dev_comments").setValueState("None");

			return true;
		}

	});

});