/**
 * ping-mongo.js
 * Connects to MongoDB Atlas, runs a lightweight ping command,
 * logs the result, then exits cleanly.
 * 
 * Run via GitHub Actions every 3 days to prevent Atlas free-tier
 * clusters from pausing due to inactivity.
 */

require('dotenv').config();
const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f7roy.mongodb.net/Assignment3`;

async function ping() {
    console.log(`[${new Date().toISOString()}] Connecting to MongoDB Atlas...`);

    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 10000,  // fail fast if unreachable
            connectTimeoutMS: 10000,
        });

        // Lightweight admin ping — doesn't read or write any collection data
        const result = await mongoose.connection.db.admin().ping();
        console.log(`[${new Date().toISOString()}] ✓ Ping successful:`, result);

        // Also confirm the movies collection is reachable
        const collections = await mongoose.connection.db
            .listCollections({ name: 'movies' })
            .toArray();

        if (collections.length > 0) {
            const count = await mongoose.connection.db
                .collection('movies')
                .countDocuments();
            console.log(`[${new Date().toISOString()}] ✓ movies collection: ${count} document(s)`);
        } else {
            console.log(`[${new Date().toISOString()}] ℹ movies collection not found (empty DB is fine)`);
        }

        console.log(`[${new Date().toISOString()}] ✓ Atlas cluster is active. Done.`);
        process.exit(0);

    } catch (err) {
        console.error(`[${new Date().toISOString()}] ✗ Ping failed:`, err.message);
        process.exit(1);  // non-zero exit marks the workflow run as failed
    }
}

ping();
