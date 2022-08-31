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

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(16)

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = pokemons?.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate numberPages 
  let btns = []
  for(let i = 1; i <= Math.ceil(pokemons?.length / postPerPage); i++){
    btns.push(i)
  }

  // Change currentPage
  const handleCurrentPage = (e) => {
      const lastBtn = document.getElementById(+currentPage);
      lastBtn.style.background = null;
      lastBtn.style.color = null;
      const currentbBtn = document.getElementById(e.target.textContent);
      currentbBtn.style.background = '#DD1A1A';
      currentbBtn.style.color = '#FFFFFF';
      setCurrentPage(+e.target.textContent)
  }

  // Change nextPage 
  const handleNextPage = () => {
    if (+currentPage < btns.length) {
      setCurrentPage(+currentPage + 1)
      const currentbBtn = document.getElementById(+currentPage + 1);
      const lastBtn = document.getElementById(+currentPage);
      currentbBtn.style.background = '#DD1A1A';
      currentbBtn.style.color = '#FFFFFF';
      lastBtn.style.background = null;
      lastBtn.style.color = null;
    } 
  }

  // Change BGCOLOR
  let bgColor = {
    background: '#DD1A1A'
  }

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
      .then(res => {
        setPokemons(res.data.results)
        // Adding bgcolor to btn no.1 at the start of the reder
        const pageOne = document.getElementById('1')
        pageOne.style.background = '#DD1A1A';
        pageOne.style.color = '#FFFFFF';
      })
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
        <div className='circle-poke'></div>
        <div className='circle2-poke'></div>
      </header>
      <section className='pokedex-container'>
        <h2><span>Welcome {name},</span> here you can find your favorite pokemons</h2>
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
            currentPosts?.map(pokemon => (
              <PokemonCard key={pokemon.url} url={pokemon.url} />
            ))
            
          }
        </div>
        <div className='pagination-btns'>
          {btns.map(btn => (
            <button onClick={handleCurrentPage} id={btn} className='btn-pagination'>{btn}</button>
          ))}
          <button onClick={handleNextPage} className='btn-pagination-next'>>></button>
        </div>
      </section>

    </div>
  )
}

export default Pokedex