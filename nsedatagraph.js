let data=
[
 {
   "Date": "1999-01-29",
   "TRI": 728
 },
 {
   "Date": "1999-02-27",
   "TRI": 743
 },
 {
   "Date": "1999-03-31",
   "TRI": 821.18
 },
 {
   "Date": "1999-04-30",
   "TRI": 737.22
 },
 {
   "Date": "1999-05-31",
   "TRI": 839.73
 },
 {
   "Date": "1999-06-30",
   "TRI": 880.76
 },
 {
   "Date": "1999-07-30",
   "TRI": 990
 },
 {
   "Date": "1999-08-31",
   "TRI": 1096.6
 },
 {
   "Date": "1999-09-30",
   "TRI": 1125.04
 },
 {
   "Date": "1999-10-29",
   "TRI": 1067
 },
 {
   "Date": "1999-11-30",
   "TRI": 1140.74
 },
 {
   "Date": "1999-12-30",
   "TRI": 1323
 },
 {
   "Date": "2000-01-31",
   "TRI": 1445.58
 },
 {
   "Date": "2000-02-29",
   "TRI": 1633.13
 },
 {
   "Date": "2000-03-31",
   "TRI": 1455.31
 },
 {
   "Date": "2000-04-27",
   "TRI": 1202
 },
 {
   "Date": "2000-05-31",
   "TRI": 1070.44
 },
 {
   "Date": "2000-06-30",
   "TRI": 1188.6
 },
 {
   "Date": "2000-07-31",
   "TRI": 1062.99
 },
 {
   "Date": "2000-08-31",
   "TRI": 1137.78
 },
  {
   "Date": "2000-09-27",
   "TRI": 1026.6
 },
 {
   "Date": "2000-10-31",
   "TRI": 944.2
 },
 {
   "Date": "2000-11-30",
   "TRI": 1021.84
 },
  {
   "Date": "2000-12-29",
   "TRI": 1001
 },
 {
   "Date": "2001-01-31",
   "TRI": 1088.81
 },
 {
   "Date": "2001-02-28",
   "TRI": 1054.84
 },
   {
   "Date": "2001-03-29",
   "TRI": 836
 },
 {
   "Date": "2001-04-30",
   "TRI": 829.03
 },
 {
   "Date": "2001-05-31",
   "TRI": 882.28
 },
   {
   "Date": "2001-06-29",
   "TRI": 811
 },
 {
   "Date": "2001-07-31",
   "TRI": 782.01
 },
 {
   "Date": "2001-08-31",
   "TRI": 769.77
 },
  {
   "Date": "2001-09-29",
   "TRI": 661
 }, 
 {
   "Date": "2001-10-31",
   "TRI": 705.45
 },
  {
   "Date": "2001-11-29",
   "TRI": 720
 }, 
 {
   "Date": "2001-12-31",
   "TRI": 745
 }  
]


let margin = {top: 20, bottom: 55, left:20, right: 20}
let width = 500;
let height = 500;
let months = d3.timeFormat('%b');
let years = d3.timeFormat('%Y');
let previousVal = 600;

data.forEach(function (d,i){
  d.change = (Math.ceil(100*(d.TRI-previousVal)/previousVal));
  previousVal = d.TRI;
});

let div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const svg = d3.select(".chart")
              .append("svg")
              .attr("width",width+margin.left+margin.right)
              .attr("height",height+margin.top+margin.bottom)
              .append("g")
              .attr("transform", "translate("+55+","+margin.right+")");

let assignCol = function (val){
  if(val>0) return "class='green'";
  else return "class='red'";
}

let xAxis = d3.scaleBand()
.range([0, width])
//.domain(d3.extent(data,function (d) {return years(new Date(d.Date));}))
.domain(data.map((d)=> {return years(new Date(d.Date));}))
.padding(0.01);

svg.append("g")
  .attr("transform", "translate(0," + (height - 75) + ")")
  .call(d3.axisBottom(xAxis));

let yAxis = d3.scaleBand()
 .range([(height-75),(margin.top)])
 .domain(data.map((d) => {return months(new Date(d.Date));}))
  .padding(0.01);

svg.append("g")
  .attr("transform", "translate(" + 0 + ","+ margin.left + ")")
  .call(d3.axisLeft(yAxis));

let extent = d3.extent(data.map((d)=>d.change));

/*
let heatColor = d3.scaleLinear()
                 .domain(extent)
                 .range(["Red", "#69b3a2"]);
*/
let heatColor = d3.scaleDiverging()
              .range(["red", "white", "green"])
              .domain([extent[0],0,extent[1]]);
              //.interpolator();

svg.selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x",function (d) {return xAxis(years(new Date(d.Date)));})
    .attr("y",function (d) {return yAxis(months(new Date(d.Date)));})
    .attr("width", xAxis.bandwidth() )
    .attr("height", yAxis.bandwidth() )
    .style("fill", function(d) { return heatColor(d.change)})
       .on('mouseover',function (event, d) {
        div.attr('Month', months(new Date(d.Date)));
        div.style('opacity', 0.9)
        .html ('Month: ' + months(new Date(d.Date))+' <br>'+ "<p "+assignCol(d.change)+">Change: <b>"+d.change+"%</p></b>")
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
      })
        .on('mouseout',function(event,d){div.style('opacity',0)});

