import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import BradCrume from "../Components/BradCrume";
import ServiceNow from "../Components/ServiceNow";
import Footer from "../Components/Footer"; 
import { Tab, Tabs } from "react-bootstrap";
import ProductList from "../Components/ProductList";
import Service from "../Components/Service";

const Pricing = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <React.Fragment>
      <Navbar />
      <BradCrume Title="Pricing" />
      <section className="pricing-one pricing-page-1 pt_50  p_relative">
        <div className="auto-container">
          <div className="sec-title p_relative d_block mb_10 text-center">
            <h2 className="d_block fs_40 fw_bold">Choose Your Pricing Plan</h2>
          </div>

          

          <ProductList />
        </div>
      </section>
      <Service />
      <ServiceNow />
      <Footer />
    </React.Fragment>
  );
};

export default Pricing;
