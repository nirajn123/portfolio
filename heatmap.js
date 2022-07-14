let margin = {top: 20, bottom: 55, left:20, right: 20}
let height = 500;
let months = d3.timeFormat('%B');
let years = d3.timeFormat('%Y');
let data_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

//function is zero indexed - Jan is 0
let getMonth = function (num){
  const mon = new Date(0);
  mon.setUTCMonth(num);
  return months(mon);
}

d3.json(
    data_url
  )
    .then((data) => {
  
  const width = 5 * Math.ceil(data.monthlyVariance.length / 12);

  let div = d3
    .tip()
    .attr('class', 'tip')
    .attr('id', 'tooltip')
    .html(d=>d)
    .direction('n')
    .offset([-10, 0]);
  
  
  const svg = d3.select(".chart")
              .append("svg")
              .attr("width",width +margin.left+margin.right)
              .attr("height",height +margin.top+margin.bottom)
              .append("g")
              .attr("transform", "translate("+55+","+margin.right+")")
              .call(div);

  let monthArr = [...new Set(data.monthlyVariance.map(d => d.month))];
  monthArr = monthArr.map(d=> d-1).map((mon) => getMonth(mon));
  
  let yAxisScale = d3.scaleBand()
                   .domain(monthArr)
                   .range([margin.top,(height-margin.bottom)])
                   .padding(0);
  
 svg.append("g")
    .attr("transform", "translate(" + margin.left + ","+ 0 + ")")
    .attr("id","y-axis")
    .call(d3.axisLeft(yAxisScale));
 
  
  let xAxisScale = d3.scaleBand()
                   .domain(data.monthlyVariance.map(d => d.year))
                   .range([margin.left,width-margin.left])
                   .padding(0);
 
  const filtYear = xAxisScale.domain().filter(d => d%10===0);
  
  
  let xAxis = d3.axisBottom(xAxisScale)
  .tickValues(filtYear);
  
 svg.append("g")
    .attr("transform","translate(" + 0 + ","+ (height - margin.bottom) +")")
    .attr("id","x-axis")
   .call(xAxis);
  
  let extent = d3.extent(data.monthlyVariance.map(d => d.variance));
  let domainArr = [(extent[0]+9.8).toFixed(1), 8.6,(extent[1]+8.66).toFixed(1)];

  
  let heatColor = d3.scaleDiverging()
              .range(["blue", "white", "red"])
              .domain(domainArr);          
  //.domain([(extent[0]+8.66).toFixed(1),8.6,(extent[1]+8.66).toFixed(1)]);          
  
  svg.selectAll()
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("x",d=> xAxisScale(d.year))
    .attr("y",d=> yAxisScale(getMonth(d.month-1)))
     .attr("width",d=> xAxisScale.bandwidth())
     .attr("height",yAxisScale.bandwidth())
     .attr('data-month',d=> d.month-1)
    .attr('data-year', d=> d.year)
    .attr('data-temp', d=> 8.66 + d.variance)
    .attr('class','cell')
     .style("fill",d=> heatColor(Math.ceil(d.variance)+8.66))
    .on("mouseover",function (event,d){
            const temp = data.baseTemperature + d.variance;
            const details = "<p>" + getMonth(d.month-1) + " " + d.year + "</p><p>" + temp.toFixed(1)+ "℃</p><p>"+d.variance+"℃</p>";
            div.attr('data-year', d.year)
            div.show(details, this);
          })
    .on("mouseout",div.hide);

  const increment = ((domainArr[2]- domainArr[0])/6).toFixed(1);
  domainArr.pop();
  domainArr.pop();
  
  //add 5 elements in the legendArr between the first and last;
  for(let i=0;i<6;i++){
    const valueTot = parseFloat(increment)+parseFloat(domainArr[i]); 
    domainArr.splice(i+1,0,valueTot.toFixed(1));  
  } 
 console.log(domainArr);
  const legendWidth = 350;
  let legendScale = d3.scaleLinear()
                    .domain([Math.floor(domainArr[0]),Math.ceil(domainArr[6])+1.9])
                    .range([0, legendWidth]);
  
  let legendAxis = d3.axisBottom(legendScale)
  .tickFormat(d3.format('.1f'))
  .tickValues(domainArr);
  
  let leg = svg.append("g")
    .attr("transform","translate(" + margin.left + ","+ (height+20) +")")
    .attr("id","legend")
    .attr("width",legendWidth)
   .call(legendAxis);
  
  leg
    .append("g")
    .selectAll("rect")
    .data(domainArr)
    .enter()
    .append("rect")
    .attr("x",d=>legendScale(d))
    .attr("y",0)
    .attr("height",40)
    .attr("width",50)
    .style("fill",(d)=>heatColor(d))
    .attr('class','legrect')
    .attr("transform","translate( 0, " + (-40) + " )");
});
