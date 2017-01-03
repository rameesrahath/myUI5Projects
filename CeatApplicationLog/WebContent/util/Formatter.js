sap.ui.define(function() 
		{
			"use strict";
			var Formatter = 
						   {
 
								orderState :  function (fValue) 
											   {
													try 
													{
														if (fValue === "ERROR") 
														{
															return "Error";
														} 
														else if (fValue === "Warning") 
														{
															return "WARNING";
														} 
														else if (fValue === "SUCCESS") 
														{
															return "Success";
														}
													} 
													catch (err) 
													{
														return "None";
													}
												},
								dateFormate:function(date)
								{
									if(date)
									{
										var newDate = new Date(date);
										var year = newDate.getFullYear().toString();
										var month=newDate.getMonth()+1;
										var mm = month >= 10? month:"0" + month;
										var dd = newDate.getDate() >= 10?newDate.getDate() :"0" + (newDate.getDate());
										return year + mm + dd;
									}
									else return '';
								},
								TimeFormat:function(ss)
								{
									if(ss)
										{
									var time=ss.substring(2,4) + ":" + ss.substring(5,7) + ":" +ss.substring(8,10);
									return time;
										}
								},
								logBookDate:function(date)
								{
									if(date)
										{
									var newDate=date.split("T")[0];
									return newDate;
										}
								}
						   };
			return Formatter;
}, /* bExport= */ true);