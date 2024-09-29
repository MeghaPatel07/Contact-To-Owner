import React, { useState } from 'react';
import bg1 from '../assets/images/shape/shape-198.png';
import bg2 from '../assets/images/shape/shape-197.png';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import {Input } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const Register = () => {


  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').matches(/\S+@\S+\.\S+/,'Invalid email address'),
    password: Yup.string().required('Password is required'),
   
  });
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const initialValues = {
    firstName: '',
    email: '',
    password: '',
  };
  
   const handleCheckbox=(e)=>{
    console.log(e.target)
   }
  const handleRegister = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/add/addUser`, values);
      console.log(response);
      if (response) {

        alert('You have Successfully Registered');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="registration-section pt_130 pb_150">
        <div className="auto-container">
          <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
            <div className="shape">
              <div style={{ background: '#f7f7f7' }} className="shape-1 p_absolute w_170 h_170 b_radius_50 " />
              <div style={{ background: '#f7f7f7' }} className="shape-2 b_140 p_absolute w_170 h_170 b_radius_50 " />
              <div className="shape-3 p_absolute t_45 float-bob-y" style={{ backgroundImage: `url(${bg1})` }} />
              <div className="shape-4 p_absolute w_95 h_95 b_50 float-bob-y" style={{ backgroundImage: `url(${bg2})` }} />
            </div>
            <div className="text p_relative d_block mb_25">
              <h3 className="d_block fs_30 lh_40 fw_bold mb_5">Registration</h3>
              <p className="d_block fs_16 color_black font_family_poppins">Already have an account? <Link to="/login" style={{color:'#fec20e'}}>Sign in</Link></p>
            </div>
            <div className="form-inner">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                
                handleRegister(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched,setFieldValue, values }) => (
                
              <Form className="default-form">
                  <div className={`form-outline mb-4 ${errors.firstName && touched.firstName ? 'has-danger' : ''}`}>
                    <Field
                      type="text"
                      className={`form-control form-control-lg ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                      placeholder="First Name"
                      name="firstName"
                    />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                  </div>
                  <div className={`form-outline mb-4 ${errors.email && touched.email ? 'has-danger' : ''}`}>
                    <Field
                      type="text"
                      className={`form-control form-control-lg ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                      name="email"
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                <div className="form-group">
                <Field
          type= "password"
          className={`form-control form-control-lg ${errors.password && touched.password ? 'is-invalid' : ''}`}
          placeholder="Password"
          name="password"
        />
        <ErrorMessage name="password" component="div" className="invalid-feedback" />
   
        </div>
                <div  className="form-group message-btn">
                  <button type="submit"style={{backgroundColor:'#fec20e'}} className="theme-btn theme-btn-five">Create Account <i className="icon-4" /></button>
                </div>
              </Form>
            )}
            </Formik>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;