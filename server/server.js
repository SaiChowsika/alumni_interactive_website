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

// Test route
app.get('/test', (req, res) => {
  console.log('✅ Test route hit!');
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
});

// API test route
app.get('/api/submissions/test', (req, res) => {
  console.log('✅ Submissions test route hit!');
  res.json({
    status: 'success',
    message: 'Submissions API is working!',
    timestamp: new Date().toISOString()
  });
});

// Import and register routes (if they exist)
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

// Default route
app.get('/', (req, res) => {
  console.log('✅ Root route hit!');
  res.json({ 
    message: 'Alumni Website API is running!',
    availableEndpoints: [
      '/',
      '/test',
      '/api/submissions/test',
      '/api/auth/...',
      '/api/submissions/...'
    ],
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_website';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((error) => console.log('⚠️ MongoDB connection failed:', error.message));

// 404 handler (put this LAST)
app.use('*', (req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('🚀 Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URLs to test:`);
  console.log(`   http://localhost:${PORT}/`);
  console.log(`   http://localhost:${PORT}/test`);
  console.log(`   http://localhost:${PORT}/api/submissions/test`);
  console.log('✅ Ready for requests!');
});