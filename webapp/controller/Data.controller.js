sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Data", {

		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function (oEvent) {
			// var that = this;
			var Data_Material_Select = parseInt(this.getView().byId("Data_Material_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_matl", Data_Material_Select);
			
			var Data_Assets_Select = parseInt(this.getView().byId("Data_Assets_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_asst", Data_Assets_Select);
			
			var Data_cost_Select = parseInt(this.getView().byId("Data_cost_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_cost", Data_cost_Select);
			
			var Data_Cust_Select = parseInt(this.getView().byId("Data_Cust_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_cust", Data_Cust_Select);
			
			var Data_Gl_Select = parseInt(this.getView().byId("Data_Gl_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_glac", Data_Gl_Select);
			
			var Data_profit_Select = parseInt(this.getView().byId("Data_profit_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_prof", Data_profit_Select);
			
			var Data_Vendor_Select = parseInt(this.getView().byId("Data_Vendor_Select").getSelectedKey(), 10);
			this.getView().getModel().setProperty("/posting/data_vend", Data_Vendor_Select);

			// console.log(this.getView().getModel().getProperty("/posting"));
			if (this.validate()) {
				this.getView().getModel().setProperty("/Visited/" + "Data" + "/status", 2);
				this.getView().getModel().setProperty("/Visited/" + "POCM" + "/status", 1);
				this.getView().getModel().setProperty("/navSelectedKey", "POCM");
				this.router.navTo("POCM");
			}
		},
		validate: function () {
		
			return true;
		},
		backPress: function (oEvent){
			this.router.navTo("Development");
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