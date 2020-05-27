const express = require('express');
const connectDB = require('./config/db');


const app = express();

//initialize Middleware(body-parser- now part of express)
app.use(express.json({ extended: false }));
// connect Database

connectDB();

app.get('/', (req, res) => res.send('API running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));