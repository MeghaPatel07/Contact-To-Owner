import React, {useState,useEffect} from "react";
import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume";
import Footer from "../Components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";  
import ServiceNow from "../Components/ServiceNow";
import Howitworks from "../Components/Howitworks";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const GetYourQrCode = () => {
  useEffect(()=>{
    fetchData();
  },[])
  const [service,setservice]=useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/list/projectdetail`);  
      const toShow = response.data.filter(entry => entry.IsActive === true);
      setservice(toShow);
    
    } catch (error) {
      console.error('Error fetching testimonial:', error);
    }
  };
  
  const [showPopup, setShowPopup] = useState(false);
  const PackageOptions = [
    { label: "Gold", value: "Gold" },
    { label: "Silver", value: "Silver" },
    { label: "Platenium", value: "Platenium" },
  ];

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Email: Yup.string().required("Email is required").matches(/\S+@\S+\.\S+/,'Invalid email address'),
    Package: Yup.string().required("Package is required"),
    Contact: Yup.string().required("Contact number is required").matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits'),
    Contact1: Yup.string().required("Contact number is required").matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits'),
    Contact2: Yup.string().required("Contact number is required").matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits'),
    State: Yup.string().required("State is required"),
    City: Yup.string().required("City is required"),
    Area: Yup.string().required("Area is required"),
    Pin: Yup.string().required("PinCode is required"),
    Address: Yup.string().required("Address is required"),
    Message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    values.IsActive=true
    if (!Object.values(values).every((value) => value)) {
      setShowPopup(true);
      setSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/CustomerQR`,
        values
      );
      if(response.data.isOk)
        {
           axios.put(
            `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/pdf/${response.data.data._id}`,response.data,
        ).then((res)=>{
          localStorage.setItem("pdf", res.data.data.pdf);
          localStorage.setItem("invoice", response.data.data.InviceNo);
      localStorage.setItem("id", response.data.data._id);
          window.location.href = "/success";
        });
        }

      
      
      
      setSubmitting(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Navbar />

      <BradCrume Title="Get Your QR Code " />
      <Container>
        <Row>
          <section className="contact-seven p_relative pb_65">
            <div className="auto-container">
              <div
                className="row clearfix contactRow p_60 "
                style={{ paddingBottom: "20px" }}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 form-column">
                  <div className="form-inner p_relative ml_40">
                    <Formik
                      initialValues={{
                        Name: "",
                        Email: "",
                        Contact: "",
                        Contact1: "",
                        Contact2: "",
                        State: "",
                        City: "",
                        Area: "",
                        Pin: "",
                        Address: "",
                        Message: "",
                        Package: "",
                        IsActive:true,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form id="contact-form">
                          <div className="row clearfix">
                            <div className="title text-center mb-5 ">
                              <h1 className="fw-bold">
                                Apply For QR Code
                              </h1>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Name"
                                placeholder="Your Name"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Email"
                                placeholder="Email Address"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
                              <Field
                                as="select"
                                name="Package"
                                className="border-0 select-class form-control"
                              >
                                <option value="">Select Package</option>
                                {PackageOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="Package"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Contact"
                                placeholder="Contact Number"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Contact"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Contact1"
                                placeholder="Contact No For QR Code 1"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Contact1"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Contact2"
                                placeholder="Contact No For QR Code 2"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Contact2"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="State"
                                placeholder="State"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="State"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="City"
                                placeholder="City"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="City"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Area"
                                placeholder="Area"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Area"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Pin"
                                placeholder="PinCode"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Pin"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Address"
                                placeholder="Address Line"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Address"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                              <Field
                                type="text"
                                name="Message"
                                placeholder="Message"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Message"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                               
                                <button
                                  type="submit"
                                  className="theme-btn theme-btn-eight"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Submitting" : "Place Order"}
                                </button>
                              
                            </div>
                          </div>
                          {showPopup && (
                            <div className="alert alert-danger" role="alert">
                              Please fill out all fields.
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Row>
        <Row className="getQrcodRow">
           {service?.map((data) => {
            return(
              <Col lg="4" className="mb-5">
              <Card>
                <div className="service-block-one">
                  <div className="inner-box p_relative d_block pl_40 pt_50 pr_30 pb_35 b_radius_10 tran_5">
                    <div className="icon-box p_relative d_iblock mb_30">
                      <div className="icon p_relative d_iblock fs_50 g_color tran_5">
                        <img
                          src={`${process.env.REACT_APP_API_URL_CONTACTUS}/${data.imageURL}`}
                          alt=""
                          width="25%"
                          style={{
                            position: "relative",
                            right: "19px",
                            bottom: "10px",
                          }}
                        />
                      </div>
                      <div className="icon-img hidden-icon">
                        <img src={`${process.env.REACT_APP_API_URL_CONTACTUS}/${data.imageURL}`} alt="" />
                      </div>
                      <div className="icon-shape hero-shape-four p_absolute w_90 h_70" />
                    </div>
                    <h4 className="p_relative d_block fs_20 lh_30 fw_sbold mb_20">
                      <a href="#home">{data.ServiceName}</a>
                    </h4>
                    <p className="p_relative d_block mb_20">
                    {React.createElement('div', { dangerouslySetInnerHTML: { __html:data.Detail}})}
                    </p>
                    
                  </div>
                </div>
              </Card>
            </Col>
            )
          
          })}  
        </Row>
      </Container>
      <Howitworks />
      <ServiceNow />
      <Footer />
    </React.Fragment>
  );
};

export default GetYourQrCode;
