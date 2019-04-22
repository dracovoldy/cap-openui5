sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("cap.estimate.controller.FinalDashBoard", {

		onInit: function () {
			var that = this;
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
			
			var url = "http://10.154.52.73:3000/api/data/" + this.getView().getModel().getProperty("/estimateId");
			
			$.ajax({
				url: url,
				type: 'GET',
				data: payload,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				success: function (data) {
					console.log(data);
					
					that.getView.getModel().setProperty("/estimate/LowPersonMonths", data.LowPersonMonths);
					that.getView.getModel().setProperty("/estimate/HighPersonMonths", data.HighPersonMonths);
					that.getView.getModel().setProperty("/estimate/PersonMonths", data.PersonMonths);
					
				},
				error: function (e) {
					console.log(e);
				}
		},

		onBack: function () {
			this.router.navTo("Others");
		}

	});

});