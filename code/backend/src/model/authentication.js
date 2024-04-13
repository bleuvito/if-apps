import { PrismaClient } from '@prisma/client';
import { getOAuth2Client, getOauth2 } from '../libs/googleOAuth2Client.js';

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

    oAuth2Client.setCredentials(tokens);
    const { data } = await oAuth2.userinfo.get();

    console.log(data);

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export { authenticate };
