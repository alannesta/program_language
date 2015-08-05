import time

#cache = {}	# python dictionary
cache = dict()

def fibo(n):

	# if (n in cache):	# if (cache[n] is not None) will throw an exception in python
	# 	return cache[n]
	if (n == 1):
		return 1
	if (n == 0):
		return 0
	
	cache[n] = fibo(n-1) + fibo(n-2)
	return cache[n]


def main():
	now = time.time()
	print(fibo(35))
	print 'Python: Time elapsed: {0} milli seconds'.format((time.time() - now)*1000)

if __name__ == "__main__":
	main()