const express = require('express');
const cors = require('cors'); // Import cors
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = process.env.PORT || 4000; 
// Use CORS middleware
app.use(cors());

// Replace with your Agora credentials
const appID = '7562d63a4efb4def9ac6eacfe9724de2';
const appCertificate = '5dcd9d34c5df467babce09542dd8cc49';

app.get('/generate-token', (req, res) => {
  const channelName = req.query.channelName || 'defaultChannel';
  const uid = parseInt(req.query.uid) || 0; // 0 for an auto-generated UID
  const role = req.query.role || RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600; // Token validity time in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log(token); // Log token to server console
  res.json({ token });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Token server running at http://localhost:${port}`);
  });

app.get('/',(req,res) =>{
    console.log(`Server testing`);
    res.json({ 'messag':'Server testing' });
  
  
  });