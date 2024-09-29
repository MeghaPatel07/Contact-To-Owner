import {useState,useEffect, Fragment} from "react";
import React from 'react';

import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume"; 
import Footer from "../Components/Footer";
import axios from 'axios'

import ServiceNow from "../Components/ServiceNow";
import AboutSection from "../Components/About";

const About = () => {
  const [roles,setroles]=useState("");

  useEffect(()=>{
    fetchData();
    },[])
  const fetchData=async()=>{
    try{
const response =await await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/role`);
const onlyshow=response.data.filter(entry=>entry.IsActive===true);
setroles(onlyshow);

    }
    catch (error) {
      console.error('Error fetching about us:', error);
    }
  }
  if(roles.length>0){
    return (
      <>
       <Navbar/>
        <BradCrume Title="About Us" />
    
         <AboutSection />
        <section className="team-ten about-page-3 p_relative sec-pad centred">
          <div className="shape">
            <div className="shape-1 p_absolute t_120 r_150 rotate-me shapeImg176" />
            <div className="shape-2 p_absolute l_140 float-bob-y shape56" />
            <div className="shape-3 p_absolute t_0 r_0 shape181" />
          </div>
          <div className="auto-container">
            <div className="sec-title-13 p_relative d_block mb_50">
              <h5 className="p_relative d_iblock fs_17 lh_30 fw_sbold mb_16 uppercase">
                Team Member
              </h5>
              <br />
              <h2 className="d_block fs_40 fw_bold lh_50">
                Our Staff Comes from Many <br />
                Different Disciplines
              </h2>
            </div>
            <div className="row clearfix">
              
              {roles.map((data,index)=>(
                <div className="col-lg-4 col-md-6 col-sm-12 team-block">
                <div
                  className="team-block-four wow fadeInUp animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box p_relative d_block">
                    <div className="image-box p_relative d_block">
                      <figure className="image p_relative d_block b_radius_50">
                        <img src={`${process.env.REACT_APP_API_URL_CONTACTUS}/${data.imageURL}` } style={{height:"250px"}}/>
                      </figure>
                      <ul className="social-links p_absolute l_0 t_0 clearfix tran_5">
                       
                      </ul>
                    </div>
                    <div className="lower-content p_relative d_block pt_25">
                      <h4 className="d_block fs_20 lh_30 fw_sbold mb_2">
                        <a
                          href="team-details.html"
                          className="d_iblock color_black"
                        >
                      {data.Name}
                        </a>
                      </h4>
                      <span style={{ width: '300px' }}>{React.createElement('div', { dangerouslySetInnerHTML: { __html: data.Detail}})}</span>
                    </div>
                  </div>
                </div>
              
                </div>
          
              ))}
             
              </div>
              </div>    
        </section>
        <ServiceNow />
        <Footer />
      </>
    );
  }
 
};

export default About;
