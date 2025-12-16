// Global variables
let currentUser = null;
let allTransactions = [];
let editingTransactionId = null;

// Session management
function saveSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
}

function loadSession() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        return true;
    }
    return false;
}

function clearSession() {
    localStorage.removeItem('currentUser');
    currentUser = null;
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Input validation helper
function highlightError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('error');
    input.focus();
    
    setTimeout(() => {
        input.classList.remove('error');
    }, 3000);
    
    showToast(message, 'warning', 'Form Tidak Valid');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Removed showAlert function - using toast notifications only

// Toast Notifications
function showToast(message, type = 'success', title = '') {
    console.log('showToast called:', message, type, title);
    const toastContainer = document.getElementById('toastContainer');
    
    if (!toastContainer) {
        console.error('Toast container not found!');
        alert(message); // Fallback to alert
        return;
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icons for different types
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    // Default titles
    const titles = {
        success: title || 'Berhasil!',
        error: title || 'Error!',
        info: title || 'Info',
        warning: title || 'Peringatan!'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="closeToast(this)">×</button>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        closeToast(toast.querySelector('.toast-close'));
    }, 4000);
}

function closeToast(closeBtn) {
    const toast = closeBtn.closest('.toast');
    toast.classList.remove('show');
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showLogin() {
    showPage('loginPage');
}

function showRegister() {
    showPage('registerPage');
}

function showDashboard() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('dashboardPage');
    loadDashboard();
}

function showTransactions() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('transactionsPage');
    loadTransactions();
}

function showReports() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('reportsPage');
    generateReport();
}

function logout() {
    showToast('Anda telah logout', 'info', 'Sampai Jumpa!');
    clearSession();
    allTransactions = [];
    setTimeout(() => {
        showLogin();
    }, 1000);
}

// API calls
async function apiCall(url, options = {}) {
    try {
        console.log('API Call:', url, options);
        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data.success) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await apiCall('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        saveSession(response.user);
        showToast(`Selamat datang, ${response.user.username}!`, 'success', 'Login Berhasil');
        showDashboard();
        
        // Clear form
        document.getElementById('loginForm').reset();
        
    } catch (error) {
        showToast(error.message, 'error', 'Login Gagal');
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast('Password tidak cocok!', 'error', 'Registrasi Gagal');
        return;
    }
    
    try {
        await apiCall('/register', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        showToast('Akun berhasil dibuat! Silakan login.', 'success', 'Registrasi Berhasil');
        
        // Clear form and switch to login after delay
        document.getElementById('registerForm').reset();
        setTimeout(() => {
            showLogin();
        }, 2000);
        
    } catch (error) {
        showToast(error.message, 'error', 'Registrasi Gagal');
    }
});

// Transaction management
document.getElementById('transactionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const type = document.querySelector('input[name="transactionType"]:checked')?.value;
    const description = document.getElementById('transactionDescription').value.trim();
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const date = document.getElementById('transactionDate').value;
    
    // Debug log
    console.log('Form submitted, type:', type);
    
    // Validasi jenis transaksi
    if (!type) {
        console.log('No type selected, showing validation error');
        showToast('Silakan pilih jenis transaksi (Pemasukan atau Pengeluaran)', 'warning', 'Pilih Jenis Transaksi');
        
        // Highlight type selector
        const typeSelector = document.querySelector('.type-selector');
        if (typeSelector) {
            console.log('Adding error class to type selector');
            typeSelector.classList.add('error');
            
            setTimeout(() => {
                typeSelector.classList.remove('error');
            }, 3000);
        } else {
            console.log('Type selector not found!');
        }
        
        return;
    }
    
    console.log('Validation passed, proceeding with API call');
    
    // Validasi deskripsi
    if (!description) {
        showToast('Deskripsi transaksi tidak boleh kosong', 'warning', 'Lengkapi Form');
        document.getElementById('transactionDescription').focus();
        return;
    }
    
    // Validasi amount
    if (!amount || amount <= 0) {
        showToast('Masukkan jumlah yang valid (lebih dari 0)', 'warning', 'Jumlah Tidak Valid');
        document.getElementById('transactionAmount').focus();
        return;
    }
    
    // Validasi tanggal
    if (!date) {
        showToast('Pilih tanggal transaksi', 'warning', 'Lengkapi Form');
        document.getElementById('transactionDate').focus();
        return;
    }
    
    try {
        await apiCall('/transactions', {
            method: 'POST',
            body: JSON.stringify({
                userId: currentUser.id,
                type,
                description,
                amount,
                date
            })
        });
        
        const typeText = type === 'income' ? 'Pemasukan' : 'Pengeluaran';
        showToast(`${typeText} ${formatCurrency(amount)} berhasil ditambahkan`, 'success', 'Transaksi Ditambahkan');
        
        // Reset form
        document.getElementById('transactionForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;
        
        // Clear radio button selections
        document.querySelectorAll('input[name="transactionType"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Reload data
        loadTransactions();
        
    } catch (error) {
        showToast(error.message, 'error', 'Gagal Menambah Transaksi');
    }
});

async function loadTransactions() {
    try {
        const response = await apiCall(`/transactions/${currentUser.id}`);
        allTransactions = response.transactions;
        displayTransactions(allTransactions);
    } catch (error) {
        console.error('Error loading transactions:', error);
        showAlert('transactionAlert', 'Gagal memuat transaksi');
    }
}

function displayTransactions(transactions) {
    const container = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p>Belum ada transaksi.</p>';
        return;
    }
    
    container.innerHTML = transactions.map(t => `
        <div class="transaction-item">
            <div class="transaction-info">
                <h4>${t.description}</h4>
                <p>${formatDate(t.date)}</p>
            </div>
            <div class="transaction-amount ${t.type}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </div>
            <div class="transaction-actions">
                <button class="btn-small btn-edit" onclick="editTransaction(${t.id})">Edit</button>
                <button class="btn-small btn-delete" onclick="deleteTransaction(${t.id})">Hapus</button>
            </div>
        </div>
    `).join('');
}

function editTransaction(id) {
    const transaction = allTransactions.find(t => t.id === id);
    if (!transaction) return;
    
    editingTransactionId = id;
    
    // Set radio button based on transaction type
    if (transaction.type === 'income') {
        document.getElementById('editTypeIncome').checked = true;
    } else {
        document.getElementById('editTypeExpense').checked = true;
    }
    
    document.getElementById('editDescription').value = transaction.description;
    document.getElementById('editAmount').value = transaction.amount;
    document.getElementById('editDate').value = transaction.date;
    
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    editingTransactionId = null;
    
    // Clear radio button selections
    document.querySelectorAll('input[name="editTransactionType"]').forEach(radio => {
        radio.checked = false;
    });
}

document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!editingTransactionId) return;
    
    const type = document.querySelector('input[name="editTransactionType"]:checked')?.value;
    const description = document.getElementById('editDescription').value.trim();
    const amount = parseFloat(document.getElementById('editAmount').value);
    const date = document.getElementById('editDate').value;
    
    // Validasi jenis transaksi
    if (!type) {
        showToast('Silakan pilih jenis transaksi (Pemasukan atau Pengeluaran)', 'warning', 'Pilih Jenis Transaksi');
        
        // Highlight type selector in modal
        const typeSelector = document.querySelector('#editModal .type-selector');
        if (typeSelector) {
            typeSelector.classList.add('error');
            
            setTimeout(() => {
                typeSelector.classList.remove('error');
            }, 3000);
        }
        
        return;
    }
    
    // Validasi deskripsi
    if (!description) {
        showToast('Deskripsi transaksi tidak boleh kosong', 'warning', 'Lengkapi Form');
        document.getElementById('editDescription').focus();
        return;
    }
    
    // Validasi amount
    if (!amount || amount <= 0) {
        showToast('Masukkan jumlah yang valid (lebih dari 0)', 'warning', 'Jumlah Tidak Valid');
        document.getElementById('editAmount').focus();
        return;
    }
    
    // Validasi tanggal
    if (!date) {
        showToast('Pilih tanggal transaksi', 'warning', 'Lengkapi Form');
        document.getElementById('editDate').focus();
        return;
    }
    
    try {
        await apiCall(`/transactions/${editingTransactionId}`, {
            method: 'PUT',
            body: JSON.stringify({ type, description, amount, date })
        });
        
        closeEditModal();
        loadTransactions();
        
        showToast('Transaksi berhasil diperbarui', 'success', 'Update Berhasil');
        
    } catch (error) {
        showToast(error.message, 'error', 'Gagal Update Transaksi');
    }
});

async function deleteTransaction(id) {
    if (!confirm('Yakin ingin menghapus transaksi ini?')) return;
    
    try {
        await apiCall(`/transactions/${id}`, {
            method: 'DELETE'
        });
        
        loadTransactions();
        showToast('Transaksi berhasil dihapus', 'success', 'Hapus Berhasil');
        
    } catch (error) {
        showToast(error.message, 'error', 'Gagal Hapus Transaksi');
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const response = await apiCall(`/transactions/${currentUser.id}`);
        allTransactions = response.transactions;
        
        const totalIncome = allTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = allTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const balance = totalIncome - totalExpense;
        
        document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
        document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);
        document.getElementById('totalBalance').textContent = formatCurrency(balance);
        
        // Recent transactions
        const recent = allTransactions.slice(0, 5);
        const container = document.getElementById('recentTransactions');
        
        if (recent.length === 0) {
            container.innerHTML = '<p>Belum ada transaksi.</p>';
        } else {
            container.innerHTML = recent.map(t => `
                <div class="transaction-item">
                    <div class="transaction-info">
                        <h4>${t.description}</h4>
                        <p>${formatDate(t.date)}</p>
                    </div>
                    <div class="transaction-amount ${t.type}">
                        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                    </div>
                </div>
            `).join('');
        }
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Reports
function generateReport() {
    const reportMonth = document.getElementById('reportMonth').value;
    
    if (!reportMonth) {
        const now = new Date();
        const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        document.getElementById('reportMonth').value = currentMonth;
        generateReport();
        return;
    }
    
    const [year, month] = reportMonth.split('-');
    
    const monthlyTransactions = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() == year && 
               (transactionDate.getMonth() + 1) == month;
    });
    
    const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpense = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyBalance = monthlyIncome - monthlyExpense;
    
    document.getElementById('monthlyIncome').textContent = formatCurrency(monthlyIncome);
    document.getElementById('monthlyExpense').textContent = formatCurrency(monthlyExpense);
    document.getElementById('monthlyBalance').textContent = formatCurrency(monthlyBalance);
    
    // Display monthly transactions
    const container = document.getElementById('monthlyTransactions');
    
    if (monthlyTransactions.length === 0) {
        container.innerHTML = '<p>Tidak ada transaksi pada bulan ini.</p>';
    } else {
        container.innerHTML = monthlyTransactions.map(t => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <h4>${t.description}</h4>
                    <p>${formatDate(t.date)}</p>
                </div>
                <div class="transaction-amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                </div>
            </div>
        `).join('');
    }
}

// Modal close on outside click
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
    
    // Check if user is already logged in
    if (loadSession()) {
        console.log('Session found, redirecting to dashboard');
        showDashboard();
    } else {
        console.log('No session found, showing login');
        showLogin();
    }
});