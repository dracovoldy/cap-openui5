sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/m/Popover","sap/m/Button","sap/ui/core/routing/History"],function(o,e,r,t,n){"use strict";return e.extend("com.limscloud.app.controller.CreateCustomers",{onInit:function(){},onNavBack:function(){var o=n.getInstance();var e=o.getPreviousHash();if(e!==undefined){window.history.go(-1)}else{var r=sap.ui.core.UIComponent.getRouterFor(this);r.navTo("Dashboard",true)}}})});