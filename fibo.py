import time
def fibo(n):
	if (n == 1 or n == 0):
		return 1
	return fibo(n-1) + fibo(n-2)

def main():
	now = time.time()
	print(fibo(35))
	print 'Time elapsed: {0} milli seconds'.format((time.time() - now)*1000)

if __name__ == "__main__":
	main()