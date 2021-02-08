FROM php:7.3-fpm-alpine

RUN apk add --update \
    curl \
    wget \
    bash \
    #add symfony required dependendencies
    php7-ctype \
    php7-iconv \
    php7-json \
    pcre \
    php7-session \
    php7-simplexml \
    php7-tokenizer \
    #add postgres driver
    postgresql-dev \
    libpq \
#    #add postgres driver's dependencies
    php7-pdo \
    php7-pdo_pgsql \
    php7-pgsql \
    php7-mcrypt \
    libsodium \
    libsodium-dev \
    $PHPIZE_DEPS \
    && pecl install xdebug-2.9.4 \
    && docker-php-ext-enable xdebug \
    && rm -rf /var/cache/apk/* \
    #install composer
    && curl -sS https://getcomposer.org/installer | php \
#    #make composer global command
    && mv composer.phar /usr/local/bin/composer
#    && chmod 777 -R /var/www/backend-api/auth-service


#    #need for using symfony maker
RUN  composer require symfony/maker-bundle --dev \
   &&  composer require doctrine/annotations \
   &&  php -d memory_limit=-1 /usr/local/bin/composer require symfony/orm-pack

#adding php extension
RUN docker-php-ext-install  pdo \
                            pdo_pgsql \
                            pgsql \
                            sodium \
                            bcmath \
                            sockets

RUN  php -d memory_limit=-1 /usr/local/bin/composer require --dev symfony/phpunit-bridge \
    && wget https://get.symfony.com/cli/installer -O - | bash \
    #make symfony global
    &&  mv /root/.symfony/bin/symfony /usr/local/bin/symfony

RUN composer install

# Add AMQP extension
RUN apk add \
        --repository http://dl-cdn.alpinelinux.org/alpine/v3.6/main \
        --no-cache \
        rabbitmq-c-dev \
        && pecl install amqp \
        && docker-php-ext-enable amqp

# redis
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

# service name shoud change if needed
# CMD  php bin/console rabbitmq:consumer user_mailing -vvv
