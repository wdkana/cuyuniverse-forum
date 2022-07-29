<h2 align="center"><img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/> LARACT9 🐱‍💻, CUY UNIVERSE PROJECT <img src="https://media.giphy.com/media/12oufCB0MyZ1Go/giphy.gif" width="50"></h2>

<p align="center"><em>Tech Entertainer <a href="https://youtube.com/deaafrizal">youtube.com/deaafrizal
</a><img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"> 
</em></p>

<p align="center">
    <a href="https://github.com/deaaprizal/laract9/issues"><img src="https://img.shields.io/github/issues/deaaprizal/laract9" alt="GitHub issues"></a>
    <a href="https://github.com/deaaprizal/laract9"><img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/deaaprizal/laract9"></a>
    <a href="https://github.com/deaaprizal/laract9/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/deaaprizal/laract9"></a>
</p>

<p align="center">
  <a href="https://github.com/ideaaprizal/laract9/blob/main/CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/deaaprizal/laract9/issues/new">Submit an Issue</a>
  <br>

 <p align="center">
    <a href="https://github.com/deaaprizal/laract9/"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/deaaprizal/laract9?style=social"></a>
    <a href="https://github.com/deaaprizal/laract9/"><img alt="GitHub forks" src="https://img.shields.io/github/forks/deaaprizal/laract9?style=social"></a>
  </p>
</p>

<br>

## 📫 Join projek isengan ini?
Cek staging server https://cuyuniverse.co

<br>

## CUYUNIVERSE
CuyUniverse adalah project terbuka untuk siapa saja yang mau belajar ngoding terutama dengan pemilihan 2 bahasa pemrograman (PHP & Javascript).
3 core stack yang digunakan saat ini: LARAVEL9, REACTJS & MYSQL
FORK atau coba-coba di clone project ini sekarang di lokal komputer kalian masing-masing.


<br/>

## Development Setup
### Prerequisites
- Pertama, pastikan kalian sudah punya [PHP](https://php.net).
- Kedua, mempunyai [nodejs](https://nodejs.org) beserta [Node Package Manager](https://www.npmjs.com/get-npm) atau [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- Ketiga, jangan lupa kalian sudah terinstall juga [Composer](https://getcomposer.org)
- Terakhir, pastikan kalian juga sudah punya database relasional seperti [MySQL](https://www.mysql.com/downloads/), [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) atau [SQLite](https://www.sqlite.com/download.html)

### Setting Up Project

Silahkan fork terlebih dahulu repository ini, kemudian clone repository yang udah kalian fork ya (Inget repository yang kalian fork, bukan repository ini). 
Bisa gunakan command berikut:
```bash
git clone git@github.com:{username github kalian}/laract9.git
# atau kalo kalian pake https (bukan ssh)
git clone https://github.com/{username github kalian}/laract9.git
```
Kemudian, buka terminal seperti bash, zsh, command prompt atau powershell dan nstall dependency composer dengan command berikut
```bash
composer install && composer update
```
Lanjut, copy file `.env.example` dengan nama `.env` sebagai berikut:
```bash
cp .env.example .env
```
Kemudian, silahkan ganti credentials database di file .env nya seperti
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=xxx
DB_USERNAME=root
DB_PASSWORD=
```
untuk panduan atau dokumentasi mengenai setup database pada file `.env` bisa kalian baca pada dokumentasi resmi laravelnya ya cui, [klik disini.](https://laravel.com/docs/9.x/database)

Kemudian, silahkan migrate semua database di project ini dengan menggunakan artisan command:
```bash
php artisan migrate
```
Lanjut, generate aplikasi key untuk keamanan pada project laravel dengan menggunakan artisan command berikut:
```bash
php artisan key:generate
# atau 
php artisan key:generate --show
```
Install dependencies nodejs didalam folder `node_modules` menggunakan Npm atau Yarn:
```bash
npm install && npm run dev
# atau menggunakan Yarn
yarn && yarn dev
# atau menggunakan pnpm
pnpm i && pnpm dev
```
Langkah Terakhir, silahkan jalankan local development server Laravel dengan menggunakan artisan command sebagai berikut:
```bash
php artisan serve
```
Project ini akan berjalan di `https://localhost:8080`.

Untuk mengenai bagaimana cara untuk berkontribusi dalam pengembangan project ini bisa kalian lihat pada dokumentasi tentang [CONTRIBUTING.md](https://github.com/deaaprizal/laract9/blob/main/CONTRIBUTING.md) ya cui.


<br>

## Contributing
### Contributing Guidelines
Kalian juga bisa kunjungi [CONTRIBUTING.md](https://github.com/deaaprizal/laract9/blob/main/CONTRIBUTING.md) untuk bagaimana cara berkontribusi ke project ini ya cui.
### Want To Help?
Ingin melaporkan bug, menyumbangkan beberapa kode, atau meningkatkan dokumentasi? Tentu bisa cui, kalian bisa baca [panduan](https://github.com/deaaprizal/laract9/blob/main/CONTRIBUTING.md) untuk berkontribusi.
### Code Of Conduct
Bantu menjaga project ini tetap terbuka dan selalu terupdate ya cui. Harap baca dan ikuti [Code Of Conduct]().

<br>

## Security Vulnerabilities
Jika kali menemukan kerentanan keamanan dalam project ini, silahkan untuk buka issue. Semua kerentanan keamanan akan segera ditangani.

<br>

## Discussions
Bebaskan jiwa codingmu dan mari berdiskusi mengenai fitur, keamanan atau yang lain ya cui, bisa kalian kunjungi forum [diskusi](https://github.com/deaaprizal/laract9/discussions)

<br>

## Community
Gabung komunitas CUYUNIVERSE dan ramaikan ya cui:
- [Youtube](https://youtube.com/deaafrizal)
- [Discord]()

<br>

## All Contributors
Terima kasih atas peran kontribusi kalian di project CUYUNIVERSE ini ya cui, berikut adalah para kontributor hebat yang sudah menyumbangkan ide idenya!

<a href="https://github.com/deaaprizal/laract9/graphs/contributors"><img src="https://contrib.rocks/image?repo=deaaprizal/laract9" alt="All of amazing contributors"></a>
