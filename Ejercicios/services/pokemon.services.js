const express = require('express')
const app = express()
const axios = require('axios')
const port = 3005

app.get('/pokemon', async(req,res) => {
    try {

        let pokemons = []

        const POKE_API = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        const data_poke_api = POKE_API.data.results
        const URLS = []

        data_poke_api.map((url) => {
            URLS.push(url.url) 
            
        })

        for(let i = 0; i < URLS.length; i++) {

            const ingresar = await axios.get(URLS[i])
            
            const todosLosPokemon = await ingresar.data
            
                pokemons.push({
                    id : todosLosPokemon.id,
                    name : todosLosPokemon.name,
                    tipo : todosLosPokemon.types.length === 2 ? [todosLosPokemon.types[0].type.name, todosLosPokemon.types[1].type.name] : [todosLosPokemon.types[0].type.name],
                    about : {
                        weight : todosLosPokemon.weight,
                        height : todosLosPokemon.height,
                        moves : todosLosPokemon.abilities.length === 2 ? [todosLosPokemon.abilities[0].ability.name, todosLosPokemon.abilities[1].ability.name] : [todosLosPokemon.abilities[0].ability.name]
                    },
                    stats: {
                        hp: todosLosPokemon.stats[0].base_stat,
                        atk: todosLosPokemon.stats[1].base_stat,
                        def: todosLosPokemon.stats[2].base_stat, 
                        satk: todosLosPokemon.stats[3].base_stat,
                        sdef: todosLosPokemon.stats[4].base_stat,
                        spd: todosLosPokemon.stats[5].base_stat
                    }
                })
        }
        
        console.log(pokemons)
        
        return res.status(200).json(pokemons);

    } catch (error) {
        console.error(error)
    }
    
})
app.listen(port, () => {
    console.log("app lista ::", port)
})




