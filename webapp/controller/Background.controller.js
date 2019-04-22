sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/m/Popover',
	'sap/m/Button'
], function (jQuery, Controller, Popover, Button) {
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
				this.router.navTo("Scope");
				
				// // var navList = $( "div[id$='navListItems']" );
				// var navListFinal = sap.ui.getCore().byId("navListItems");
				
				// // var navItem = $( "div[id$='nav_scope']" );
				// var navItemFinal = sap.ui.getCore().byId("nav_scope");
				
				// navListFinal.setSelectedItem(navItemFinal);
				
			}

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
			
			if(count > 0){
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