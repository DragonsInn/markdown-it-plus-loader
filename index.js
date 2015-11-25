var markdown = require('markdown-it');
var hljs = require('highlight.js');
var _ = require("microdash");

module.exports = function (source) {
  this.cacheable();

  var opts = _.extend({
    // The default preset to be used for rendering Markdown.
    preset: 'default',

    // The function to highlight source code.
    // Can be overwritten to use something like prism instead.
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return '';
    },

    // A function to preprocess the markdown.
    // It obtains a loader context.
    preprocess: function(parser, env, source) {
        return source;
    },

    // A function to do something with the object,
    // which will be returned as new source.
    postprocess: function(parser, env) {
        return env;
    }
  }, this.options['markdown-it']);

  // Cut out some options that should not be given to the parser.
  var plugins = opts.use;
  delete opts.use;

  var preprocess = opts.preprocess;
  delete opts.preprocess;

  var postprocess = opts.postprocess;
  delete opts.postprocess;

  // Create a parser instance, pass it the "markdown-it" options.
  var parser = markdown(opts.preset, opts);

  if (plugins) {
    plugins.forEach(function (plugin) {
      parser.use(plugin);
    });
  }

  // This object will contain information during the parsing.
  var env = {};

  // Pre-process the source.
  source = preprocess.call(this, parser, env, source);

  var output = parser.render(source, env);
  env.body = output;

  var rtObj = postprocess.call(this, parser, env);

  return [
      "/* Generated using markdown-it-plus loader. */",
      "module.exports = "+JSON.stringify(rtObj)
  ].join("\n");
};
