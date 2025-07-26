const express = require('express');
const admin = require('firebase-admin');
const { verifyFirebaseToken } = require('../middleware/firebaseAuth');

const router = express.Router();

router.get('/firebase-test', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.json({ 
      message: 'Firebase connection successful',
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Firebase connection failed' });
  }
});

module.exports = router;