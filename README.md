# 💰 Aplikasi Manajemen Keuangan Pribadi

![GitHub stars](https://img.shields.io/github/stars/USERNAME/aplikasi-manajemen-keuangan?style=social)
![GitHub forks](https://img.shields.io/github/forks/USERNAME/aplikasi-manajemen-keuangan?style=social)

Aplikasi web modern untuk mengelola keuangan pribadi dengan interface yang clean dan user-friendly. Dibangun dengan teknologi web terkini dan database SQLite untuk performa optimal.

## ✨ Fitur Utama

- 🔐 **User Authentication** - Register & Login dengan password terenkripsi
- 💰 **Manajemen Transaksi** - Tambah, edit, hapus pemasukan & pengeluaran
- 📊 **Dashboard Interaktif** - Ringkasan keuangan real-time dengan kartu visual
- 📈 **Laporan Bulanan** - Filter dan analisis transaksi per bulan
- 🎨 **Modern UI/UX** - Interface responsif dengan toast notifications
- 📱 **Responsive Design** - Optimal di desktop, tablet, dan mobile
- 💾 **Data Persistent** - Database SQLite yang reliable dan cepat
- 🔔 **Smart Notifications** - Toast notifications untuk feedback user

## 🚀 Quick Start

### Instalasi
```bash
# Clone repository
git clone https://github.com/USERNAME/aplikasi-manajemen-keuangan.git

# Masuk ke folder proyek
cd aplikasi-manajemen-keuangan

# Install dependencies
npm install

# Jalankan aplikasi
npm start
```

### Akses Aplikasi
Buka browser dan kunjungi: **http://localhost:3000**

## 📖 Dokumentasi Lengkap

- 📚 **[Manual Book Lengkap](MANUAL_BOOK.md)** - Panduan penggunaan detail dengan troubleshooting
- 🚀 **[Quick Start Guide](USER_GUIDE.md)** - Panduan cepat untuk memulai
- 🔧 **[Technical Documentation](TECHNICAL_DOCS.md)** - Dokumentasi teknis untuk developer
- 📤 **[GitHub Upload Guide](GITHUB_UPLOAD_GUIDE.md)** - Cara upload proyek ke GitHub

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **Security** | bcryptjs, Input validation |
| **UI/UX** | Custom CSS with modern design system |

## 📱 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Dashboard+Screenshot)

### Manajemen Transaksi
![Transactions](https://via.placeholder.com/800x400/10b981/ffffff?text=Transactions+Screenshot)

### Laporan Keuangan
![Reports](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Reports+Screenshot)

## 🎯 Cara Penggunaan

1. **Daftar/Login** - Buat akun baru atau login dengan akun existing
2. **Lihat Dashboard** - Cek ringkasan keuangan Anda
3. **Tambah Transaksi** - Catat pemasukan dan pengeluaran
4. **Analisis Laporan** - Review pola keuangan bulanan
5. **Kelola Data** - Edit atau hapus transaksi sesuai kebutuhan

## 🔒 Keamanan & Privacy

- ✅ Password di-hash dengan bcryptjs (salt rounds: 10)
- ✅ SQL injection protection dengan prepared statements
- ✅ Input validation di frontend dan backend
- ✅ Data tersimpan lokal (tidak ada cloud storage)
- ✅ Session management yang aman

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Daftar user baru |
| `POST` | `/login` | Login user |
| `GET` | `/transactions/:userId` | Ambil transaksi user |
| `POST` | `/transactions` | Tambah transaksi baru |
| `PUT` | `/transactions/:id` | Update transaksi |
| `DELETE` | `/transactions/:id` | Hapus transaksi |

## 📁 Struktur Proyek

```
aplikasi-manajemen-keuangan/
├── 📄 app.js                  # Server utama
├── 📄 package.json            # Dependencies & scripts
├── 📄 index.html              # Frontend HTML
├── 📄 script.js               # Frontend JavaScript
├── 📄 .gitignore              # Git ignore rules
├── 📚 MANUAL_BOOK.md          # Manual lengkap
├── 🚀 USER_GUIDE.md           # Quick start guide
├── 🔧 TECHNICAL_DOCS.md       # Dokumentasi teknis
├── 📤 GITHUB_UPLOAD_GUIDE.md  # Panduan upload GitHub
└── 💾 database.db             # SQLite database (auto-generated)
```

## 🤝 Contributing

Kontribusi sangat diterima! Untuk perubahan besar:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 🔮 Roadmap

- [ ] 📊 Charts & Graphs dengan Chart.js
- [ ] 📤 Export ke PDF/Excel
- [ ] 🏷️ Kategori transaksi
- [ ] 🔍 Advanced search & filter
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🌙 Dark mode theme
- [ ] 💱 Multi-currency support

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau masalah:
- 📖 Baca [Manual Book](MANUAL_BOOK.md) untuk troubleshooting

---

**⭐ Jika proyek ini membantu, jangan lupa kasih star ya!**

**Made with ❤️ for better financial management**
