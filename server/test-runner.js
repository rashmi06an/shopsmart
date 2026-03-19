const request = require('supertest');
const app = require('./src/app');

(async () => {
  try {
    const res = await request(app).get('/api/health');

    if (res.statusCode === 200 && res.body.status === 'UP') {
      console.log("✅ Test Passed");
      process.exit(0);
    } else {
      console.log("❌ Test Failed");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();