import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { getOAuth2Client, getOauth2 } from '../helpers/googleOAuth2Client.js';

const prisma = new PrismaClient();

const authenticate = async (args) => {
  try {
    const { code, clientType } = args;
    const oAuth2 = getOauth2(clientType);
    const oAuth2Client = getOAuth2Client(clientType);

    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens) {
      throw new Error('Invalid credentials');
    }

    // console.log('Google tokens: ', tokens);

    oAuth2Client.setCredentials(tokens);
    const { data } = await oAuth2.userinfo.get();

    // console.log('Google user info: ', data);

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
      },
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // console.log('User info from database: ', user);

    if (!user.name) {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          name: `${data.name}`,
        },
      });
    }

    if (clientType === 'web') {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          webRefreshToken: `${tokens.refresh_token}`,
        },
      });
    }

    if (clientType === 'android') {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          androidRefreshToken: `${tokens.refresh_token}`,
        },
      });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
      googleAccessToken: {
        token: tokens.access_token,
        exp: tokens.expiry_date,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export { authenticate };
