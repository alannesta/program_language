var spawn = require('child_process').spawn

python = spawn('python', ['fibo.py'], {
	cwd: './src'
});


python.stdout.on('data', function(data) {
	console.log('stdout: ' + data);
});