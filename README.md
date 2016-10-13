# Sassy Swine "Gulp!" Edition

Sassy Swine "Gulp!" Edition is a Gulpified task runner suite for web development with AngularJS, SASS, and Jade. jQuery, LESS and other libraries can easily be added/removed/modified by moving files into their respective src/... folder. To switch out SASS for LESS, you'll need to modify the gulpfile.js file and add a gulp less package of your choice.

The "Gulp!" Edition is a modified version of a Grunt version of SASSY Swine which is no longer receiving updates.

### Special thanks to [Todd Motto](https://github.com/toddmotto/) for building [FireShell](https://github.com/toddmotto/fireshell) which was what initially unlocked my discovery path into [Grunt](http://gruntjs.com/)!

### The online works of [John Pappa](https://github.com/johnpapa) and [Mark Goodyear](https://gist.github.com/markgoodyear) were also massive help with getting this edition together.

## Getting started

1. Install [Node.js](http://nodejs.org/).
2. Download the latest stable release of Sassy Swine into the root directory of your new project.
3. Open Terminal or Command prompt with Node.js/Ruby.
4. (ONLY AFTER YOUR FIRST CLONE) Run `npm install` to install all the necessary modules for node.
5. Run `gulp` and your browser should open up with your new project ready to go!
6. Modify index.jade to begin to change the initial template for your web project. Saved changes to images, jade, sass, or javascript will automatically show in your browser without you needing to hit refresh

## Features

Here are the main features of Sassy Swine "Gulp!":

* [Gulp](http://www.sass-lang.com/)
* [SASS](http://www.sass-lang.com/)
* [AngularJS 1.2.13](http://angularjs.org/)
* [mix-fu 1.0.0](https://github.com/jasonrundell/mix-fu)
* [normalize 3.0.2](git.io/normalize)
* [Jade](http://jade-lang.com/)
* [GULP PACKAGES]
* del
* gulp-autoprefixer
* gulp-cache
* gulp-concat
* gulp-connect
* gulp-imagemin
* gulp-jade
* gulp-jshint
* gulp-livereload
* gulp-load-plugins
* gulp-minify-css
* gulp-notify
* gulp-open
* gulp-rename
* gulp-sass
* gulp-uglify

````

## Contributing

Steps to contributing:

* Create your feature branch, commit changes and push to origin
* Submit a Pull Request with details on your feature branch

Guidelines:
* Non-trivial changes should be discussed an an [issue](https://github.com/jasonrundell/sassyswine/issues) first

## Roadmap

Projected road map for Sassy Swine:

* Better Documentation on first-time setup of Node, Roby, SASS, etc on Windows
* File uploads, gzip compression, and hashing for Amazon S3

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
