import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import AuthencticationService from './services/authentication.service.js';
import { createResponse } from './helpers/createResponse.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/authenticate', AuthencticationService);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === 'Invalid credentials') {
    res.status(401).json(createResponse(401, err.message));
  } else {
    res
      .status(err.status || 500)
      .json(createResponse(err.status || 500, 'Internal server error'));
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
