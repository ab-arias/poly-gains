import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PolyGainsLogo from './assets/img/PolyGainsLogo.png'
import Profile from './components/Profile'
import Stats from './components/Stats'
import CalPoly from './components/CalPoly'
import Workouts from './components/Workouts'


export default function App() {
    return ( 
        <BrowserRouter>
            <div className='app'>

                <div class="header">
                    <div class="left-header">
                        <Link to="/">
                            <img style={{height: 60}} src={PolyGainsLogo} alt='PolyGains'/>
                        </Link>
                    </div>
                    <div class="middle-header">
                        <Link to="/calpoly">CalPoly</Link>
                        <Link to="/stats">Stats</Link>
                        <Link to="/workouts">Workouts</Link>                       
                    </div>
                    <div class="right-header">
                        <p>Profile</p>
                    </div>
                </div>

                <div className='main-body'>
                    <Routes>
                        <Route path='/' element={<Profile/>}/>
                        <Route path='/stats' element={<Stats/>}/>
                        <Route path='/calpoly' element={<CalPoly/>}/>
                        <Route path='/workouts' element={<Workouts/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}