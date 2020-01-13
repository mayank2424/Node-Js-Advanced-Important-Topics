const fs = require('fs');

//create writable file
function writeToFile() {
    let file = fs.createWriteStream('writeData.txt');

    let i=0;
    let MAX_LIMIT = 1e7;

    console.log("Hello User,Now You will Gonna Learn Numbering till 1million")
    const write = function() {
        //Flag which will gonna tell about whether to write more data or not(means end to file);
        let result = true;
        
        while(i< MAX_LIMIT && result) {
            result = file.write(`Count: ${i}`);
            i+=1;
        }


        //this event is fired which tells about it is ready to accpeet more data
        if(i < MAX_LIMIT) {
            file.once('drain', write);
        }
        return write;
    }

    write();
}

writeToFile();