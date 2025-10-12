sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (ControllerExtension, JSONModel, MessageToast) {
  "use strict";

  return ControllerExtension.extend("riskmanagement.ext.controller.ObjectPageExt", {
    override: {
      onInit: async function () {
        const oView = this.getView();
        const oModel = new JSONModel({ todos: [] });
        oView.setModel(oModel, "todo");

        try {
          const response = await fetch("/external/todos");
          const data = await response.json();
          const sliced = data.slice(0, 5);
          oModel.setProperty("/todos", sliced);
        } catch (err) {
          MessageToast.show("Error loading external todos");
        }
      },

    }
  });
});