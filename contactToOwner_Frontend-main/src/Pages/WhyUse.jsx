import React from "react";
import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume";
import ServiceNow from "../Components/ServiceNow";
import Footer from "../Components/Footer"; 
import About14 from "./../assets/images/about-14.jpg";
import { Card, Col, Container, Row } from "react-bootstrap";
import Service from "../Components/Service";
import Features from "../Components/Features";

const WhyUse = () => {
  return (
    <React.Fragment>
      <Navbar />
      <BradCrume Title="Why Us" />
      <Container>
      <section className="chooseus-12 p_relative sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_26">
                <div className="content-box p_relative d_block mr_70">
                  <div className="sec-title-13 p_relative d_block mb_50">
                    <h5 className="p_relative d_iblock fs_17 lh_30 fw_sbold mb_16 uppercase">
                      Why Choose Us
                    </h5>
                    <h2 className="d_block fs_40 fw_bold lh_50">
                      Few Reasons why Should You Choose Us
                    </h2>
                  </div>
                  <div className="inner-box">
                    <div className="single-item p_relative d_block pl_100 mb_25">
                      <div className="icon-box p_absolute l_0 t_5 w_70 h_70 lh_70 fs_20 centred b_radius_50">
                        <i className="icon-16" />
                      </div>
                      <h4 className="d_block fs_20 lh_30 fw_sbold mb_13">
                      Secure Storage Solutions
                      </h4>
                      <p className="font_family_poppins">
                      Our commitment to high-quality services includes securely managing your belongings. Trust us for peace of mind and top-notch storage solutions.  </p>
                    </div>
                    <div className="single-item p_relative d_block pl_100 mb_25">
                      <div className="icon-box p_absolute l_0 t_5 w_70 h_70 lh_70 fs_20 centred b_radius_50">
                        <i className="icon-16" />
                      </div>
                      <h4 className="d_block fs_20 lh_30 fw_sbold mb_13">
                      Seamless Communication Channels
                      </h4>
                      <p className="font_family_poppins">
                      Facilitating efficient communication is our forte. Count on us for a hassle-free experience with our dedicated team ensuring smooth interactions.
                       </p>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image_block_22">
                <div
                  data-animation-box
                  className="image-box p_relative d_block ml_30 pt_160 pr_190"
                >
                  <div className="shape">
                    <div className="shape-1 p_absolute t_90 rotate-me shapeImg176" />
                    <div className="shape-2 p_absolute b_80 float-bob-y shape184" />
                  </div>
                  <figure
                    data-animation-text
                    className="overlay-anim-black-bg image image-1 p_relative d_block z_1 paroller"
                    data-animation="overlay-animation"
                  >
                    <img src={About14} alt />
                  </figure>
                  <figure
                    data-animation-text
                    className="overlay-anim-black-bg image image-2 p_absolute t_0 r_0 paroller-2"
                    data-animation="overlay-animation"
                  >
                    <img src={About14} alt />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      </Container>
      <Features />

      <ServiceNow />
      <Footer />
    </React.Fragment>
  );
};

export default WhyUse;
