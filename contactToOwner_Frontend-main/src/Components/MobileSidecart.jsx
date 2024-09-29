import React from 'react'

import img111 from "../assets/images/log1.png";

const MobileSidecart = ({handleToggleMobSidebar}) => {
  return (
    <div style={{ height:"100%",backgroundColor:"black", zIndex:"9999", position:"fixed", width:"100%"}} className='mob-sidebar-anim'>
      <nav className='mob-sidebar-content'>
        <div className='side-flex'>
        <div className="nav-logo" style={{ width:"50%",display:"flex",alignItems:"end"}}><a href="#home"><img src={img111} alt="" title width="100%"/></a></div>
        <div style={{padding:"20px 20px 0 0"}} onClick={()=>handleToggleMobSidebar()}><i className="fas fa-times"/></div>
        </div>
        <div  className='font-white'>
        <hr />
        <p>HOME</p>
        <hr />
        <p>ABOUT US</p>
        <hr />
        <p>GET YOUR QRCODE</p>
        <hr />
        <p>WHY US</p>
        <hr />
        <p>PRICING</p>
        <hr />
        <p>CONTACT</p>
        <hr />
        </div>
        <div className="contact-info text-align-left" style={{paddingLeft:"7%"}}>
          <p className='font-white'>Contact Info</p>
          <ul>
            <li>Jetalpur Road, Vadodara City, Gujarat,</li>
            <li>India</li>
            <li><a href="tel:8881-636363" className='grey-clr'>+91 8881-636363</a></li>
            <li><a href="mailto:Support@contacttoowner.com" className='grey-clr'>Support@contacttoowner.com</a></li>
          </ul>
        </div>
        <div className="social-links">
          <ul className='social-ul'>
            <li><a href="#home"><span className="fab fa-twitter" /></a></li>
            <li><a href="#home"><span className="fab fa-facebook-square" /></a></li>
            <li><a href="#home"><span className="fab fa-pinterest-p" /></a></li>
            <li><a href="#home"><span className="fab fa-instagram" /></a></li>
            <li><a href="#home"><span className="fab fa-youtube" /></a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default MobileSidecart