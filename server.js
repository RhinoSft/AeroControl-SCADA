const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('New client connected');

    // Simulación de datos de sensores
    setInterval(() => {
        const sensorData = {
            temperature: (Math.random() * 50).toFixed(2), // Grados Celsius
            windSpeed: (Math.random() * 100).toFixed(2),  // Velocidad del viento en km/h
            turbineStatus: Math.random() > 0.5 ? 'Active' : 'Inactive' // Estado de la turbina
        };
        ws.send(JSON.stringify(sensorData));
    }, 2000);

    // Recibir comandos desde la interfaz web
    ws.on('message', message => {
        console.log(`Received from client: ${message}`);
        // Aquí podrías agregar lógica para el control de actuadores
    });
});
