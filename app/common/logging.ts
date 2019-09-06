const fs = (window as any).require('fs');

export const info = (message:string) => {

    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toTimeString()}`;
    write(`INFO - ${formattedDate} - ${message} \r\n`);

}

const write = (line:string) => {
    fs.appendFile('log.txt', line, 'ascii', (err) => {
        if (err) {
            throw err;
        }
    });
}