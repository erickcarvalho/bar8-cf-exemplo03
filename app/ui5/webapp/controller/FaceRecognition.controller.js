sap.ui.define([
    'sap/ui/core/mvc/Controller',
], function(Controller,) {
    'use strict';
    return Controller.extend("sap.mlf.bar8.controller.FaceRecognition",{
        
        onInit: function(){
            this.getView().byId("fileUploader").addStyleClass("fileUploaderStyle1");
        },
        
        handleValueChange: function(oEvent){
            var oBusyIndicator = new sap.m.BusyDialog();
            oBusyIndicator.open();
            
            if (oEvent.getParameters().files[0]) {

                var settings = this.getView().getModel("settings");
                var url = settings.getProperty("/url");

                this._generateRequest(oEvent,url ,oBusyIndicator);
            } else {
                oBusyIndicator.close();
                //TO-DO - handle error properly
            }
        },
        
        _generateRequest(oEvent, settings, oBusyIndicator){
            
            var image = oEvent.getParameters().files[0]
            
            var form = new FormData();
            form.append('files', image );
            
            $.ajax({
                "url": "https://sandbox.api.sap.com/" + settings.url,
                "headers": settings.headers,
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form, 
            })
            .done(res => {
                sap.ui.getCore().setModel({image: image, response: JSON.parse(res)}, 'InferenceResults');
                this.getOwnerComponent().getRouter().navTo("InferenceResult");
            })
            .always(function(){
                oBusyIndicator.close();
            })
        }   
        
    });
});
