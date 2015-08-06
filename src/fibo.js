var cache = {};
function fibo(n) {
	if (cache[n] !== undefined) {
		return cache[n];
	}
	if (n === 0 ) {
		return 0;
	}
	if (n === 1) {
		return 1;
	}
	cache[n] = fibo(n-1) + fibo(n-2);
	return cache[n];
}
console.time('JS checkpoint');

var arg = process.argv[2] ? process.argv[2]: 30;
console.log('JS --> fibonacci ' + arg +' result: ' + fibo(arg));

console.timeEnd('JS checkpoint');