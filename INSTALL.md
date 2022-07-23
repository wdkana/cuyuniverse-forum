# Cara Menginstall dan Setup Projek Cuy Universe
Ok, untuk penginstallan dan setupnya, kita akan bagi menjadi 2 yaitu [Windows](#windows) dan [Linux](#linux)

## Linux
buat kalian pengguna linux, kalian bisa mengikuti langkah-langkah dibawah ini untuk ikut berkontribusi diprojek ini

ok pertama-tama silahkan kalian download xampp terlebih dahulu [DISINI](https://downloadsapachefriends.global.ssl.fastly.net/8.0.19/xampp-linux-x64-8.0.19-0-installer.run?from_af=true)

jika sudah, silahkan buka terminal kalian dan ketik command dibawah ini, kemudian ikuti petunjuk penginstallannya
```bash
cd ~/Downloads && chmmod +x ./xampp-linux-x64-8.0.19-0-installer.run && sudo ./xampp-linux-x64-8.0.19-0-installer.run
```

jika sudah selesai, silahkan download composer terlebih dahulu, untuk cara mudahnya, kalian bisa ketik command berikut diterminal kalian
```bash
sudo curl -s https://getcomposer.org/installer | /opt/lampp/bin/php
```
kemudian kita akan buat symlink php nya agar dapat dijalankan secara global
```bash
sudo ln -s /opt/lampp/bin/php /usr/local/bin/php
```
kemudian kita akan mengcopy composer.phar ke /usr/bin/composer agar command `composer` dapat dijalankan secara global
```bash
sudo mv composer.phar /usr/local/bin/composer
```
kemudian, kita akan memberikan akses user kita ke htdocs, sebelum itu silahkan kalian cek terlebih dahulu dengan mengetik `whoami` diterminal kalian, jika sudah silahkan ketik command berikut
```bash
sudo chown nama_user:nama_user /opt/lampp/htdocs
```

sekarang, silahkan cek terlebih dahulu composer kalian sudah terinstall atau belum, jika sudah terinstall, silahkan fork repository ini(caranya dapat dilihat disini https://docs.github.com/en/get-started/quickstart/fork-a-repo)

jika sudah, clone projek ini dengan url github kalian
```bash
cd /opt/lampp/htdocs && git clone https://github.com/{username_github_kalian}/laract9 cuy-universe && cd cuy-universe
```
kemudian install required packagenya
```bash
composer install && npm install
```
kemudian, copy file `.env.example` dan paste dengan nama `.env`
```bash
cp .env.example .env
```

jika sudah, kalian bisa setup terlebih dahulu environmentnya seperti database, smtp servernya, dll.

sebelum menjalankan projeknya, kita akan generate app key laravelnya
```bash
php artisan key:generate
```

kemudian jalankan projeknya deh
```bash
php artisan serve
```
dan buka satu terminal lagi untuk mengcompile reactjs nya
```
npm run dev --watch
```

## Windows

coming soon