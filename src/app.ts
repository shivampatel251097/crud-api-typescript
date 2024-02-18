import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import {errorHandler} from './handlers/errorHandler';


dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

// Global error handler middleware
app.use(errorHandler);

app.use((req, res) => {
  return res.status(404).json({
      "message": 'Not Found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
