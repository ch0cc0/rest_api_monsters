const express = require('express');
const cors = require('cors');
const controller = require('./util/controller');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', controller.addUser);


app.listen(3000, () => console.log('listening on port 3000'));