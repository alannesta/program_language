var exec = require('child_process').exec;
var Q = require('q');
var jobQueue = [];
var benchmark_result = {};

var fibonacci = 38;

var time_reg = /(\d+\.{0,1}\d{0,10})\s{0,1}ms/;	// the regx to extract time info from stdout
var language_reg = /(Javascript)|(Python)|(Ruby)|(Java)|(C)/;

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

task_in_progress.then(function() {
	console.log(benchmark_result);
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
		//benchmark_result.push(Math.floor(parseTime(stdout)));
		//parseLang(stdout);
		var lang = parseLang(stdout);
		var time = Math.floor(parseTime(stdout));

		if(lang !== undefined && time !== undefined) {
			benchmark_result[lang] = time;
		}
		deferred.resolve();
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


