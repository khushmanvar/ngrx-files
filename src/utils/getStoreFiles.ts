import * as fs from 'fs'; 
import path = require('path');

export function getStoreFiles(storeName: string) {
    const filePath = './tempActions.txt';
    const fileContent = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

    return fileContent;
}