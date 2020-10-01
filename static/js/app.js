function populateFilter() {
  // Let's populate the <option> elements in 
  // our <select> from the database. 
  const url = "/filter";

  d3.json(url).then(function (response) {

    var filerOptions = ["All"];
    filerOptions = filerOptions.concat(response.map(d => d.area_name));
    console.log(filerOptions);

    d3.select("#sel-filter")
      .selectAll("option")
      .data(filerOptions)
      .enter()
      .append("option")
      .text(d => d);
    // Bind an event to refresh the data
    // when an option is selected.
    d3.select("#sel-filter").on("change", refreshCharts);
  });
}
function refreshCharts(event) {
  // event.target will refer tp the selector
  // from which we will get the selected option
  var selectedValue = d3.select("#sel-filter").property('value');
  console.log(selectedValue);
  // With the selectedValue we can refresh the charts
  // filtering if needed. 
  buildareaBarChart(selectedValue);
}
function buildareaBarChart(selectedArea) {
  var url = `api/${selectedArea}`;
  let xl = [];
  let yl = [];
  Plotly.d3.json(url, function (figure) {
    let data = figure;
    for (var i = 0; i < data.length; i++) {
      xl.push(data[i].bay_id)
      yl.push(data[i].durationminutes)
    }

    let trace = {
      x: xl,
      y: yl,
      marker: {
        color: '#37536D'
      },
      type: 'bar'
    };
    let layout = {
      title: 'Duration per parking space',
      yaxis: { title: 'Duration' },
      xaxis: { title: 'Parking bay' , type: "category"}
    };
    Plotly.plot('plot', [trace], layout, { displayModeBar: false });

  });
}
populateFilter();
buildareaBarChart();