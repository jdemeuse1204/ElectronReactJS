const net = require('net');
const port = process.env.PORT ? ((process as any).env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            const electron = exec('npm run electron');
            electron.stdout.on("electron data", function(data) {
                console.log("stdout: " + data.toString());
            });

            const tsc = exec('npm run tsc:watch');
            tsc.stdout.on("tsc data", function(data) {
                console.log("stdout: " + data.toString());
            });
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

