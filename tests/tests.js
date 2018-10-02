var fs = require('fs');
var assert = require('assert');
var path = require('path');

var requiredProp=["name","year","runtime"];

years = fs.readdirSync('./movies')

let errorsFound = false;
years.sort().forEach(year => {
  files = fs.readdirSync('./movies/' + year);


  files.forEach(file => {
    const fileName = './movies/' + year + '/' + file;
    const movieData = fs.readFileSync(fileName, 'utf8')
    let movie = null;
    try {
      movie = JSON.parse(movieData);
    } catch (e) {
      console.error('Error parsing ' + fileName);
      throw new Error('Invalid JSON file: ' + fileName);
    }
    const expectedFileName = movie.name
      .replace(/[\'\"]/g, '')
      .replace(/([\:\.]| - )/g, ' ')
      .replace(/  /g, ' ')
      .replace(/&/, 'and')
      .replace(/\s+/g, '-')
      .toLowerCase();

    for(var i=0;i<requiredProp.length;i++){
    	if(!movie.hasOwnProperty(requiredProp[i])){
    		errorsFound=true;
    		console.warn(fileName+' doesn\'t contain '+requiredProp[i] );
    	}
    }

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
