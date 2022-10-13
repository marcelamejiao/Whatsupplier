const db = require('../config/connection');
const Material = require('../models/Material');
const materialSeeds = require('./materialSeeds.json');

db.once('open', async () => {
  try {
    await Material.deleteMany({});

    await Material.create(materialSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
