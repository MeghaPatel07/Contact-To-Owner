import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap"; 
import productImg from "./../assets/images/qr-bg-signpage.png"; 
import { Link } from "react-router-dom"; 
import { FaCheckCircle } from "react-icons/fa";
const ProductList = () => {
  const productListCard = [
    {
      img: productImg,
      title: "Basic",
      description:
        "DoorVi™ - World 1st QR Code ",
    },
    // {
    //   img: PateQrImg,
    //   title: "Pet QR Services",
    //   description:
    //     "DoorVi™ - World 1st QR Code Based Door Video Calling which is replacing your doorbells / Intercom with just a QR Code. Any   Visitor standing outside the house needs to scan the QR code andconnect with the house owner over video call.",
    // },
    // {
    //   img: KeychainImg,
    //   title: "Keychain QR Services",
    //   description:
    //     "DoorVi™ - World 1st QR Code Based Door Video Calling which is replacing your doorbells / Intercom with just a QR Code. Any   Visitor standing outside the house needs to scan the QR code andconnect with the house owner over video call.",
    // },
    // {
    //   img: vahicalImg,
    //   title: "Vehicle QR Services",
    //   description:
    //     "DoorVi™ - World 1st QR Code Based Door Video Calling which is replacing your doorbells / Intercom with just a QR Code. Any   Visitor standing outside the house needs to scan the QR code andconnect with the house owner over video call.",
    // },
  ];
  return (
    <React.Fragment>
      <Container className="productListContainer">
        <Row>
          {productListCard?.map((data) => (
            <Col lg={4}>
              <Link to="#">
                <Card className="productListCard text-center">
                  {/* <img className="productImg" src={data.img} alt="img" /> */}
                  <h2 className="productTitle">{data.title}</h2>
                  <h2 className="fw-bold">₹ 499/-</h2>
                  <span>Offer Valid Only Below Services</span>
                  {/* <p>{data.description}</p> */}
                  <ul className="text-start mt-3 mb-5">
                    <li className="mb-3"><FaCheckCircle className="me-2" />{" "}Vehicle QR Code</li>
                    <li className="mb-3"><FaCheckCircle className="me-2" />{" "}Home QR Code</li>
                    <li className="mb-3"><FaCheckCircle className="me-2"/>{" "}Business QR Code</li>
                    <li className="mb-3"><FaCheckCircle className="me-2"/>{" "}Keychain QR Code</li>
                    <li><FaCheckCircle className="me-2" />{" "}Pet QR Code</li>
                    
                  </ul>

                  <div>
                    <Link to="/get-your-qr-code" className="byNowBtn">
                      {" "}
                  
                      Get Started
                    </Link>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
