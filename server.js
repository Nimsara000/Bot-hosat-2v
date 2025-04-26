const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { startBotWithSession } = require('./bot');

app.use(express.json());
app.use(express.static('public'));

app.post('/connect-bot', async (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: 'Session ID is required!' });

    try {
        await startBotWithSession(sessionId);
        res.json({ message: '✅ Bot Connected Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Bot Connection Failed!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
