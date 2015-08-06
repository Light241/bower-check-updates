var bcu            = require("../lib/bower-check-updates.js");
var chai           = require("chai");
var chaiAsPromised = require("chai-as-promised");
var fs             = require('fs');

chai.use(chaiAsPromised);

describe('bower-check-updates', function () {

    this.timeout(30000);

    describe('run', function () {
        it('should return promised jsonUpgraded', function () {
            return bcu.run({
                    packageData: fs.readFileSync(__dirname + '/bcu/bower.json', 'utf-8')
                })
                .should.eventually.have.property('bootstrap');
        });
    });

});
