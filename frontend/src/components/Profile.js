import React, { useState } from 'react'

export default function Profile() {

    const [currentBanner, setCurrentBanner] = useState('workouts')

    function changeBannerPreview(banner){
        if (banner !== currentBanner){
            setCurrentBanner(banner)
        }
    }

    return (
        <div className='profile-main-container'>
            <img className='profile-avatar'
                src='https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
                alt='Cannot display'
            />
            <h2>User's Name</h2>
            <p>User bio</p>
            <div className='profile-content-container'>
                <div className='profile-content-banner'
                    onMouseOver={() => changeBannerPreview('stats')}
                >
                    Stats
                </div>

                <div className='profile-content-banner'
                    onMouseOver={() => changeBannerPreview('workouts')}
                >
                    Workouts
                </div>

                <div className='profile-content-banner'
                    onMouseOver={() => changeBannerPreview('progress')}
                >
                    Progress
                </div>
            </div>

            {currentBanner === 'stats' && 
            <div className='profile-stats-preview'>
                Stats Content
            </div>}

            {currentBanner === 'workouts' && 
            <div className='profile-workouts-preview'>
                Workout Content
            </div>}

            {currentBanner === 'progress' && 
            <div className='profile-progress-preview'>
                Progress Content
            </div>}

        </div>
    )
}