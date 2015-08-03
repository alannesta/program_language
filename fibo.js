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
console.time('checkpoint');
console.log('result: ' + fibo(39));
console.timeEnd('checkpoint');