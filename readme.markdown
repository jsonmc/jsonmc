# JSON Movie Collection

[![Build Status](https://travis-ci.org/jsonmc/jsonmc.svg?branch=master)](https://travis-ci.org/jsonmc/jsonmc)

A comprehensive collection of movies and actors easy to use and parse in json file format segregated by release year.

### A movie has the following details


Movie attribute | Details
----------------|--------------
Release date | YYYY-MM-DD release date
Categories | Action, adventure, comedy, animation, family, fantasy, sci-fi
Director | Directors of the movie
Writers | Screeplay and story writers
Actors | Main casts of the movie
Year | Movie released year
Runtime | Runtime in mins
Storyline | Brief description of the movie


#### Example movie file

```json
{
  "name": "Jurassic Park",
  "year": 1993,
  "runtime": 127,
  "categories": [
    "adventure",
    "thriller",
    "sci-fi"
  ],
  "release-date": "1993-06-11",
  "director": "Steven Spielberg",
  "writer": [
    "Michael Crichton",
    "David Koepp"
  ],
  "actors": [
    "Sam Neill",
    "Laura Dern",
    "Jeff Goldblum"
  ],
  "storyline": "Huge advancements in scientific technology have enabled a mogul ... critical security systems are shut down and it now becomes a race for survival with dinosaurs roaming freely over the island."
}
```
## Contributing

Check `contributing.markdown` file for further instructions.
