import React, { useState } from "react"; 
import axios from "axios";
const ServiceNow = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e) => {
  
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!/\S+@\S+\.\S+/.test(formData.email)){
      alert("Enter valid email")
    }
   else{
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/subscribe`,
        formData
      );
      console.log("Form submitted successfully");
      // Reset form after successful submission if needed
      setFormData({
        email: "",
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
   }
  
  };
  return (
    <section className="subscribe-one home-14 p_relative text-align-left">
      <div className="auto-container">
        <div className="inner-container p_relative d_block pl_100 pt_55 pr_100 pb_55 z_1">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 text-column">
              <div className="text p_relative d_block mr_30">
                <h2 className="d_block fs_30 lh_60 fw_bold font_family_jost">
                  Subscribe To Our Newsletter
                </h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 form-column">
              <div className="form-inner p_relative d_block">
                <form
                  className="subscribe-form default-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="theme-btn">
                      Subscribe Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceNow;
