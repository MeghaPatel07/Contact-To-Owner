import React from 'react'
import Banner from '../Components/Banner';
import ExtraFeature from '../Components/ExtraFeature';
import Features from '../Components/Features';
import Footer from '../Components/Footer';
import Howitworks from '../Components/Howitworks';
import Navbar from '../Components/Navbar';
import Service from '../Components/Service';
import ServiceNow from '../Components/ServiceNow';
import AboutSection from '../Components/About';

const Homepage = () => {
  return (
    <div className='main-div-home'>
      <Navbar Color="rgba(255, 0, 0, 0)"/>
     <Banner/>
     <AboutSection />
     <Service/>
     <Howitworks/>
     <Features/>
     <ExtraFeature/>
     <ServiceNow/>
     <Footer/>
    </div>
  )
}

export default Homepage