sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button'
], function (jQuery, Controller, Popover, Button) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Customer", {

		onInit: function () {
			// alert("Im alive: View");
			this.router = this.getOwnerComponent().getRouter();

			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function () {
			// console.log(this.getView().getModel().getProperty("/Customer"));

			var sector = this.getView().byId("Sector_Select").getSelectedKey();
			this.getView().getModel().setProperty("/posting/comp_sector", sector);

			var region = this.getView().byId("Region_Select").getSelectedKey();
			this.getView().getModel().setProperty("/posting/comp_region", region);

			if (this.validate()) {
				this.router.navTo("Background");
			}

		},
		validate: function () {
			//validate
			var count = 0;
			if (this.getView().byId("name").getValue().trim() === "") {
				this.getView().byId("name").setValueState("Information");
				this.getView().byId("name").setValueStateText("Input Required");
				this.getView().byId("name").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("client_name").getValue().trim() === "") {
				this.getView().byId("client_name").setValueState("Information");
				this.getView().byId("client_name").setValueStateText("Input Required");
				this.getView().byId("client_name").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("client_contact").getValue().trim() === "") {
				this.getView().byId("client_contact").setValueState("Information");
				this.getView().byId("client_contact").setValueStateText("Input Required");
				this.getView().byId("client_contact").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("client_name").getValue().trim() === "") {
				this.getView().byId("client_name").setValueState("Information");
				this.getView().byId("client_name").setValueStateText("Input Required");
				this.getView().byId("client_name").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("capg_name").getValue().trim() === "") {
				this.getView().byId("capg_name").setValueState("Information");
				this.getView().byId("capg_name").setValueStateText("Input Required");
				this.getView().byId("capg_name").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("capg_email").getValue().trim() === "") {
				this.getView().byId("capg_email").setValueState("Information");
				this.getView().byId("capg_email").setValueStateText("Input Required");
				this.getView().byId("capg_email").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("capg_phone").getValue().trim() === "") {
				this.getView().byId("capg_phone").setValueState("Information");
				this.getView().byId("capg_phone").setValueStateText("Input Required");
				this.getView().byId("capg_phone").focus();
				count++;
				// return false;
			}
			if(count > 0){
				return false;
			}
			this.getView().byId("name").setValueState("None");
			this.getView().byId("client_name").setValueState("None");
			this.getView().byId("client_contact").setValueState("None");
			this.getView().byId("client_name").setValueState("None");
			this.getView().byId("capg_name").setValueState("None");
			this.getView().byId("capg_email").setValueState("None");
			this.getView().byId("capg_phone").setValueState("None");
			
			return true;
		}

	});

});