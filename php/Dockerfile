FROM php:8.1-fpm

RUN apt-get update && apt-get install -y git unzip \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
        libicu-dev \
        && docker-php-ext-configure intl \
		&& docker-php-ext-install -j$(nproc) gd pdo_mysql intl

WORKDIR /srv/app

COPY --from=composer /usr/bin/composer /usr/bin/composer