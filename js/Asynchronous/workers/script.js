const generateBtn = document.querySelector('#generate');
const reloadBtn = document.querySelector('#reload');
const quota = document.querySelector('#quota');
const input = document.querySelector('#user-input');
const output = document.querySelector('#output');

// generate.jsファイルのワーカーのインスタンスを生成
const worker = new Worker('./generate.js');

/* generate button click event
 * workerにcommand, quotaの入ったメッセージを送信
 */
generateBtn.addEventListener('click', () => {
  const value = quota.value;

  worker.postMessage({
    command: 'generate',
    quota: value,
  });
});

/* reload button click event
 * ページをリロードする
 */
reloadBtn.addEventListener('click', () => {
  input.value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

/* worker message event
 * workerから送られてきたメッセージを出力する
 */
worker.addEventListener('message', (message) => {
  const primes = message.data;

  output.textContent = `Finished generating ${primes.length} primes!`;
  input.textContent = `Primes: ${message.data.join(', ')}`;
});
