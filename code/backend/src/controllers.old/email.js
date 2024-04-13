import { google } from "googleapis";
import jwt from "jsonwebtoken";
import "dotenv/config";
import * as UserModel from "../models/user.js";

const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "http://localhost:8000/api/auth/callback/"
);

async function list(req, res, next) {
    let { jwtToken } = req.query;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId, refresh_token } = decoded;
    console.log("listEmail", userId);

    const { refreshToken } = await UserModel.getUserById(userId);
    console.log(refreshToken);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const respond = await gmail.users.messages.list({
        userId: 'me',
        maxResult: 1,
    });

    const messages = respond.data.messages;
    let emails = [];
    for (let i = 0; i < 5; i++) {
        const msg = await gmail.users.messages.get({
            userId: 'me',
            // format: 'RAW',
            id: messages[i].id,
        });
        emails.push(msg.data);
    }

    res.json(emails);
}

async function get(req, res, next) {
    let { jwtToken } = req.query;
    const { id } = req.params;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId, refresh_token } = decoded;
    console.log("getEmail", id);

    const { refreshToken } = await UserModel.getUserById(userId);
    console.log(refreshToken);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const email = await gmail.users.messages.get({
        userId: 'me',
        // format: 'RAW',
        id,
    });

    res.json(email);
}

async function send(req, res, next) {
    let { jwtToken } = req.query;
    let { to, subject, body } = req.body.data;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId, refresh_token } = decoded;
    console.log("sendEmail", userId);
    console.log(req.body.data);
    const { email: userEmail, refreshToken } = await UserModel.getUserById(userId);
    console.log(userEmail);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const emailLines = [
        `From: ${userEmail}`,
        `To: ${to}`,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        `${body}`
    ];
    const email = emailLines.join('\r\n').trim();
    const base64Email = Buffer.from(email).toString('base64');

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const respond = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: base64Email
        }
    });

    res.json(respond);
}

async function destroy(req, res, next) {
    const { id } = req.params;
    console.log("destroyEmail", id);
    const { jwtToken } = req.query;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decoded;

    const { refreshToken } = await UserModel.getUserById(userId);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const respond = await gmail.users.messages.delete({
        userId: 'me',
        id
    });

    res.json(respond);
}

async function patch(req, res, next) {
    let { jwtToken } = req.query;
    let { to, subject, body, threadId } = req.body.data;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId, refresh_token } = decoded;
    console.log("patchEmail", subject);
    console.log(req.body.data);
    const { email: userEmail, refreshToken } = await UserModel.getUserById(userId);
    console.log(userEmail);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const emailLines = [
        `From: ${userEmail}`,
        `To: ${to}`,
        'Content-type: text/html;charset=iso-8859-1',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        `${body}`
    ];
    const email = emailLines.join('\r\n').trim();
    const base64Email = Buffer.from(email).toString('base64');

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const respond = await gmail.users.messages.send({
        userId: 'me',
        threadId,
        requestBody: {
            raw: base64Email
        }
    });

    res.json(respond);
}

export { list, get, send, destroy, patch };