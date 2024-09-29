import React from "react";
import { Navigate } from "react-router-dom";

import Country from "../pages/LocationSetUp/Country/Country";
import City from "../pages/LocationSetUp/City/City";
import State from "../pages/LocationSetUp/State/State";
import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";
import Login from "../pages/Authentication/Login";
import CategoryMaster from "../pages/Category/CategoryMaster";
import Blogs from "../pages/Blogs/Blogs";
import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
import ProductDetails from "../pages/Products/ProductsDetails";
import UserProfile from "../pages/Authentication/user-profile";
import Banner from "../pages/CMS/Banner";
import CompanyDetails from "../pages/Setup/CompanyDetails";
import AdminUser from "../pages/Auth/AdminUser";
import ContactUs from "../pages/CMS/ContactUs";
import Review from "../pages/CMS/Review";
import NewProject from "../pages/CMS/NewProject";
import GetInTouch from "../pages/GetInTouch/GetInTouch";
import UserSignIn from "../pages/UserSignIn/usersignin";
import Roles from "../pages/Roles/Roles";


import ServiceType from "../pages/ServiceType/ServiceType";
import ServiceDetail from "../pages/ServiceDetail/ServiceDetail";

import Newspaper from "../pages/SubscribeNewspaper/Newspaper";
import Feature from "../pages/Feature/Feature";
import CmsMaster from "../pages/CMS/CmsMaster";

import Customer_QR from "../pages/QRMaster/Customer_QR";
import Franchise_QR from "../pages/QRMaster/Franchise_Qr";
import { components } from "react-select";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cms from "../pages/CMSContactToOwner/Cms";
import QuestionForm from "../pages/Form/form";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  
  { path: "/profile", component: <UserProfile /> },
  { path: "/country", component: <Country /> },
  { path: "/city", component: <City /> },
  { path: "/state", component: <State /> },
  { path: "/location", component: <CompanyLocation /> },
  { path: "/admin-user", component: <AdminUser /> },
  { path: "/company-details", component: <CompanyDetails /> },
  {path:"/contact",component:<ContactUs/>},
  { path: "/category", component: <CategoryMaster /> },
  {path:"/review",component:<Review/>},
  { path: "/blogs", component: <Blogs /> },
  { path: "/banner", component: <Banner /> },
  { path: "/promocode-master", component: <PromocodeMaster /> },
  {path:"/newproject",component:<NewProject/>},
  { path: "/product-details", component: <ProductDetails /> },
  {path:"/getintouch",component:<GetInTouch/>},
  {path:"/roles",component:<Roles/>},

  {path:"/service-type",component:<ServiceType/>},
  {path:"/service-detail",component:<ServiceDetail/>},
  {path:"/user-signin",component:<UserSignIn/>},



  {path:"/newspaper",component:<Newspaper/>},
  {path:"/feature",component:<Feature/>},
  {path:"/cmsmaster",component:<CmsMaster/>},
  {path:"/Customer-QR-master",component:<Customer_QR/>},
  {path:"/Franchise-QR-master",component:<Franchise_QR/>},
  {path:'/dashboard', component :<Dashboard/>},
  {path:'/cms', component:<Cms />},
  {path:'/form', component:<QuestionForm />},

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
