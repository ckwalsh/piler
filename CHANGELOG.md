# 0.6.0 - 2014-06-12

  * Fixed tests to run on any environment
  * Fixed tests for using new jade and express >=3.x conventions
  * Updated jQuery test version
  * Update dependencies
  * Updated minify.coffee
  * Added package.json scripts
  * Initial code coverage
  * Drop Node.js 0.8 support
  * Added `debug` module to all sources
  * `use strict` for quality of code
  * Forbid using of ECMAScript reserved words for namespaces in JS
  
# 0.4.2 - 2013-04-16

  * Fixes to work with ExpressJS 3.x
  * Unit test fixes
  * Make console output configurable

# 0.4.1 - 2012-06-12

  * Add getSources
  * Put cache key to resource url instead of query string

# 0.4.0 - 2012-06-17

  * Remove Dynamic Helpers.

Dynamic Helpers where an Express 2.0 only API. This makes Piler more framework
agnostic and it will work with Express 3.0. This also removes support for
response object functions. We'll add those back if there is a need for them
(open up a issue if you miss them!)  and we'll find good framework agnostic way
to implement them.

# 0.3.6 - 2012-06-17

  * Bind all production dependency versions

# 0.3.5 - 2012-06-17

  * Fix LESS @imports
  * Fix Stylus without nib
  * Use path module for Windows compatibility

# 0.3.4 - 2012-03-29

  * Fix Stylus @imports

# 0.3.3 - noop

# 0.3.2 - 2011-12-11

  * Workaround compiler bug in CoffeeScript

# 0.3.1 - 2011-11-17

  * Fix CSS namespaces

# 0.3.0 - 2011-10-13

  * Rename to Piler
  * Really minify CSS
  * Implemented res.addOb
  * Implement outputDirectory and urlRoot options.
  * addOb can now take nested namespace string and it won't override existing
    namespaces.