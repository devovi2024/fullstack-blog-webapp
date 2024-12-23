const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
