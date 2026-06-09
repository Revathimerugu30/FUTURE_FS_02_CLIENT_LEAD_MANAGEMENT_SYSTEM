const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined. Check backend/.env.');
    }

    if (uri.startsWith('mongodb+srv://')) {
      dns.setServers(['1.1.1.1', '8.8.8.8']);
      console.log('🔎 Using public DNS servers for MongoDB SRV resolution');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      tls: true,
      authSource: 'admin',
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Continuing without MongoDB. Some features may not work.');
  }
};

module.exports = connectDB;
