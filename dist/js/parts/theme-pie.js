if(!_.theme_pie){_.theme_pie=1;(function($){$.wa($.fa.anychart.themes.defaultTheme,{pie:{animation:{duration:2E3},title:{text:"Pie Chart"},group:!1,sort:"none",radius:"45%",innerRadius:0,startAngle:0,explode:15,outsideLabelsCriticalAngle:60,outsideLabelsSpace:30,insideLabelsOffset:"50%",normal:{labels:{format:"{%PercentValue}{decimalsCount:1,zeroFillDecimals:true}%"}},a11y:{titleFormat:function(){var a=this.chart,b=$.NG.apply(this),b=b+(", with "+a.$e("count")+" points. ");return b+="Min value is "+a.$e("min")+", max value is "+a.$e("max")+
"."}}},pie3d:{mode3d:!0,explode:"5%",connectorLength:"15%",legendItem:{iconStroke:null}}});}).call(this,$)}
