
import $ from 'jquery';

$(() => {

var d3 = require('d3v4');


var donut = donutChart()
    .width(1470)
    .height(590)
    .cornerRadius(0) // sets how rounded the corners are on each slice
    .padAngle(0) // effectively dictates the gap between slices
    .category('Species');



    var data1 = [
        { Species: "COMPANY RESERVE", Error: "0.4", Color: "#ffa96a", InColor: "#ffb177", Percentage: "0.3495" },
        { Species: "TOKEN SALE", Error: "0.3", Color: "#3a6fe4", InColor: "#4c7ce6", Percentage: "0.4" },
        { Species: "CREATORS FUND", Error: "0.1", Color: "#e9fdfc", InColor: "#ebfdfc", Percentage: "0.1" },
        { Species: "CORE TEAM",  Error: "0.095", Color: "#7e7e7e", InColor: "#8a8a8a", Percentage: "0.0805" },
        { Species: "ADVISORY BORAD", Error: "0.085", Color: "#abaeb0", InColor: "#b3b5b7", Percentage: "0.05" },
        { Species: "BOUNTY-FINDERS FEE PROGRAM", Error: "0.02", Color: "#464648", InColor: "#575759", Percentage:"0.02" }
    ];


   
    d3.select('#chart1')
            .datum(data1) // bind data to the div
            .call(donut); // draw chart in div


            function donutChart() {
                var width,
                    height,
                    margin = {top: 10, right: 10, bottom: 10, left: 10},
                    colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
                    category, // compare data by
                    padAngle, // effectively dictates the gap between slices
                    floatFormat = d3.format('.4r'),
                    cornerRadius, // sets how rounded the corners are on each slice
                    percentFormat = d3.format(',.2%');
            
                function chart(selection){

                    
                    
                    selection.each(function(data) {
                        
                            if(window.innerWidth < 500){
                                width=600;
                                height=340;
                            }
                        

                        
                        // ===========================================================================================
                        // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
                        var radius = Math.min(width, height) / 2;
                       
                        // creates a new pie generator
                        var pie = d3.pie()
                            .value(function(d) {

                                 return floatFormat(d["Error"]); 
                                })
                            .sort(null);
            
                        // contructs and arc generator. This will be used for the donut. The difference between outer and inner
                        // radius will dictate the thickness of the donut
                        var arc = d3.arc()
                            .outerRadius(radius*0.8)
                            .innerRadius(radius*0.59)
                            .cornerRadius(cornerRadius)
                            .padAngle(padAngle);
                            

                        
                        var arcIn = d3.arc()
                            .outerRadius(radius*0.61)
                            .innerRadius(radius*0.5)
                            .cornerRadius(cornerRadius)
                            .padAngle(padAngle);
                            
  
            
            
                        // this arc is used for aligning the text labels
                        var outerArc = d3.arc()
                            .outerRadius(radius * 0.9)
                            .innerRadius(radius * 0.9);
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // append the svg object to the selection
                        var svg = selection.append('svg')
                            .attr('width', '100%')
                            .attr('height', '100%')
                            .attr('viewBox', (-width / 2) + ' ' + (-height / 2-40) + ' ' + width + ' ' + (height+80))
                            .attr('preserveAspectRatio', 'xMinYMin');
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // g elements to keep elements within svg modular
                        svg.append('g').attr('class', 'slicesToken');
                        svg.append('g').attr('class', 'slicesInToken');
                        svg.append('g').attr('class', 'labelNameToken');
                        svg.append('g').attr('class', 'labelPercent');
                        svg.append('g').attr('class', 'lines');
                        svg.append('g').attr('class', 'dots');
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // add and colour the donut slices
                        var path = svg.select('.slicesToken')
                            .datum(data).selectAll('path')
                            .data(pie)
                            .enter().append('path')
                            .attr('fill', function(d) {
        
                                return d.data["Color"];    
                             })
                            .attr('d', arc);
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // add and colour the donut slices
                        var path = svg.select('.slicesInToken')
                            .datum(data).selectAll('path')
                            .data(pie)
                            .enter().append('path')
                            .attr('fill', function(d) {
                    
                                return d.data["InColor"];
                                
                             })
                            .attr('d', arcIn);
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // add text labels
                        var label = svg.select('.labelNameToken').selectAll('text')
                            .data(pie)
                            .enter().append('text')
                            .attr('dy', '-1.7em')
                            .html(function(d) {
                                // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                                return d.data[category];
                            })
                            .attr('transform', function(d) {
            
                                // effectively computes the centre of the slice.
                                // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                                if(midAngle(d)>6.1){
                                    var pos = outerArc.centroid(d);
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
            
                                    return 'translate(' + pos + ')';
                                }else{
                                    var pos = arc.centroid(d)
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
                        
                                    return 'translate(' + pos + ')';
                                }
            
                            })
                            .style('text-anchor', function(d) {
                                // if slice centre is on the left, anchor text to start, otherwise anchor to end
                                return (midAngle(d)) > Math.PI ? 'start' : 'end';
                            });
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // add Percent labels
                        var label = svg.select('.labelPercent').selectAll('text')
                            .data(pie)
                            .enter().append('text')
                            .attr('dy', '-.5em')
                            .html(function(d) {
                                // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                                return  '<tspan>' + percentFormat(d.data["Percentage"]) + '</tspan>';
                            })
                            .attr('transform', function(d) {
            
                                // effectively computes the centre of the slice.
                                // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                                if(midAngle(d)>6.1){
                                    var pos = outerArc.centroid(d);
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
                    
                                    return 'translate(' + pos + ')';
                                }else{
                                    var pos = arc.centroid(d)
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
                                   
                                    return 'translate(' + pos + ')';
                                }
            
                            })
                            .style('text-anchor', function(d) {
                                // if slice centre is on the left, anchor text to start, otherwise anchor to end
                                return (midAngle(d)) > Math.PI ? 'start' : 'end';
                            });
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // add and colour the donut dots
                        var dot = svg.select('.dots')
                            .selectAll('circle')
                            .data(pie)
                            .enter().append('circle')
                            .attr('r', 3)
                            .attr('fill', '#878787')
                            .attr('transform', function(d){
                                return 'translate(' + arc.centroid(d) + ')'; 
                            });
                        // ===========================================================================================    
            
                        // ===========================================================================================
                        // add and colour the donut title
                        
                        // ===========================================================================================    
            
                        // ===========================================================================================
                        // add lines connecting labels to slice. A polyline creates straight lines connecting several points
                        var polyline = svg.select('.lines')
                            .selectAll('polyline')
                            .data(pie)
                            .enter().append('polyline')
                            .attr('points', function(d) {
            
                                if(midAngle(d)>6.1){
                                    var pos = outerArc.centroid(d);
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
            
                                    return [arc.centroid(d), outerArc.centroid(d), pos]
                                }else{
                                    var pos = arc.centroid(d)
                                    pos[0] = radius * 2 * (midAngle(d) < Math.PI ? 1 : -1);
                                 
                                    return [arc.centroid(d), pos]
                                }
                                // see label transform function for explanations of these three lines.
                            });
                        // ===========================================================================================
            
                        svg.append('text')
                                    .attr('class', 'centerTitle1')
                                    .attr('dy', -20)
                                    .html("Token")
                                    .style('fill', "#fff")
                                    .style('text-anchor', 'middle');
                        svg.append('text')
                                    .attr('class', 'centerTitle1')
                                    .attr('dy', 20)
                                    .html("Allocation")
                                    .style('fill', "#fff")
                                    .style('text-anchor', 'middle');
            
                        // ===========================================================================================
                        // add tooltip to mouse events on slices and labels
                        d3.selectAll('.labelNameToken text, .slicesToken path, .lines polyline, .dots circle, .slicesInToken path').call(toolTip);
                        // ===========================================================================================
            
                        // ===========================================================================================
                        // Functions
            
                        // calculates the angle for the middle of a slice
                        function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
            
                        // function that creates and adds the tool tip to a selected element
                        function toolTip(selection) {
                            
                            // add tooltip (svg circle element) when mouse enters label or slice
                            selection.on('mouseenter', function (data) {
                                d3.selectAll('.centerTitle1').remove();
                               
                                
            
                                svg.append('circle')
                                    .attr('class', 'toolTipCircle')
                                    .attr('r', radius * 0.45) // radius of tooltip circle
                                    .style('fill', data.data["Color"]) // colour based on category mouse is over
                                    .style('fill-opacity', 0.9);

                                svg.append('text')
                                    .attr('class', 'toolTipCircle')
                                    .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                                    .html(toolTipHTML(data)) // add text to the circle.
                                    .style('fill', '#000')
                                    .style('text-anchor', 'middle'); // centres text in tooltip
            
                            });
            
                            // remove the tooltip when mouse leaves the slice/label
                            selection.on('mouseout', function () {
                                d3.selectAll('.toolTipCircle').remove();
                                svg.append('text')
                                    .attr('class', 'centerTitle1')
                                    .attr('dy', -20)
                                    .html("Token")
                                    .style('fill', "#fff")
                                    .style('text-anchor', 'middle');

                                svg.append('text')
                                    .attr('class', 'centerTitle1')
                                    .attr('dy', 20)
                                    .html("Allocation")
                                    .style('fill', "#fff")
                                    .style('text-anchor', 'middle');
                            });
                        }
            
                        // function to create the HTML string for the tool tip. Loops through each key in data object
                        // and returns the html string key: value
                        function toolTipHTML(data) {
            
                            var tip = '';
            
                                // if value is a number, format it as a percentage
                                var value1 = (!isNaN(parseFloat(data.data["Species"]))) ? percentFormat(data.data["Species"]) : data.data["Species"];
                                var value2 = (!isNaN(parseFloat(data.data["Percentage"]))) ? percentFormat(data.data["Percentage"]) : data.data["Percentage"];
            
                                // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                                // tspan effectively imitates a line break.
                                if(value1==="BOUNTY-FINDERS FEE PROGRAM"){
                                    tip += '<tspan x="0" dy="-0.5em" class="first-Donuts-tooltip-label">BOUNTY-FINDERS FEE</tspan>';
                                    tip += '<tspan x="0" dy="1.2em" class="first-Donuts-tooltip-label">PROGRAM</tspan>';
                                    tip += '<tspan x="0" dy="1.2em" class="first-Donuts-tooltip-percentage" style="font-size:18px;">' + value2 + '</tspan>';
                                }else{
                                    tip += '<tspan x="0" dy=0em class="first-Donuts-tooltip-label">' + value1 + '</tspan>';
                                    tip += '<tspan x="0" dy="1.2em" class="first-Donuts-tooltip-percentage">' + value2 + '</tspan>';
                                }
                               

                            return tip;
                        }
                        // ===========================================================================================
            
                    });
                }
            
                // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
                chart.width = function(value) {
                    if (!arguments.length) return width;
                    width = value;
                    return chart;
                };
            
                chart.height = function(value) {
                    if (!arguments.length) return height;
                    height = value;
                    return chart;
                };
            
                chart.margin = function(value) {
                    if (!arguments.length) return margin;
                    margin = value;
                    return chart;
                };
            
                chart.radius = function(value) {
                    if (!arguments.length) return radius;
                    radius = value;
                    return chart;
                };
            
                chart.padAngle = function(value) {
                    if (!arguments.length) return padAngle;
                    padAngle = value;
                    return chart;
                };
            
                chart.cornerRadius = function(value) {
                    if (!arguments.length) return cornerRadius;
                    cornerRadius = value;
                    return chart;
                };
            
                chart.colour = function(value) {
                    if (!arguments.length) return colour;
                    colour = value;
                    return chart;
                };
            
            
                chart.category = function(value) {
                    if (!arguments.length) return category;
                    category = value;
                    return chart;
                };
            
                return chart;
            }
            

});