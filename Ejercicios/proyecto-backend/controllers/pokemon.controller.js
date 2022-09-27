
const axios = require('axios')


const getPokemon = async(req, res) => {
    try {
        
        let pokemons = []

        const POKE_API = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
        const data_poke_api = POKE_API.data.results
        const URLS = []

        data_poke_api.map((url) => {
            URLS.push(url.url) 
            
        })

        for(let i = 0; i < URLS.length; i++) {

            const ingresar = await axios.get(URLS[i])
            let arrayImagenes = []
            
            const todosLosPokemon = await ingresar.data
            
            let imagenesUrl = todosLosPokemon.sprites.other.home.front_default
            arrayImagenes.push(imagenesUrl)
            
            
            
                pokemons.push({
                    id : todosLosPokemon.id,
                    name : todosLosPokemon.name,
                    tipo : todosLosPokemon.types.length === 2 ? [todosLosPokemon.types[0].type.name, todosLosPokemon.types[1].type.name] : [todosLosPokemon.types[0].type.name],
                    img : imagenesUrl,
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
        
        
    
        return res.status(200).json({
            data : pokemons,
            
        })

    } catch (error) {
        console.error(error)
    }
    
}



module.exports = getPokemon


