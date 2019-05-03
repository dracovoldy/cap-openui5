sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Development", {
		onInit: function () {
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function (oEvent){
			// var that = this;
			
			var EDI_Select = parseInt(this.getView().byId("EDI_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_dev_edi_v", EDI_Select);
			
			var aMiddlewares = this.getView().byId("MIDDL_MultiCombo").getSelectedItems();
			this.getView().getModel().setProperty("/posting/if_dev_mdlw_v", aMiddlewares.length);
			
			var middleware_desc = "";
			aMiddlewares.map(function (item){
				middleware_desc = middleware_desc +item.getKey() + ",";	
			});
			middleware_desc = middleware_desc.slice(0, -1);
			this.getView().getModel().setProperty("/posting/if_dev_mdlw_desc", middleware_desc);
			
			var RICEFW_Select = parseInt(this.getView().byId("RICEFW_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_dev_ricefw_v", RICEFW_Select);
			
			// console.log(this.getView().getModel().getProperty("/posting"));
			if (this.validate()) {
				this.getView().getModel().setProperty("/Visited/" + "Development" + "/status", 2);
				this.getView().getModel().setProperty("/Visited/" + "Data" + "/status", 1);
				this.getView().getModel().setProperty("/navSelectedKey", "Data");
				this.router.navTo("Data");
			}
		},
		validate: function () {
			//validate
			var count = 0;
			if (this.getView().byId("MIDDL_MultiCombo").getSelectedKeys().length === 0) {
				this.getView().byId("MIDDL_MultiCombo").setValueState("Information");
				this.getView().byId("MIDDL_MultiCombo").setValueStateText("Input Required");
				this.getView().byId("MIDDL_MultiCombo").focus();
				count++;
				// return false;
			}else{
				this.getView().byId("MIDDL_MultiCombo").setValueState("None");
			}
			
			// if (this.getView().byId("dev_comments").getValue().trim() === "") {
			// 	this.getView().byId("dev_comments").setValueState("Information");
			// 	this.getView().byId("dev_comments").setValueStateText("Input Required");
			// 	this.getView().byId("dev_comments").focus();
			// 	count++;
			// 	// return false;
			// }
			
			
			if(count > 0){
				return false;
			}
			this.getView().byId("MIDDL_MultiCombo").setValueState("None");
			this.getView().byId("dev_comments").setValueState("None");
			
			return true;
		},
		backPress: function (oEvent){
			this.router.navTo("Infrastructure");
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