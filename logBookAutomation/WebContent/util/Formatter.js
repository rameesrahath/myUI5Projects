sap.ui.define(function() 
		{
			"use strict";
			var Formatter = 
						   {
 
								
								dateFormatter:function(date)
								{
									if(date)
									{
										var todayDate = date.substring(6,8);
										var month     = date.substring(4,6);
										var year      = date.substring(0,4);
										var fulldate  =todayDate+"."+month+"."+year;
										
										return fulldate;
									}
									else return '';
								},
								lossEngDecision:function(data)
								{
									if(data)
										{
									var descKey=sap.ui.getCore().appData.engProcessDecisionKey;
									if(descKey=="0")
										{
										return "";
										}
									else
										{
										return data;
										}
										}
									else
										{
										return "";
										}
								},
								lossInputDataCheck:function(data)
								{
									if(data)
										{
										return data;
										}
									else
										{
										return "";
										}
								},
								
								checkNull:function(data)
								{
									if(data)
										{
										return parseInt(data);
										}
									else
										{
										return 0;
										}
								}
								
						   };
			return Formatter;
}, /* bExport= */ true);