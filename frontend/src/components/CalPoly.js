import React from 'react'

export default function CalPoly() {
    return (
        <div class="CalPolyPage">
            <div class="CalPolyHeader">
                <div class="section-header">
                    Cal Poly Fitness
                </div>
                <img class="RecImg" src={require('../assets/img/CalPolyRec.jpeg')} alt="cannot display"></img>
            </div>
            <div class="CalPolyAbout">
                <div class="CalPolyInfoSection">
                    <div class="sub-header">Rec Center Ammenities:</div>
                    <div class="ammenities">-State-of-the-art equipment</div>
                    <div class="ammenities">-Complimentary group fitness classes</div>
                    <div class="ammenities">-Multiple exercise rooms</div>
                    <div class="ammenities">-Indoor track</div>
                    <div class="ammenities">-Six gymnasium courts</div>
                    <div class="ammenities">-Six racquetball courts</div>
                    <div class="ammenities">-Equipment check out at The Pro Shop</div>
                    <div class="ammenities">-Olympic-size lap pool</div>
                    <div class="ammenities">-Leisure pool</div>
                    <div class="ammenities">-Sand volleyball courts</div>
                    <div class="ammenities">-ASI Poly Escapes Climbing Park</div>
                </div>x
                <div class="CalPolyActSection">
                    <div class="sub-header">Operational Hours:</div>
                    <div class="ammenities">Monday - Friday: 6am - 12am</div>
                    <div class="ammenities">Saturday - Sunday: 8am - 10pm</div>

                    <a class="RecLink"
                        href="https://www.asi.calpoly.edu/facilities/recreation-center/"
                        target="_blank"
                        rel="noreferrer">
                        <img class="RecWebImg" src={require('../assets/img/RecWebsite.png')} alt="cannot display"></img>
                    </a>
                </div>
            </div>
        </div>
    )
}
