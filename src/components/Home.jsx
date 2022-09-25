import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setEspecificValue } from '../store/slices/name.slice';
import './Home.css'
import img from '../img/pokedexImg.png'

const Home = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.name.value !== 0) {
      dispatch(setEspecificValue(e.target.name.value.trim()))
      navigate('/pokedex')
    }
    e.target.name.value = '';
  }



  return (
    <>
      <section className='home'>
        <div className='header-container'>
          <img src={img} alt="" />
        </div>
        <div className='title-container'>
          <h1>¡HI TRAINER!</h1>
          <h2>In order to start, give me your name</h2>
        </div>
        <form className='name-form' onSubmit={handleSubmit} action="">
          <input type="text" id='name' placeholder='Your name...' />
          <button>Start</button>
        </form>
      </section>
      <footer className='footer-home'>
        <div className='red'></div>
        <div className='black'></div>
        <div className='white'></div>
        <div className='circle'></div>
        <div className='circle2'></div>
      </footer>
    </>
  )
}

export default Home