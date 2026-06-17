require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => mongoose.connection.collection('pageconfigs').deleteMany({ pageId: 'trucks' }))
  .then(() => {
    console.log('Reset config successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
