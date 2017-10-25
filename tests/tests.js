var fs = require('fs');
var assert = require('assert');
var path = require('path');

fs.readdir('./movies', (err, years) => {
  errorsFound = false;
  years.sort().forEach(year => {
    fs.readdir('./movies/' + year, (err, files) => {
      files.forEach(file => {
        const movie = JSON.parse(fs.readFileSync('./movies/' + year + '/' + file, 'utf8'));
        const expectedFileName = movie.name
          .replace(/[\'\"]/g, '')
          .replace(/([\:\.]| - )/g, ' ')
          .replace(/  /g, ' ')
          .replace(/&/, 'and')
          .replace(/\s+/g, '-')
          .toLowerCase();

        if (path.parse(file).name !== expectedFileName) {
          console.warn('./movies/' + year + '/' + file + ' movie name is either wrong or file name is not according to guidelines. Expected: ' + expectedFileName + '.json');
          errorsFound = true;
        }
        if (path.extname(file) !== '.json') {
          console.warn(file + ' extension is not json');
          errorsFound = true;
        }
      });
    });
  });

  assert.equal(errorsFound, false, 'Invalid files found');
});
