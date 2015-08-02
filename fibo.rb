class FiboTest
	def fibo(n)
		if n==0 || n==1 then
			1
		else
			fibo(n-1) + fibo(n-2)
		end
	end
end

fibo = FiboTest.new

t1 = Time.now
puts fibo.fibo(35)
t2 = Time.now
puts "Time elapsed #{t2-t1}"
