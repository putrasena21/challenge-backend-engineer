# Todos app api

### Teknologi yang digunakan

- Menggunakan NodeJS sebagai runtime dan ExpressJS sebagai server
- Menggunakan PostgreSQL untuk database dan Sequelize sebagai ORM
- Menggunakan jsonwebtoken untuk generate token dan passport-jwt sebagai middleware untuk authentikasi user
- Menggunakan fastest-validator untuk validasi input user
- Menggunakan multer untuk upload file dengan multipart/form-data
- Menggunakan imagekit sebagai cloud storage untuk menyimpan data gambar yang telah di upload

### Alasan Menggunakan Pattern Ini

Dengan menggunakan pattern ini saya dapat membuat struktur folder sesuai dengan apa yang inginkan. Dengan pattern ini foldernya dipisahkan berdasarkan fungsinya, seperti pada folder validator berisi schecma data untuk fastest-validator, lalu pada folder lib dan helpers berisi beberapa fungsi yang dapat saya gunakan berulang-ulang, pada folder routes hanya berisi routing.
