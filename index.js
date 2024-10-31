const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "xizy_77";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);


// ...and more events described in the documentation below

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');


    // Connect to the chat (await can be used as well)
    tiktokLiveConnection.connect().then(state => {
        console.info(`Connected to roomId ${state.roomId}`);
    }).catch(err => {
        console.error('Failed to connect', err);
    })
    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveConnection.on('chat', data => {
        const mes = `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
        console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
        // ws.send('Random Message: ' + mes);
        const chat = data;
        console.log('debug31:', data);
        ws.send(JSON.stringify({ topic: 'chat', data: data }));

    })

    // And here we receive gifts sent to the streamer
    // tiktokLiveConnection.on('gift', data => {
    //     const mes = `${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`
    //     ws.send('Random Message: ' + mes);

    //     console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    // })

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});