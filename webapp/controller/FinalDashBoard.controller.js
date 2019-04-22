sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("cap.estimate.controller.FinalDashBoard", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
		},

		onBack: function () {
			this.router.navTo("Others");
		}

	});

});