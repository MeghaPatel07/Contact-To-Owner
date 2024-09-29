import React from 'react' 

import img111 from "../assets/images/log1.png";

const Sidecart = ({handleToggleSidebar}) => {
  return (
    <div className="xs-sidebar-group sidebar-bg">
      {/* <div className="xs-overlay xs-bg-black" /> */}
      <div className='hello'>
        <div className="testing">
          <div className="widget-heading">
            <a href="#home" className="close-side-widget"><i className="icon-179" onClick={()=>handleToggleSidebar()}/></a>
          </div>
          <div className="sidebar-textwidget">
            <div className="sidebar-info-contents">
              <div className="content-inner">
                <div className="logo">
                  <a href="#home"><img src={img111} alt=""/></a>
                </div>
                <div className="text-box">
                  <h4>About ContactToOwner</h4>
                  <p>At ContactToOwner, we are committed to offering high-quality services that cater
                    to the diverse needs of our users. Whether it's about securely managing your
                    belongings or facilitating efficient communication, our team is dedicated to
                    ensuring a seamless experience for our clients.</p>
                </div>
                <div className="info-inner">
                  <h4>Find  Our Location</h4>
                  <ul className="info clearfix">
                    <li><i className="icon-180" />214-SAFFRON COMPLEX,
FATEHGUNJ,
VADODARA - 390002</li>
                    <li><i className="icon-181" />      <a href="mailto:Support@contacttoowner.com">Support@contacttoowner.com</a></li>
                    <li><i className="icon-182" /> <a href="tel:8881-636363">+(91) 8881-636363</a>
                    </li>
                  </ul>
                </div>
                <div className="social-inner">
                  <h4>Follow Us On</h4>
                  <ul className="social-links clearfix">
                    <li><a href="#home"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#home"><i className="fab fa-twitter" /></a></li>
                    <li><a href="#home"><i className="fab fa-google-plus-g" /></a></li>
                    <li><a href="#home"><i className="fab fa-linkedin-in" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidecart