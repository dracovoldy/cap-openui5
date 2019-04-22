sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Others", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function () {
			console.log(this.getView().getModel().getProperty("/posting"));
			
			var payload = this.getView().getModel().getProperty("/posting");
			//prepare post
			var url = "http://10.154.52.73:3000/api/estimate"

			$.ajax({
				url: url,
				type: 'POST',
				data: payload,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				success: function (data) {
					console.log(data);
				},
				error: function (e) {
					console.log(e);
				}
			});

		}

	});

});