sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("cap.estimate.controller.FinalDashBoard", {

		onInit: function () {

			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);

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
		onAfterRendering: function () {
			var that = this;
			var estimateId = this.getView().getModel().getProperty("/estimateId");

			var url = "http://10.154.52.73:3000/api/data/" + estimateId;

			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function (data) {
					console.log(data);

					console.log(that.getView().getModel().setProperty("/estimate/LowPersonMonths", data.LowPersonMonths));
					console.log(that.getView().getModel().setProperty("/estimate/HighPersonMonths", data.HighPersonMonths));
					console.log(that.getView().getModel().setProperty("/estimate/PersonMonths", data.PersonMonths));

				},
				error: function (e) {
					console.log(e);
				}
			});
		},
		startOver: function (oEvent) {
			this.showBusyIndicator(10000, 0);
			location.reload();
		}

	});

});