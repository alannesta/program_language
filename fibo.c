#include <time.h>
#include <stdio.h> 
#include <sys/time.h>

int fibo(n) {
	if (n == 0 || n == 1) {
		return 1;
	}

	return fibo(n-1) + fibo(n-2);
}

int main() {
	struct timeval start, finish;
	clock_t begin, end, elapsed;
	
	gettimeofday( &start, NULL );
	begin = clock();	// clock measures CPU time rather than 'real' time

	printf("result: %d\n", fibo(43));
    
    gettimeofday( &finish, NULL );
	end = clock();
	
	elapsed = (double)(end-begin) / CLOCKS_PER_SEC;
	int timeuse = (1000000 * ( finish.tv_sec - start.tv_sec ) + finish.tv_usec -start.tv_usec) / 1000;

    printf("Time used: %d ms\n", timeuse);
	printf("Time elapsed: %ld s\n", elapsed);
}