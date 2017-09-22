if(!_.cartesian){_.cartesian=1;(function($){var DI=function(a,b,c){var d=["whiskerWidth","hoverWhiskerWidth","selectWhiskerWidth"],e,f;2==c?(e=a.aa,f="selected"):1==c?(e=a.ba,f="hovered"):(e=a.o,f="normal");f=b.get(f);b=$.wo($.n(f)?f[d[0]]:void 0,b.get(d[c]),e.N(d[0]));null!=b||(b=a.o.N(d[0]));return $.L(b,a.jn)},EI=function(a){$.Lx.call(this,a)},FI=function(){$.Py.call(this);this.R="cartesian"},GI=function(){var a=new FI;a.ua(!0,$.nm("cartesian"));return a},HI=function(a){var b=new FI;b.ta.defaultSeriesType="area";b.R="area";b.ua(!0,$.nm("area"));
for(var c=0,d=arguments.length;c<d;c++)b.area(arguments[c]);return b},II=function(a){var b=new FI;b.ta.defaultSeriesType="bar";b.R="bar";b.ua(!0,$.nm("bar"));for(var c=0,d=arguments.length;c<d;c++)b.bar(arguments[c]);return b},JI=function(a){var b=new FI;b.ta.defaultSeriesType="box";b.R="box";b.ua(!0,$.nm("box"));for(var c=0,d=arguments.length;c<d;c++)b.box(arguments[c]);return b},KI=function(a){var b=new FI;b.ta.defaultSeriesType="column";b.R="column";b.ua(!0,$.nm("column"));for(var c=0,d=arguments.length;c<
d;c++)b.column(arguments[c]);return b},LI=function(a){var b=new FI;b.ta.defaultSeriesType="hilo";b.R="hilo";b.ua(!0,$.nm("column"));for(var c=0,d=arguments.length;c<d;c++)b.hilo(arguments[c]);return b},MI=function(a){var b=new FI;b.ta.defaultSeriesType="candlestick";b.R="financial";b.ua(!0,$.nm("financial"));for(var c=0,d=arguments.length;c<d;c++)b.candlestick(arguments[c]);return b},NI=function(a){var b=new FI;b.ta.defaultSeriesType="line";b.R="line";b.ua(!0,$.nm("line"));for(var c=0,d=arguments.length;c<
d;c++)b.line(arguments[c]);return b},OI=function(a){var b=new FI;b.ta.defaultSeriesType="area";b.R="vertical-area";b.ua(!0,$.nm("verticalArea"));for(var c=0,d=arguments.length;c<d;c++)b.area(arguments[c]);return b},PI=function(a){var b=new FI;b.ta.defaultSeriesType="line";b.R="vertical-line";b.ua(!0,$.nm("verticalLine"));for(var c=0,d=arguments.length;c<d;c++)b.line(arguments[c]);return b};$.xx.prototype.Pv=$.ea(7,function(){return this.F.length});$.xx.prototype.Nv=$.ea(6,function(){return this.B.length});
$.QI={name:"whisker",vc:"path",Hc:null,Jc:"whiskerStroke",Cc:!0,lc:!1,zIndex:2E-6};$.RI={name:"stem",vc:"path",Hc:null,Jc:"stemStroke",Cc:!0,lc:!1,zIndex:2E-6};$.SI={name:"median",vc:"path",Hc:null,Jc:"medianStroke",Cc:!0,lc:!1,zIndex:2E-6};$.G(EI,$.Lx);$.bC[3]=EI;$.g=EI.prototype;$.g.type=3;$.g.Te=263936;$.g.df={path:"path",hatchFill:"path",median:"path",stem:"path",whisker:"path"};$.g.jk=["lowest","q1","median","q3","highest"];
$.g.Je=function(a,b){var c=this.sc.Dc(b),d=a.G("x"),e=a.G("lowest"),f=a.G("q1"),h=a.G("median"),k=a.G("q3"),l=a.G("highest"),m=DI(this.ga,a,b)/2,p=this.o/2,q=c.path;$.Jx(q,this.b,d-p,f);$.Kx(q,this.b,d+p,f,d+p,k,d-p,k);q.close();q=c.hatchFill;$.Jx(q,this.b,d-p,f);$.Kx(q,this.b,d+p,f,d+p,k,d-p,k);q.close();q=c.median;$.Jx(q,this.b,d-p,h);$.Kx(q,this.b,d+p,h);q=c.stem;$.Jx(q,this.b,d,e);$.Kx(q,this.b,d,f);$.Jx(q,this.b,d,k);$.Kx(q,this.b,d,l);q=c.whisker;$.Jx(q,this.b,d-m,e);$.Kx(q,this.b,d+m,e);$.Jx(q,
this.b,d-m,l);$.Kx(q,this.b,d+m,l)};$.g.Gw=function(a,b){var c=a.G("shapes");if(c){var d=a.G("x"),e=a.G("lowest"),f=a.G("highest"),h=DI(this.ga,a,b)/2,c=c.whisker;c.clear();$.Jx(c,this.b,d-h,e);$.Kx(c,this.b,d+h,e);$.Jx(c,this.b,d-h,f);$.Kx(c,this.b,d+h,f)}};$.G(FI,$.Py);var TI={},UI=$.my|7864320;TI.area={ob:1,vb:1,wb:[$.vC,$.wC,$.xC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI.bar={ob:6,vb:2,wb:[$.KC,$.xC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI.box={ob:3,vb:2,wb:[$.KC,$.xC,$.SI,$.RI,$.QI],ub:null,qb:null,nb:UI,jb:"highest",ib:"lowest"};TI.bubble={ob:4,vb:2,wb:[$.yC,$.zC,$.AC,$.BC],ub:null,qb:null,nb:UI,jb:"value",ib:"value"};TI.candlestick={ob:5,vb:2,wb:[$.CC,$.EC,$.FC,$.HC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};
TI.column={ob:6,vb:2,wb:[$.KC,$.xC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI["jump-line"]={ob:19,vb:2,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"value",ib:"value"};TI.line={ob:8,vb:1,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"value",ib:"value"};TI.marker={ob:9,vb:2,wb:[$.KC,$.xC],ub:null,qb:null,nb:$.my|3670016,jb:"value",ib:"value"};TI.ohlc={ob:10,vb:2,wb:[$.DC,$.GC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};TI["range-area"]={ob:11,vb:1,wb:[$.vC,$.JC,$.IC,$.xC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};
TI["range-bar"]={ob:12,vb:2,wb:[$.KC,$.xC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};TI["range-column"]={ob:12,vb:2,wb:[$.KC,$.xC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};TI["range-spline-area"]={ob:13,vb:1,wb:[$.vC,$.IC,$.JC,$.xC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};TI["range-step-area"]={ob:14,vb:1,wb:[$.vC,$.IC,$.JC,$.xC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};TI.spline={ob:15,vb:1,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"value",ib:"value"};
TI["spline-area"]={ob:16,vb:1,wb:[$.vC,$.wC,$.xC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI["step-area"]={ob:17,vb:1,wb:[$.vC,$.wC,$.xC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI["step-line"]={ob:18,vb:1,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"value",ib:"value"};TI.stick={ob:20,vb:2,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"value",ib:"zero"};TI.hilo={ob:31,vb:2,wb:[$.wC],ub:null,qb:null,nb:UI,jb:"high",ib:"low"};FI.prototype.wg=TI;$.Aw(FI,FI.prototype.wg);
FI.prototype.pE=function(a){var b=a.enabled(),c=a.ea||[],d=!0;(a=a.data()?a.data().Hb():0)&&a!=c.length||(d=!1);return b&&d};$.bp.cartesian=GI;var VI=FI.prototype;$.F("anychart.cartesian",GI);VI.xScale=VI.Oa;VI.yScale=VI.cb;VI.crosshair=VI.Po;VI.maxBubbleSize=VI.bw;VI.minBubbleSize=VI.fw;VI.xGrid=VI.vs;VI.yGrid=VI.ws;VI.xMinorGrid=VI.Ou;VI.yMinorGrid=VI.Pu;VI.xAxis=VI.Eq;VI.getXAxesCount=VI.Nv;VI.yAxis=VI.Qo;VI.getYAxesCount=VI.Pv;VI.getSeries=VI.ie;VI.lineMarker=VI.ss;VI.rangeMarker=VI.ts;
VI.textMarker=VI.us;VI.palette=VI.Qk;VI.markerPalette=VI.Di;VI.hatchFillPalette=VI.Ml;VI.getType=VI.Ua;VI.addSeries=VI.Qj;VI.getSeriesAt=VI.Yi;VI.getSeriesCount=VI.Fq;VI.removeSeries=VI.To;VI.removeSeriesAt=VI.Uo;VI.removeAllSeries=VI.So;VI.getPlotBounds=VI.Me;VI.xZoom=VI.yi;VI.xScroller=VI.Pk;VI.getStat=VI.$e;VI.annotations=VI.Am;VI.getXScales=VI.jr;VI.getYScales=VI.kr;$.bp.area=HI;$.bp.bar=II;$.bp.box=JI;$.bp.column=KI;$.bp.hilo=LI;$.bp.financial=MI;$.bp.line=NI;$.bp["vertical-area"]=OI;$.bp["vertical-line"]=PI;$.F("anychart.area",HI);$.F("anychart.bar",II);$.F("anychart.vertical",II);$.F("anychart.box",JI);$.F("anychart.column",KI);$.F("anychart.hilo",LI);$.F("anychart.financial",MI);$.F("anychart.line",NI);$.F("anychart.verticalArea",OI);$.F("anychart.verticalLine",PI);}).call(this,$)}
