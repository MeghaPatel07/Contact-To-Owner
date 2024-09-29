import React from "react"; 

import shape_156 from "../assets/images/shape/shape-156.png";

const Footer = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <footer className="footer-14 p_relative pt_130" id="footer">
        <div
          className="pattern-layer p_absolute l_0 t_0"
          style={{ backgroundImage: `url(${shape_156})` }}
        ></div>
        <div className="auto-container">
          <div className="footer-widget-section">
            <div className="row clearfix">
              <div
                className="col-xl-3 col-lg-3 col-md-6 pb-30 wow tpfadeUp"
                data-wow-duration=".9s"
                data-wow-delay=".9s"
              >
                <div className="tp-footer__widget footer-widget-2 footer-col-2-4">
                  <h4
                    className="tp-footer__widget-title"
                    style={{ width: "70%" }}
                  >
                    Reach Us
                  </h4>
                  <div className="tp-footer__download-box d-flex align-items-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14763.703104119915!2d73.1872588!3d22.3186467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf4bdba6961b%3A0x824ed80bf3af32c3!2sSaffron%20Shopping%20Center!5e0!3m2!1sen!2sin!4v1715169872969!5m2!1sen!2sin"
                      width="100%"
                      height={200}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_40">
                  <div className="widget-title">
                    <h4>Links</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                    <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/get-your-qr-code">Get Your QR</a>
                      </li>
                      <li>
                        <a href="/why-use">Why Us</a>
                      </li>
                      <li>
                        <a href="/pricing">Pricing</a>
                      </li>
                      <li>
                        <a href="/contactus">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget ml_70">
                  <div className="widget-title">
                    <h4>Services</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li>
                        <a href="#">Vehicle QR</a>
                      </li>
                      <li>
                        <a href="#">Home QR</a>
                      </li>
                      <li>
                        <a href="#">Business QR</a>
                      </li>
                      <li>
                        <a href="#">Keychain QR</a>
                        <li>
                          <a href="#">Pet QR</a>
                        </li>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget contact-widget">
                  <div className="widget-title">
                    <h4>Contacts</h4>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li style={{ display: "flex", gap: "10px" }}>
                        <i className="icon-180" style={{ marginTop: "5px" }} />
                        <a 
                        target="_blank"
                        href="https://www.google.com/maps?ll=22.3169,73.190005&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=9389679818958648003"> 214-SAFFRON COMPLEX,
FATEHGUNJ,
VADODARA - 390002
</a>
                      </li>
                      <li style={{ display: "flex", gap: "10px" }}>
                        <i className="icon-182" style={{ marginTop: "5px" }} />
                        <a href="tel:8881-636363">+(91) 8881-636363</a>
                      </li>
                      <li style={{ display: "flex", gap: "10px" }}>
                        <i className="icon-181" style={{ marginTop: "5px" }} />{" "}
                        <a href="mailto:Support@contacttoowner.com">Support@contacttoowner.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="bottom-inner">
              <div className="copyright centred">
                <p>
                  <a href="#">ContactToOwner</a> © 2024 All Right Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="scroll-to-top">
        <div>
          <div
            className="scroll-top-inner"
            style={{ position: "relative", top: "-40px", left: "20px" }}
          >
            <div className="scroll-bar">
              <div className="bar-inner" />
            </div>
            <div className="scroll-bar-text g_color_2">Go To Top</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
