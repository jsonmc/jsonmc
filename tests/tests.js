const fs = require('fs');
const assert = require('assert');
const path = require('path');

const years = fs.readdirSync('./movies');
const actors = fs.readdirSync('./actors');
const directors = fs.readdirSync('./directors');

let errorsFound = false;

const movie_errors = [];
years.sort().forEach(year => {
  const files = fs.readdirSync('./movies/' + year);

  files.forEach(file => {
    const fileName = './movies/' + year + '/' + file;
    const movieData = fs.readFileSync(fileName, 'utf8');
    let movie = null;
    try {
      movie = JSON.parse(movieData);
    } catch (e) {
      console.error('Error parsing ' + fileName);
      movie_errors.push('Invalid JSON file: ' + fileName);
    }
    const expectedFileName = movie.name
      .replace(/[\'\"\,\?]/g, '')
      .replace(/([\:\.]| - )/g, ' ')
      .replace(/  /g, ' ')
      .replace(/&/, 'and')
      .replace(/\s+/g, '-')
      .toLowerCase();

    if (movie.year !== parseInt(year)) {
      errorsFound = true;
      const errorMessage = fileName + ' movie is in the wrong year folder. Found: ' + movie.year + '. Expected: ' + year;
      movie_errors.push(errorMessage);
    }

    if (path.parse(file).name !== expectedFileName) {
      errorsFound = true;
      const errorMessage = './movies/' + year + '/' + file + ' movie name is either wrong or file name is not according to guidelines. Expected: ' + expectedFileName + '.json';
      movie_errors.push(errorMessage);
    }

    if (path.extname(file) !== '.json') {
      errorsFound = true;
      const errorMessage = file + ' extension is not json';
      movie_errors.push(errorMessage);
    }
  });
});

if (movie_errors.length > 0) {
  const errorMessage = movie_errors.join('\n');
  console.error(errorMessage);
  throw errorMessage;
}

console.log('movies test: no errors found.');
function validatePerson(file, folder) {
  const fileName = `./${folder}/${file}`;
  const personData = fs.readFileSync(fileName, 'utf8');
  let person = null;

  try {
    person = JSON.parse(personData);
  } catch (e) {
    console.error('Error parsing ' + fileName);
    throw new Error('Invalid JSON file: ' + fileName);
  }

  const requiredProperties = [
    'name',
    'birthdate',
    'birthplace'
  ];

  const checkProperties = requiredProperties.map(prop => person.hasOwnProperty(prop));

  if (checkProperties.includes(false)) {
    errorsFound = true;
    const missingProps = checkProperties
      .filter(prop => prop === false)
      .map((prop, index) => requiredProperties[index])
      .join(', ');
    console.warn(`${fileName} is missing the required properties: ${missingProps}`);
  }

  // Expect filename to be slug of person name
  const expectedFileName = person.name
    .replace(/[\'\"]/g, '')
    .replace(/ [A-Z]{1}\. /, '-')
    .replace(/([\:\.]| - )/g, '')
    .replace(/  /g, ' ')
    .replace(/\s+/g, '-')
    .toLowerCase();

  const fileBaseName = path.parse(file).name
  if (path.parse(file).name !== expectedFileName) {
    // Filname consisting of person name without middle names is also fine
    const names = person.name.split(' ');
    const withoutMiddleNames = `${names[0]}-${names.pop()}`.toLowerCase();

    if (fileBaseName !== withoutMiddleNames) {
      errorsFound = true;
      console.warn(`${fileName} person's name is either wrong or file name is not according to guidelines.
        Expected: ${expectedFileName}.json
        ${withoutMiddleNames !== expectedFileName ? `or ${withoutMiddleNames}.json` : ''}`);
    }
  }

  if (path.extname(file) !== '.json') {
    errorsFound = true;
    console.warn(file + ' extension is not json');
  }
}
actors.forEach(file => {validatePerson(file, "actors")});
console.log("actors test complete");

directors.forEach(file => {validatePerson(file, "directors")});
console.log("directors test complete");

assert.equal(errorsFound, false, 'Invalid files found');
