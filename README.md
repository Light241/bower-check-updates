[![npm version](https://badge.fury.io/js/bower-check-updates.svg)](http://badge.fury.io/js/bower-check-updates)
[![npm stable version](https://img.shields.io/npm/v/bower-check-updates.svg?label=stable)](https://npmjs.org/package/bower-check-updates) 
[![Dependency Status](https://david-dm.org/se-panfilov/bower-check-updates.svg)](https://david-dm.org/se-panfilov/bower-check-updates) 
[![devDependency Status](https://david-dm.org/se-panfilov/bower-check-updates/dev-status.svg)](https://david-dm.org/se-panfilov/bower-check-updates#info=devDependencies) 
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/se-panfilov/bower-check-updates/blob/master/LICENSE)

What?
--------------
`bower-check-updates` - is totally clone of [npm-check-updates][1], but it updates bower.json dependencies (npm-check-updates updates nodejs's package.json).

All the code is writed by [tjunnone][2]. I have just renamed `package.json` to `bower.json` (and added [closest-bower][3] module instead of [closest-package][4]). So if you want to contribute - better do it to `npm-check-updates`, and I'll merge the changes (notify me if I'm not).

[![NPM](https://nodei.co/npm/bower-check-updates.png)](https://nodei.co/npm/bower-check-updates/)

bower-check-updates
--------------

`bower-check-updates` is a command-line tool that allows you to **find the latest versions of dependencies**, regardless of any version constraints in your `bower.json` file.

`bower-check-updates` can optionally upgrade your `bower.json` file to
use the latest available versions, all while **maintaining your
existing semantic versioning policies**.

Put plainly, it will upgrade your `"codemirror": "^4.0.0"` dependency to
`"codemirror": "^5.0.0"` when codemirror 5.0.0 is released.

Installation
--------------

```sh
npm install -g bower-check-updates
```

Please consider installing the unstable version to help test pre-release features. You may even find [some features](#history) you needed that are not yet in the stable version. 

```sh
npm install -g bower-check-updates@unstable
```

Usage
--------------

Show any new dependencies for the project in the current directory:
```sh
$ bcu

"bootstrap" can be updated from ^2.8.0 to ^2.11.0  (Installed: 2.8.8, Latest: 2.11.0)
"angular" can be updated from ^1.3.0 to ^2.0.0 (Installed: 1.3.2, Latest: 2.0.0)

Run with '-u' to upgrade your bower.json
```

Upgrade a project's bower.json:

> **Make sure your bower.json is in version control and all changes have been committed. This *will* overwrite your bower.json.**

```sh
$ bcu -u

"bootstrap" can be updated from ^3.0.0 to ^3.3.0 (Installed: 3.0.0, Latest: 3.30.4)

bower.json upgraded
```

Filter by package name:
```sh
# match mocha and should packages exactly
$ bcu -f mocha,should         

# match packages that start with "gulp-" using regex
$ bcu -f /^gulp-/             

# match packages that do not start with "gulp-". Note: single quotes are required 
# here to avoid inadvertant bash parsing
$ bcu -f '/^(?!gulp-).*$/'    
```

Options
--------------
    -d, --dev                check only devDependencies
    -h, --help               output usage information
    -f, --filter <packages>  list or regex of package names to search (all others
                             will be ignored). Note: single quotes may be required 
                             to avoid inadvertant bash parsing.
    -e, --error-level        set the error-level. 1: exits with error code 0 if no  
                             errors occur. 2: exits with error code 0 if no 
                             packages need updating (useful for continuous 
                             integration) (alpha release only)
    -g, --global             check global packages instead of in the current project
    -j, --jsonAll            output new package.json instead of human-readable
                             message
    --jsonUpgraded           output upgraded dependencies in json
    -p, --prod               check only dependencies (not devDependencies)
    --registry               specify third-party NPM registry
    -s, --silent             don't output anything
    -t, --greatest           find the highest versions available instead of the 
                             latest stable versions (alpha release only)
    -u, --upgrade            upgrade package.json dependencies to match latest 
                             versions (maintaining existing policy)
    -V, --version            output the version number

--------------

- Direct dependencies will be increased to the latest stable version:
  - 2.0.1 => 2.2.0
  - 1.2 => 1.3
-  Semantic versioning policies for levels are maintained while satisfying the latest version:
  - ^1.2.0 => ^1.3.0
  - 1.x => 2.x
- "Any version" is maintained:
  - \* => \*
- "Greater than" is maintained:
  - \>0.2.0 => \>0.3.0
- Closed ranges are replaced with a wildcard:
  - 1.0.0 \< 2.0.0 => ^3.0.0

Problems?
--------------

Please [file an issue on github](https://github.com/se-panfilov/bower-check-updates/issues).

Pull requests are welcome :)

[1]: https://github.com/tjunnone/npm-check-updates
[2]: https://github.com/tjunnone
[3]: https://github.com/se-panfilov/closest-bower
[4]: https://github.com/hughsk/closest-package


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/se-panfilov/bower-check-updates/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

