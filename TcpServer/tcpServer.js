const net = require('net');

//creating server
var server = net.createServer();
//config params

let port;
const host = 'localhost';

//defining array of connete clients called sockets
let sockets = [];

//server on event
server.on('connection', (conn) => {
    console.log("Connected:" + conn.remoteAddress + ':' + conn.remotePort);
    sockets.push(conn);

    conn.on('data', (data) => {
        console.log("Data" + conn.remoteAddress + ":" + data);
        sockets.forEach((conn,index,array) => {
            //will write data baclk to all connected clients, client will receive it as data
           
            if(data == 'How') {
              conn.write("I am fine you tell??");
            } else {
                conn.write(`Welcome to tcp based Chat Powered By nodejs ${data}`);
            }
            // conn.write(conn.remoteAddress + ":" + conn.remotePort + "said" + data)
        });

        //Add a close event 
        conn.on('close', (data) => {
            let index = sockets.findIndex((o) => {
                return o.remoteAddress === conn.remoteAddress && o.remotePort === conn.remotePort
            });

            if(index !== -1) sockets.splice(index, 1);
            console.log('Closed:' + conn.remoteAddress + " " + conn.remotePort)
        })
    })
})

//listeing on port
server.listen(port = 9000, () => {
    console.log(`Server listenin on port ${port}`)
})