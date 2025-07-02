const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

console.log('🔧 Starting server setup...');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add logging middleware
app.use((req, res, next) => {
  console.log(`📞 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// MongoDB connection - FIXED
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_website';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('📍 Database:', mongoose.connection.name);
})
.catch((error) => {
  console.log('❌ MongoDB connection failed:', error.message);
  process.exit(1);
});

// Test database connection
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

// Import and register routes
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️ Auth routes not found:', error.message);
}

try {
  const submissionRoutes = require('./routes/submissions');
  app.use('/api/submissions', submissionRoutes);
  console.log('✅ Submission routes loaded');
} catch (error) {
  console.log('⚠️ Submission routes not found:', error.message);
}

// Test route
app.get('/test', (req, res) => {
  console.log('✅ Test route hit!');
  res.json({
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Alumni Website API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('🚀 Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log('✅ Ready for requests!');
});