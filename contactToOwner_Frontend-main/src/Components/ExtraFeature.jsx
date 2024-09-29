import React from 'react'
import "../assets/css/font-awesome-all.css";
import "../assets/css/flaticon.css";
import "../assets/css/owl.css";
import "../assets/css/bootstrap.css";
import "../assets/css/jquery.fancybox.min.css";
import "../assets/css/animate.css";
import "../assets/css/color.css";
import "../assets/css/global.css";
import "../assets/css/nice-select.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/elpath.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

import laugh_464 from "../assets/images/laugh_4649042.png";
import hide_icon_85 from "../assets/images/icons/hid-icon-85.png";
import toll_free from "../assets/images/toll-free.png";
import hide_icon_86 from "../assets/images/icons/hid-icon-86.png";
import app_dev from "../assets/images/app-development.png";
import hid_icon_87 from "../assets/images/icons/hid-icon-87.png";
import notif from "../assets/images/notification.png";
import hid_icon_88 from "../assets/images/icons/hid-icon-88.png";
import shape_66 from "../assets/images/shape/shape-66.png";

const ExtraFeature = () => {
  return (
    <section className="service-14 p_relative sec-pad text-align-left" >
    <div className="auto-container">
      <div className="sec-title-ten p_relative d_block mb_50 centred">
        <span className="sub-title p_relative d_iblock fs_15 fw_medium font_family_jost lh_30 uppercase pl_20 pr_20 mb_20">Extra
          Features</span>
        <h2 className="d_block fs_45 lh_50 fw_bold font_family_jost">A Great Features for Your <br />Application
          Interface</h2>
      </div>
      <div className="inner-content p_relative">
        <div className="shape p_absolute" style={{backgroundImage: `url(${shape_66})`}} />
        <div className="row clearfix">
          <div className="col-lg-6 col-md-6 col-sm-12 service-block">
            <div className="service-block-11 wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box p_relative d_block b_shadow_6 b_radius_10 pt_55 pr_30 pb_50 pl_150 mb_30">
                <div className="icon-box p_absolute l_50 t_50 w_80 h_80 lh_80 d_iblock fs_45 centred b_radius_50 z_1 tran_5">
                  <div className="icon p_relative g_color_3"><img src={laugh_464} alt="" style={{bottom: '8px', position: 'relative', width: '55%'}} /></div>
                  <div className="icon-img hidden-icon"><img src={hide_icon_85} alt="" /></div>
                </div>
                <h3 className="d_block fs_24 lh_30 fw_sbold font_family_jost mb_16"><a href="#home" className="d_iblock color_black">User-Friendly
                    Design</a></h3>
                <p className="fs_16 font_family_poppins color_black">Enjoy a hassle-free parking experience
                  with an easy-to-use interface designed for everyone.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 service-block">
            <div className="service-block-11 wow fadeInRight animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box p_relative d_block b_shadow_6 b_radius_10 pt_55 pr_30 pb_50 pl_150 mb_30">
                <div className="icon-box p_absolute l_50 t_50 w_80 h_80 lh_80 d_iblock fs_45 centred b_radius_50 z_1 tran_5">
                  <div className="icon p_relative g_color_3"><img src={toll_free} alt="" style={{bottom: '8px', position: 'relative', width: '55%'}} /></div>
                  <div className="icon-img hidden-icon"><img src={hide_icon_86} alt="" /></div>
                </div>
                <h3 className="d_block fs_24 lh_30 fw_sbold font_family_jost mb_16"><a href="#home" className="d_iblock color_black">Secure Call
                    Integration</a></h3>
                <p className="fs_16 font_family_poppins color_black">Initiate secure toll-free calls without
                  disclosing personal contact details for enhanced security.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 service-block">
            <div className="service-block-11 wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box p_relative d_block b_shadow_6 b_radius_10 pt_55 pr_30 pb_50 pl_150">
                <div className="icon-box p_absolute l_50 t_50 w_80 h_80 lh_80 d_iblock fs_45 centred b_radius_50 z_1 tran_5">
                  <div className="icon p_relative g_color_3"><img src={app_dev} alt="" style={{bottom: '8px', position: 'relative', width: '55%'}} /></div>
                  <div className="icon-img hidden-icon"><img src={hid_icon_87} alt="" /></div>
                </div>
                <h3 className="d_block fs_24 lh_30 fw_sbold font_family_jost mb_16"><a href="#home" className="d_iblock color_black">Developer Options</a>
                </h3>
                <p className="fs_16 font_family_poppins color_black">Tailor and enhance your solution with
                  user-friendly customization options.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 service-block">
            <div className="service-block-11 wow fadeInRight animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box p_relative d_block b_shadow_6 b_radius_10 pt_55 pr_30 pb_50 pl_150">
                <div className="icon-box p_absolute l_50 t_50 w_80 h_80 lh_80 d_iblock fs_45 centred b_radius_50 z_1 tran_5">
                  <div className="icon p_relative g_color_3"><img src={notif} alt="" style={{bottom: '8px', position: 'relative', width: '55%'}} /></div>
                  <div className="icon-img hidden-icon"><img src={hid_icon_88} alt="" /></div>
                </div>
                <h3 className="d_block fs_24 lh_30 fw_sbold font_family_jost mb_16"><a href="#home" className="d_iblock color_black">Instant
                    Notifications</a></h3>
                <p className="fs_16 font_family_poppins color_black">Stay informed with quick notifications
                  providing updates and status for efficient management.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ExtraFeature