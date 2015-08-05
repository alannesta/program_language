class FiboTest
	attr_accessor :cache_instance	# !important

	def initialize()
		@cache_instance = {}	# instance variable
	end

	@@cache = {}	# class variable
	# class method
	def self.fibo(n)	
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
puts fibo.cache_instance

t1 = Time.now
# puts fibo.fibo(40)	# using instance method
puts FiboTest.fibo(40)	# using class method
t2 = Time.now
puts "Ruby: Time elapsed #{t2-t1}"
