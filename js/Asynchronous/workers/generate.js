/* worker recieve message event
 * このファイルのワーカーインスタンスからメッセージが送られてきた時に実行する
 */
addEventListener('message', (message) => {
  if (message.data.command === 'generate') {
    generatePrimes(message.data.quota);
  }
});

// quota回、乱数を生成して素数かどうかを判定。素数の配列を返す。
function generatePrimes(quota) {
  const primes = [];
  const maximum = 1000000;

  // 素数かどうか返す
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));

    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  postMessage(primes);
}
