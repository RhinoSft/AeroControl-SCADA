const ws = new WebSocket('ws://localhost:8080');

const ctxTemperature = document.getElementById('temperatureChart').getContext('2d');
const ctxWindSpeed = document.getElementById('windSpeedChart').getContext('2d');

const temperatureChart = new Chart(ctxTemperature, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                beginAtZero: true
            }
        }
    }
});

const windSpeedChart = new Chart(ctxWindSpeed, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Wind Speed (km/h)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Speed (km/h)'
                },
                beginAtZero: true
            }
        }
    }
});

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('temperature').textContent = `${data.temperature} °C`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('turbineStatus').textContent = data.turbineStatus;

    
    const currentTime = new Date().toLocaleTimeString();
    
    
    temperatureChart.data.labels.push(currentTime);
    temperatureChart.data.datasets[0].data.push(data.temperature);
    temperatureChart.update();

    
    windSpeedChart.data.labels.push(currentTime);
    windSpeedChart.data.datasets[0].data.push(data.windSpeed);
    windSpeedChart.update();
};


document.getElementById('toggle-turbine').addEventListener('click', function() {
    ws.send('Toggle Turbine');
});
