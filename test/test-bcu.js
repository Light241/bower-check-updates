var bcu            = require("../lib/bower-check-updates.js");
var chai            = require("chai");
var fs              = require('fs');
var spawn           = require('spawn-please')
var BluebirdPromise = require('bluebird')

chai.use(require("chai-as-promised"));
chai.use(require('chai-string'))

spawn.Promise = BluebirdPromise;

describe('bower-check-updates', function () {

    this.timeout(30000);

    describe('run', function () {
        it('should return promised jsonUpgraded', function () {
            return bcu.run({
                    packageData: fs.readFileSync(__dirname + '/bcu/bower.json', 'utf-8')
                })
                .should.eventually.have.property('express');
        });
    });

    describe('cli', function() {

        it('should accept stdin', function() {
            return spawn('node', ['bin/bower-check-updates'], '{ "dependencies": { "express": "1" } }')
                .then(function (output) {
                    output.trim().should.startWith('express')
                });
        });

        it('should output json with --jsonAll', function() {
            return spawn('node', ['bin/bower-check-updates', '--jsonAll'], '{ "dependencies": { "express": "1" } }')
                .then(JSON.parse)
                .then(function (pkgData) {
                    pkgData.should.have.property('dependencies');
                    pkgData.dependencies.should.have.property('express');
                });
        });

        it('should output only upgraded with --jsonUpgraded', function() {
            return spawn('node', ['bin/bower-check-updates', '--jsonUpgraded'], '{ "dependencies": { "express": "1" } }')
                .then(JSON.parse)
                .then(function (pkgData) {
                  pkgData.should.have.property('bootstrap');
                });
        });

        it('should read --packageFile', function() {
            var tempFile = 'test/temp_package.json';
            fs.writeFileSync(tempFile, '{ "dependencies": { "bootstrap": "1" } }', 'utf-8')
            return spawn('node', ['bin/bower-check-updates', '--jsonUpgraded', '--packageFile', tempFile])
                .then(JSON.parse)
                .then(function (pkgData) {
                    pkgData.should.have.property('bootstrap');
                })
                .finally(function () {
                    fs.unlinkSync(tempFile);
                });
        });

        it('should write to --packageFile', function() {
            var tempFile = 'test/temp_package.json';
            fs.writeFileSync(tempFile, '{ "dependencies": { "bootstrap": "1" } }', 'utf-8')
            return spawn('node', ['bin/bower-check-updates', '-u', '--packageFile', tempFile])
                .then(function (output) {
                    var ugradedPkg = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
                    ugradedPkg.should.have.property('dependencies');
                    ugradedPkg.dependencies.should.have.property('bootstrap');
                    ugradedPkg.dependencies.bootstrap.should.not.equal('1')
                })
                .finally(function () {
                    fs.unlinkSync(tempFile);
                });
        });

        it('should ignore stdin if --packageFile is specified', function() {
            var tempFile = 'test/temp_package.json';
            fs.writeFileSync(tempFile, '{ "dependencies": { "bootstrap": "1" } }', 'utf-8')
            return spawn('node', ['bin/bower-check-updates', '-u', '--packageFile', tempFile], '{ "dependencies": {}}')
                .then(function (output) {
                    var ugradedPkg = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
                    ugradedPkg.should.have.property('dependencies');
                    ugradedPkg.dependencies.should.have.property('bootstrap');
                    ugradedPkg.dependencies.bootstrap.should.not.equal('1')
                })
                .finally(function () {
                    fs.unlinkSync(tempFile);
                });
        });
    });

});
