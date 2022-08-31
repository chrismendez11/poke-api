import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatPoke from './StatPoke'
import './PokemonCard.css'
import colors from '../../colors/colors'

const PokemonCard = ({url}) => {
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pokedex/${pokemon.name}`)
    }

    const selectColor = () => {
        const type = pokemon?.types[0].type.name;
        return type
    }

    const color = selectColor()

    const bgColor = {
        background: `linear-gradient(178.92deg, ${colors[color]?.[0]} 0.92%, ${colors[color]?.[1]} 47.96%, ${colors[color]?.[2]} 99.08%)`
    }

    const outColor = {
        outline: `10px solid ${colors[color]?.[3]}`
    }

  return (
    <article onClick={handleClick} className='pokemon' style={outColor}>
        <header className='header-pokemonCard' style={bgColor}>
            <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
        </header>
        <section className='section-pokemonCard'>
            <h3>{String(pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1))}</h3>
            <ul>
            {
                pokemon?.types.map(slot => (
                    <span key={slot.type.url}>{slot.type.name[0].toUpperCase() + slot.type.name.slice(1)} </span>
                ))
            }
            </ul>
            <span className='poke-type'>Type</span>
        </section>
        <footer className='footer-pokemonCard'>
            <ul>
                {
                    pokemon?.stats.map(stat => (
                        <StatPoke key={stat.stat.url} infoStat={stat}/>
                    ))
                }
            </ul>
        </footer>
    </article>
  )
}

export default PokemonCard