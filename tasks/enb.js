/*
 * grunt-enb
 * https://github.com/megatolya/grunt-enb
 *
 * Copyright (c) 2013 Anatoliy Ostrovskiy
 * Licensed under the MIT license.
 */

'use strict';

var resolve = require('path').resolve.bind(null, process.cwd()),
    extend = function (a, b) { for (var x in b) {a[x] = b[x];  } return a; };

module.exports = function(grunt) {
    var enbBuilder = require('enb/lib/api/make');

    grunt.registerMultiTask('enb', 'enb make for project', function () {
        if (!this.data.targets)
            return grunt.log.error('no targets provided');

        var done = this.async(),
            options = extend(this.options({
                    noLog: false
                }), {
                    cdir: resolve(this.options().projectPath || './')
                }
            ),
            _this = this;

        this.data.env && extend(process.env, this.data.env);
        this.data.beforeBuild && this.data.beforeBuild();
        enbBuilder(this.data.targets, options).then(function () {
            grunt.log.write('enb make...').ok();
            _this.data.afterBuild && _this.data.afterBuild();
            done();
        }, function (err) {
            return grunt.log.error(err);
        });
    });
};
