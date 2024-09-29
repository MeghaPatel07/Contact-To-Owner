import './App.css';
import About from './Pages/About';
import "./assets/css/font-awesome-all.css";
import "./assets/css/flaticon.css";
import "./assets/css/owl.css";
import "./assets/css/bootstrap.css";
import "./assets/css/jquery.fancybox.min.css";
import "./assets/css/animate.css";
import "./assets/css/color.css";
import "./assets/css/global.css";
import "./assets/css/nice-select.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/elpath.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import GetYourQrCode from './Pages/GetYourQrCode';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhyUse from './Pages/WhyUse';
import Pricing from './Pages/Pricing';
import ContactUs from './Pages/ContactUs';
// import Services from './Pages/Services';
// import ProductDetails from './Pages/ProductDetails';
import PlaceOrder from './Pages/PlaceOrder';
import { Invoice } from './Pages/Invoice';
import SuccessCard from './Components/SuccessCard';
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import LinkForm from './Pages/Form';
import PrivacyPolicy from './Pages/PrivacyPolicy';


function App() {
  return (
    <div  >
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/get-your-qr-code" element={<GetYourQrCode/>}></Route>
        <Route path="/why-use" element={<WhyUse/>}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        {/* <Route path="/services" element={<Services />}></Route> */}
        {/* <Route path="/product-details" element={<ProductDetails />}></Route> */}
        <Route path="/place-order" element={<PlaceOrder />}></Route>
        <Route path="/invoice" element={<Invoice />}></Route>
        <Route path="/success" element={<SuccessCard />}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/privacy-policy' element={<PrivacyPolicy />} ></Route>
      
        <Route path='/form/:id' element={<LinkForm />} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
