function fibo(n) {
	if (n === 0 || n === 1) {
		return 1;
	}

	return fibo(n-1) + fibo(n-2);
}
console.time('checkpoint');
console.log('result: ' + fibo(43));
console.timeEnd('checkpoint');