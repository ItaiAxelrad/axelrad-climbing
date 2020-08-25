const dataPath = '../data/logbook.json';

// insatiate sets
const grades = new Set();
const gradeSends = new Set();
const years = new Set();
const yearSends = new Set();

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
        label: 'Boulders',
        backgroundColor: 'hsl(45, 90%, 60%)',
        borderColor: 'hsl(45, 90%, 60%)',
        data: [],
      },
      {
        label: 'Routes',
        backgroundColor: 'hsl(145, 90%, 60%)',
        borderColor: 'hsl(225, 90%, 60%)',
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
        label: 'Boulders',
        backgroundColor: 'hsla(45, 90%, 60%, .5)',
        borderColor: 'hsl(45, 90%, 60%)',
        pointBorderColor: 'hsla(225, 7%, 27%, .5)',
        data: [],
      },
      {
        label: 'Routes',
        backgroundColor: 'hsla(145, 90%, 60%, .5)',
        borderColor: 'hsl(225, 90%, 60%)',
        pointBorderColor: 'hsla(225, 7%, 27%, .5)',
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
    responsive: true,
    maintainAspectRatio: false,
  },
});

// dynamically add data to chart
const addData = (chart, label, data) => {
  // add labels (font grades)
  label.forEach((label) => {
    chart.data.labels.push(label);
  });
  // add data (boulders)
  data.forEach((pt) => {
    chart.data.datasets[0].data.push(pt);
  });
  // update the chart
  chart.update();
};

const getData = async () => {
  // fetch the data
  const response = await fetch(dataPath);
  const data = await response.json();
  // get an array of years active
  data.boulders.forEach((boulder) => {
    years.add(new Date(boulder.date).getFullYear());
  });
  let yearArray = [...years].sort();
  // get an array of grades climbed
  data.boulders.forEach((boulder) => {
    grades.add(boulder.grade);
  });
  let gradeArray = [...grades];
  // get send count per grade
  gradeArray.forEach((grade, i) => {
    let count = 0;
    data.boulders.forEach((boulder) => {
      if (boulder.grade == grade) {
        ++count;
      }
    });
    gradeSends.add(count);
  });
  // get send count per grade
  yearArray.forEach((year, i) => {
    let count = 0;
    data.boulders.forEach((boulder) => {
      if (new Date(boulder.date).getFullYear() == year) {
        ++count;
      }
    });
    yearSends.add(count);
  });

  // dynamically add the data
  addData(gradeChart, gradeArray, gradeSends);
  addData(yearChart, yearArray, yearSends);
};

getData();
