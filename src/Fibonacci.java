import java.util.HashMap;

public class Fibonacci {
	
	private HashMap<Integer, Integer> cache = new HashMap<Integer, Integer>();
	
	public int fiboCached(int n) {
		if (cache.get(n) != null) {
			return cache.get(n);
		}
		if (n == 0) {
			return 0;
		}
		if (n == 1) {
			return 1;
		}
		this.cache.put(n, fibo(n-1) + fibo(n-2));
		return cache.get(n);
	}

	public int fibo(int n) {
		if (n == 0) {
			return 0;
		}
		if (n == 1) {
			return 1;
		}
		return fibo(n-1) + fibo(n-2);	
	}

	public static void main(String[] args) {
		Fibonacci fibo = new Fibonacci();
		int arg = 30;
		long timeFlag = System.currentTimeMillis();
		if (args.length > 0) {
			arg = Integer.parseInt(args[0]);
		}
		System.out.println(fibo.fibo(arg));
		System.out.println("Java Fibonacci: " + arg + ", Time elapsed: " + (System.currentTimeMillis() - timeFlag) + "ms");
	}
}
