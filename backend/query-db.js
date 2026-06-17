const mongoose = require('mongoose');

const uri = "mongodb+srv://Vercel-Admin-BOOKFLYDRIVESTAY:xdcDFk9ZqQfc5GZH@bookflydrivestay.k6js3op.mongodb.net/jp-distribution-trucks-DB?appName=BOOKFLYDRIVESTAY";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    for (const colInfo of collections) {
      const col = db.collection(colInfo.name);
      const docs = await col.find({}).toArray();
      for (const doc of docs) {
        const docStr = JSON.stringify(doc);
        if (docStr.includes('transparenttextures') || docStr.includes('stardust')) {
          console.log(`Found in collection "${colInfo.name}" (ID: ${doc._id || doc.pageId}):`);
          console.log(JSON.stringify(doc, null, 2));
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run();
