const mongoose = require('mongoose');
require('dotenv').config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connection Success for Script');
        process.exit(0);
    } catch (err) {
        console.error('❌ MongoDB Connection Failure for Script:', err.message);
        process.exit(1);
    }
};

test();
