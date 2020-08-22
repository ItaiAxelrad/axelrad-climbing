// instantiate chart
let boulderArray = []
let grades = new Set();
let sends = new Set();
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'horizontalBar',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: 'Boulders',
        backgroundColor: 'hsl(45, 90%, 60%)',
        borderColor: 'hsl(45, 90%, 60%)',
        data: [],
      },
    ],
  },
  options: {
        title: {
            display: true,
            position: 'top',
            fontFamily: 'monospace',
            text: 'All Time Boulder Count'
        }
    }
});

// dynamically add data to chart
const addData = (chart, label, data) => {
  // add labels
  label.forEach((label) => {
    chart.data.labels.push(label);
  });
  // add data
  data.forEach((pt) => {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(pt);
    });
  });
  // update the chart
  chart.update();
};

const getGrades = async () => {
  const response = await fetch('../data/logbook.json');
  const data = await response.json();
  // get an array of grades
  data.boulders.forEach(boulder => {
    grades.add(boulder.grade);
  });
  gradeArray = [...grades]
  // get send count per grade
  gradeArray.forEach((grade, i) => {
    let count = 0
    data.boulders.forEach(boulder => {
      if (boulder.grade == grade) {
        ++count
      }
    });
    sends.add(count)
  })

  // dynamically add the data
  addData(chart, gradeArray, sends);
};

getGrades();