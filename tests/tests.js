const fs = require('fs');
const assert = require('assert');
const path = require('path');

const years = fs.readdirSync('./movies')
const actors = fs.readdirSync('./actors')

let errorsFound = false;
years.sort().forEach(year => {
  const files = fs.readdirSync('./movies/' + year);

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
      .replace(/[\'\"\,\?]/g, '')
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


actors.forEach(file => {
  const fileName = './actors/' + file
  const actorData = fs.readFileSync(fileName, 'utf8')
  let actor = null
  try {
    actor = JSON.parse(actorData)
  } catch (e) {
    console.error('Error parsing ' + fileName)
    throw new Error('Invalid JSON file: ' + fileName)
  }

  const requiredProperties = [
    'name',
    'birthdate',
    'birthplace'
  ]

  const checkProperties = requiredProperties.map(prop => actor.hasOwnProperty(prop))

  if (checkProperties.includes(false)) {
    errorsFound = true;
    const missingProps = checkProperties
      .filter(prop => prop === false)
      .map((prop, index) => requiredProperties[index])
      .join(', ')
    console.warn(`${fileName} is missing the required properties: ${missingProps}`)
  }

  // Expect filename to be slug of actor name
  const expectedFileName = actor.name
    .replace(/[\'\"]/g, '')
    .replace(/ [A-Z]{1}\. /, '-')
    .replace(/([\:\.]| - )/g, '')
    .replace(/  /g, ' ')
    .replace(/\s+/g, '-')
    .toLowerCase();

  const fileBaseName = path.parse(file).name
  if (path.parse(file).name !== expectedFileName) {
    // Filname consisting of actor name without middle names is also fine
    const names = path.parse(file).name.split('-')
    const withoutMiddleNames = `${names[0]}-${names.pop()}`
    if (fileBaseName !== withoutMiddleNames) {
      errorsFound = true;
      const errMsgCanAcceptWithoutMiddleNames = `or ${withoutMiddleNames}.json`
      console.warn(`./actors/${file} actor name is either wrong or file name is not according to guidelines.
        Expected: ${expectedFileName}.json
        ${withoutMiddleNames !== expectedFileName ? errMsgCanAcceptWithoutMiddleNames : ''}`);
    }
  }

  if (path.extname(file) !== '.json') {
    errorsFound = true;
    console.warn(file + ' extension is not json');
  }
})

assert.equal(errorsFound, false, 'Invalid files found');
