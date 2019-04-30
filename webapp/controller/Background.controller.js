sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button',
	"sap/m/MessageBox"
], function (jQuery, Controller, Popover, Button, MessageBox) {
	"use strict";

	return Controller.extend("cap.estimate.controller.Background", {

		onInit: function () {
			// alert("Im alive: View");
			this.router = this.getOwnerComponent().getRouter();

			var globalModel = this.getOwnerComponent().getModel("init_data");
			this.getView().setModel(globalModel);

			this.attachPopoverOnMouseover(this.byId("drive"), this.byId("popover_it"));
			this.attachPopoverOnMouseover(this.byId("biz"), this.byId("popover_biz"));

		},
		isExisting: function (oEvent) {
			var data = oEvent.getParameters("selected");
			// console.log(data);

			if (data.selected) {
				this.getView().byId("bg_hbox").setVisible(true);
				this.getView().getModel().setProperty("/posting/bg_newcust", "Y");
				this.getView().getModel().setProperty("/posting/bg_impyear", "0000");

			} else {
				this.getView().byId("bg_hbox").setVisible(false);
				this.getView().getModel().setProperty("/posting/bg_newcust", "N");
				this.getView().getModel().setProperty("/posting/bg_impyear", "0000");
			}
		},
		changeYear: function (oEvent){
			var iYear = this.getView().byId("impYear").getSelectedKey();
			this.getView().getModel().setProperty("/posting/bg_impyear", iYear);
		},
		attachPopoverOnMouseover: function (targetControl, popover) {
			targetControl.addEventDelegate({
				onmouseover: this._showPopover.bind(this, targetControl, popover),
				onmouseout: this._clearPopover.bind(this, popover)
			}, this);
		},

		_showPopover: function (targetControl, popover) {
			this._timeId = setTimeout(function () {
				popover.openBy(targetControl);
			}, 500);
		},

		_clearPopover: function (popover) {
			clearTimeout(this._timeId) || popover.close();
		},
		nextPress: function () {
			console.log(this.getView().getModel().getProperty("/posting"));
			if (this.validate()) {
				if (this.checkArea()) {
					this.getView().getModel().setProperty("/Visited/" + "Background" + "/status", 2);
					this.getView().getModel().setProperty("/Visited/" + "Scope" + "/status", 1);
					this.getView().getModel().setProperty("/navSelectedKey", "Scope");
					console.log(this.getView().getModel().getProperty("/posting"));
					this.router.navTo("Scope");
				}

			}

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
		selectChange: function (oEvent) {
			if (oEvent.getParameters("selected").selected === true) {
				oEvent.getSource().setSelected(true);
			} else {
				oEvent.getSource().setSelected(false);
			}
		},
		checkArea: function () {
			var that = this;
			var sapCheck1 = this.getView().getModel().getProperty("/BackgroundCheck/sapCheck1");
			var sapCheck2 = this.getView().getModel().getProperty("/BackgroundCheck/sapCheck2");

			var nsCheck1 = this.getView().getModel().getProperty("/BackgroundCheck/nsCheck1");
			var nsCheck2 = this.getView().getModel().getProperty("/BackgroundCheck/nsCheck2");
			var nsCheck3 = this.getView().getModel().getProperty("/BackgroundCheck/nsCheck3");
			var nsCheck4 = this.getView().getModel().getProperty("/BackgroundCheck/nsCheck4");

			var nsCount = 0;
			var sapCount = 0;

			if (nsCheck1) {
				nsCount++;
				this.getView().getModel().setProperty("/posting/bg_othinterest1", "Y");
			}
			if (nsCheck2) {
				nsCount++;
				this.getView().getModel().setProperty("/posting/bg_othinterest2", "Y");
			}
			if (nsCheck3) {
				nsCount++;
				this.getView().getModel().setProperty("/posting/bg_othinterest3", "Y");
			}
			if (nsCheck4) {
				nsCount++;
				this.getView().getModel().setProperty("/posting/bg_othinterest4", "Y");
			}

			if (sapCheck1) {
				sapCount++;
				this.getView().getModel().setProperty("/posting/bg_sapinterest1", "Y");
			}
			if (sapCheck2) {
				sapCount++;
				this.getView().getModel().setProperty("/posting/bg_sapinterest2", "Y");
			}

			if (nsCount > 0 && sapCount === 0) {
				//Then post and complete 

				MessageBox.information("Response has been sucessfully recorded", {
					title: "Information", // default
					onClose: function (oAction) {
						that.showBusyIndicator(10000, 0);
						location.reload();
					}, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});

				return false;

			} else if (nsCount >= 0 && sapCount > 0) {
				return true;
			} else if (nsCount === 0 && sapCount === 0) {
				MessageBox.information("Please select \u201CAreas of interest\u201D", {
					title: "Information", // default
					onClose: null, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});

				return false;
			}
			return false;
		},
		validate: function () {
			//validate
			var count = 0;
			if (this.getView().byId("prog").getValue().trim() === "") {
				this.getView().byId("prog").setValueState("Information");
				this.getView().byId("prog").setValueStateText("Input Required");
				this.getView().byId("prog").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("biz").getValue().trim() === "") {
				this.getView().byId("biz").setValueState("Information");
				this.getView().byId("biz").setValueStateText("Input Required");
				this.getView().byId("biz").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("drive").getValue().trim() === "") {
				this.getView().byId("drive").setValueState("Information");
				this.getView().byId("drive").setValueStateText("Input Required");
				this.getView().byId("drive").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("pain").getValue().trim() === "") {
				this.getView().byId("pain").setValueState("Information");
				this.getView().byId("pain").setValueStateText("Input Required");
				this.getView().byId("pain").focus();
				count++;
				// return false;
			}
			if (this.getView().byId("case").getValue().trim() === "") {
				this.getView().byId("case").setValueState("Information");
				this.getView().byId("case").setValueStateText("Input Required");
				this.getView().byId("case").focus();
				count++;
				// return false;
			}

			if (count > 0) {
				return false;
			}
			this.getView().byId("prog").setValueState("None");
			this.getView().byId("biz").setValueState("None");
			this.getView().byId("drive").setValueState("None");
			this.getView().byId("pain").setValueState("None");
			this.getView().byId("case").setValueState("None");

			return true;
		},
		backPress: function (oEvent){
			this.router.navTo("Customer");
		}

	});

});