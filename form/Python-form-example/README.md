# Python form example

ここでは、PythonのFlaskのフォームデータの受け取りの例を書いています。このフォルダをコピーして以下の手順に従うことで、動作を確認することができます。

1. `docker build -t python-flask .`
2. `docker run --rm -p 5001:5000 -v ${PWD}/app:/app --name python-post-example python-flask`
3. open http://localhost:5001

また以下の環境でのみ動作確認をしております。

- Mac OS Montery12.6

- Docker version 20.10.14
