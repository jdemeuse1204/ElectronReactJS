/// <reference path="../common-types.d.ts"/>
const fs = (window as any).require('fs');

export const getKeybindings = async (): Promise<IKeyBinding[]> => {
    return new Promise((resolve, reject) => {

        fs.readFile("keybinds.json", 'utf8', (err, data) => {
            try {
                resolve(JSON.parse(data))
            } catch (e) {
                reject(e);
            }
        });
    });
}