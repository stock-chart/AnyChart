if(!_.theme_gantt){_.theme_gantt=1;(function($){$.xa($.y.anychart.themes.defaultTheme,{ganttBase:{splitterPosition:"30%",headerHeight:70,rowHoverFill:"#F8FAFB",rowSelectedFill:"#ebf1f4",rowStroke:"#cecece",editing:!1,title:{enabled:!1},legend:{enabled:!1},background:{fill:"#fff"},margin:0,padding:0,dataGrid:{isStandalone:!1,backgroundFill:"none",tooltip:{zIndex:100,allowLeaveChart:!1}},timeline:{isStandalone:!1}},ganttResource:{dataGrid:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.minPeriodDate,b=this.maxPeriodDate;
return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")}}},timeline:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.periodStart||this.minPeriodDate,b=this.periodEnd||this.maxPeriodDate;return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")}}}},ganttProject:{dataGrid:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.actualStart||this.autoStart,b=this.actualEnd||this.autoEnd,c=this.progressValue;void 0===c&&(c=
(Math.round(1E4*this.autoProgress)/100||0)+"%");return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")+(c?"\nComplete: "+c:"")}}},timeline:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.actualStart||this.autoStart,b=this.actualEnd||this.autoEnd,c=this.progressValue;void 0===c&&(c=(Math.round(1E4*this.autoProgress)/100||0)+"%");return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")+(c?"\nComplete: "+c:"")}}}}});
$.xa($.y.anychart.themes.defaultTheme.standalones,{projectTimeline:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.actualStart||this.autoStart,b=this.actualEnd||this.autoEnd,c=this.progressValue;void 0===c&&(c=(Math.round(1E4*this.autoProgress)/100||0)+"%");return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")+(c?"\nComplete: "+c:"")}}},resourceTimeline:{tooltip:{titleFormat:function(){return this.name||""},format:function(){var a=this.periodStart||
this.minPeriodDate,b=this.periodEnd||this.maxPeriodDate;return(a?"Start Date: "+$.vr(a):"")+(b?"\nEnd Date: "+$.vr(b):"")}}},dataGrid:{enabled:!0,zIndex:0}});})($)}
