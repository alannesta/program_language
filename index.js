var exec = require('child_process').exec;
var Q = require('q');
var path = require('path');
var benchmark_result = {};
var async = require('async');
var fs = require('fs');

var fibonacci = 32;

var time_reg = /(\d+\.{0,1}\d{0,10})\s{0,1}ms/;	// the regx to extract time info from stdout
var language_reg = /(Javascript)|(Python)|(Ruby)|(Java)|(C)/;

var config = {
    python: {
        command: 'python fibo.py ' + fibonacci,
        target: 'fibo.py',
        cwd: path.join(__dirname, 'src')
    },
    ruby: {
        command: 'ruby fibo.rb ' + fibonacci,
        target: 'fibo.rb',
        cwd: path.join(__dirname, 'src')
    },
    javascript: {
        command: 'node fibo.js ' + fibonacci,
        target: 'fibo.js',
        cwd: path.join(__dirname, 'src')
    },
    java: {
        command: 'javac -d ./ ../src/Fibonacci.java && java -cp ./ Fibonacci ' + fibonacci,
        target: '',
        cwd: path.join(__dirname, 'bin')
    },
    c: {
        command: 'gcc -O2 -o ./fibo_c ../src/fibo.c && ./fibo_c ' + fibonacci,
        target: '',
        cwd: path.join(__dirname, 'bin')
    }
};

/**
 * Exposed interfaces
 */


function runBenchmark(serverFn) {

    ensureDirectoryExists('./bin');

    // reset benchmark_result
    benchmark_result = {};
    var deferred = Q.defer();

    var jobQueue = [];

    for (var key in config) {
        jobQueue.push(createAsyncTask(config[key], serverFn));
    }

    async.series(jobQueue, function (err) {
        if (err) {
            deferred.reject('task failed');
        } else {
            deferred.resolve();
        }
    });

    return deferred;
}

/**
 * Helper functions
 */

/**
 * Init module folder structure
 */

function ensureDirectoryExists(path, mask, callback) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        callback = mask;
        mask = 0777;
    }
    if (!callback) {
        callback = function() {
            console.log(Array.prototype.slice.call(arguments));
        }
    }
    fs.mkdir(path, mask, function (err) {
        if (err) {
            if (err.code == 'EEXIST') callback(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else {
            callback(null); // successfully created folder
        }
    });
}

function setFibo(fibo) {
    fibonacci = fibo;
}

/**
 * @description create a job in for async.series to consume
 * @param task
 * @param serverFn    The function to be executed when the node.exec job is done
 * @returns {Function}
 */
function createAsyncTask(task, serverFn) {
    return function (callback) {
        exec(task.command, {
            cwd: task.cwd
        }, function (error, stdout) {
            var lang = parseLang(stdout);
            var time = Math.floor(parseTime(stdout));

            if (lang !== undefined && time !== undefined) {
                benchmark_result[lang] = time;
            }

            if (serverFn) {
                serverFn(benchmark_result);
            }

            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    }
}

/**
 * @description normal task creation which retruns a promise
 * @param task
 * @returns {Function}
 */
function createTask(task) {
    return function () {
        var deferred = Q.defer();
        exec(task.command, {
            cwd: task.cwd
        }, cb(deferred));
        return deferred.promise;
    }
}


function cb(deferred) {
    return function (error, stdout) {
        if (error) {
            console.log(error);
        }
        console.log(stdout);
        //benchmark_result.push(Math.floor(parseTime(stdout)));
        //parseLang(stdout);
        var lang = parseLang(stdout);
        var time = Math.floor(parseTime(stdout));

        if (lang !== undefined && time !== undefined) {
            benchmark_result[lang] = time;
        }
        deferred.resolve(benchmark_result);
    }
}

function parseTime(stdout) {
    //var time_used = stdout.match(time_reg);
    return time_reg.exec(stdout)[1];
    //console.log(time_used[1]);
}

function parseLang(stdout) {
    return language_reg.exec(stdout)[0];
}

exports.runBenchmark = runBenchmark;
exports.setFibo = setFibo;
