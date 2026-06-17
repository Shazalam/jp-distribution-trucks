const mongoose = require('mongoose');
const PageConfig = require('./src/models/PageConfig');
const uri = 'mongodb://localhost:27017/toyota_vehicle_export'; // adjust if needed
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await PageConfig.deleteOne({ pageId: 'parts' });
    console.log('Deleted parts page config');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
