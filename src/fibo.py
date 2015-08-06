import time, sys

#cache = {}	# python dictionary
cache = dict()

def fiboCached(n):
	if (n in cache):	# if (cache[n] is not None) will throw an exception in python
		return cache[n]
	if (n == 1):
		return 1
	if (n == 0):
		return 0
	
	cache[n] = fibo(n-1) + fibo(n-2)
	return cache[n]

def fibo(n):

	if (n == 1):
		return 1
	if (n == 0):
		return 0
	
	return fibo(n-1) + fibo(n-2)

def main():
	now = time.time()

	if (len(sys.argv) > 1):
		arg = int(sys.argv[1])
	else:
		arg = 30

	print(fibo(arg));
	print 'Python Fibonacci ' + str(arg) + ': Time elapsed: {0} milli seconds'.format((time.time() - now)*1000)

if __name__ == "__main__":
	main()