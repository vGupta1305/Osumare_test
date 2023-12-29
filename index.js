const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
