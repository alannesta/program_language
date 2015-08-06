var exec = require('child_process').exec;
var Q = require('q');
var jobQueue = [];

var fibonacci = 39;

var config = {
	python: {
		command: 'python fibo.py ' + fibonacci,
		target: 'fibo.py',
		cwd: './src'
	},
	ruby: {
		command: 'ruby fibo.rb ' + fibonacci,
		target: 'fibo.rb',
		cwd: './src'
	},
	javascript: {
		command: 'node fibo.js ' + fibonacci,
		target: 'fibo.js',
		cwd: './src'
	},
	java: {
		command: 'javac -d ./ ../src/Fibonacci.java && java -cp ./ Fibonacci ' + fibonacci,
		target: '',
		cwd: './bin'
	},
	c: {
		command: 'gcc -O2 -o ./fibo_c ../src/fibo.c && ./fibo_c ' + fibonacci,
		target: '',
		cwd: './bin'
	}
};

for (var key in config) {
	jobQueue.push(createTask(config[key]));
}
//jobQueue[0]().then(jobQueue[1]).then(jobQueue[2]).then(jobQueue[3]).then(jobQueue[4]);
//jobQueue[4]();

var start = Q.defer();
var task_in_progress  = Q.when(start.promise);

// it would be better to use async for brevity
jobQueue.forEach(function(nextTask) {
	task_in_progress = task_in_progress.then(nextTask);
});

start.resolve('gg');

function createTask(task) {
	return function() {
		var deferred = Q.defer();
		exec(task.command, {
			cwd: task.cwd
		}, cb(deferred));
		return deferred.promise;
	}
}

function cb(deferred) {
	return function(error, stdout) {
		if (error) {
			console.log(error);
		}
		console.log(stdout);
		deferred.resolve();
	}
}
