const net = require('net');
const port = process.env.PORT ? (process.env.PORT) : 8080;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
let startedElectron = false;

const tryConnection = () => {

    client.connect(8080, 'localhost', function () {
        if (startedElectron === false) {
            startedElectron = true;
            console.log('starting electron');

            const exec = require('child_process').exec;
            exec('npm run electron-dev');
        }
    });

};

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 2000);
});