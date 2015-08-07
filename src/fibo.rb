class FiboTest
	attr_accessor :cache_instance	# !important

	def initialize()
		@cache_instance = {}	# instance variable
	end

	@@cache = {}	# class variable
	# class method
	def self.fiboCached(n)	
		if @@cache.has_key?(n) then
			return @@cache[n]
		end
		if n == 0
			return 0
		end
		if n == 1
			return 1
		end
		@@cache[n] = self.fibo(n-1) + self.fibo(n-2)
		return @@cache[n]
	end

	def self.fibo(n)
		if n == 0
			return 0
		end
		if n == 1
			return 1
		end
		return self.fibo(n-1) + self.fibo(n-2)
	end

	#instance method
	# def fibo(n)
	# 	if @cache_instance.has_key?(n)
	# 		return @cache_instance[n]
	# 	end
	# 	if n == 0
	# 		return 0
	# 	end
	# 	if n == 1
	# 		return 1
	# 	end
	# 	@cache_instance[n] = fibo(n-1) + fibo(n-2)
	# 	return @cache_instance[n]
	# end

end

fibo = FiboTest.new
# puts fibo.cache_instance

t1 = Time.now
arg = 30
if !ARGV[0].nil? then
	arg = ARGV[0].to_i
end
# puts fibo.fibo(40)	# using instance method
puts FiboTest.fibo(arg)	# using class method
t2 = Time.now
elapsed = '%.2f' % ((t2-t1)*1000)
puts "Ruby Fibonacci #{arg}, Time elapsed #{elapsed} ms"
