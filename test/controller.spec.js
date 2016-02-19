'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('moda Controller generator', function() {
    var generatorPath = '../c';
    // not testing the actual run of generators yet
    it('can be required without throwing', function() {
        this.app = require(generatorPath);
    });

    describe('basic file creation', function() {
        var testArguments = 'test-name';
        var expectedContent = [
            ['app/scripts/test-name/test-name-c.js', /TestNameCtrl/],
            ['app/scripts/test-name/test-name-c.js', /module\('tmp'\)/],
            ['app/scripts/test-name/test-name-c.spec.js', /TestNameCtrl/],
            ['app/scripts/test-name/test-name-c.html', /class="page-test-name"/],
        ];
        var expected = [
            'app/scripts/test-name/test-name-c.js',
            'app/scripts/test-name/test-name-c.spec.js',
            'app/scripts/test-name/test-name-c.html',
            'app/scripts/test-name/_test-name-c.scss'
        ];

        var noFile = [
            'app/scripts/test-name/test-name-s.js',
            'app/scripts/test-name/test-name-f.js',
            'app/scripts/test-name-c.js'
        ];

        var nonExpected = [
            ['app/scripts/test-name/test-name-c.js', /TestNamea/],
            ['app/scripts/test-name/test-name-c.js', /testName/],
        ];

        var options = {
            'useDefaults': true,
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withArguments(testArguments)
                .withOptions(options)
                .on('end', function() {
                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([].concat(
                        noFile
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));
                    assert.noFileContent([].concat(
                        nonExpected
                    ));
                    done();
                });
        });
    });


    describe('files in sub folder creation', function() {
        var testArguments = 'test-name test-path';
        var expectedContent = [
            ['app/scripts/test-path/test-name/test-name-c.js', /TestNameCtrl/],
            ['app/scripts/test-path/test-name/test-name-c.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name/test-name-c.spec.js', /TestNameCtrl/],
            ['app/scripts/test-path/test-name/test-name-c.html', /class="page-test-name"/],
        ];
        var expected = [
            'app/scripts/test-path/test-name/test-name-c.js',
            'app/scripts/test-path/test-name/test-name-c.spec.js',
            'app/scripts/test-path/test-name/test-name-c.html',
            'app/scripts/test-path/test-name/_test-name-c.scss'
        ];

        var noFile = [
            'app/scripts/test-path/test-name/test-name-s.js',
            'app/scripts/test-path/test-name/test-name-f.js',
            'app/scripts/test-name-c.js'
        ];

        var nonExpected = [
            ['app/scripts/test-path/test-name/test-name-c.js', /testName/]
        ];

        var options = {
            'useDefaults': true,
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))
        });

        it('creates expected files', function(done) {
            runGen
                .withArguments(testArguments)
                .withOptions(options)
                .on('end', function() {
                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([].concat(
                        noFile
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));
                    assert.noFileContent([].concat(
                        nonExpected
                    ));
                    done();
                });
        });
    });


    describe('file with service creation and no template (in sub folder)', function() {
        var testArguments = 'test-name test-path';
        var expectedContent = [
            ['app/scripts/test-path/test-name/test-name-c.js', /TestNameCtrl/],
            ['app/scripts/test-path/test-name/test-name-c.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name/test-name-s.js', /module\('tmp'\)/],
            ['app/scripts/test-path/test-name/test-name-s.js', /TestName/],
            ['app/scripts/test-path/test-name/test-name-s.spec.js', /TestName/]
        ];
        var expected = [
            'app/scripts/test-path/test-name/test-name-c.js',
            'app/scripts/test-path/test-name/test-name-c.spec.js',
            'app/scripts/test-path/test-name/test-name-s.js',
            'app/scripts/test-path/test-name/test-name-s.spec.js'
        ];

        var noFile = [
            'app/scripts/test-path/test-name/test-name-f.js',
            'app/scripts/test-path/test-name/test-name-f.spec.js',
            'app/scripts/test-name-c.js',
            'app/scripts/test-path/test-name/test-name-c.html',
            'app/scripts/test-path/test-name/_test-name-c.scss'
        ];

        var nonExpected = [];

        var options = {
            'skipInject': true
        };

        var runGen;

        beforeEach(function() {
            runGen = helpers
                .run(path.join(__dirname, generatorPath))
                .inDir(path.join(__dirname, '.tmp'))

        });

        it('creates expected files', function(done) {
            runGen
                .withArguments(testArguments)
                .withPrompts({
                    createService: 'service',
                    createTemplate: false
                })
                .withOptions(options)
                .on('end', function() {
                    assert.file([].concat(
                        expected
                    ));
                    assert.noFile([].concat(
                        noFile
                    ));
                    assert.fileContent([].concat(
                        expectedContent
                    ));
                    assert.noFileContent([].concat(
                        nonExpected
                    ));
                    done();
                });
        });
    });
});