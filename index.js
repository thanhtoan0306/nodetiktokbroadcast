const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Set up a timer to send a random message every 2 seconds
    const messageTimer = setInterval(() => {
        const randomMessage = Math.random().toString(36).substring(2);
        ws.send('Random Message: ' + randomMessage);
    }, 2000); // Send message every 2 seconds

    ws.on('close', function close() {
        console.log('Client disconnected');
        clearInterval(messageTimer); // Stop the timer when client disconnects
    });
});