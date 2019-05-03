sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/MessageBox'
], function (jQuery, Controller, Popover, Button, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Customer", {

		onInit: function () {
			// alert("Im alive: View");
			this.router = this.getOwnerComponent().getRouter();

			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);

			this.getView().getModel().setProperty("/Visited/" + "Customer" + "/status", 1);
		},
		nextPress: function () {
			// console.log(this.getView().getModel().getProperty("/Customer"));

			var sector = this.getView().byId("Sector_Select").getSelectedKey();
			this.getView().getModel().setProperty("/posting/comp_sector", sector);

			var region = this.getView().byId("Region_Select").getSelectedKey();
			this.getView().getModel().setProperty("/posting/comp_region", region);

			var capEmail = this.getView().byId("capg_email").getValue();
			this.getView().getModel().setProperty("/posting/cap_email", capEmail + "@capgemini.com");

			if (this.validate()) {
				this.getView().getModel().setProperty("/Visited/" + "Customer" + "/status", 2);
				this.getView().getModel().setProperty("/Visited/" + "Background" + "/status", 1);
				this.getView().getModel().setProperty("/navSelectedKey", "Background");
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
			} else {
				this.getView().byId("name").setValueState("None");
			}

			if (this.getView().byId("Sector_Select").getSelectedKey() === "X") {
				this.getView().byId("Sector_Select").setValueState("Information");
				this.getView().byId("Sector_Select").setValueStateText("Input Required");
				this.getView().byId("Sector_Select").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("Sector_Select").setValueState("None");
			}

			if (this.getView().byId("Region_Select").getSelectedKey() === "X") {
				this.getView().byId("Region_Select").setValueState("Information");
				this.getView().byId("Region_Select").setValueStateText("Input Required");
				this.getView().byId("Region_Select").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("Region_Select").setValueState("None");
			}

			if (this.getView().byId("client_name").getValue().trim() === "") {
				this.getView().byId("client_name").setValueState("Information");
				this.getView().byId("client_name").setValueStateText("Input Required");
				this.getView().byId("client_name").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("client_name").setValueState("None");
			}

			if (this.getView().byId("client_contact").getValue().trim() === "") {
				this.getView().byId("client_contact").setValueState("Information");
				this.getView().byId("client_contact").setValueStateText("Input Required");
				this.getView().byId("client_contact").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("client_contact").setValueState("None");
			}

			if (this.getView().byId("client_title").getValue().trim() === "") {
				this.getView().byId("client_title").setValueState("Information");
				this.getView().byId("client_title").setValueStateText("Input Required");
				this.getView().byId("client_title").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("client_title").setValueState("None");
			}

			if (this.getView().byId("capg_name").getValue().trim() === "") {
				this.getView().byId("capg_name").setValueState("Information");
				this.getView().byId("capg_name").setValueStateText("Input Required");
				this.getView().byId("capg_name").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("capg_name").setValueState("None");
			}

			if (this.getView().byId("capg_email").getValue().trim() === "") {
				this.getView().byId("capg_email").setValueState("Information");
				this.getView().byId("capg_email").setValueStateText("Input Required");
				this.getView().byId("capg_email").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("capg_email").setValueState("None");
			}

			if (this.getView().byId("capg_phone").getValue().trim() === "") {
				this.getView().byId("capg_phone").setValueState("Information");
				this.getView().byId("capg_phone").setValueStateText("Input Required");
				this.getView().byId("capg_phone").focus();
				count++;
				// return false;
			} else {
				this.getView().byId("capg_phone").setValueState("None");
			}

			if (count > 0) {
				return false;
			}
			this.getView().byId("name").setValueState("None");
			this.getView().byId("Sector_Select").setValueState("None");
			this.getView().byId("Region_Select").setValueState("None");
			this.getView().byId("client_title").setValueState("None");
			this.getView().byId("client_name").setValueState("None");
			this.getView().byId("client_contact").setValueState("None");
			this.getView().byId("client_name").setValueState("None");
			this.getView().byId("capg_name").setValueState("None");
			this.getView().byId("capg_email").setValueState("None");
			this.getView().byId("capg_phone").setValueState("None");

			return true;
		},
		showBusyIndicator: function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
					this.hideBusyIndicator();
				});
			}
		},
		startOver: function (oEvent) {
			var that = this;
			MessageBox.confirm(
				"Page will reload, temporary data will be lost\nDo you wish to continue?", {
					onClose: function (oAction) {
						if (oAction === "OK") {
							that.showBusyIndicator(10000, 0);
							location.reload();
						} else if (oAction === "CANCEL") {
							//Do Nothing
						} else {
							//Nothing
						}
					}
				});
		}

	});

});