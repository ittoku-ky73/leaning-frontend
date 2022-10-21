# PHP post example

ここでは、PHPのフォームデータの受け取りの例を書いています。このフォルダをコピーして以下の手順に従うことで、動作を確認することができます。

1. `docker build -t php-myapp .`
2. `docker run --rm -p 80:80 -v ${PWD}/src:/var/www/html --name php-post-example php-myapp`
3. open http://localhost:80

また以下の環境でのみ動作確認をしております。

- Mac OS Montery12.6

- Docker version 20.10.14
