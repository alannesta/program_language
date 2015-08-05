import java.util.HashMap;

public class Fibonacci {
	
	private HashMap<Integer, Integer> cache = new HashMap<Integer, Integer>();
	
	public int fibo(int n) {
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
	public static void main(String[] args) {
		Fibonacci fibo = new Fibonacci();
		long timeFlag = System.currentTimeMillis();
		System.out.println(fibo.fibo(31));
		System.out.println("Java Time elapsed: " + (System.currentTimeMillis() - timeFlag) + "ms");
	}
}
