# 📚 CRUD Siswa – Bahan Ajar Kelas 12 RPL

**Zero setup di PC siswa.**  
Tidak perlu install Node.js, npm, XAMPP, MySQL, atau apapun di laptop.  
Cukup punya akun GitHub + Railway → deploy → langsung jalan.

---

# 🚀 PANDUAN DEPLOY KE RAILWAY (LENGKAP)

Panduan ini ditulis se-detail mungkin supaya bisa diikuti bahkan oleh yang baru pertama kali pakai Railway.

---

## BAGIAN 0: YANG PERLU DISIAPKAN SEBELUM MULAI

### Akun yang dibutuhkan
| No | Akun | Link | Keterangan |
|----|------|------|----------|
| 1 | GitHub | https://github.com | Wajib. Tempat menyimpan kode |
| 2 | Railway | https://railway.app | Wajib. Tempat menjalankan aplikasi |

### File project
- Extract file `crud-siswa.zip` yang diberikan guru
- Di dalam folder hasil extract harus ada file-file ini:
  - `package.json`
  - `server.js`
  - folder `views/`
  - folder `config/`
  - folder `routes/`
  - `README.md`

Kalau file di atas tidak ada, berarti extract-nya salah (kemungkinan extract folder di dalam folder).

---

## BAGIAN 1: UPLOAD PROJECT KE GITHUB

### 1.1 Buat Repository Baru

1. Buka browser → ketik **https://github.com**
2. Login dengan akun GitHub kalian
3. Klik tombol **+** di pojok kanan atas → pilih **New repository**
4. Isi form:
   - **Repository name:** `crud-siswa` (boleh diganti, contoh: `projek-database-rpl`)
   - **Description:** boleh dikosongkan
   - Centang **Public** (penting, supaya Railway bisa baca)
   - **Jangan** centang "Add a README file"
   - **Jangan** centang "Add .gitignore"
5. Klik tombol hijau **Create repository**

### 1.2 Upload File Project

Setelah repository dibuat, kalian akan melihat halaman kosong dengan tulisan "Quick setup".

1. Cari tulisan biru **uploading an existing file** → klik
2. Akan muncul area drag & drop
3. Buka folder hasil extract `crud-siswa` di komputer kalian
4. **Pilih SEMUA isi di dalam folder** (bukan foldernya sendiri):
   - `package.json`
   - `server.js`
   - folder `config`
   - folder `routes`
   - folder `views`
   - folder `public`
   - folder `middleware`
   - folder `database`
   - `.gitignore`
   - `.env.example`
   - `README.md`
5. Drag semua file & folder tersebut ke area upload di GitHub
6. Tunggu sampai semua file selesai di-upload (ada progress bar)
7. Di bagian bawah, isi **Commit message**: `first commit` atau `upload project crud`
8. Klik tombol hijau **Commit changes**

### 1.3 Cek Hasil Upload

Setelah commit, kalian harus melihat struktur seperti ini di repository:

```
crud-siswa/
├── config/
├── database/
├── middleware/
├── public/
├── routes/
├── views/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

Kalau yang muncul malah folder `crud-siswa` di dalam repository (double folder), berarti kalian upload folder, bukan isinya. Hapus repository dan ulangi dari awal.

---

## BAGIAN 2: BUAT PROJECT DI RAILWAY

### 2.1 Login ke Railway

1. Buka **https://railway.app**
2. Klik **Login**
3. Pilih **Login with GitHub**
4. Izinkan Railway mengakses akun GitHub kalian (klik Authorize)

### 2.2 Buat Project Baru dari GitHub

1. Setelah masuk dashboard Railway, klik tombol **New Project** (atau **+ New**)
2. Pilih **Deploy from GitHub repo**
3. Kalau pertama kali, Railway akan minta izin mengakses repository GitHub:
   - Klik **Configure GitHub App**
   - Pilih **Only select repositories** → centang repository `crud-siswa`
   - Klik **Save**
4. Kembali ke Railway, pilih repository **crud-siswa**
5. Railway akan langsung mulai **build** aplikasi

### 2.3 Tunggu Build Selesai

- Di layar akan muncul log build
- Tunggu sampai status menjadi **Success** (biasanya 1–3 menit)
- Kalau gagal (Failed), biasanya karena file `package.json` tidak ikut ter-upload. Cek lagi di GitHub.

Saat ini aplikasi sudah ter-deploy, tapi **belum bisa jalan** karena belum ada database.

---

## BAGIAN 3: TAMBAH DATABASE MYSQL DI RAILWAY

Ini bagian paling penting.

### 3.1 Tambah Service MySQL

1. Di dalam project Railway yang sama (jangan buat project baru)
2. Klik tombol **+ New** (ada di canvas / di sidebar)
3. Pilih **Database**
4. Pilih **MySQL**
5. Railway akan membuat service MySQL baru
6. Tunggu 1–2 menit sampai status MySQL menjadi **Active** (hijau)

Sekarang di project kalian ada **2 service**:
- Service aplikasi (dari GitHub) → biasanya bernama `crud-siswa`
- Service database → biasanya bernama `MySQL`

### 3.2 Lihat Informasi Database (Opsional tapi bagus untuk diajarkan)

1. Klik service **MySQL**
2. Masuk ke tab **Variables**
3. Kalian akan melihat banyak variabel, di antaranya:

| Nama Variabel     | Fungsi                              |
|-------------------|-------------------------------------|
| `MYSQLHOST`       | Alamat server database              |
| `MYSQLPORT`       | Port (biasanya 3306)                |
| `MYSQLUSER`       | Username database                   |
| `MYSQLPASSWORD`   | Password database                   |
| `MYSQLDATABASE`   | Nama database                       |
| `MYSQL_URL`       | Connection string lengkap (paling penting) |

**Jangan copy manual.** Kita akan hubungkan secara otomatis di langkah berikutnya.

---

## BAGIAN 4: HUBUNGKAN APLIKASI KE MYSQL (SETTING YANG BENAR)

Ini langkah yang paling sering error kalau salah.

### 4.1 Masuk ke Variables Aplikasi

1. Klik service **aplikasi** (yang dari GitHub, bukan MySQL)
2. Pilih tab **Variables**
3. Kalian akan melihat beberapa variable bawaan Railway (seperti `RAILWAY_...`)

### 4.2 Tambah Variable MYSQL_URL (Pakai Reference)

**Jangan ketik manual.** Pakai fitur Reference supaya otomatis terhubung.

1. Klik tombol **+ New Variable**
2. Pilih **Add Reference** (bukan Raw Value)
3. Akan muncul daftar service
4. Pilih service **MySQL**
5. Pilih variabel **`MYSQL_URL`**
6. Klik **Add**

Setelah berhasil, di daftar Variables akan muncul:

```
MYSQL_URL = ${{MySQL.MYSQL_URL}}
```

Ini artinya aplikasi otomatis mengambil alamat database dari service MySQL.

### 4.3 Tambah Variable SESSION_SECRET

1. Masih di tab Variables aplikasi
2. Klik **+ New Variable** lagi
3. Kali ini pilih **Raw Value** (bukan Reference)
4. Isi:
   - **Variable Name:** `SESSION_SECRET`
   - **Value:** ketik string acak panjang, contoh:
     ```
     rahasiaSuperAman123xyz789kelas12rpl
     ```
5. Klik **Add**

### 4.4 (Opsional) Tambah NODE_ENV

1. Tambah variable lagi:
   - **Name:** `NODE_ENV`
   - **Value:** `production`

### 4.5 Tunggu Redeploy Otomatis

Setelah menambah variable, Railway biasanya **otomatis redeploy** aplikasi.  
Tunggu sampai status Deployments menjadi **Success** lagi.

Kalau tidak otomatis, klik tombol **Deploy** manual.

---

## BAGIAN 5: GENERATE DOMAIN (BIAR BISA DIBUKA DARI BROWSER)

1. Masih di service **aplikasi**
2. Masuk ke tab **Settings**
3. Scroll ke bawah sampai bagian **Networking**
4. Klik tombol **Generate Domain**
5. Railway akan membuat domain publik, contoh:
   ```
   https://crud-siswa-production-abc123.up.railway.app
   ```
6. **Copy** domain tersebut

---

## BAGIAN 6: BUKA APLIKASI & UJI COBA

1. Paste domain ke browser
2. **Pertama kali buka** biasanya butuh 10–30 detik (karena aplikasi sedang membuat tabel + mengisi data contoh)
3. Kalau muncul halaman "Data Siswa" → **berhasil!**

### Login Admin
- Username: `admin`
- Password: `admin123`

### Yang bisa dicoba di kelas:
1. Lihat data siswa (tanpa login)
2. Login sebagai admin
3. Tambah data baru
4. Edit data
5. Hapus data
6. Buka **Admin Panel** (`/siswa/admin`) → lihat struktur database

---

## BAGIAN 7: PENJELASAN TEKNIS UNTUK GURU / DISKUSI KELAS

### Apa yang terjadi saat aplikasi pertama kali jalan?

Di file `config/db.js` ada fungsi `initDatabase()` yang otomatis:

1. Membuat tabel `siswa` kalau belum ada (`CREATE TABLE IF NOT EXISTS`)
2. Mengecek apakah tabel kosong
3. Kalau kosong → mengisi 8 data contoh

Jadi **siswa tidak perlu menjalankan SQL manual sama sekali**.

### Kenapa pakai `MYSQL_URL`?

Railway memberikan connection string lengkap dalam satu variabel:

```
mysql://user:password@host:port/database
```

Library `mysql2` bisa langsung menerima format ini. Lebih praktis daripada mengisi host, user, password satu-satu.

### Halaman Admin Panel

Halaman `/siswa/admin` menjalankan query:
- `SHOW TABLES` → daftar tabel
- `SHOW COLUMNS FROM siswa` → struktur kolom
- `SELECT * FROM siswa` → semua data

Ini bagus untuk menunjukkan bahwa aplikasi benar-benar terhubung ke database dan bisa membaca metadata-nya.

---

## BAGIAN 8: TROUBLESHOOTING LENGKAP

| Gejala | Kemungkinan Penyebab | Solusi |
|--------|----------------------|--------|
| Build gagal di Railway | File `package.json` tidak ter-upload | Cek di GitHub, pastikan `package.json` ada di root |
| Website tampil error / 502 | Database belum terhubung | Pastikan variable `MYSQL_URL` sudah di-set dengan **Add Reference** |
| Data siswa kosong terus | Auto-setup belum selesai atau gagal | Tunggu 30 detik, refresh. Cek log di tab **Deployments** → View Logs |
| Tidak bisa login | Salah ketik username/password | Harus tepat: `admin` dan `admin123` (huruf kecil) |
| Domain tidak bisa dibuka | Belum Generate Domain | Ke Settings → Networking → Generate Domain |
| Error "ECONNREFUSED" di log | `MYSQL_URL` salah atau MySQL belum ready | Pastikan service MySQL statusnya Active, lalu redeploy aplikasi |
| Double folder di GitHub | Upload folder, bukan isinya | Hapus repo, buat baru, upload **isi** folder saja |

### Cara melihat Log Error

1. Di service aplikasi → tab **Deployments**
2. Klik deployment terbaru
3. Klik **View Logs**
4. Cari tulisan berwarna merah. Biasanya error database tertulis jelas di situ.

---

## BAGIAN 9: CHECKLIST CEPAT UNTUK SISWA

Cetak atau tampilkan checklist ini di kelas:

- [ ] Akun GitHub sudah dibuat
- [ ] Repository `crud-siswa` sudah dibuat (Public)
- [ ] Semua file project sudah di-upload ke GitHub (cek ada `package.json` & `server.js`)
- [ ] Project Railway sudah dibuat dari GitHub repo
- [ ] Service **MySQL** sudah ditambahkan
- [ ] Variable `MYSQL_URL` sudah di-set pakai **Add Reference**
- [ ] Variable `SESSION_SECRET` sudah ditambahkan
- [ ] Domain sudah di-Generate
- [ ] Website sudah bisa dibuka di browser
- [ ] Berhasil login dengan `admin` / `admin123`
- [ ] Berhasil tambah / edit / hapus data
- [ ] Berhasil buka Admin Panel

---

## BAGIAN 10: STRUKTUR PROJECT (REFERENSI)

```
crud-siswa/
├── config/
│   └── db.js              ← Koneksi database + auto-buat tabel
├── database/
│   └── schema.sql         ← SQL cadangan (tidak wajib dipakai)
├── middleware/
│   └── auth.js            ← Proteksi halaman admin
├── public/
│   ├── css/style.css
│   └── js/script.js
├── routes/
│   ├── auth.js            ← Login & Logout
│   └── siswa.js           ← CRUD + Admin Panel
├── views/
│   ├── partials/          ← Header & Footer
│   ├── index.ejs          ← Halaman list data
│   ├── form.ejs           ← Form tambah/edit
│   ├── login.ejs
│   ├── admin.ejs          ← Halaman Admin Database
│   └── error.ejs
├── .env.example
├── .gitignore
├── package.json
├── server.js              ← File utama
└── README.md
```

---

**Selesai.**  
Dengan panduan ini, siswa hanya butuh browser + akun GitHub + akun Railway.  
Tidak ada instalasi software apapun di komputer mereka.
