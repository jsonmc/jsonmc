# Contributing to JsonMC

All files are valid json files: every key should be double-quoted.

The JSON output should be the default "pretty" json output provided by node, with two spaces ident.

When in doubt, the output should match the `JSON.stringify(data, null, 2)` function output. `data` being the contents of the json file.
