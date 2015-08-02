public class Fibonacci {
	public int fibo(int n) {
		if (n == 0 || n == 1) {
			return 1;
		}
		return fibo(n-1) + fibo(n-2);
	}
	public static void main(String[] args) {
		Fibonacci fibo = new Fibonacci();
		long timeFlag = System.currentTimeMillis();
		System.out.println(fibo.fibo(43));
		System.out.println("Time elapsed: " + (System.currentTimeMillis() - timeFlag) + "ms");
	}
}
