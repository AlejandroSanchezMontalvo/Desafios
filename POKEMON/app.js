document.addEventListener('DOMContentLoaded', () =>{
    
    const random = getRandomInt(1,151)
    fetchData(random)
})

const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min) + min) 
}

const fetchData = async(id) =>{
     try {
         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
         const data = await res.json()
         const pokemon = {
             img: data.sprites.other.dream_world.front_default,
             nombre: data.name,
             hp: data.stats[0].base_stat,
             experiencia: data.base_experience,
             ataque: data.stats[1].base_stat,
             especial: data.stats[3].base_stat,
             defensa: data.stats[2].base_stat
         }
         console.log(data)
         pintarCard(pokemon)
     } catch (error) {
         console.log('error')
     }
}

const pintarCard = (pokemon) => {
     console.log(pokemon)
     const main = document.querySelector('.main')
     const template = document.getElementById('template-card').content
     const clone = template.cloneNode(true)
     const fragment = document.createDocumentFragment()
     const boton = clone.querySelector('.card-boton-btn')

     clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
     clone.querySelector('.card-body-name').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`
     clone.querySelector('.card-body-pais').textContent = pokemon.experiencia + ' Exp'
     clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + ' k'
     clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + ' k'
     clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + ' k'
     fragment.appendChild(clone)
     main.appendChild(fragment)
}