import React from 'react'
import Profile from './components/Profile'

export default function App() {
    return ( 
        <html>
            <div class="header">
                <div class="left-header">
                    <p>PolyGains</p>
                </div>
                <div class="middle-header">
                    <a class = "Hlink" href="components/CalPoly.js">CalPoly</a>
                    <a class = "Hlink" href="components/Profile.js">Home</a>
                    <a class = "Hlink" href="components/stats.js">Stats</a>
                </div>
                <div class="right-header">
                    <p>Profile</p>
                </div>
            </div>
            <body>
            <div> 
                <Profile />
            </div> 
            </body>
        </html>
    )

    // I am making this change from my branch
}