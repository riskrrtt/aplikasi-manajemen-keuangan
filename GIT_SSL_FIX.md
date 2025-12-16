# 🔧 Solusi Error SSL Certificate Git

## ❌ Error yang Terjadi:
```
fatal: unable to access 'https://github.com/riskrrtt/aplikasi-manajemen-keuangan.git/': 
error setting certificate file: C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crteror
```

## 🛠️ Solusi (Pilih Salah Satu)

### **Solusi 1: Disable SSL Verification (Quick Fix)**
```bash
git config --global http.sslVerify false
```

**⚠️ Warning:** Ini mengurangi keamanan, tapi cepat untuk testing.

### **Solusi 2: Update Git Certificate**
```bash
# Update Git ke versi terbaru
# Download dari: https://git-scm.com/download/win

# Atau update certificate bundle
git config --global http.sslCAInfo "C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt"
```

### **Solusi 3: Gunakan SSH Instead of HTTPS**
```bash
# 1. Generate SSH key (jika belum ada)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 2. Copy public key
cat ~/.ssh/id_rsa.pub

# 3. Add ke GitHub Settings > SSH Keys

# 4. Clone dengan SSH
git remote set-url origin git@github.com:riskrrtt/aplikasi-manajemen-keuangan.git
```

### **Solusi 4: Fix Certificate Path**
```bash
# Cek lokasi certificate yang benar
git config --global http.sslCAInfo "C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt"

# Atau gunakan path alternatif
git config --global http.sslCAInfo "C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt"
```

### **Solusi 5: Reinstall Git**
1. Uninstall Git dari Control Panel
2. Download Git terbaru: https://git-scm.com/download/win
3. Install dengan default settings
4. Coba lagi

## 🚀 Cara Upload Alternatif

### **A. Gunakan GitHub CLI**
```bash
# Install GitHub CLI: https://cli.github.com/
gh auth login
gh repo create aplikasi-manajemen-keuangan --public
git remote add origin https://github.com/riskrrtt/aplikasi-manajemen-keuangan.git
git push -u origin main
```

### **B. Gunakan GitHub Desktop**
1. Download: https://desktop.github.com/
2. Login dengan akun GitHub
3. Add existing repository
4. Publish repository

### **C. Upload Manual via Web**
1. Buka https://github.com/riskrrtt/aplikasi-manajemen-keuangan
2. Klik "uploading an existing file"
3. Drag & drop semua file (kecuali node_modules/)
4. Commit changes

## 🔍 Debugging Steps

### **Cek Konfigurasi Git:**
```bash
git config --list | grep ssl
git config --list | grep http
```

### **Test Koneksi:**
```bash
git ls-remote https://github.com/riskrrtt/aplikasi-manajemen-keuangan.git
```

### **Cek Certificate File:**
```bash
ls "C:/Program Files/Git/mingw64/etc/ssl/certs/"
ls "C:/Program Files/Git/mingw64/ssl/certs/"
```

## ✅ Recommended Solution

**Untuk fix cepat:**
```bash
# 1. Disable SSL sementara
git config --global http.sslVerify false

# 2. Upload proyek
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/riskrrtt/aplikasi-manajemen-keuangan.git
git push -u origin main

# 3. Enable SSL kembali setelah upload
git config --global http.sslVerify true
```

## 🔒 Untuk Keamanan Jangka Panjang

Setelah berhasil upload, sebaiknya:
1. Update Git ke versi terbaru
2. Setup SSH key untuk GitHub
3. Enable SSL verification kembali

## 📞 Jika Masih Error

Coba alternatif ini:
```bash
# Gunakan Git Bash sebagai Administrator
# Atau gunakan PowerShell sebagai Administrator

# Set proxy jika di belakang firewall
git config --global http.proxy http://proxy.company.com:8080
```

---

**💡 Tip:** GitHub Desktop adalah solusi paling mudah jika command line bermasalah!