//Stream Initialization

const stream = require('stream');
const fs = require('fs');
//send data to stream

// readableStream.push('test1', 'test2');


//reading data from file asynchorously
// async function logFile(arg) {
//     for await(const chunk of arg) {
//         console.log(chunk);
//     }
// }

// const readable = fs.createReadStream('./t.txt', { encoding: 'utf8'});
// logFile(readable);


//synchronous file reas
var data = fs.readFileSync(__dirname + '/t.txt', 'utf8');
// console.log("Synchroous",data);

//asynchronous file read
var data2 = fs.readFile(__dirname + '/t.txt', 'utf8', (err, data) => {
    // console.log("Asynchronous",data);
})


//Readable stream

// var readableStream = fs.createReadStream(__dirname + '/t.txt');


// readableStream.on('data', (err, data) => {
//     console.log("Chunk Received");
// })
//writable stream exmaple for writing big chunk of data in file

const print = function() {
    const file = fs.createWriteStream('data1.txt');
    let i=0;
    const max = 1e7;

    const writer = function() {
        let result = true;
        while(i < max && result) {
            result = file.write(`Hello Mayank ${i}\n`); 

            i+=1;
        }

        //This drain is for fired when buffer is rwadyt o accept for data
        if(i < max) {
            file.once('drain', writer);
        }

        return writer;
    }
    writer();
}


print();