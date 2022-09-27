const express = require('express');
const app = express();
const pokemones = require('./routes/pokemon.route')
const cors = require('cors')
const port = 3010;

app.use(express.json());
app.use(cors())

app.use('/pokemones', pokemones)


app.listen(port, () => {
    console.log("app lista ::", port)
})