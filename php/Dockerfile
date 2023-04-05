FROM php:8.1-fpm

RUN apt-get update && apt-get install -y git unzip \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
		&& docker-php-ext-install -j$(nproc) gd pdo_mysql

WORKDIR /srv/app

COPY --from=composer /usr/bin/composer /usr/bin/composer