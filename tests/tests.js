var fs = require('fs');
var assert = require('assert');
var path = require('path');

fs.readdir('./movies', (err, years) => {
  years.forEach(year => {
    fs.readdir('./movies/' + year, (err, files) => {
      files.forEach(file => {
        let movie = JSON.parse(fs.readFileSync('./movies/' + year + '/' + file, 'utf8'));
        assert.equal(path.parse(file).name, movie.name.replace(/\s+/g, '-').replace('.', '').replace(':', '').toLowerCase(), './movies/' + year + '/' + file + ' movie name is either wrong or file name is not according to guidelines');
        assert.strictEqual(path.extname(file), '.json', file + ' extension is not json');
      });
    });
  });
});
