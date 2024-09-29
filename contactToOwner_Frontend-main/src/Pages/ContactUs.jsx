import React,{useState} from "react";
import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume";
import Footer from "../Components/Footer";
import ServiceNow from "../Components/ServiceNow";
import { Col, Container, Row } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useEffect} from 'react';
const ContactUs = () => {
  
  const [formData, setFormData] = useState({
    name: "",
   
    phoneno: "",
    subject: "",
    message: "",
    address:""
  });
const [getintouch,setgetInTouch]=useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
     phoneno: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
    address: Yup.string()
    .required('Email is required')
      .matches(/\S+@\S+\.\S+/,'Invalid email address')
      
  });
  
  const handleSubmit = async (formData) => { 
   
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/getintouch`, formData);
      alert("Message Sent Successfully")
      setFormData({
        name: "",
       
        phoneno: "",
        subject: "",
        message: "",
        address:""
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/companyDetails`);  
        const toShow = response.data.filter(entry => entry.IsActive === true);
        setgetInTouch(response.data);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Navbar />
      <BradCrume Title="Contact Us" />
      <section className="contact-seven p_relative pb_65">
        <div className="auto-container">
          <div className="row clearfix contactRow p_60 "
          style={{paddingBottom:"20px"}}>
            <div className="col-lg-4 col-md-12 col-sm-12 info-column">
              <div className="info-inner">
                <div className="sec-title p_relative d_block mb_30">
                  <h3 className="d_block fs_30 lh_40 fw_bold mb_25">
                    Get In Touch
                  </h3>
                  <p className="font_family_poppins color_black">
                    
                  </p>
                </div>
                
           <div>
   
      <div  >
      <ul className="info-list clearfix">
                  <li className="p_relative d_block pl_45 mb_20">
                    <div className="icon-box p_absolute l_0 t_2 d_iblock fs_30 z_1 tran_5">
                      <div className="icon p_relative d_iblock">
                        <i className="icon-180" />
                      </div>
                      <div className="icon-img hidden-icon">
                        <img src="assets/images/icons/hid-icon-133.png" alt />
                      </div>
                    </div>
                    <p className="font_family_inter color_black">
                    214-SAFFRON COMPLEX,
FATEHGUNJ,
VADODARA - 390002
                    </p>
                  </li>
                  <li className="p_relative d_block pl_45 mb_20">
                    <div className="icon-box p_absolute l_0 t_0 d_iblock fs_30 z_1 tran_5">
                      <div className="icon p_relative d_iblock">
                        <i className="icon-181" />
                      </div>
                      <div className="icon-img hidden-icon">
                        <img src="assets/images/icons/hid-icon-134.png" alt />
                      </div>
                    </div>
                    <p className="font_family_inter color_black">
                    <a href="mailto:Support@contacttoowner.com">Support@contacttoowner.com</a>

                    </p>
                  </li>
                  <li className="p_relative d_block pl_45">
                    <div className="icon-box p_absolute l_0 t_0 d_iblock fs_30 z_1 tran_5">
                      <div className="icon p_relative d_iblock">
                        <i className="icon-182" />
                      </div>
                      <div className="icon-img hidden-icon">
                        <img src="assets/images/icons/hid-icon-135.png" alt />
                      </div>
                    </div>
                    <p className="font_family_inter color_black">
                      <a href="tel:8881-636363">8881-636363</a>
                    </p>
                  </li>
                </ul>
      </div>
   
  </div>
 
                 
              
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 form-column">
              <div className="form-inner p_relative ml_40">
              <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
               <Form className="default-form">
               <div className="row clearfix">
                 <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                   <Field
                     type="text"
                     name="name"
                     placeholder="Your Name"
                     className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                   />
                   <ErrorMessage name="name" component="div" className="invalid-feedback" />
                 </div>
                 <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                   <Field
                     type="text"
                     name="address"
                     placeholder="Email Address"
                     className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                   />
                   <ErrorMessage name="address" component="div" className="invalid-feedback" />
                 </div>
                 <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                   <Field
                     type="text"
                     name="phoneno"
                     placeholder="Phone Number"
                     className={`form-control ${errors.phoneno && touched.phoneno ? 'is-invalid' : ''}`}
                   />
                   <ErrorMessage name="phoneno" component="div" className="invalid-feedback" />
                 </div>
                 <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                   <Field
                     type="text"
                     name="subject"
                     placeholder="Subject"
                     className={`form-control ${errors.subject && touched.subject ? 'is-invalid' : ''}`}
                   />
                   <ErrorMessage name="subject" component="div" className="invalid-feedback" />
                 </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                   <Field
                       type="text"
                     name="message"
                     placeholder="Leave A Comment"
                     className={`form-control ${errors.message && touched.message ? 'is-invalid' : ''}`}
                   />
                   <ErrorMessage name="message" component="div" className="invalid-feedback" />
                 </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                 <button type="submit"style={{backgroundColor:'#fec20e'}}  className="theme-btn theme-btn-five">Send Message <i className="icon-4"></i></button>
                
                 </div>
               </div>
             </Form>
                  )}
                  </Formik>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <Col lg={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14763.703104119915!2d73.1872588!3d22.3186467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf4bdba6961b%3A0x824ed80bf3af32c3!2sSaffron%20Shopping%20Center!5e0!3m2!1sen!2sin!4v1715169872969!5m2!1sen!2sin"
                width="100%"
                height="400"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>
      <ServiceNow />
      <Footer />
    </React.Fragment>
  );
};

export default ContactUs;