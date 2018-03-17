$(function () {

  'use strict';

  var wolkChartCanvas = $('#wolkChart').get(0).getContext('2d');
  

  var chartOptions = {
  // Boolean - If we should show the scale at all
  showScale               : true,
  // Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines      : false,
  // String - Colour of the grid lines
  scaleGridLineColor      : 'rgba(0,0,0,.05)',
  // Number - Width of the grid lines
  scaleGridLineWidth      : 1,
  // Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
  // Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines  : true,
  // Boolean - Whether the line is curved between points
  bezierCurve             : true,
  // Number - Tension of the bezier curve between points
  bezierCurveTension      : 0.3,
  // Boolean - Whether to show a dot for each point
  pointDot                : false,
  // Number - Radius of each point dot in pixels
  pointDotRadius          : 4,
  // Number - Pixel width of point dot stroke
  pointDotStrokeWidth     : 1,
  // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius : 20,
  // Boolean - Whether to show a stroke for datasets
  datasetStroke           : true,
  // Number - Pixel width of dataset stroke
  datasetStrokeWidth      : 2,
  // Boolean - Whether to fill the dataset with a color
  datasetFill             : true,
  // String - A legend template
  legendTemplate          : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
  // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
  maintainAspectRatio     : true,
  // Boolean - whether to make the chart responsive to window resizing
  responsive              : true
  };


  var wolkChartCanvas = $('#wolkChart').get(0).getContext('2d');
  // This will get the first returned node in the jQuery collection.
  var wolkChart       = new Chart(wolkChartCanvas);

  var wolkChartData = {
    labels  : [0, 420, 840, 1260, 1679, 2099, 2519, 2939, 3359, 3779],
    datasets: [
      {
        label               : 'Electronics',
        fillColor           : 'rgba(60,141,188,0.9)',
        strokeColor         : 'rgba(60,141,188,0.8)',
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [29, 15, 10, 12,  9,  5,  7,  5,  4,  3]
      }
    ]
  };

  // Create the line chart
  wolkChart.Line(wolkChartData, chartOptions);


  var parachuteChartCanvas = $('#parachuteChart').get(0).getContext('2d');
  // This will get the first returned node in the jQuery collection.
  var parachuteChart       = new Chart(parachuteChartCanvas);

  var parachuteChartData = {
    labels  : [55, 194, 333, 472, 611, 751, 890, 1029, 1168, 1307],
    datasets: [
      {
        label               : 'Electronics',
        fillColor           : 'rgba(60,141,188,0.9)',
        strokeColor         : 'rgba(60,141,188,0.8)',
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [8, 10, 6, 7, 6, 9, 9, 13, 18, 10]
      }
    ]
  };

  // Create the line chart
  parachuteChart.Line(parachuteChartData, chartOptions);




  var aircraftChartCanvas = $('#aircraftChart').get(0).getContext('2d');
  // This will get the first returned node in the jQuery collection.
  var aircraftChart       = new Chart(aircraftChartCanvas);

  var aircraftChartData = {
    labels  : [1492, 2192, 2891, 3591, 4290, 4990, 5689, 6388, 7088, 7787],

    datasets: [
      {
        label               : 'Electronics',
        fillColor           : 'rgba(60,141,188,0.9)',
        strokeColor         : 'rgba(60,141,188,0.8)',
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [2, 6, 7, 17, 26, 10, 5, 6, 15, 5] 
      }
    ]
  };

  // Create the line chart
  aircraftChart.Line(aircraftChartData, chartOptions);


  var vehicleChartCanvas = $('#vehicleChart').get(0).getContext('2d');
  // This will get the first returned node in the jQuery collection.
  var vehicleChart       = new Chart(vehicleChartCanvas);

  var vehicleChartData = {
    labels  : [0, 878, 1755, 2633, 3510, 4388, 5266, 6143, 7021, 7899],

    datasets: [
      {
        label               : 'Electronics',
        fillColor           : 'rgba(60,141,188,0.9)',
        strokeColor         : 'rgba(60,141,188,0.8)',
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [9, 2, 11, 6, 8, 2, 0, 0, 1, 1]
      }
    ]
  };

  // Create the line chart
  vehicleChart.Line(vehicleChartData, chartOptions);


  /* SPARKLINE CHARTS
   * ----------------
   * Create a inline charts with spark line
   */

  // -----------------
  // - SPARKLINE BAR -
  // -----------------
  $('.sparkbar').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type    : 'bar',
      height  : $this.data('height') ? $this.data('height') : '30',
      barColor: $this.data('color')
    });
  });

  // -----------------
  // - SPARKLINE PIE -
  // -----------------
  $('.sparkpie').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type       : 'pie',
      height     : $this.data('height') ? $this.data('height') : '90',
      sliceColors: $this.data('color')
    });
  });

  // ------------------
  // - SPARKLINE LINE -
  // ------------------
  $('.sparkline').each(function () {
    var $this = $(this);
    $this.sparkline('html', {
      type     : 'line',
      height   : $this.data('height') ? $this.data('height') : '90',
      width    : '100%',
      lineColor: $this.data('linecolor'),
      fillColor: $this.data('fillcolor'),
      spotColor: $this.data('spotcolor')
    });
  });
})
