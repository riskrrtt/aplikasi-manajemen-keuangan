const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initDatabase();
    }
});

// Initialize database
function initDatabase() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Transactions table
        db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
        
        console.log('✅ Database tables initialized');
    });
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username dan password harus diisi' });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', 
            [username, hashedPassword], 
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
                    }
                    return res.status(500).json({ success: false, message: 'Error creating user' });
                }
                
                console.log(`✅ User registered: ${username} (ID: ${this.lastID})`);
                res.json({ 
                    success: true, 
                    message: 'Registrasi berhasil',
                    userId: this.lastID 
                });
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username dan password harus diisi' });
    }
    
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Username atau password salah' });
        }
        
        try {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ success: false, message: 'Username atau password salah' });
            }
            
            console.log(`✅ User logged in: ${username}`);
            res.json({
                success: true,
                message: 'Login berhasil',
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });
});

// Get transactions
app.get('/transactions/:userId', (req, res) => {
    const userId = req.params.userId;
    
    db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC, id DESC', 
        [userId], 
        (err, transactions) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                return res.status(500).json({ success: false, message: 'Error fetching transactions' });
            }
            res.json({ success: true, transactions });
        }
    );
});

// Add transaction
app.post('/transactions', (req, res) => {
    const { userId, type, description, amount, date } = req.body;
    
    if (!userId || !type || !description || !amount || !date) {
        return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
    }
    
    db.run('INSERT INTO transactions (user_id, type, description, amount, date) VALUES (?, ?, ?, ?, ?)',
        [userId, type, description, amount, date],
        function(err) {
            if (err) {
                console.error('Error adding transaction:', err);
                return res.status(500).json({ success: false, message: 'Error adding transaction' });
            }
            
            console.log(`✅ Transaction added: ${type} ${amount} for user ${userId}`);
            res.json({
                success: true,
                message: 'Transaksi berhasil ditambahkan',
                transactionId: this.lastID
            });
        }
    );
});

// Update transaction
app.put('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const { type, description, amount, date } = req.body;
    
    db.run('UPDATE transactions SET type = ?, description = ?, amount = ?, date = ? WHERE id = ?',
        [type, description, amount, date, transactionId],
        function(err) {
            if (err) {
                console.error('Error updating transaction:', err);
                return res.status(500).json({ success: false, message: 'Error updating transaction' });
            }
            
            console.log(`✅ Transaction updated: ID ${transactionId}`);
            res.json({ success: true, message: 'Transaksi berhasil diupdate' });
        }
    );
});

// Delete transaction
app.delete('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    
    db.run('DELETE FROM transactions WHERE id = ?', [transactionId], function(err) {
        if (err) {
            console.error('Error deleting transaction:', err);
            return res.status(500).json({ success: false, message: 'Error deleting transaction' });
        }
        
        console.log(`✅ Transaction deleted: ID ${transactionId}`);
        res.json({ success: true, message: 'Transaksi berhasil dihapus' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});