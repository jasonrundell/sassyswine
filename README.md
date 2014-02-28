# Sassy Swine

Gruntified task runner suite for AngularJS MVC web applications.

An opinionated development suite. Made with modern browsers in mind (no support for older browsers).

### Special thanks to [Todd Motto](https://github.com/toddmotto/) for building [FireShell](https://github.com/toddmotto/fireshell) which was what initially unlocked my discovery path into [Grunt](http://gruntjs.com/)!

## Getting started with Sassy Swine

1. Install [Node.js](http://nodejs.org/).
2. Download the latest stable release of Sassy Swine into the root directory of your new project.
3. Open Terminal or Command prompt with Node.js.
4. Run `npm install` to install all the necessary modules for node.
5. Run `grunt` and your browser should open up with your new project ready to go!
6. Run `grunt build` to publish directly to your staging environment.
7. Run `grunt push` to publish directly to your production environment (use with wisdom!)

## Features

Here are the main features of Sassy Swine:

* [SASS](http://www.sass-lang.com/)
* [jQuery 2.1.0](http://jquery.com/)
* [Zepto 1.1.3](http://zeptojs.com/)
* [jQuery UI 1.10.4](https://jqueryui.com/)
* [AngularJS 1.2.13](http://angularjs.org/)
* [Foundation 5.1.1](http://foundation.zurb.com/)
* [Jade 0.10.0](http://jade-lang.com/)
* [Grunt 0.4.2](http://gruntjs.com/)
* [LiveReload 0.3.2](https://www.npmjs.org/package/connect-livereload)

## Scaffolding

````
├── app
│   ├── css
│   ├── images
│   ├── js
│   ├── views
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── js
│   │   └── scripts.js
│   │   └── jquery.js
│   │   └── zepto.js
│   │   └── angular.js
│   ├── models
│   │   ├── forms
│   │   ├── menus
│   │   ├── layouts
│   │       ├── 1-column-layouts
│   │       ├── 2-column-layouts
│   │       ├── 3-column-layouts
│   ├── php
│   └── scss
│       ├── foundation
│       ├── modules
│       ├── partials
│       ├── vendor
│       └── style.scss
├── Gruntfile.js
├── package.json
├── README.md
├── .gitignore
└── .jshintrc

````

## Contributing

Steps to contributing:

* Create your feature branch, commit changes and push to origin
* Submit a Pull Request with details on your feature branch

Guidelines:
* Non-trivial changes should be discussed an an [issue](https://github.com/jasonrundell/sassyswine/issues) first

## Roadmap

Projected roadmap for Sassy Swine and it's subsets builds:

* File uploads, gipping, and hashing for Amazon S3
* Documentation

## License

#### The MIT License (MIT)

Copyright (c) 2014 Jason Rundell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
