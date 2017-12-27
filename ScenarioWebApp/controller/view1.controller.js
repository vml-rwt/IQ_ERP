sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var controller;
	return Controller.extend("infosys.iqerpIQERP_Metadata.controller.view1", {
	
		
		onInit: function() {
	    
	    controller = this;
			
		},
		onSuccess: function(success) {
			var oResponse = success.result;
			
			console.log(success);

		},
		onError: function(error) {
			console.log("error");
		},
		PressCreateSce:function(){
			if (!this.CreateScenario || this.CreateScenario.bIsDestroyed===true) {
				this.CreateScenario = sap.ui.xmlfragment(
					"infosys.iqerpIQERP_Metadata.fragment.CreateScenario",
					this
				);
				this.CreateScenario.open();
			}
		},
		
		OnScenarioOk:function(){
		//	var Scenario = 	sap.ui.getCore().byId("IdScenarioVal").getValue();
			var Entity = sap.ui.getCore().byId("IdEntity").getValue();
			
				var aUrl = '/IQ_ERP/xs/CreateMetaDataTable.xsjs';
					jQuery.ajax({
						url: aUrl,
						method : "GET",
						data : "&ENTITY="+Entity,
						async : false,
						dataType : "json",
						success: this.onSuccess,
						error: this.onError
						});
			
			
			sap.ui.getCore().byId("idCreateScenario").close();
			sap.ui.getCore().byId("idCreateScenario").destroy();
		},
		
		closeScenarioDialog:function(){
			sap.ui.getCore().byId("idCreateScenario").close();
			sap.ui.getCore().byId("idCreateScenario").destroy();
		},
		
		PressConfigure:function(){
		//	var Scenario = 	sap.ui.getCore().byId("IdScenarioVal").getValue();
			var Entity = this.getView().byId("idEntity").getValue();
			
				var aUrl = '/IQ_ERP/xs/GetMetaDataTable.xsjs';
					jQuery.ajax({
						url: aUrl,
						method : "GET",
						data : "&ENTITY="+Entity,
						async : false,
						dataType : "json",
						success: this.onSuccessConfig,
						error: this.onErrorConfig
						});
						
		    },
		onSuccessConfig:function(success){
		    var oResponse = success;
		    
		    var oODataJSONModel =  new sap.ui.model.json.JSONModel();
    	               oODataJSONModel.setData(oResponse);
		    
		    
			var oTable =controller.getView().byId("idMetaDataTable");
			oTable.setModel(oODataJSONModel);
			console.log(success);
		    },
		    
		onErrorConfig: function(error) {
			console.log("error");
		}
	});
});