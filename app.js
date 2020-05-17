const express = require('express')
const webPush = require('web-push');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const port = 3000


const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dspg8y0EvS0:APA91bEA1S-yV7JRbyeTBlk2BLe_EMyqNk76r0M5l_V01xUIUjIbSUTyH5eiQZrGaKqnq9l744QvonGVsBcBPwiUpx0FzQ2NxJOwkZtvsgdl0N52MAnmPl__kG1mubyNlNKA5mLqTCXa", "expirationTime": null, "keys": { "p256dh": "BLW_peOgcZkv6j9UDTWTIhLVBvzTTnMIM3xbCbulkrgM2nCbxvtpWdi740nnDc0x6aoqHMUxDw_CC_rcYy-5v1c", "auth": "ohoukW8qL-lrih8GwPBHIA" } };

const vapidPublicKey = '';
const vapidPrivateKey = '';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto:himsajjan@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};


app.post('/push-notification', (req, res) => {
    const subscriptionObject = req.body.ref;
    const payload = req.body.payload;

    webPush.sendNotification(
        subscriptionObject,
        payload,
        options
    )
        .then(res.send("sent successfully"))
        .catch(res.send("failed to send"));

});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))