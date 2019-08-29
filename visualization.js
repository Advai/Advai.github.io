// d3.slopegraph.js and label offsetting adapted from https://bl.ocks.org/borgar/67a2173ef40f08129201
$(function() {
  d3.csv('dataframe' +document.getElementById('college').value+ '.csv', make_multiline_chart);
      d3.csv('dataframe' +document.getElementById('college').value+ '.csv', ready);
  // d3.csv('dataframeBusiness.csv', ready);
  // d3.csv('dataframeBusiness.csv', make_multiline_chart);
  // ready(d3.csv('dataframeAces.csv'), "2016");
  
  // ready(data, "2016");
  // d3.csv('cleaned_Business_Majors.csv', parseRow, ready2 );
  //d3.csv('dataframeBusiness.csv', parseRow, ready1 );
  // d3.csv( 'cleaned_Engineering_Majors.csv', parseRow, ready3 );
});
function parseRow ( d) {
  // console.log(d);
    return { 'Fall': +d.Fall,
           'College': d.College,
           'Major_Name': d.Major_Name,
           'Total': +d.Total,
           'Female': +d.Female,
           'Male': +d.Male,
           'MFRatio': +d["M/F"],
           'Caucasian': +d.Caucasian,
           'Asian American': +d["Asian American"],
           'African American': +d["African American"],
            'Hispanic': +d.Hispanic,
            'Native American': +d["NativeAmerican"] }; 
};

function make_multiline_chart(data) {
  var dataGroup = d3.nest()
      .key(function(d) {return d.Major_Name;})
      .entries(data);
  // console.log(JSON.stringify(dataGroup));
  var color = d3.scale.category10();
  var WIDTH = 1500,
  HEIGHT = 500,
  MARGINS = {
      top: 50,
      right: 20,
      bottom: 50,
      left: 50
  };
  var vis = d3.select("#visualization").append("svg")
  .attr("width", WIDTH + MARGINS.left + MARGINS.right)
  .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
  .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")"),
      lSpace = WIDTH/dataGroup.length;
      xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
          return d.Fall;
      }), d3.max(data, function(d) {
          return d.Fall;
      })]),
      yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
          return +d["M/F"];
      }), d3.max(data, function(d) {
          return +d["M/F"] + 0.5;
      })]),
      xAxis = d3.svg.axis()
      .scale(xScale).ticks(38).tickFormat(function(d) {return d;}),
      yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left").tickSize(-WIDTH, 0, 0);

  vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
  vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function (d) {
       return "<strong>" + d + " Count: </strong>";
    });
    vis.call(tip);   
  var lineGen = d3.svg.line()
      .x(function(d) {
          return xScale(+d.Fall);
      })
      .y(function(d) {
          return yScale(+d["M/F"]);
      });
      // .interpolate("basis");
  dataGroup.forEach(function(d,i) {
      vis.append('svg:path')
      .attr('d', lineGen(d.values))
      .attr('stroke', function(d,j) { 
              return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
      .on("mouseover", function () {
        var major = d.key;
        var mfs = Object.values(d);
        // console.log(mfs);
        // console.log(mfs[1][0]["M/F"]);
        // console.log(d);
        var g = d3.select(this).style("opacity", 1); // The node
        var div = d3.select("#visualization").append("div")
                .attr('pointer-events', 'none')
                .attr("class", "tooltip")
                .style("opacity", 1)
                .html(major)
                .style("left", (d3.event.pageX + 25 + "px"))
                .style("top", (d3.event.pageY - 15 +"px"))
          })
                
      .on("mouseout", function () {
          d3.select(this).style("opacity", 0.2);
          d3.select("body").select('div.tooltip').remove();
          })
      // .on({"mouseover": function(d) { tip.show(d);}})
      .attr('stroke-width', 3)
      .attr('id', 'line_'+d["M/F"])
      .attr('fill', 'none')
      .style("opacity", "0.2");

    
      // vis.append("text")
      //     .attr("x", (lSpace/2)+i*lSpace)
      //     .attr("y", HEIGHT)
      //     .style("fill", "black")
      //     .attr("class","legend")
      //     .on('click',function(){
      //         var active   = d.active ? false : true;
      //         var opacity = active ? 0 : 1;
      //         d3.select("#line_" + d.key).style("opacity", opacity);
      //         d.active = active;
      //     })
      //     .text(d.Major_Name);
  // vis.append("text")
  // .attr("x", (lSpace / 2) + i * lSpace)
  // .attr("y", HEIGHT)
  // .style("fill", "black")
  // .attr("class", "legend")
  // .on('click', function() {
  //   // alert(d.key);
  //   var active   = d.active ? false : true;
  //             var opacity = active ? 0 : 1;
  //             d3.select("#line_" + d.key).style("opacity", opacity);
  //             d.active = active;
  // })
  // .text(d.key);
  });
  var select = d3.select('#year');
  select.on('change', function() {
      // console.log(this.value);
      d3.selectAll("svg").remove();
      d3.csv('dataframe' +document.getElementById('college').value+ '.csv', make_multiline_chart);
      d3.csv('dataframe' +document.getElementById('college').value+ '.csv', ready);
  });
  
  var college = d3.select('#college');
  college.on('change', function() {
      // console.log(this.value);
      d3.selectAll("svg").remove();
      d3.csv('dataframe' +document.getElementById('college').value+ '.csv', make_multiline_chart);
      d3.csv('dataframe' +document.getElementById('college').value+ '.csv', ready);
  });         
                };



function ready(data) {
  var t = d3.transition()
  .duration(1500);
  var xData = ['Caucasian', 'Asian American', 'African American', 'Hispanic', 'Native American'];
  var margin = {top: 20, right: 160, bottom: 150, left: 30};

var width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// Transpose the data into layers
var dataset = d3.layout.stack()(['Caucasian', 'Asian American', 'African American', 'Hispanic', 'Native American'].map(function(r) {
  return data.map(function(d) {
    // console.log(d);
    return {x: d.Major_Name, y: +d[r], year: +d.Fall, college: d.College, race: r, total: +(+d['Caucasian'] + +d['Asian American'] + +d['African American'] + +d['Hispanic'] + +d['Native American'])};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([0, width], 0.5);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { if(d.year == document.getElementById('year').value && d.college == document.getElementById('college').value) {
    return d.y0 + d.y + 100;
  } else {
    return 0;
  } });  })])
  .range([height, 0]);

var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#ff0292"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom").tickFormat(function(d) {return d;});
svg.append("g")
  .attr("class", "y axis").transition(t)
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")").transition(t)
  .call(xAxis).selectAll("text")	
  .style("text-anchor", "end")
  .attr("dx", "-.55em")
  .attr("dy", ".05em")
  .attr("transform", function(d) {
      return "rotate(-65)" 
      });

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.race + " Count: </strong>" + d.y +"<br><strong>Total: " + d.total+"<br><strong>Percentage of major: " + (d.y / d.total * 100).toFixed(2);
  });
//   d3.selectAll("g.stack").call(tip);
// d3.selectAll("g.stack").on('mouseover', tip.show)
//   .on('mouseout', tip.hide);
  svg.call(tip)

// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .style("opacity", "0.3")
  .filter(function(d) { return d.year == document.getElementById('year').value && d.college == document.getElementById('college').value; })
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y) ; })
  .attr("width", x.rangeBand())
  .on("mouseout", function() { tip.hide(this); d3.select(this).style("opacity", 0.3)})
  .on("mouseover", function(d) {
    tip.show(d, this);
    d3.select(this).style("opacity", 1);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Native American";
      case 1: return "Hispanic";
      case 2: return "African American";
      case 3: return "Asian American";
      case 4: return "Caucasian";
    }
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 500)
  .attr("height", 500)
  .attr("fill", "black")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 50)
  .attr("y", 50)
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .attr("font-size", "100px")
  .attr("font-weight", "bold");

  var select = d3.select('#year');
select.on('change', function() {
    // console.log(this.value);
    d3.selectAll("svg").remove();
    d3.csv('dataframe' +document.getElementById('college').value+ '.csv', make_multiline_chart);
    d3.csv('dataframe' +document.getElementById('college').value+ '.csv', ready);
});

var college = d3.select('#college');
college.on('change', function() {
    // console.log(this.value);
    d3.selectAll("svg").remove();
    d3.csv('dataframe' +document.getElementById('college').value+ '.csv', make_multiline_chart);
    d3.csv('dataframe' +document.getElementById('college').value+ '.csv', ready);
});
//   var margin = {top: 20, right: 50, bottom: 30, left: 50},
//         width = 2000 - margin.left - margin.right,
//         height = 1000 - margin.top - margin.bottom;

// var x = d3.scale.ordinal()
//         .rangeRoundBands([0, width], .25);

// var y = d3.scale.linear()
//         .rangeRound([height, 0]);
// var color = d3.scale.category20();

// var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom");

// var svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// var dataIntermediate = xData.map(function (c) {
//   var map =  data.map(function (d) {
//     // console.log(d['Major_Name']);
//     // console.log(c);
//     // console.log(d[c]);
//     return {x: d.Major_Name, y: +d[c]};
//   });
//   console.log(map);
//   return map;
// });

// var dataStackLayout = d3.layout.stack()(dataIntermediate);

// x.domain(dataStackLayout[0].map(function (d) {
//   return d.x;
// }));

// y.domain([0,
//   d3.max(dataStackLayout[dataStackLayout.length - 1],
//           function (d) { return d.y0 + d.y;})
//   ])
// .nice();

// var layer = svg.selectAll(".stack")
//         .data(dataStackLayout)
//         .enter().append("g")
//         .attr("class", "stack")
//         .style("fill", function (d, i) {
//             return color(i);
//         });

// layer.selectAll("rect")
//         .data(function (d) {
//             return d;
//         })
//         .enter().append("rect")
//         .attr("x", function (d) {
//             return x(d.x);
//         })
//         .attr("y", function (d) {
//             return y(d.y + d.y0);
//         })
//         .attr("height", function (d) {
//             return y(d.y0) - y(d.y + d.y0);
//         })
//         .attr("width", x.rangeBand());

// svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//         // .selectAll("text").attr("y", 0).attr("x", 0).attr("dy", ".35em").attr("transform", "rotate(90)").style("text-anchor", "start");

};
// function ready ( data ) {

//   var margin = { top: 70, right: 0, bottom: 40, left: 0 },
//       width = 425 - margin.left - margin.right,
//       height = 780 - margin.top - margin.bottom,

//       y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
//       x_dom  = d3.extent( data, d => d.Fall )

//       y = d3.scale.linear()
//           .domain( y_dom )
//           .range([ 0, height ]),
//       x = d3.scale.linear()
//           .domain( x_dom )
//           .range([ 190, 370 ]),

//       layout = d3.layout.slopegraph()( data )
//           .j( 'Major_Name' ).y( 'MFRatio' ).x( 'Fall' )
//           .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

//       textAlign = m => {
//         return (d, i) => i ? 'start' : 'end';
//       },
//       textMargin = m => {
//         return (d, i) => i ? m * 1 : m * -1;
//       };
//   var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .tickValues([1, 2, 3, 4]);
//   var tip = d3.tip()
//     .attr('class', 'd3-tip')
//     .html(function (d) {
//      return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
//   });


//   var svg = d3.select( '#chart' ).append( 'svg' )
//       .attr( 'width', width + margin.left + margin.right )
//       .attr( 'height', height + margin.top + margin.bottom )
//     .append( 'g' )
//       .attr( 'transform', `translate(${margin.left},${margin.top})` )
//       .attr('fill', '#4b33ff');

//   // svg.append("g")
//   // .call(yAxis);
//     //   var xAxis = d3.axisTop()
//     // .scale(y)
//     // .tickValues( [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] );

// // d3.selectAll("g.stack").call(tip);
// // d3.selectAll("g.stack").on('mouseover', tip.show)
// //   .on('mouseout', tip.hide);
//   svg.call(tip)

//   svg.append( 'g' )
//       .attr( 'class', 'years' )
//       .selectAll( 'text' ).data( x_dom ).enter()
//     .append( 'text' )
//       .attr( 'x', x )
//       .attr( 'dx', (d, i) => i ? 10 : -10 )
//       .attr( 'y', height + 40 )
//       .style( 'text-anchor', textAlign() )
//       .text( String );

//   svg.append('g')
//       .call(yAxis)
//     .append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', 100)
//       .attr('dy', '2.71em')
//       .style('text-anchor', 'end')
//       .text("M / F Ratio");

//   var line = d3.svg.line()
//       .x( d => x( d.Fall ) )
//       .y( d => y( d.y ) );

//   var pairs = svg.append( 'g' )
//       .attr( 'class', 'lines' )
//       .selectAll( 'g' )
//       .data( layout.pairs() ).enter()
//     .append( 'g' );


//   pairs.selectAll( '.MFRatio' )
//       .data( d => d ).enter()
//       .append( 'text' )
//       .attr( 'class', 'MFRatio' )
//       .attr( 'x', d => x( d.Fall ) )
//       .attr( 'dy', '.32em' )
//       .attr( 'dx', textMargin( 10 ) )
//       .attr( 'y', d => y( d.y ) )
//       .style( 'text-anchor', textAlign() )
//       .text( d => parseFloat(d.MFRatio).toFixed( 2 ) )
//       .on('mouseover', tip.show)
//       .attr('fill', 'black')
//       .on('mouseout', tip.hide);

//   pairs.append( 'path' )
//       .attr( 'd', line );
//   svg.append( 'g' )
//       .attr( 'class', 'desc' )
//       .selectAll( 'text' )
//       .data([ 'ACES'
//             ]).enter()
//     .append( 'text' )
//       .attr( 'y', (d,i) => i * 20 )
//       .attr( 'dy', '-1em' )
//       .attr( 'x', 250 )
//       .text( String );

// };

function ready1( data ) {
  // data = data.filter(function(d) {
  //   return d.Fall == 2018 || d.Fall == 2004;
  // })
  // console.log(data)

var margin = { top: 70, right: 0, bottom: 40, left: 0 },
    width = 425 - margin.left - margin.right,
    height = 780 - margin.top - margin.bottom,

    y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
    x_dom  = d3.extent( data, d => d.Fall )
    // x_dom = [1980, 2018];

    y = d3.scale.linear()
        .domain( y_dom )
        .range([ 0, height ]),
    x = d3.scale.linear()
        .domain( x_dom )
        .range([ 190, 370 ]),

    layout = d3.layout.slopegraph()( data )
        .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
        .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

    textAlign = m => {
      return (d, i) => i ? 'start' : 'end';
    },
    textMargin = m => {
      return (d, i) => i ? m * 1 : m * -1;
    };
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickValues([1, 2, 3, 4]);
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
     return "<strong>" + d.Major_Name + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
  });


var svg = d3.select( '#chart' ).append( 'svg' )
    .attr( 'width', width + margin.left + margin.right )
    .attr( 'height', height + margin.top + margin.bottom )
  .append( 'g' )
  .attr('fill', '#4b33ff')
    .attr( 'transform', `translate(${margin.left},${margin.top})` );
svg.call(tip)

svg.append( 'g' )
    .attr( 'class', 'years' )
    .selectAll( 'text' ).data( x_dom ).enter()
  .append( 'text' )
    .attr( 'x', x )
    .attr( 'dx', (d, i) => i ? 10 : -10 )
    .attr( 'y', height + 40 )
    .style( 'text-anchor', textAlign() )
    .text( String );

svg.append('g')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 100)
    .attr('dy', '2.71em')
    .style('text-anchor', 'end')
    .text("M / F Ratio");

var line = d3.svg.line()
    .x( d => x( d.Fall ) )
    .y( d => y( d.y ) );

var pairs = svg.append( 'g' )
    .attr( 'class', 'lines' )
    .selectAll( 'g' )
    .data( layout.pairs() ).enter()
  .append( 'g' );


pairs.selectAll( '.MFRatio' )
    .data( d => d ).enter()
    .append( 'text' )
    .attr( 'class', 'MFRatio' )
    .attr( 'x', d => x( d.Fall ) )
    .attr( 'dy', '.32em' )
    .attr( 'dx', textMargin( 10 ) )
    .attr( 'y', d => y( d.MFRatio ) )
    .style( 'text-anchor', textAlign() )
    .text( d => d.MFRatio.toFixed( 2 ) )
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);;

pairs.append( 'path' )
    .attr( 'd', line );
svg.append( 'g' )
    .attr( 'class', 'desc' )
    .selectAll( 'text' )
    .data([ 'LAS'
          ]).enter()
  .append( 'text' )
    .attr( 'y', (d,i) => i * 20 )
    .attr( 'dy','-1em' )
    .attr( 'x', 270 )
    .text( String );

};
// function ready2( data ) {

// var margin = { top: 70, right: 0, bottom: 40, left: 0 },
//     width = 425 - margin.left - margin.right,
//     height = 780 - margin.top - margin.bottom,

//     y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
//     x_dom  = d3.extent( data, d => d.Fall )

//     y = d3.scale.linear()
//         .domain( y_dom )
//         .range([ 0, height ]),
//     x = d3.scale.linear()
//         .domain( x_dom )
//         .range([ 190, 370 ]),

//     layout = d3.layout.slopegraph()( data )
//         .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
//         .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

//     textAlign = m => {
//       return (d, i) => i ? 'start' : 'end';
//     },
//     textMargin = m => {
//       return (d, i) => i ? m * 1 : m * -1;
//     };
// var yAxis = d3.svg.axis()
//   .scale(y)
//   .orient("left")
//   .tickValues([1, 2, 3, 4]);
//   var tip = d3.tip()
//     .attr('class', 'd3-tip')
//     .html(function (d) {
//      return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
//   });

// var svg = d3.select( '#chart' ).append( 'svg' )
//     .attr( 'width', width + margin.left + margin.right )
//     .attr( 'height', height + margin.top + margin.bottom )
//   .append( 'g' )
//   .attr('fill', '#4b33ff')
//     .attr( 'transform', `translate(${margin.left},${margin.top})` );

// svg.call(tip)

// svg.append( 'g' )
//     .attr( 'class', 'years' )
//     .selectAll( 'text' ).data( x_dom ).enter()
//   .append( 'text' )
//     .attr( 'x', x )
//     .attr( 'dx', (d, i) => i ? 10 : -10 )
//     .attr( 'y', height + 40 )
//     .style( 'text-anchor', textAlign() )
//     .text( String );

// svg.append('g')
//     .call(yAxis)
//   .append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', 100)
//     .attr('dy', '2.71em')
//     .style('text-anchor', 'end')
//     .text("M / F Ratio");

// var line = d3.svg.line()
//     .x( d => x( d.Fall ) )
//     .y( d => y( d.y ) );

// var pairs = svg.append( 'g' )
//     .attr( 'class', 'lines' )
//     .selectAll( 'g' )
//     .data( layout.pairs() ).enter()
//   .append( 'g' );


// pairs.selectAll( '.MFRatio' )
//     .data( d => d ).enter()
//     .append( 'text' )
//     .attr( 'class', 'MFRatio' )
//     .attr( 'x', d => x( d.Fall ) )
//     .attr( 'dy', '.32em' )
//     .attr( 'dx', textMargin( 10 ) )
//     .attr( 'y', d => y( d.y ) )
//     .style( 'text-anchor', textAlign() )
//     .text( d => d.MFRatio.toFixed( 2 ) )
//     .on('mouseover', tip.show)
//     .on('mouseout', tip.hide);;

// pairs.append( 'path' )
//     .attr( 'd', line );
// svg.append( 'g' )
//     .attr( 'class', 'desc' )
//     .selectAll( 'text' )
//     .data([ 'Business'
//           ]).enter()
//   .append( 'text' )
//     .attr( 'y', (d,i) => i * 20 )
//     .attr( 'dy', '-1em' )
//     .attr( 'x', 250 )
//     .text( String );

// };
// function ready3 ( data ) {

// var margin = { top: 70, right: 0, bottom: 40, left: 0 },
//     width = 425 - margin.left - margin.right,
//     height = 780 - margin.top - margin.bottom,

//     y_dom  = d3.extent( data, d => d.MFRatio ).reverse()
//     x_dom  = d3.extent( data, d => d.Fall )

//     y = d3.scale.linear()
//         .domain( y_dom )
//         .range([ 0, height ]),
//     x = d3.scale.linear()
//         .domain( x_dom )
//         .range([ 190, 370 ]),

//     layout = d3.layout.slopegraph()( data )
//         .j( 'MajorName' ).y( 'MFRatio' ).x( 'Fall' )
//         .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),

//     textAlign = m => {
//       return (d, i) => i ? 'start' : 'end';
//     },
//     textMargin = m => {
//       return (d, i) => i ? m * 1 : m * -1;
//     };
// var yAxis = d3.svg.axis()
//   .scale(y)
//   .orient("left")
//   .tickValues([1, 2, 3, 4]);
//   var tip = d3.tip()
//     .attr('class', 'd3-tip')
//     .html(function (d) {
//      return "<strong>" + d.MajorName + "</strong><br><strong>Total: </strong>" + d.Total + "<br><strong>Male: </strong>" + d.Male + " <strong>Female: </strong>" + d.Female;
//   });


// var svg = d3.select( '#chart' ).append( 'svg' )
//     .attr( 'width', width + margin.left + margin.right )
//     .attr( 'height', height + margin.top + margin.bottom )
//   .append( 'g' )
//   .attr('fill', '#4b33ff')
//     .attr( 'transform', `translate(${margin.left},${margin.top})` );

// svg.call(tip)

// svg.append( 'g' )
//     .attr( 'class', 'years' )
//     .selectAll( 'text' ).data( x_dom ).enter()
//   .append( 'text' )
//     .attr( 'x', x )
//     .attr( 'dx', (d, i) => i ? 10 : -10 )
//     .attr( 'y', height + 40 )
//     .style( 'text-anchor', textAlign() )
//     .text( String );

// svg.append('g')
//     .call(yAxis)
//   .append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', 100)
//     .attr('dy', '2.71em')
//     .style('text-anchor', 'end')
//     .text("M / F Ratio");

// var line = d3.svg.line()
//     .x( d => x( d.Fall ) )
//     .y( d => y( d.y ) );

// var pairs = svg.append( 'g' )
//     .attr( 'class', 'lines' )
//     .selectAll( 'g' )
//     .data( layout.pairs() ).enter()
//   .append( 'g' );

// pairs.selectAll( '.MFRatio' )
//     .data( d => d ).enter()
//     .append( 'text' )
//     .attr( 'class', 'MFRatio' )
//     .attr( 'x', d => x( d.Fall ) )
//     .attr( 'dy', '.32em' )
//     .attr( 'dx', textMargin( 10 ) )
//     .attr( 'y', d => y( d.y ) )
//     .style( 'text-anchor', textAlign() )
//     .text( d => d.MFRatio.toFixed( 2 ) )
//     .on('mouseover', tip.show)
//     .on('mouseout', tip.hide);;

// pairs.append( 'path' )
//     .attr( 'd', line );
// svg.append( 'g' )
//     .attr( 'class', 'desc' )
//     .selectAll( 'text' )
//     .data([ 'Engineering'
//           ]).enter()
//   .append( 'text' )
//     .attr( 'y', (d,i) => i * 20 )
//     .attr( 'dy', '-1em' )
//     .attr( 'x', 240 )
//     .text( String );

// };
