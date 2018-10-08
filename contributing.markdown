# Contributing to JsonMC

All files are valid json files: every key should be double-quoted.

The JSON output should be the default "pretty" json output provided by node, with two spaces indent.

When in doubt, the output should match the `JSON.stringify(data, null, 2)` function output. `data` being the contents of the json file.

When working on a issue, make a comment on the issue so that we don't have multiple people working on the same movies/actors.

## File Names

All filenames should be lower-case. Spaces should be replaced by dashes ("-").

## Actors

For now, all actors should reside in the /actors folder.

## Movies

Each movie should be added to its own year folder and follow the "File Names" rule (above).

### Storyline / Description

Should have the "storyline" or "description" key and should only be the official one. No third-party content. Only official content, please.

### Release Date

Should have the "release-date" key on the format "YYYY-MM-DD". It is also the Official release date of the country where the movie is from, not necessarily the US.

### Director / Writer / Actors

The keys are "director" or "writer" or "actors". Note that only the "actors" keys is plural.

If there is only one member, it should be a plain string. Else, it should be an array with strings.

### Categories

Always lower-case and singular.

Also, Science Fiction is "sci-fi".

Animation movies (such as **How to Train Your Dragon**) should have the _animation_ category.

### Year

Just the integer number. No quotes.

### Runtime

Length of the movie in minutes. Integer, no quotes.

### Unreleased movies

Add a key "future" with the value "true". If the movie is already released, there should be no "future" key at all.

This information will be used to check if the movie release date has passed and the json file should be updated.

# Tests

Your commit must pass the tests to be considered.

If you believe that your commit is right and the test is wrong, leave a comment on your commit so I can check it out. Commits with tests errors without comments will not be addressed.
