sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
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