import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../assets/images/successful.png'
import { Link, useNavigate } from 'react-router-dom';

const SuccessCard = () => {
    const navigate=useNavigate()
    const pdf = localStorage.getItem('pdf');
    const invoice = localStorage.getItem('invoice');
    console.log(pdf)
    const handleInvoicePreview = () => {
        const newTab = window.open('/invoice', '_blank');
        // You can perform additional actions with the new tab if needed
    };
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col lg={12}>
          <Card className='success-card' style={{ width: '20rem' }}>
          <Card.Img  className='mx-auto d-block w-25' variant="center" src={img1} />
            <Card.Body>
              <Card.Title className='text-success'>Order Successful !!</Card.Title>
              <Card.Text>
                <p className=''>Order Number : {invoice}</p>
                <p>Thank you for shopping</p>
                
              </Card.Text>
              <Button variant="secondary" onClick={handleInvoicePreview} className="mr-2">Invoice</Button>

              <Button variant="secondary"  ><a
              style={{color:'white'}}
            href={`${process.env.REACT_APP_API_URL_CONTACTUS}${pdf}`}
            
            target="_blank"
            rel="noopener noreferrer"
          >
           Download QR Pdf
          </a></Button>
            </Card.Body>
          </Card>
          <div className='text-center mt-5 text-decoration-underline '>
  <Link className='text-dark' to='/' >Continue Shopping</Link>
</div>

        </Col>
      </Row>
  
    
        
           
    </Container>
    </>
  )
}

export default SuccessCard
