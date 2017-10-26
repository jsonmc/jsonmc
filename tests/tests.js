var fs = require('fs');
var assert = require('assert');
var path = require('path');

years = fs.readdirSync('./movies')

let errorsFound = false;
years.sort().forEach(year => {
  files = fs.readdirSync('./movies/' + year);

  files.forEach(file => {
    const fileName = './movies/' + year + '/' + file;
    const movieData = fs.readFileSync(fileName, 'utf8')
    const movie = JSON.parse(movieData);
    const expectedFileName = movie.name
      .replace(/[\'\"]/g, '')
      .replace(/([\:\.]| - )/g, ' ')
      .replace(/  /g, ' ')
      .replace(/&/, 'and')
      .replace(/\s+/g, '-')
      .toLowerCase();

    if (movie.year !== parseInt(year)) {
      errorsFound = true;
      console.warn(fileName + ' movie is in the wrong year folder. Found: ' + movie.year + '. Expected: ' + year);
    }

    if (path.parse(file).name !== expectedFileName) {
      errorsFound = true;
      console.warn('./movies/' + year + '/' + file + ' movie name is either wrong or file name is not according to guidelines. Expected: ' + expectedFileName + '.json');
    }

    if (path.extname(file) !== '.json') {
      errorsFound = true;
      console.warn(file + ' extension is not json');
    }
  });
});

assert.equal(errorsFound, false, 'Invalid files found');
