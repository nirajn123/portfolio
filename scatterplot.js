import * as d3 from "https://cdnjs.cloudflare.com/ajax/libs/d3/7.0.4/d3.min.js";
import * from "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
let width = 800;
let height = 450;
let radius = 5;
const padding = 20;
let timeFormat = d3.timeFormat('%M:%S');
// Define the div for the tooltip
let div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

const svg = d3.select(".chart")
              .append("svg")
              .attr("width",width)
              .attr("height",height);

let checkDop = function (input){
      if (input !=="") return "#bd162c";
      else return "#30B700";
};
/*
let changeDateFormat = function (input){
    let secs = input;
    let abc= new Date('2001-01-01T01:24:04');//+input.Seconds);
    //console.log(secs);
    return abc;
}
*/
const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

d3.json(
    data_url
  )
    .then((data) => {
      
      //const nDate = data.map((item)=>changeDateFormat(item.Seconds/60).toFixed(2));
      //let sec = changeDateFormat();
      const xArr = data.map((item)=>item.Year);
      let xScale = d3.scaleLinear()
      .domain([d3.min(xArr)-1,d3.max(xArr)])
      .range([50, width-100]);

      const yArr = data.map((item)=>(item.Seconds/60).toFixed(2));
      let yScale = d3.scaleLinear()
        .domain([(parseFloat(d3.max(yArr))+0.1),(parseFloat(d3.min(yArr)))-0.2])
      .range([height-50,70]);
   
  
      svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", (d,i) =>xScale(d.Year))
       .attr("cy", (d,i) =>yScale(d.Seconds/60))
       .attr("r", radius)
       .attr("fill",(d,i) => checkDop(d.Doping))
       .attr("class","dot")
       .attr("data-xvalue",(d)=>parseInt(d.Year))
       .attr("data-yvalue",(d)=>Date(d.Seconds))     
       .on('mouseover',function (event, d) {
        div.style('opacity', 0.9)
        .html (d.Name + ": " + d.Seconds/60)
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
      })
       .on('mouseout', (event, d) => div.style('opacity', 0));
  
    
  const xAxis = d3.axisBottom(xScale);
  svg.append("g")
   .attr('class', 'x axis')
   .attr('id', 'x-axis')
   .attr("transform", "translate(0, " + (height-50) + ")")
   .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
   .attr('class', 'y axis')
   .attr('id', 'y-axis')
   .attr("transform", "translate("+(padding+30) +", 0 " + ")")
   .call(yAxis);
  
  svg.append("text")
        .attr("x",-200)
        .attr("y",10)
        .attr("style","font-size:.8rem")
        .text("Time in minutes")
        .attr('transform', 'rotate(-90)');
  
    svg.append("text")
        .attr("style","font-size:.8rem")
        .text("Year")
        .attr('transform', "translate(360, " + (height-10) + ")");
  

});
