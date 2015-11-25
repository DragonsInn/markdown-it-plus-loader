# `markdown-it-plus` loader for webpack
Parses source as Markdown using the awesome [markdown-it](https://github.com/markdown-it/markdown-it) parser. And do some additional great stuff with it.

## Notice: It's a fork!
This is a fork of the original `markdown-it-loader`. This one is made to allow a deeper access and control of the output.

## Installation

```sh
$ npm install --save markdown-it-loader
```


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

In your `webpack.config.js` file:

```js
var subscript = require('markdown-it-sub');
var superscript = require('markdown-it-sup');

module.exports = {
  module: {
    loaders: [{
      test:   /\.md/,
      loader: 'markdown-it'
    }]
  },

  'markdown-it': {
    preset: 'default',
    typographer: true,
    use: [subscript, superscript]
  }
};
```

## Options
All the options you pass through the `markdown-it` key are actually forwarded to `markdown-it` itself. There are, however, three exceptions:

- `use`: A list of plugins that should be used.
- `preprocess`: A function which gets the source to parse and an environment object. This very object is passed to markdown-it as well. A user may use this function to strip out front-matter and the like.
- `postprocess`: This callback receives only the parser and environment object. It must return the finalized environment object, as that is the one which is set as the exports of the resulting JavaScript.

### Signatures
`function preprocess(MarkdownIt, Environment, Source) -> String`
- Context: Loader context
`function postprocess(MarkdownIt, Environment) -> Any`
- Whatever this function returns, becomes the module's `module.exports` property.
- Context: Loader context


## Meta

* Code: `git clone git://github.com/DragonsInn/markdown-it-plus-loader.git`
* Home: <https://github.com/DragonsInn/markdown-it-plus-loader/>


## Contributors

* Original author: Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))
* Fork by: Kevin Ingwersen (Ingwie Phoenix) ([ingwie2000@gmail.com](mailto:ingwie2000@gmail.com))


## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](http://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
