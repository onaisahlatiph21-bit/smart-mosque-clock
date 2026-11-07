const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/prayer-times', async (req, res) => {
  const lat = req.query.lat || "14.6";
  const lng = req.query.lng || "121.0";

  try {
    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=3`);
    const data = await response.json();

    res.json({
      fajr: data.data.timings.Fajr,
      dhuhr: data.data.timings.Dhuhr,
      asr: data.data.timings.Asr,
      maghrib: data.data.timings.Maghrib,
      isha: data.data.timings.Isha
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch prayer times" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
