import React from 'react' 

import smart_lock from "../assets/images/smart-lock.png";
import scanner from "../assets/images/scanner.png";
import devices from "../assets/images/devices.png";

const Features = () => {
  return (
    <section className="about-three p_relative sec-pad text-align-left">
    <div className="auto-container" >
      <div className="sec-title p_relative d_block mb_110 centred">
        <h2 className="d_block fs_40 lh_52 fw_bold">Features</h2>
        <p style={{color: '#888888'}}>Unlocking Unique Features for Exceptional Solutions at ContactToOwner.</p>
      </div>
      <div className="row clearfix" style={{marginTop: '-37px'}}>
        <div className="col-lg-4 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-three wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box p_relative d_block b_radius_10 b_shadow_6 pl_40 pt_40 pr_30 pb_35">
              <div className="icon-box p_relative d_iblock w_80 h_80 lh_85 fs_45 centred b_radius_50 mb_20">
                <img src={smart_lock} alt="" style={{bottom: '8px', position: 'relative', width: '55%'}} /></div>
              <h4 className="d_block fs_20 lh_30 fw_bold font_family_oxygen mb_15 tran_5">Smart Identification
              </h4>
              <p className="font_family_oxygen tran_5">Effortlessly identify and manage your belongings using
                smart QR code technology.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-three wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box p_relative d_block b_radius_10 b_shadow_6 pl_40 pt_40 pr_30 pb_35">
              <div className="icon-box p_relative d_iblock w_80 h_80 lh_85 fs_45 centred b_radius_50 mb_20"><img src={scanner} alt="" style={{bottom: '8px', position: 'relative', width: '65%'}} /></div>
              <h4 className="d_block fs_20 lh_30 fw_bold font_family_oxygen mb_15 tran_5">QR Code Integration
              </h4>
              <p className="font_family_oxygen tran_5">Intuitive QR code system for easy and efficient
                management of vehicles, pets, homes/hotels, and keychains.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-three wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box p_relative d_block b_radius_10 b_shadow_6 pl_40 pt_40 pr_30 pb_35">
              <div className="icon-box p_relative d_iblock w_80 h_80 lh_85 fs_45 centred b_radius_50 mb_20"><img src={devices} alt="" style={{bottom: '8px', position: 'relative', width: '65%'}} /></div>
              <h4 className="d_block fs_20 lh_30 fw_bold font_family_oxygen mb_15 tran_5"> Device
                Compatibility</h4>
              <p className="font_family_oxygen tran_5">Seamless parking solutions across various devices,
                ensuring accessibility wherever you go.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features