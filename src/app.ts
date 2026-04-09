import express from 'express';
import cors from 'cors';
import podcastRoutes from './routes/podcasts';
import { errorHandler, requestLogger } from './middleware/errorHandler';
import { StatusCode } from './utils/statusCode';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/podcasts', podcastRoutes);

app.get('/health', (req, res) => {
  res.status(StatusCode.OK).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(StatusCode.NotFound).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

app.use(errorHandler);

export default app;