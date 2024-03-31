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
    // console.log(userId);

    const { refreshToken } = await UserModel.getUserById(userId);
    // console.log(refreshToken);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar("v3");
    const respond = await calendar.events.list({
        auth: oAuth2Client,
        calendarId: 'primary',
    });

    res.json(respond);
}

async function get(req, res, next) {
    const { id } = req.params;
    const { jwtToken } = req.query;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId, refresh_token } = decoded;
    // console.log(userId);

    const { refreshToken } = await UserModel.getUserById(userId);
    // console.log(refreshToken);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar("v3");
    const respond = await calendar.events.get({
        auth: oAuth2Client,
        calendarId: 'primary',
        eventId: id,
    });

    res.json(respond);
}

async function insert(req, res, next) {
    const { jwtToken } = req.query;
    const { data } = req.body;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decoded;

    const { refreshToken } = await UserModel.getUserById(userId);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar("v3");
    const respond = await calendar.events.insert({
        auth: oAuth2Client,
        calendarId: 'primary',
        requestBody: data,
    });

    res.json(respond);
}

async function patch(req, res, next) {
    const { id } = req.params;
    const { jwtToken } = req.query;
    const { data } = req.body;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decoded;

    const { refreshToken } = await UserModel.getUserById(userId);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar("v3");
    const respond = await calendar.events.patch({
        auth: oAuth2Client,
        calendarId: 'primary',
        eventId: id,
        requestBody: data,
    });

    res.json(respond);
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const { jwtToken } = req.query;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decoded;

    const { refreshToken } = await UserModel.getUserById(userId);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar("v3");
    const respond = await calendar.events.delete({
        auth: oAuth2Client,
        calendarId: 'primary',
        eventId: id,
    });

    res.json(respond);
}

export { list, get, insert, patch, destroy };