import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import AuthencticationService from './services/authentication.service.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/authenticate', AuthencticationService);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === 'Invalid credentials') {
    res.status(401).json({ message: err.message });
  } else {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
