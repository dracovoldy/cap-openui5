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
			console.log(this.getView().getModel().getProperty("/posting"));

			var payload = this.getView().getModel().getProperty("/posting");
			//prepare post
			var url = "http://10.154.52.73:3000/api/estimate";
			
			var Company = this.getView().getModel().getProperty("/posting/comp_name");
			var CapgContact = this.getView().getModel().getProperty("/posting/cap_name");

			$.ajax({
				url: url,
				type: 'POST',
				data: payload,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				success: function (data) {
					console.log(data);
					
					MessageBox.success("Estimate created for: " + Company + "\nCapgemini PoC: " + CapgContact, {
						title: "Success", // default
						onClose: null, // default
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