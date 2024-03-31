import { google } from "googleapis";
import "dotenv/config";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/user.js";

const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "http://localhost:8000/api/auth/callback/"
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
];

function auth(req, res, next) {
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });

    res.redirect(url);
}

// Getting tokens
async function getToken(req, res, next) {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(`${code}`);

    oAuth2Client.setCredentials(tokens);

    const oAuth2 = google.oauth2({
        auth: oAuth2Client,
        version: 'v2'
    });

    const { data } = await oAuth2.userinfo.get();

    const { email } = data;
    let user = {};
    try {
        user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.json({
                error: "User is not found!"
            });
        }
    } catch (error) {
        console.error(`${error}`);
    }

    const { refresh_token, access_token } = tokens;
    if (refresh_token) {
        UserModel.putUserRefreshToken(email, refresh_token);
    }

    /*
        If this is the user first time logging in, store the user refresh token.
        Either way user the oAuth2Client 'token' event to auto refresh the user access token.
    */
    oAuth2Client.on('tokens', (tokens) => {
        if (refresh_token) {
            UserModel.putUserRefreshToken(email, refresh_token);
            console.log(`
            /api/auth/callback
            refresh token:
            ${refresh_token}
            `);
        }

        console.log(`
        /api/auth/callback
        refresh token:
        ${refresh_token}
        `);
        console.log(`
        /api/auth/callback
        access token:
        ${access_token}
        `);
    });

    const jwtToken = jwt.sign({
        userId: user.id,
        access_token,
        refresh_token,
    },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 48 },
    );

    return res.json(jwtToken);
}

async function getAccessToken(req, res, next) {
    const { jwtToken } = req.query;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { access_token, refresh_token } = decoded;

    console.log("INGETACCESS");

    oAuth2Client.on('tokens', (tokens) => {
        if (refresh_token) {
            // UserModel.putUserRefreshToken(email, refresh_token);
            console.log(`
            /api/auth/callback
            refresh token:
            ${refresh_token}
            `);
        }

        console.log(`
        GET ACCESS TOKEN
        refresh token:
        ${refresh_token}
        `);
        console.log(`
        GET ACCESS TOKEN
        access token:
        ${access_token}
        `);
    });

    res.json(access_token);
}

export { auth, getToken, getAccessToken }