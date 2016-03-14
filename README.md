# Response Tracker
Canned response manager built with AngularJS

## Installation

1. If you haven't already, **Install** [NodeJS](http://nodejs.org).
2. Clone or [Download](https://github.com/kterns/response-tracker/archive/master.zip) this repo.
3. Install modules specified in [package.json](https://github.com/kterns/response-tracker/blob/master/package.json).
```shell
$ npm install
```

## Build and start site
1. **Rename** _gulpfile-public.js_ to _gulpfile.js_.
2. **Build** site, **Start** [local server](http://localhost:8079), and watch for file changes.
```shell
$ gulp
```

### Popular commands

Build the web site, start node server at [http://localhost:8079](http://localhost:8079), and watch for file changes.

```shell
$ gulp
```

Build the web site
```shell
$ gulp build
```

Build the web site for test deployment
```shell
$ gulp build --test
```

Build the web site for production deployment
```shell
$ gulp build --production
```

### All commands

Check out the [gulpfile.js](https://github.com/kterns/response-tracker/blob/master/gulpfile-public.js). If you haven't used [Gulp](http://gulpjs.com/), take a look at the [Gulp docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).
