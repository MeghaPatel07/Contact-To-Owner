import React from 'react';
import { Link } from 'react-router-dom';
import bg1 from '../assets/images/shape/shape-198.png';
import bg2 from '../assets/images/shape/shape-197.png';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await loginUser(values);
      if (response.status === 200&&response.data.data.IsActive===true) {
        const { token} = response.data.data; 
        localStorage.setItem('authtoken', token); 
        navigate('/');
      }
      else if(response.status===200&&response.data.data.IsActive===false){
        alert("The User is Inactive")

      } else {
        alert("Invalid email or password ")
        setFieldError('email', 'Invalid email or password');
        setFieldError('password', 'Invalid email or password');
      }
    } catch (error) {
      setFieldError('email', 'Invalid email or password');
      setFieldError('password', 'Invalid email or password');
    }
    setSubmitting(false);
  };

  const loginUser = async (userData) => {
    return axios.post(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/login`, userData);
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
              <h3 className="d_block fs_30 lh_40 fw_bold mb_5">Sign in</h3>
              <p className="d_block fs_16 color_black font_family_poppins">Don’t have an account? <Link to="/register" style={{color:'#fec20e'}}>Sign up</Link></p>
            </div>
            <div className="form-inner">
              <Formik 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>

              {({ errors, touched }) => (
  <Form  className="default-form">
   <div className="form-group">
                    <label className="p_relative d_block fs_15 font_family_poppins mb_5 color_black">Email*</label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      autoFocus
                    />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label className="p_relative d_block fs_15 font_family_poppins mb_5 color_black">Password*</label>
                    <Field
                      type="password"
                      // type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
  <div className="form-group clearfix">
    <div className="check-box pull-left">
      <input className="check" type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">Remember me</label>
    </div>
    <div className="lost-password pull-right">
      <Link to="#" className="d_iblock fs_16 font_family_poppins" style={{color:'#fec20e'}}>Lost your password?</Link>
    </div>
  </div>
  <div className="form-group message-btn">
                    <button type="submit"style={{backgroundColor:'#fec20e'}}  className="theme-btn theme-btn-five">Log in <i className="icon-4"></i></button>
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

export default Login;