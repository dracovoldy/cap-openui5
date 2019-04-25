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
			this.attachPopoverOnMouseover(this.byId("pain"), this.byId("popover_pain"));
		},
		isExisting: function (oEvent) {
			var data = oEvent.getParameters("selected");
			console.log(data);

			if (data.selected) {
				this.getView().byId("bg_hbox").setVisible(true);
			} else {
				this.getView().byId("bg_hbox").setVisible(false);
			}
		},
		attachPopoverOnMouseover: function (targetControl, popover) {
			targetControl.addEventDelegate({
				onmouseover: this._showPopover.bind(this, targetControl, popover),
				onmouseout: this._clearPopover.bind(this, popover),
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

			if (this.validate()) {
				if (this.checkArea()) {
					this.router.navTo("Scope");
				}

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
			}
			if (nsCheck2) {
				nsCount++;
			}
			if (nsCheck3) {
				nsCount++;
			}
			if (nsCheck4) {
				nsCount++;
			}

			if (sapCheck1) {
				sapCount++;
			}
			if (sapCheck2) {
				sapCount++;
			}

			if (nsCount > 0 && sapCount === 0) {
				//Then post and complete 

				MessageBox.information("Response has been recorded", {
					title: "Information", // default
					onClose: function (oAction) {
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
				MessageBox.information("Please select Areas of interest", {
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
		}

	});

});