if(!_.theme_cartesian){_.theme_cartesian=1;(function($){var IZ=function(){return $.wr(this.tickValue)},JZ=function(){return $.wr(this.x)};
$.xa($.y.anychart.themes.defaultTheme,{cartesian:{defaultSeriesType:"line",xAxes:[],yAxes:[]},area:{defaultSeriesType:"area",tooltip:{displayMode:"union"},interactivity:{hoverMode:"by-x"}},bar:{isVertical:!0,defaultSeriesType:"bar",defaultXAxisSettings:{orientation:"left"},defaultYAxisSettings:{orientation:"bottom"},scales:[{type:"ordinal",inverted:!0},{type:"linear",softMinimum:0}],tooltip:{displayMode:"single",position:"right-center",anchor:"left-center"},xScroller:{orientation:"left"}},column:{defaultSeriesType:"column",
tooltip:{displayMode:"single",position:"center-top",anchor:"center-bottom",offsetX:0,offsetY:10},scales:[{type:"ordinal"},{type:"linear",softMinimum:0}]},line:{defaultSeriesType:"line",tooltip:{displayMode:"union"},interactivity:{hoverMode:"by-x"}},box:{defaultSeriesType:"box"},financial:{defaultSeriesType:"candlestick",defaultSeriesSettings:{candlestick:{tooltip:{titleFormat:JZ},labels:{format:JZ}},ohlc:{tooltip:{titleFormat:JZ},labels:{format:JZ}}},xAxes:[{labels:{format:IZ},minorLabels:{format:IZ}}],
scales:[{type:"date-time"},{type:"linear"}]},verticalLine:{isVertical:!0,defaultSeriesType:"line",defaultXAxisSettings:{orientation:"left"},defaultYAxisSettings:{orientation:"bottom"},scales:[{type:"ordinal",inverted:!0},{type:"linear"}],tooltip:{displayMode:"union"},interactivity:{hoverMode:"by-x"},xScroller:{orientation:"left"}},verticalArea:{isVertical:!0,defaultSeriesType:"area",defaultXAxisSettings:{orientation:"left"},defaultYAxisSettings:{orientation:"bottom"},scales:[{type:"ordinal",inverted:!0},
{type:"linear"}],tooltip:{displayMode:"union"},interactivity:{hoverMode:"by-x"},xScroller:{orientation:"left"}}});})($)}
