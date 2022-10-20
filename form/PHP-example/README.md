# Docker PHP apache example

ここでは、PHPのフォームデータの受け取りの例を書いています。このフォルダをコピーして以下の手順に従うことで、動作を確認することができます。

1. run `docker run -p 80:80 --name my-apache-php-app -v "$PWD"/src:/var/www/html php:apache`
2. open http://localhost:80

また以下の環境でのみ動作確認をしております。

- Mac OS Montery12.6

- Docker version 20.10.14
