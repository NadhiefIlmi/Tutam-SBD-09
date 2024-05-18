const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const todosRouter = require('./routes/todos');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());
app.use('/todos', todosRouter(pool));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});