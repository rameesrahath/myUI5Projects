sap.ui.define
			(
			  [
				"sap/ui/model/json/JSONModel",
				"sap/ui/model/odata/oDataModel",
				"sap/ui/Device"
			  ], 
			  function(JSONModel, oDataModel, Device) 
			  {
				  "use strict";
				   return {
					   			createDeviceModel: function() 
					   			{
									var oModel = new JSONModel(Device);
									oModel.setDefaultBindingMode("OneWay");
									return oModel;
					   			},
					   			callService:function(service,entityName,s,e)
					   			{
					   				 var oModel = new oDataModel(service);
					   				 oModel.read(entityName,
					   						 	 {
									   					urlParameters:false,
														context:false,
														async:true,
														success:function(data)
																{
																	s(data);
																},
														error:function(error)
															  {
																	e(error);
															  }
					   						 	 })
					   			}

						  };

			  });