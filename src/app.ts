import express from 'express';
import cors from 'cors';
import episodeRoutes from './routes/podcasts';
import { errorHandler, requestLogger } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/episodes', episodeRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  });
});

app.use(errorHandler);

export default app;