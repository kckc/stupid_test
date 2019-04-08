var fs = require('fs');

async function readLargeFile() {
    return new Promise((resolve, reject) => {
        var start = Date.now();

        for (let i = 0; i < 10; i++) {
            fs.readFileSync('./largeFile.txt');
        }

        var end = Date.now();
        console.log(`read large file took: ${(end - start)/1000}s.`)
        return resolve('large file');
    });
}

module.exports = {
    readLargeFile
}

if (require.main === module) {
    readLargeFile().then(() => console.log('done'));
}