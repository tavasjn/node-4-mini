require('dotenv').config();
const express = require('express');
const {SERVER_PORT, SESSION_SECRET} = process.env
const app = express();
const ctrl = require('./messagesCtrl');
const session = require('express-session')

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if(req.body.message){
        for( let i = 0; i < badWords.length; i++){
            let regex = new RegExp(badWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '****');
        }
        next();
    } else {
        next();
    }
})

app.get('/api/messages', ctrl.getAllMessages);
app.post('/api/message', ctrl.createMessage);
app.get('/api/messages/history', ctrl.history);


const port = SERVER_PORT;
app.listen(port, () => console.log(`Old Greg Wants Ya On Port: ${port}`));