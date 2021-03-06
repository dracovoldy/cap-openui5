sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Infrastructure", {

		
		onInit: function (){
			this.router = this.getOwnerComponent().getRouter();
			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);
		},
		nextPress: function (oEvent){
			var that = this;
			
			var Instance_Select = parseInt(this.getView().byId("Instance_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_psap_v", Instance_Select);
			
			var Enhancement_Select = parseInt(this.getView().byId("Enhancement_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_plvl_v", Enhancement_Select);
			
			var Systems_Select = parseInt(this.getView().byId("Systems_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_syscon_v", Systems_Select);
			
			var aSapKeys = this.getView().byId("KeySap_Multi").getSelectedKeys();
			aSapKeys.map(function(key){
				if(key === "0"){
					that.getView().getModel().setProperty("/posting/if_key_ecc_v", 1);
				}else if(key === "1"){
					that.getView().getModel().setProperty("/posting/if_key_arib_v", 1);
				}else if(key === "2"){
					that.getView().getModel().setProperty("/posting/if_key_conc_v", 1);
				}else if(key === "3"){
					that.getView().getModel().setProperty("/posting/if_key_fiel_v", 1);
				}else if(key === "4"){
					that.getView().getModel().setProperty("/posting/if_key_sf_v", 1);
				}else if(key === "5"){
					that.getView().getModel().setProperty("/posting/if_key_solm_v", 1);
				}else if(key === "6"){
					that.getView().getModel().setProperty("/posting/if_key_ewm_v", 1);
				}else if(key === "7"){
					that.getView().getModel().setProperty("/posting/if_key_gts_v", 1);
				}else if(key === "8"){
					that.getView().getModel().setProperty("/posting/if_key_attp_v", 1);
				}else if(key === "9"){
					that.getView().getModel().setProperty("/posting/if_key_tms_v", 1);
				}else if(key === "10"){
					that.getView().getModel().setProperty("/posting/if_key_apo_v", 1);
				}else if(key === "11"){
					that.getView().getModel().setProperty("/posting/if_key_vistx_v", 1);
				}else if(key === "12"){
					that.getView().getModel().setProperty("/posting/if_key_mdg_v", 1);
				}else if(key === "13"){
					that.getView().getModel().setProperty("/posting/if_key_optx_v", 1);
				}else if(key === "14"){
					that.getView().getModel().setProperty("/posting/if_key_bpc_v", 1);
				}else if(key === "15"){
					that.getView().getModel().setProperty("/posting/if_key_bw_v", 1);
				}else if(key === "16"){
					that.getView().getModel().setProperty("/posting/if_key_grc_v", 1);
				}else if(key === "17"){
					that.getView().getModel().setProperty("/posting/if_key_others_v", 1);
				}
			});
			
			var Size_Select = parseInt(this.getView().byId("Size_Select").getSelectedKey(),10);
			this.getView().getModel().setProperty("/posting/if_sysize_v", Size_Select);
			
			// console.log(this.getView().getModel().getProperty("/posting"));
			
			if (this.validate()) {
				this.getView().getModel().setProperty("/Visited/" + "Infrastructure" + "/status", 2);
				this.getView().getModel().setProperty("/Visited/" + "Development" + "/status", 1);
				this.getView().getModel().setProperty("/navSelectedKey", "Development");
				this.router.navTo("Development");
			}
		},
		validate: function () {
			//validate
			var count = 0;
			if (this.getView().byId("KeySap_Multi").getSelectedKeys().length === 0) {
				this.getView().byId("KeySap_Multi").setValueState("Information");
				this.getView().byId("KeySap_Multi").setValueStateText("Input Required");
				this.getView().byId("KeySap_Multi").focus();
				count++;
				// return false;
			}else{
				this.getView().byId("KeySap_Multi").setValueState("None");
			}
			if (this.getView().byId("non_sap").getValue().trim() === "") {
				this.getView().byId("non_sap").setValueState("Information");
				this.getView().byId("non_sap").setValueStateText("Input Required");
				this.getView().byId("non_sap").focus();
				count++;
				// return false;
			}else{
				this.getView().byId("non_sap").setValueState("None");
			}
			
			if(count > 0){
				return false;
			}
			this.getView().byId("KeySap_Multi").setValueState("None");
			this.getView().byId("non_sap").setValueState("None");
			
			return true;
		},
		backPress: function (oEvent){
			this.router.navTo("Scope");
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