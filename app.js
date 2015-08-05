var exec = require('child_process').exec;
var Q = require('q');
var jobQueue = [];


var config = {
	python: {
		command: 'python fibo.py',
		target: 'fibo.py',
		cwd: './src'
	},
	ruby: {
		command: 'ruby fibo.rb',
		target: 'fibo.rb',
		cwd: './src'
	},
	javascript: {
		command: 'node fibo.js',
		target: 'fibo.js',
		cwd: './src'
	},
	java: {
		command: 'java -cp Fibonacci',
		target: '',
		cwd: './bin'
	},
	c: {
		command: './fibo_c',
		target: '',
		cwd: './bin'
	}
};

for (var key in config) {
	jobQueue.push(function() {
		return function() {
			var deferred = Q.defer();
			exec(config[key].command, {
				cwd: config[key].cwd
			}, cb(deferred));
			return deferred.promise;
		}
	}());
}

//jobQueue[1]().then(jobQueue[2]).then(jobQueue[3]);
jobQueue[2]();

function cb(deferred) {
	return function(error, stdout) {
		if (error) {
			console.log(error);
		}
		console.log(stdout);
		deferred.resolve();
	}
}


//python = exec('python fibo.py', {
//	cwd: './src'
//}, function(error, stdout) {
//	if (error) {
//		console.log(error);
//	}
//	console.log(stdout);
//});
//
//python.on('close', function(code) {
//	console.log('Python process close with code: ' + code)
//});