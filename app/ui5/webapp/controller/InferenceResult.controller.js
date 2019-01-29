sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageBox',
], function(Controller, MessageBox) {
    'use strict';
    
    return Controller.extend("sap.mlf.bar8.controller.InferenceResult", {
        onInit: function() {
            
            var {image} = sap.ui.getCore().getModel('InferenceResults');
            // console.log(response)
            var uImg = this.byId("uploadedImage");
            uImg.attachBrowserEvent('load');
            var path = URL.createObjectURL(image);
            uImg.setSrc(path)           
        },

        showJSONInfo: function (oEvent) {
            
            var { image, response } = sap.ui.getCore().getModel('InferenceResults');

            var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
            MessageBox.show("O Numero de rostos encontrados foram: " + response.predictions[0].numberOfFaces, {
                icon: sap.m.MessageBox.Icon.SUCCESS,
                title: "Sucesso",
                actions: [sap.m.MessageBox.Action.CLOSE],
                id: "messageBoxId1",
                details: response,
                styleClass: bCompact ? "sapUiSizeCompact" : "",
                contentWidth: "100px"

            });
        }
    })
});