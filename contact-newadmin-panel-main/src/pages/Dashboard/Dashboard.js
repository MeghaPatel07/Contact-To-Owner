import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
 
const Dashboard = () => {
   

  document.title = "Dashboard | Contact to Owner";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <BreadCrumb title="Dashboard"  />

 
        </Container>
      </div>

      {/*Remove Modal*/}
     
    </React.Fragment>
  );
};

export default Dashboard;
