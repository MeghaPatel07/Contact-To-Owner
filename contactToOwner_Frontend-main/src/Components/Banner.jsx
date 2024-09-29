import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'; 
 
import profile from "../assets/images/profile.png";
import add_friend from "../assets/images/add-friend.png";
import frame_412 from "../assets/images/contact.png"
import shape_153 from "../assets/images/shape/shape-153.png";
import shape_154 from "../assets/images/shape/shape-154.png";
import shape_66 from "../assets/images/shape/shape-66.png";


const Banner = () => {
  const typedRef = useRef(null);
  const authToken = localStorage.getItem('authtoken');
  useEffect(() => {
    const options = {
      strings: ["Vehicles.", "Pets.", "Home.", "Hotels.", "Keychain."],
            typeSpeed: 150,
            backSpeed: 150,
            loop: true
    };

    typedRef.current = new Typed('.typed-element', options);

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);
    
    
  return (
    <section className="banner-four p_relative text-align-left" id="home" style={{padding:"50px"}}>
      <div className="shape">
        <div className="shape-1 p_absolute t_0 r_0 wow slideInDown animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{backgroundImage: `url(${shape_153})`}} />
        <div className="shape-2 p_absolute t_0 r_0" style={{backgroundImage: `url(${shape_154})`,    filter: "sepia(1)"}} />
        <div className="shape-3 p_absolute rotate-me" style={{backgroundImage: `url(${shape_66})`}} />
        <div className="shape-4 p_absolute rotate-me" style={{backgroundImage: `url(${shape_66})`}} />
        <div className="shape-5 p_absolute rotate-me" style={{backgroundImage: `url(${shape_66})`}} />
        <div className="shape-6 p_absolute b_radius_50 w_40 h_40" />
        <div className="shape-7 p_absolute b_radius_50" />
        <div className="shape-8 p_absolute b_radius_50 w_80 h_80" />
        <div className="shape-9 p_absolute b_radius_50 w_100 h_100" />
        <div className="shape-10 p_absolute b_radius_50" />
        <div className="shape-11 p_absolute b_radius_50" />
        <div className="shape-12 p_absolute b_radius_50 w_200 h_200" />
      </div>
      <div className="auto-container">
        <div className="row align-items-center clearfix">
          <div className="col-lg-7 col-md-12 col-sm-12 content-column">
            <div className="content-box p_relative d_block wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <h2 className="d_block fs_60 lh_70 fw_bold font_family_jost mb_50 heading" style={{display:"flex",position: 'relative', top: '38px', flexWrap:"wrap"}}><span>Effortless<br /> with QR Innovations<br />
                </span><span className="typed-element" style={{color: '#fec20e'}} /></h2>
              <p className="d_block fs_17 font_family_poppins mb_40 lh_28">Initiate a toll-free call without
                revealing the owner's number.</p>
              <div className="btn-box">
                {
                  authToken ?null:(
                    <>
                     <a href="/login" className="play-store p_relative d_iblock fs_15 fw_sbold font_family_poppins white_color"><img src={profile} alt="" width="24px" height="24px" style={{position: 'relative', right: '10px'}} />Login</a>
                <a href="/register" className="app-store p_relative d_iblock fs_15 fw_sbold font_family_poppins color_black"><img src={add_friend} alt="" width="28px" height="28px" style={{position: 'relative', right: '10px'}} />SignUp</a>
              
                    </>
                  )
                }
               </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 image-column">
            <div className="image-box p_relative d_block ml_30">
              <figure className="image paroller-3"><img src={frame_412} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner