import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from './Pokedex/PokemonCard'
import './Pokedex.css'
import header_img from '../img/pokedexImg.png'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [listTypes, setListTypes] = useState()
  const [optionType, setOptionType] = useState()

  useEffect(() => {
    let URL;
    if (pokeSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
      const array = []
      array.push({url})
      setPokemons(array)
    } else {
      URL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
      axios.get(URL)
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
    }

  }, [pokeSearch])

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type/')
      .then(res => setListTypes(res.data.results))
      .catch(err => console.log(err))
  }, []) 

  useEffect(() => {
    if (optionType && optionType !== 'All') {
      axios.get(`https://pokeapi.co/api/v2/type/${optionType}`)
      .then(res => {
        let resApi = res.data.pokemon;
        let array = []
        resApi.map(item => array.push(item.pokemon))
        setPokemons(array)
      })
      .catch(err => console.log(err))
    } else {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
    }

  }, [optionType]) 

  const handleChange = (e) => {
    e.preventDefault()
    setOptionType(e.target.value)
  }

  const name = useSelector(state => state.nameSlice)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokeSearch(e.target.searchPokemon.value.trim().toLowerCase())
  }

  return (
    <div className='pokedex-website'>
      <header className='header-pokedex'>
        <div className='red2'></div>
        <div className='black2'></div>
        <div className='img-container-pokedex'><img src={header_img} alt="" /></div>
      </header>
      <section className='pokedex-container'>
        <h2><span>Welcome {name},</span> here you can find your favorite pokemon</h2>
        <div className='searches-container'>
          <form onSubmit={handleSubmit} action="">
            <input id='searchPokemon' type="text" placeholder='Search a pokemon...'/>
            <button>Search</button>
          </form>
          <select onChange={handleChange} className='dropdown-pokedex' name="" id="">
            <option value="All">All Pokemons</option>
            {
              listTypes?.map(type => (
                <option key={type.name} value={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
              ))
            }
          </select>
        </div>
        <div className='pokemons-container'>
          {
            pokemons?.map(pokemon => (
              <PokemonCard key={pokemon.url} url={pokemon.url} />
            ))
            
          }
        </div>
      </section>

    </div>
  )
}

export default Pokedex