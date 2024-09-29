import React,{useEffect, useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../assets/images/log1.png";
import Table from "react-bootstrap/Table";
import axios from "axios";
import html2pdf from "html2pdf.js";

import Button from 'react-bootstrap/Button';
export const Invoice = () => {
 
  
  const invoiceItems = [
    { srNo: 1, details: "Basic 499", quantity: 2, unitPrice: 499 }, 
  ];

  const total = invoiceItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const [data, setAlData]= useState("")
  const getData=()=>{
    const id = localStorage.getItem('id');
    axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/CustomerQR/${id}`).
    then((res)=>{
      setAlData(res.data)
    })
  }

  useEffect(()=>{
    getData()
  },[])
  const handleDownloadInvoice = () => {
    const element = document.getElementById("invoice-container");

    html2pdf()
      .from(element)
      .save();
  };
  return (
    <>
    <div  className="button-align" >
    <Button variant="secondary" onClick={handleDownloadInvoice}>
        Download Invoice
      </Button>
    </div>
   
      <Container id="invoice-container" className="invoice-container p-5 border mt-5 mb-5">
        <h2 className="text-center mb-3">Invoice</h2>
        <hr />
        <Row className="d-flex justify-content-between align-items-center">
          <Col lg={6}>
            <div className="logo">
              <img className="w-50" src={logo} alt="logo" />
            </div>
          </Col>
          <Col lg={3}>
            <div className="address text-end">
              <p className="mb-0">214-Saffron Complex, Fatehgunj, Vadodara-390002 </p>
              <p>MO-8881-636363</p>
            </div>
          </Col>
        </Row>
        <hr style={{color:'orange'}}/>
        <Row className="d-flex justify-content-between align-items-center mt-5">
          <Col lg={3}>
            <div className="address text-start">
              <p>{data.Address}, {data.Area}, {data.City}-{data.Pin}</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-end">
              <p className="mb-0">
                Invoice <b>{data.InviceNo}</b>
              </p>
              <p className="mb-0">
              {data.createdAt && (
  <span>{data.createdAt.split("T")[0]}</span>
)}

                </p>
              <p>Payment:7 Days</p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={12}>
            <div className="">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>SR No</th>
                    <th>Details</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.srNo}>
                      <td>{item.srNo}</td>
                      <td>{item.details}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitPrice}</td>
                      <td>{item.quantity * item.unitPrice}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-end" colSpan="4"><b>Total</b></td>
                    <td>{total}</td>
                  </tr>
                </tfoot>
              </Table>
            </div>
            <div>
              <h6>Payment Details</h6>
              <p>
                Payment Reference <b>{data.InviceNo}</b>
              </p>
              <p>Here is the Invoice as discussed-if you have any questions just let me know!</p>
              <p className="mb-0">Thanks,</p>
              <p>{data.Name}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
