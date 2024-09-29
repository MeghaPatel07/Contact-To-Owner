import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from '../assets/images/successful.png'
import { Link, useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
   
  return (
    <>
    <Container className='mt-5 mb-5'>
     <div  className='text-center'>
     <h3>
      Privacy Policy
</h3>
     </div>
      

      <p className='text-black'>
      This website does not collect Personal Information about you when you visit the
      site unless you choose to provide such information.
      </p>
      <p  className='text-black' style={{fontWeight:'bold'}}>
      Collection of Personal Information
      </p>

      <p  className='text-black'>
      If you are asked for any other Personal Information and you choose to give it, you
will be informed on how the information will be used. If at any time you believe
that the principles referred to in this privacy statement have not been followed, or
if you have any other comments on these principles, please notify the webmaster
through the Contact Us page.
      </p>

      <p  className='text-black'>
      We do not share or sell personally identifiable data with other service providers,
who can use such information for commercial promotion. Our newsletter and
other mailers are sent to you on your explicit instruction and you can opt out of it
at any time.
      </p>

      <p  className='text-black'>
      When you register for any services on www.contacttoowner.com. We Generate a
secure QR code for any item be it your vehicle, pet, home, hotel, or keychain. Affix
the generated QR code onto your item, ensuring visibility for easy scanning.
Enable secure identification using the QR code allowing quick access to
information without revealing personal details.
      </p>

      <p  className='text-black'>
      Anyone can scan the QR code for quick access to information, promoting
universal usability without the need for specific apps. In case of an emergency or
to return a lost item, the person scanning the QR code can initiate contact
through a secure communication channel, ensuring owner privacy. Initiate secure
toll-free calls directly from the QR code for efficient communication without
disclosing personal contact details.
      </p>
       
    
        
           
    </Container>
    </>
  )
}

export default PrivacyPolicy
