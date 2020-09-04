// set initial climbing data style (boulder/sport)
const inputs = document.querySelectorAll('input');

var style = ''
inputs.forEach(input =>{ 
  if (input.checked) {
    style = input.value
  }
})

const baseDir = '../data/';
var dataPath = `${baseDir}${style}.json`;
console.log(dataPath)

// instantiate grade chart
const ctx1 = document.getElementById('gradeChart').getContext('2d');
const gradeChart = new Chart(ctx1, {
  // The type of chart we want to create
  type: 'horizontalBar',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: 'Flashes',
        backgroundColor: 'hsl(45, 90%, 60%)',
        borderColor: 'hsl(45, 90%, 60%)',
        data: [],
      },
      {
        label: 'Redpoints',
        backgroundColor: 'hsl(0, 90%, 60%)',
        borderColor: 'hsl(0, 90%, 60%)',
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      position: 'top',
      fontFamily: 'monospace',
      text: 'Ascents per Grade',
      fontSize: 16,
      fontStyle: 'normal',
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
    tooltips: {
      callbacks: {
        footer: (tooltipItems, data) => {
          let total = tooltipItems.reduce((a, e) => a + parseInt(e.xLabel), 0);
          return 'Total: ' + total;
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

// instantiate year chart
const ctx2 = document.getElementById('yearChart').getContext('2d');
const yearChart = new Chart(ctx2, {
  // The type of chart we want to create
  type: 'line',
  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: 'Flashes',
        backgroundColor: 'hsl(45, 90%, 60%)',
        borderColor: 'hsl(45, 90%, 60%)',
        pointBorderColor: 'hsla(225, 7%, 27%, .5)',
        data: [],
      },
      {
        label: 'Redpoints',
        backgroundColor: 'hsl(0, 90%, 60%)',
        borderColor: 'hsl(0, 90%, 60%)',
        pointBorderColor: 'hsla(0, 7%, 27%, .5)',
        data: [],
      },
    ],
  },
  options: {
    title: {
      display: true,
      position: 'top',
      fontFamily: 'monospace',
      text: 'Ascents per Year',
      fontSize: 16,
      fontStyle: 'normal',
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

// dynamically add data to chart
const addData = (chart, label, data1, data2) => {
  // clear the data
  chart.data.labels = new Array();
  chart.data.datasets[0].data = new Array();
  chart.data.datasets[1].data = new Array();
  // add labels (font grades)
  label.forEach((label) => {
    chart.data.labels.push(label);
  });
  // add data (redpoints)
  data1.forEach((pt) => {
    chart.data.datasets[0].data.push(pt);
  });
  // add data (flash)
  data2.forEach((pt) => {
    chart.data.datasets[1].data.push(pt);
  });
  // update the chart
  chart.update();
};

// fetch data from JSON file
const getData = async (path) => {

  // fetch the data
  const response = await fetch(path);
  const data = await response.json();

  // instantiate arrays & sets
  const grades = new Set();
  const gradeSends = new Array();
  const gradeSends_flash = new Array();
  const years = new Set();
  const yearSends = new Array();
  const yearSends_flash = new Array();

  // get an array of years active
  data.forEach((climb) => {
    years.add(new Date(climb.date).getFullYear());
  });
  let yearArray = [...years].sort();

  // get an array of grades climbed
  data.forEach((climb) => {
    grades.add(climb.grade);
  });
  let gradeArray = [...grades];

  // get send count per grade
  gradeArray.forEach( grade => {
    let sendCount = 0;
    let flashCount = 0;
    data.forEach((climb) => {
      if (climb.grade == grade) {
        if (climb.style == 'flash') {
          ++flashCount;
        } else {
          ++sendCount;
        }
      }
    });
    gradeSends.push(sendCount);
    gradeSends_flash.push(flashCount);
  });

  // get send count per grade
  yearArray.forEach( year => {
    let sendCount = 0;
    let flashCount = 0;
    data.forEach((climb) => {
      if (new Date(climb.date).getFullYear() == year) {
        if (climb.style == 'flash') {
          ++flashCount;
        } else {
          ++sendCount;
        }
      }
    });
    yearSends.push(sendCount);
    yearSends_flash.push(flashCount)
  });

  // dynamically add the data
  addData(gradeChart, gradeArray, gradeSends_flash, gradeSends);
  addData(yearChart, yearArray, yearSends_flash, yearSends);
};
// call data getter
getData(dataPath);

// radio button event listeners 
inputs.forEach( input => {
  input.addEventListener('click', event => {
    style = event.target.value
    dataPath = `${baseDir}${style}.json`;
    getData(dataPath);
  });
})
