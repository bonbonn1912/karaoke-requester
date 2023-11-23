import fs from 'fs';


export function getCsvData (){
    const csvData = fs.readFileSync('./karafuncatalog.csv', 'utf8');
    const csvLines = csvData.split('\n');
    const header = csvLines.shift().split(';');
    const resultArray = [];
    csvLines.forEach(line => {
        const columns = line.split(';');
        const entry = {};
        for (let i = 0; i < header.length; i++) {
            entry[header[i].toLowerCase()] = columns[i];
        }
        resultArray.push(entry);
    });
    return resultArray
}
