const ioHook = require('iohook');


ioHook.on('keydown', event => {
    console.log(event); // { type: 'mousemove', x: 700, y:d 400 }
});

// Register and start hook
ioHook.start();