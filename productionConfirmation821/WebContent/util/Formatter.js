/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ui.ceat.prodConf.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");
sap.ui.ceat.prodConf.util.Formatter = 
			{
				DateFormat:function(date)
						   {
								if(date)
								{
									return(date.substr(6,2) + "/" + date.substr(4,2) + "/" + date.substr(0,4));
								}
						   },
				TimeFormat:function(time)
						   {
								  var hr = parseInt(time.substr(0,2));
								  var mn = parseInt(time.substr(2,2));
								  var ampm = hr >= 12 ? 'PM' : 'AM';
								  hr = hr % 12;
								  hr = hr ? hr : 12; // the hour '0' should be '12'
								  mn = mn < 10 ? '0'+mn : mn;
								  var strTime = hr + ':' + mn + ' ' + ampm;
								  return strTime;
						   }
			};
