const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/send', async (req, res) => {
  const { location, ip, device } = req.body;

  const text = `
📍 New Visitor:
🌐 IP: ${ip}
📱 Device: ${device}
📌 Location: ${location}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text
    });
    res.send({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send('Server is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
