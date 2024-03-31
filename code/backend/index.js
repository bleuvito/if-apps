import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Router from './routes/api.js';
import AuthenticationRouter from './routes/authentication.route.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: `Server is working` });
});

app.use('/', Router);
app.use('/api/v1/auth', AuthenticationRouter);
// app.use('/api/v1/authenticate/', AuthenticationService);

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json({
            errcode: 'E_INVALID_REQUEST'
        });
    } else if (err instanceof OperationError) {
        if (errors500.includes(err.payload.errcode)) {
            res.status(500).json(err.payload);
        } else {
            res.status(400).json(err.payload);
        }
    } else {
        res.status(500).json({
            errcode: 'E_UNKNOWN_FATAL',
        });
        console.log(err);
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));