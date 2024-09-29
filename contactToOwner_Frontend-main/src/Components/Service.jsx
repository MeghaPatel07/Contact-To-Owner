import React from 'react'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 


import sedan from "../assets/images/sedan_2736906.png";
import hide_icon_2 from "../assets/images/icons/hid-icon-2.png";
import dog from "../assets/images/guide-dog_4384459.png";
import hide_icon_3 from "../assets/images/icons/hid-icon-3.png";
import hotel from "../assets/images/house.png";
import business from "../assets/images/office-building.png";
import hide_icon_4 from "../assets/images/icons/hid-icon-4.png";
import keys from "../assets/images/keys_3832135.png";
import hide_icon_5 from "../assets/images/icons/hid-icon-5.png";

import {useState,useEffect} from 'react'
import axios from 'axios'
const Service = () => {
   useEffect(()=>{
    fetchData();
  },[])
  const [service,setservice]=useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/projectdetail`);  
      console.log("THis is it",response)
      const toShow = response.data.filter(entry => entry.IsActive === true);
      // setDisplay(toShow); // Set only the testimonials where IsDisplay is true to the display state
      setservice(toShow);
      console.log(toShow);
    
    } catch (error) {
      console.error('Error fetching testimonial:', error);
    }
  };




console.log(service);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed:3000,
  };
  if(service.length>0){
  return (
    <section className="service-one p_relative sec-pad text-align-left" >
    <div className="auto-container">
      <div className="sec-title p_relative d_block mb_50 centred">
        <span className="sub-title p_relative d_iblock fs_15 fw_medium font_family_jost lh_30 uppercase pl_20 pr_20 mb_20">Our Services</span>
        <p style={{color: '#888888'}}>Elevate Your Experience with ContactToOwner.
        </p>
      </div>
      <Slider {...settings} className="carousel-css">
       {service.map((data,index)=>{
        return(
          <div className="service-block-one" key={index}>
          <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
            <div className="icon-box p_relative d_iblock mb_30">
              <div className="icon p_relative d_iblock fs_50 g_color tran_5"><img src={`${process.env.REACT_APP_API_URL_CONTACTUS}/${data.imageURL}`} 
              alt="" width="40%" style={{position: 'relative', right: '19px', bottom: '10px'}} /></div>
              <div className="icon-img hidden-icon"><img src={hide_icon_2} alt="" />
              </div>
              <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
            </div>
            <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20"><a href="#home">{data.ServiceName}</a></h4>
            <p className="p_relative d_block mb_20">   {React.createElement('div', { dangerouslySetInnerHTML: { __html:data.Detail}})}</p>
            <div className="link">
              {/* <a href="#home" className="p_relative d_iblock fs_15 lh_25 fw_sbold">Learn more<i className="icon-4" /></a> */}
            </div>
          </div>
        </div>
        )
      
       })}
{/*         
        <div className="service-block-one">
          <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
            <div className="icon-box p_relative d_iblock mb_30">
              <div className="icon p_relative d_iblock fs_50 g_color tran_5"><img src={hotel} alt="" width="28%" style={{position: 'relative', bottom: '4px'}} /></div>
              <div className="icon-img hidden-icon"><img src={hide_icon_4} alt="" />
              </div>
              <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
            </div>
            <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20"><a href="#home">Home QR Code</a></h4>
            <p className="p_relative d_block mb_20">Secure your home or hotel effortlessly with our QR
              code-based system. Ensure access control without revealing personal details.</p>
            <div className="link">
              <a href="#home" className="p_relative d_iblock fs_15 lh_25 fw_sbold">Learn more<i className="icon-4" /></a>
            </div>
          </div>
        </div>
      
        <div className="service-block-one">
          <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
            <div className="icon-box p_relative d_iblock mb_30">
              <div className="icon p_relative d_iblock fs_50 g_color tran_5"><img src={business} alt="" width="40%" style={{position: 'relative', right: '19px', bottom: '10px'}} /></div>
              <div className="icon-img hidden-icon"><img src={hide_icon_3} alt="" />
              </div>
              <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
            </div>
            <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20"><a href="#home">Business QR
                Code</a></h4>
            <p className="p_relative d_block mb_20">Unlocking convenience with every scan. Simplify transactions, connect effortlessly. Your gateway to seamless business interactions through the QR Code.</p>
            <div className="link">
              <a href="#home" className="p_relative d_iblock fs_15 lh_25 fw_sbold">Learn more<i className="icon-4" /></a>
            </div>
          </div>
        </div>
      
        <div className="service-block-one">
          <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
            <div className="icon-box p_relative d_iblock mb_30">
              <div className="icon p_relative d_iblock fs_50 g_color tran_5"><img src={keys} alt="" width="30%" style={{position: 'relative', bottom: '7px'}} /></div>
              <div className="icon-img hidden-icon"><img src={hide_icon_5} alt="" />
              </div>
              <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
            </div>
            <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20"><a href="#home">Keychain QR Code</a></h4>
            <p className="p_relative d_block mb_20">Manage your keys with ease. Use our QR code system to locate
              and connect with your keychain, ensuring security and convenience.</p>
            <div className="link">
              <a href="#home" className="p_relative d_iblock fs_15 lh_25 fw_sbold">Learn more<i className="icon-4" /></a>
            </div>
          </div>
        </div>
        <div className="service-block-one">
          <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
            <div className="icon-box p_relative d_iblock mb_30">
              <div className="icon p_relative d_iblock fs_50 g_color tran_5"><img src={dog} alt="" width="40%" style={{position: 'relative', right: '19px', bottom: '10px'}} /></div>
              <div className="icon-img hidden-icon"><img src={hide_icon_3} alt="" />
              </div>
              <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
            </div>
            <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20"><a href="#home">Pet QR
                Code</a></h4>
            <p className="p_relative d_block mb_20">Ensure the safety of your pets. Use our QR code system to
              keep them secure and easily connect with their caretakers.</p>
            <div className="link">
              <a href="#home" className="p_relative d_iblock fs_15 lh_25 fw_sbold">Learn more<i className="icon-4" /></a>
            </div>
          </div>
        </div> */}
      </Slider>
    </div>
  </section>
  )
}
}

export default Service