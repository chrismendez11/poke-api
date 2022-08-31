import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './PokemonDetails.css'
import header_img from '../img/pokedexImg.png'
import { useEffect } from 'react'
import axios from 'axios'
import colors from '../colors/colors'

const PokemonDetails = () => {

  const { name } = useParams()

  const [pokeInfo, setPokeInfo] = useState()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => setPokeInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  console.log(pokeInfo)

  const selectColor = () => {
    const type = pokeInfo?.types[0].type.name;
    return type
  }

  const color = selectColor()

  const bgColor = {
    background: `linear-gradient(178.92deg, ${colors[color]?.[0]} 0.92%, ${colors[color]?.[1]} 47.96%, ${colors[color]?.[2]} 99.08%)`
  }

  return (
    <div>
      <header className='header-pokedex'>
        <div className='red2'></div>
        <div className='black2'></div>
        <div className='img-container-pokedex'><img src={header_img} alt="" /></div>
      </header>
      <section className='details-container'>
        <header className='details-header' style={bgColor}><img src={pokeInfo?.sprites.other['official-artwork'].front_default} alt="" /></header>
        <div className='details-info'>
          <div><h2 id='det-number'>#{pokeInfo?.id}</h2></div>
          <div className='name-container'><div className='name-line'></div><h2>{name}</h2><div className='name-line'></div></div>
          <div className='weight-height-container'>
            <div>
              <span>Weight</span>
              <p>{pokeInfo?.weight}</p>
            </div>
            <div>
              <span>Height</span>
              <p>{pokeInfo?.height}</p>
            </div>
          </div>
          <div className='type-skills-container'>
            <div className='type-skills'>
              <h3>Type</h3>
              <div className='type-text'>
                <p id='blue-div'>{pokeInfo?.types[0].type.name}</p>
                <p id='purple-div'>{pokeInfo?.types[1] && pokeInfo?.types[1].type.name}</p>
              </div>
            </div>
            <div className='type-skills'>
              <h3>Skills</h3>
              <div className='type-text'>
                <p className='border-div'>{pokeInfo?.abilities[0].ability.name}</p>
                <p className='border-div'>{pokeInfo?.abilities[1] && pokeInfo?.abilities[1].ability.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='stats-container'>
          <div className='stat-title'>
            <h2>Stats</h2>
            <div className='stat-line'></div>
            <div className='pokeball-stats'></div>
            {/* <div className='pokeball-mini'></div> */}
          </div>
          <article className='stats-bars'>
            <div className='stat-container'>
              <div className='stat-text'><h3>HP:</h3><span>{String(pokeInfo?.stats[0].base_stat)}/150</span></div>
              <div className='bar'></div>
              <div className='bar-content1' style={{ width: `${pokeInfo?.stats[0].base_stat * 5.626}px` }}></div>
            </div>
            <div className='stat-container'>
              <div className='stat-text'><h3>Attack:</h3><span>{String(pokeInfo?.stats[1].base_stat)}/150</span></div>
              <div className='bar'></div>
              <div className='bar-content2' style={{ width: `${pokeInfo?.stats[1].base_stat * 5.626}px` }}></div>
            </div>
            <div className='stat-container'>
              <div className='stat-text'><h3>Defense:</h3><span>{String(pokeInfo?.stats[2].base_stat)}/150</span></div>
              <div className='bar'></div>
              <div className='bar-content3' style={{ width: `${pokeInfo?.stats[2].base_stat * 5.626}px` }}></div>
            </div>
            <div className='stat-container'>
              <div className='stat-text'><h3>Speed:</h3><span>{String(pokeInfo?.stats[5].base_stat)}/150</span></div>
              <div className='bar'></div>
              <div className='bar-content4' style={{ width: `${pokeInfo?.stats[5].base_stat * 5.626}px` }}></div>
            </div>
          </article>
        </div>
      </section>
      <section className='movements-container'>
        <div className='stat-title'>
          <h2>Movements</h2>
          <div id='mov-line'></div>
          <div className='pokeball-stats'></div>
          {/* <div className='pokeball-mini'></div> */}
        </div>
        <article className='movements'>
          {pokeInfo?.moves.slice(0, 24).map(movement => (
            <div className='move'><span>{movement.move.name}</span></div>
          ))}
        </article>
      </section>
    </div>
  )
}

export default PokemonDetails