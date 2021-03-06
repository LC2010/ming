# ming (3.0 dev)

Ming is a high-productivity JavaScript solution that integrates jQuery/Zepto and micro modules you need for modern desktop/mobile web application development.

[![Selenium Test Status](https://saucelabs.com/buildstatus/modulejs)](https://saucelabs.com/u/modulejs)

[![Build Status](https://secure.travis-ci.org/modulejs/ming.png)](https://travis-ci.org/modulejs/ming)

## Solution Features
* Improve programming experience
* Enhance source maintainability
* Development based on ES5
* Development based on modular JavaScript
* Better asynchronous programming with Futures

## Module Loader Support
* requirejs - AMD   (default)
* seajs - CMD       (optional)

## Modules
#### Language Modules
* object
* string
* format
* escape
* color
* json
* memoize

#### OOP Modules
* class - aralejs/class@1.0.0
* runtime

#### Storage Modules
* storage - marcuswestin/store.js@1.3.5
* cookie - carhartl/jquery-cookie@1.3.1

#### UI Modules
* history - Backbone.History
* route - Backbone.Router
* template - underscore.template
* datalink - jquery/jquery-datalink@1.0.0
* validate - ryanseddon/H5F@1.0.0
* layout

#### Input Modules
* mousewheel
* key - madrobby/keymaster@1.0.2
* touch - EightMedia/hammer.js@0.6.1

#### Communication Modules
* jsonpi
* cors
* postmessage

#### Pattern Modules
* deferred
* eventemitter

#### Other Modules
* prefetch
* url

## Widgets
* carousel - bootstrap/carousel@2.3.0
* placeholder - mathiasbynens/jquery-placeholder@2.0.7
* tooltip

## Inspectors
* firebuglite - getfirebug.com/firebuglite
* fpsmeter - Darsain/fpsmeter@0.2.1
* jstiming

## Shims
* es5-shim     (optional)
* console-shim (optional)

## Browsers
[![Selenium Test Status](https://saucelabs.com/browser-matrix/modulejs.svg)](https://saucelabs.com/u/modulejs)

## Examples
* [Contacts](https://github.com/modulejs/ming/tree/master/example/contacts)
* [Fpsmeter](https://github.com/modulejs/ming/tree/master/example/fpsmeter)
* [Slideshow](https://github.com/modulejs/ming/tree/master/example/slideshow)
* [TODO APP](https://github.com/modulejs/ming/tree/master/example/todo)
* [Waterfall](https://github.com/modulejs/ming/tree/master/example/waterfall)

## Links
* [Google Group](http://groups.google.com/group/modulejs)
* [Wiki](https://github.com/modulejs/ming/wiki)
* [Test Case](https://rawgithub.com/modulejs/ming/master/test/index.html)

## Changelog

#### 2013-10-1 3.0 dev
1. rename modulejs to ming

#### 2013-4-20 2.1 alpha
1. firebuglite
2. fpsmeter

#### 2013-3-20 2.1 dev
1. base Object Class
2. EventEmitter

#### 2012-12-12 2.0 dev
1. modulejs2.0 in dev
2. modulejs2.0 in modulejs-1.0 branch

#### 2012-09-26 1.2 release

1. remove sizzle module
2. fix Node.text bug

#### 2012-08-11 1.1 release

1. remove graph module
2. all module AMD support
3. add net/JSONPI module
4. storage/LocalStorage module support IE6-7

#### 2011-09-01 1.0 release

## License

(The MIT License)

Copyright (c) 2010-2013 yuanyan <yuanyan.cao@gmail.com>