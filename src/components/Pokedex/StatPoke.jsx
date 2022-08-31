import React from 'react'
import './StatPoke.css'

const StatPoke = ({infoStat}) => {
  return (
    <li className='powers-list'>
        <h4>{infoStat.stat.name.toUpperCase()}</h4>
        <p>{infoStat.base_stat}</p>
    </li>
  )
}

export default StatPoke