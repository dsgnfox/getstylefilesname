import fs from 'fs';
import _ from 'lodash';
import readlineSync from 'readline-sync';

const pathToStyles = readlineSync.question('Set path to style folder: ');

const paths = [];
const exceptions = [
    'vars',
    'default',
    'extra',
    'jpg',
    'jpeg',
    'png',
    'svg'
];

const getFiles = (items = []) => {

    items.forEach((item) => {

        if (fs.lstatSync(item).isFile()) {
            paths.push(item);
            return;
        }

        const childs = fs.readdirSync(item).map((child) => item + '/' + child);
        getFiles(childs);
    });
};

const dirs = fs.readdirSync(pathToStyles).map((item) => pathToStyles + '/' + item);
getFiles(dirs);;

const styles = paths.filter((path) => {
    const pathChunk = path.split('.');
    return _.intersection(pathChunk, exceptions).length === 0;
});

const result = styles.map((style) => style.slice(pathToStyles.length + 1, style.length)).map((item) => `"${item}",`);

fs.writeFileSync('result.txt', result.join('\n'));

console.log('See result.txt');
