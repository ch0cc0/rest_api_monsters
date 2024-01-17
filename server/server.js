const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    console.log(req.body);
    res.status(200).send("Response Received" + req.body);
})


app.listen(3000, () => console.log('listening on port 3000'));