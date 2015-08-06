#include <time.h>
#include <stdio.h> 
#include <sys/time.h>

int fibo(n) {
	if (n == 0) {
		return 0;
	}

	if (n == 1) {
		return 1;
	}

	return fibo(n-1) + fibo(n-2);
}

int main(int argc, char *argv[]) {
	struct timeval start, finish;
	clock_t begin, end, elapsed;
	
	gettimeofday( &start, NULL );

	int arg = 30;
	if (argc > 1) {
		arg = atoi(argv[1]);	// ASCII to integer
	}
	// begin = clock();	// clock measures CPU time rather than 'real' time
	printf("%d\n", fibo(arg));

    gettimeofday( &finish, NULL );
	// end = clock();
	
	elapsed = (double)(end-begin) / CLOCKS_PER_SEC;
	int timeuse = (1000000 * ( finish.tv_sec - start.tv_sec ) + finish.tv_usec -start.tv_usec) / 1000;

    printf("C Fibonacci %d---> Time used: %d ms\n", arg, timeuse);
//	printf("Time elapsed: %ld s\n", elapsed);
}