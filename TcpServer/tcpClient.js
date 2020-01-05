const net = require('net');
const client = new net.Socket();
const port = 9000;
const host = '127.0.01';

client.connect(port, host, () => {
    console.log("Connected: From Client");
    //sending to server
    client.write(`Hello from Client: ${process.env.client}` + " " + client.address().address);
    client.write(process.env.msg)
})

//once connection is created and client send request to serever, now server will respone
client.on('data', (data) => {
  console.log("Server Says:", data.toString());
})

//close connection
client.on('close', () => {
    console.log("Connetion closed!!");
})