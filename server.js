const express = require('express');
const { default: makeWASocket } = require('@whiskeysockets/baileys');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/connect', async (req, res) => {
    const sessionId = req.body.sessionId;
    if (!sessionId) return res.send('Session ID is required.');

    try {
        const creds = JSON.parse(Buffer.from(sessionId, 'base64').toString());
        const sock = makeWASocket({
            auth: { creds },
            printQRInTerminal: true,
        });

        res.send('<h2>✅ Bot Connected Successfully!<br><br><a href="/">Go Back</a></h2>');
    } catch (err) {
        console.error('Connection Error:', err);
        res.send('<h2>❌ Failed to Connect Bot. Invalid Session ID.<br><br><a href="/">Try Again</a></h2>');
    }
});

app.listen(PORT, () => console.log(`Nima Bot Hosting running on port ${PORT}`));