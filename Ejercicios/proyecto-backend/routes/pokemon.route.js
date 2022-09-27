const express = require("express");
const router = express.Router();
const cors = require("cors")
const getPokemon = require("../controllers/pokemon.controller");

router.use(cors())

router.get('/',getPokemon) 

module.exports = router