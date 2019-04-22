sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Others", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function () {
			var that = this;
			console.log(this.getView().getModel().getProperty("/posting"));

			var Customer = this.getView().getModel().getProperty("/posting/comp_name");
			var CapgContact = this.getView().getModel().getProperty("/posting/cap_name");

			var payload = this.getView().getModel().getProperty("/posting");
			//prepare post
			var url = "http://10.154.52.73:3000/api/estimate";

			$.ajax({
				url: url,
				type: 'POST',
				data: payload,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				success: function (data) {
					console.log(data);
					
					// that.getView().getModel().setProperty("/estimateId", data.insertId);
					MessageBox.success("Estimate Generated for: " + Customer + "\n Capgemini PoC: " + CapgContact, {
						title: "Success", // default
						onClose: function () {
							that.router.navTo("FinalDashBoard");
						}, // default
						styleClass: "", // default
						initialFocus: null, // default
						textDirection: sap.ui.core.TextDirection.Inherit // default
					});
				},
				error: function (e) {
					console.log(e);
				}
			});

		}

	});

});