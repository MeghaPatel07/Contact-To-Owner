import React from 'react'

import axios from "axios"
import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume"; 
import {useState,useEffect} from "react" 
import shape_66 from "../assets/images/shape/shape-66.png";

const AboutSection = () => {

  const [about,setabout]=useState("");
  useEffect(()=>{
    fetchData();
    },[])
  const fetchData=async()=>{
    try{
const response =await await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/listonly/cms`);
const onlyshow=response.data.filter(entry=>entry.IsActive===true&&entry.cmsname==="About Us");
setabout(onlyshow);


    }
    catch (error) {
      console.error('Error fetching about us:', error);
    }
  }
  if(about.length>0){
    return (
    
     
      <section className="about-14 p_relative pt_80 pb_80 text-align-left" id="about">
      {about.map((data,index)=>(
        
        <div className="auto-container" key={index}>
          <div className="row align-items-center clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image_block_16 wow slideInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                <div className="image-box p_relative d_block ml_65 mr_65">
                  <div className="shape">
                    <div className="shape-1 p_absolute rotate-me t_0" style={{backgroundImage: `url(${shape_66})`}} />
                    <div className="shape-2 p_absolute b_radius_50 w_100 h_100" />
                  </div>
                  <figure className="image p_relative"><img src={`${process.env.REACT_APP_API_URL_CONTACTUS}/${data.cmsImage}`} alt="" />
                  </figure>

                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_nine">
                <div className="content-box p_relative d_block ml_40">
                  <div className="sec-title-ten p_relative d_block mb_35">
                    <span className="sub-title p_relative d_iblock fs_15 fw_medium font_family_jost lh_30 uppercase pl_20 pr_20 mb_20">{data.cmsname}</span>
                     
                        <h2 className="d_block fs_45 lh_50 fw_bold font_family_jost">About Us</h2> 
                      
                      
                        <div className="text p_relative d_block mb_35">
                    <p className="font_family_poppins mb_25 " style={{alignItems:"center"}}>
                      {React.createElement('div', { dangerouslySetInnerHTML: { __html:data.cmsDesc}})}
                      </p>
                  </div>
                  <ul className="list-style-two clearfix p_relative d_block mb_30">
                    <li className="p_relative d_block fs_18 fw_medium font_family_jost mb_10 pl_30">
                      Client-Focused Solutions</li>
                    <li className="p_relative d_block fs_18 fw_medium font_family_jost pl_30">We Strive to
                      Enhance Your Experience</li>
                  </ul>
                  <div className="video-btn aboutBtn">
                    <a href="#home" className="lightbox-image video-btn p_relative d_iblock fs_17 font_family_oxygen fw_bold pl_100 pr_45 z_1 pt_20 pb_20 b_radius_5" data-caption>
                      <i className="icon-37" />Check Our Intro <br />Video
                    </a>
                  </div>
                  </div>
              
                      </div>
                
                  
                </div>
              
            </div>
          </div>
        </div>
      ))}
        
      </section>
     
    )
  }
 
}

export default AboutSection