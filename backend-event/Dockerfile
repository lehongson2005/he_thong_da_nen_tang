# backend-event/Dockerfile

# Sử dụng PHP 8.2 với Apache (dễ cấu hình nhất cho người mới)
FROM php:8.2-apache

# Cài đặt các thư viện hệ thống cần thiết cho Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl

# Cài đặt các PHP Extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Bật mod_rewrite của Apache (để Laravel xử lý URL đẹp)
RUN a2enmod rewrite

# Cài đặt Composer (Bộ quản lý thư viện PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Cấu hình Document Root của Apache trỏ vào thư mục public của Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
# Copy toàn bộ code vào container (nhưng chủ yếu ta sẽ dùng Volume để dev)
COPY . /var/www/html

# Cấp quyền cho thư mục storage (để Laravel ghi log/cache được)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache