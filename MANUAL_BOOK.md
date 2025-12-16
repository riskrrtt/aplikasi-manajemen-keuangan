# 📖 Manual Book - Aplikasi Manajemen Keuangan Pribadi

## 📋 Daftar Isi
1. [Pengenalan Aplikasi](#pengenalan-aplikasi)
2. [Cara Memulai](#cara-memulai)
3. [Panduan Penggunaan](#panduan-penggunaan)
4. [Fitur-Fitur Utama](#fitur-fitur-utama)
5. [Tips & Trik](#tips--trik)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## 🎯 Pengenalan Aplikasi

**Aplikasi Manajemen Keuangan Pribadi** adalah aplikasi web yang membantu Anda mencatat dan memantau kondisi keuangan pribadi secara mudah dan efisien.

### ✨ Keunggulan Aplikasi:
- **Modern UI/UX** - Interface yang clean dan user-friendly
- **Real-time Updates** - Data tersimpan otomatis di database SQLite
- **Responsive Design** - Dapat digunakan di desktop dan mobile
- **Toast Notifications** - Notifikasi yang informatif dan menarik
- **Data Persistent** - Data tidak hilang saat refresh atau restart

---

## 🚀 Cara Memulai

### 1. Instalasi & Setup
```bash
# 1. Install dependencies
npm install

# 2. Jalankan aplikasi
npm start

# 3. Buka browser dan akses
http://localhost:3000
```

### 2. Akses Pertama Kali
1. Buka aplikasi di browser
2. Anda akan melihat halaman **Login**
3. Jika belum punya akun, klik **"Daftar di sini"**

---

## 📱 Panduan Penggunaan

### 🔐 **1. Registrasi Akun Baru**

**Langkah-langkah:**
1. Di halaman login, klik **"Daftar di sini"**
2. Isi form registrasi:
   - **Username**: Pilih username unik
   - **Password**: Buat password yang kuat
   - **Konfirmasi Password**: Ulangi password
3. Klik **"Buat Akun Baru"**
4. Tunggu notifikasi sukses
5. Anda akan diarahkan ke halaman login

**💡 Tips:**
- Username harus unik (tidak boleh sama dengan user lain)
- Password sebaiknya kombinasi huruf, angka, dan simbol
- Pastikan konfirmasi password sama persis

---

### 🔑 **2. Login ke Aplikasi**

**Langkah-langkah:**
1. Masukkan **Username** dan **Password**
2. Klik **"Masuk ke Akun"**
3. Jika berhasil, Anda akan masuk ke **Dashboard**

**💡 Tips:**
- Session akan tersimpan, jadi tidak perlu login ulang saat refresh
- Untuk logout, klik tombol **"Logout"** di navigation bar

---

### 🏠 **3. Dashboard - Halaman Utama**

Dashboard menampilkan ringkasan keuangan Anda:

#### 📊 **Kartu Ringkasan:**
- **💰 Total Pemasukan** - Jumlah semua pemasukan
- **💸 Total Pengeluaran** - Jumlah semua pengeluaran  
- **💳 Saldo** - Selisih pemasukan dan pengeluaran

#### 📝 **Transaksi Terbaru:**
- Menampilkan 5 transaksi terakhir
- Informasi: deskripsi, tanggal, dan jumlah
- Warna hijau untuk pemasukan, merah untuk pengeluaran

---

### 💰 **4. Mengelola Transaksi**

#### ➕ **Menambah Transaksi Baru:**

1. Klik menu **"Transaksi"** di navigation bar
2. Di bagian **"Tambah Transaksi"**:
   
   **a. Pilih Jenis Transaksi:**
   - Klik kartu **💰 Pemasukan** untuk pendapatan
   - Klik kartu **💸 Pengeluaran** untuk pengeluaran
   
   **b. Isi Detail Transaksi:**
   - **Deskripsi**: Contoh "Gaji bulanan", "Belanja groceries"
   - **Jumlah**: Masukkan nominal (tanpa titik/koma)
   - **Tanggal**: Pilih tanggal transaksi
   
3. Klik **"Tambah Transaksi"**
4. Tunggu notifikasi sukses

**💡 Tips:**
- Deskripsi yang jelas memudahkan tracking
- Tanggal default adalah hari ini
- Jumlah harus lebih dari 0

#### ✏️ **Mengedit Transaksi:**

1. Di daftar transaksi, klik tombol **"Edit"** (biru)
2. Modal edit akan muncul dengan data existing
3. Ubah data yang diperlukan:
   - Jenis transaksi (pemasukan/pengeluaran)
   - Deskripsi
   - Jumlah
   - Tanggal
4. Klik **"Simpan Perubahan"**

#### 🗑️ **Menghapus Transaksi:**

1. Di daftar transaksi, klik tombol **"Hapus"** (merah)
2. Konfirmasi penghapusan dengan klik **"OK"**
3. Transaksi akan dihapus permanen

**⚠️ Peringatan:** Penghapusan tidak dapat dibatalkan!

---

### 📊 **5. Laporan Keuangan**

#### 📈 **Melihat Laporan Bulanan:**

1. Klik menu **"Laporan"** di navigation bar
2. **Filter Bulan:**
   - Pilih bulan dan tahun yang diinginkan
   - Laporan akan otomatis ter-update

#### 📋 **Informasi Laporan:**
- **Pemasukan Bulan Ini** - Total pemasukan bulan terpilih
- **Pengeluaran Bulan Ini** - Total pengeluaran bulan terpilih
- **Selisih** - Surplus/defisit bulan tersebut
- **Daftar Transaksi** - Detail semua transaksi bulan terpilih

**💡 Tips:**
- Gunakan laporan untuk analisis pola pengeluaran
- Bandingkan antar bulan untuk melihat tren
- Laporan membantu perencanaan budget

---

## 🎨 Fitur-Fitur Utama

### 🔔 **Toast Notifications**
- **Sukses** (Hijau): Login, tambah/edit/hapus transaksi berhasil
- **Error** (Merah): Login gagal, error sistem
- **Warning** (Kuning): Validasi form, peringatan
- **Info** (Biru): Logout, informasi umum

### 🎯 **Validasi Form**
- **Visual Feedback**: Field error akan highlight merah
- **Auto Focus**: Cursor otomatis ke field yang error
- **Shake Animation**: Type selector bergetar jika belum dipilih
- **Real-time Validation**: Validasi saat submit form

### 📱 **Responsive Design**
- **Desktop**: Layout grid dengan sidebar navigation
- **Tablet**: Adaptasi layout untuk layar medium
- **Mobile**: Stack layout dengan navigation yang mobile-friendly

### 💾 **Data Persistence**
- **SQLite Database**: Data tersimpan permanen
- **Session Management**: Login state tersimpan di browser
- **Auto-save**: Semua perubahan langsung tersimpan

---

## 💡 Tips & Trik

### 🎯 **Manajemen Keuangan Efektif:**

1. **Catat Semua Transaksi**
   - Jangan lewatkan transaksi kecil
   - Catat segera setelah transaksi terjadi
   - Gunakan deskripsi yang jelas dan konsisten

2. **Review Rutin**
   - Cek dashboard setiap hari
   - Review laporan bulanan
   - Analisis pola pengeluaran

3. **Kategorisasi yang Konsisten**
   - Gunakan deskripsi yang seragam (misal: "Makan siang", bukan "makan", "lunch", dll)
   - Buat sistem kategori sendiri dalam deskripsi

4. **Backup Data**
   - Database tersimpan di file `database.db`
   - Copy file ini untuk backup
   - Simpan di cloud storage untuk keamanan

### ⚡ **Shortcut & Efisiensi:**

- **Tab Navigation**: Gunakan Tab untuk berpindah antar field
- **Enter Submit**: Tekan Enter untuk submit form
- **Date Picker**: Klik icon kalender untuk pilih tanggal cepat
- **Auto-complete**: Browser akan ingat input sebelumnya

---

## 🔧 Troubleshooting

### ❌ **Masalah Umum & Solusi:**

#### **1. Aplikasi tidak bisa diakses**
**Gejala:** Browser tidak bisa membuka `http://localhost:3000`
**Solusi:**
- Pastikan server berjalan (`npm start`)
- Cek apakah port 3000 sudah digunakan aplikasi lain
- Restart server: `Ctrl+C` lalu `npm start`

#### **2. Data hilang setelah restart**
**Gejala:** Transaksi atau user hilang
**Solusi:**
- Cek apakah file `database.db` ada di folder aplikasi
- Jangan hapus file `database.db`
- Pastikan aplikasi punya permission write ke folder

#### **3. Toast notification tidak muncul**
**Gejala:** Tidak ada notifikasi saat aksi berhasil/gagal
**Solusi:**
- Refresh halaman (`Ctrl+F5`)
- Cek console browser (F12) untuk error
- Pastikan JavaScript enabled di browser

#### **4. Form tidak bisa disubmit**
**Gejala:** Tombol submit tidak berfungsi
**Solusi:**
- Pastikan semua field required terisi
- Pilih jenis transaksi (pemasukan/pengeluaran)
- Cek console browser untuk error JavaScript

#### **5. Session logout otomatis**
**Gejala:** Harus login ulang setiap buka aplikasi
**Solusi:**
- Jangan clear browser data/cookies
- Pastikan localStorage tidak di-disable
- Gunakan browser yang sama

### 🔍 **Debug Mode:**
Jika ada masalah, buka Developer Tools (F12) dan cek:
- **Console Tab**: Error JavaScript
- **Network Tab**: Request/response API
- **Application Tab**: LocalStorage data

---

## ❓ FAQ (Frequently Asked Questions)

### **Q: Apakah data saya aman?**
A: Ya, data tersimpan lokal di komputer Anda dalam database SQLite. Tidak ada data yang dikirim ke server eksternal.

### **Q: Bisakah digunakan offline?**
A: Ya, aplikasi berjalan lokal di komputer Anda dan tidak memerlukan koneksi internet.

### **Q: Berapa banyak transaksi yang bisa disimpan?**
A: Tidak ada batasan khusus. SQLite dapat menangani jutaan record dengan performa baik.

### **Q: Bisakah digunakan multiple user?**
A: Ya, setiap user punya akun terpisah dengan data yang terisolasi.

### **Q: Bagaimana cara backup data?**
A: Copy file `database.db` ke lokasi aman. File ini berisi semua data aplikasi.

### **Q: Bisakah diakses dari HP?**
A: Ya, buka browser di HP dan akses `http://[IP-komputer]:3000`. Pastikan komputer dan HP dalam jaringan yang sama.

### **Q: Format tanggal yang digunakan?**
A: Aplikasi menggunakan format Indonesia (DD MMMM YYYY), contoh: "16 Desember 2025".

### **Q: Bisakah import/export data?**
A: Saat ini belum ada fitur import/export. Data tersimpan dalam format SQLite database.

### **Q: Aplikasi lambat, kenapa?**
A: Kemungkinan:
- Terlalu banyak data (>10,000 transaksi)
- Komputer dengan spek rendah
- Browser dengan banyak tab terbuka

### **Q: Lupa password, bagaimana?**
A: Saat ini belum ada fitur reset password. Anda bisa:
- Buat akun baru dengan username berbeda
- Atau hapus database dan mulai dari awal

---

## 📞 Support & Bantuan

Jika mengalami masalah yang tidak tercantum dalam manual ini:

1. **Cek Console Browser** (F12) untuk error details
2. **Restart Aplikasi** (`Ctrl+C` lalu `npm start`)
3. **Clear Browser Cache** (`Ctrl+Shift+Delete`)
4. **Update Browser** ke versi terbaru

---

## 📝 Changelog & Updates

### Version 1.0.0 (Current)
- ✅ User authentication (login/register)
- ✅ Transaction management (CRUD)
- ✅ Dashboard with summary cards
- ✅ Monthly reports
- ✅ Modern UI with toast notifications
- ✅ SQLite database integration
- ✅ Responsive design
- ✅ Form validation
- ✅ Session management

### Planned Features:
- 📊 Charts and graphs
- 📤 Export to Excel/PDF
- 🏷️ Transaction categories
- 🔍 Advanced search and filters
- 📱 PWA (Progressive Web App)
- 🌙 Dark mode theme

---

**© 2025 Aplikasi Manajemen Keuangan Pribadi**
*Dibuat dengan ❤️ untuk membantu mengelola keuangan Anda*