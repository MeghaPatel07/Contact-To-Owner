 
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";

const VerticalLayout = (props) => {
  const [locationSetup, setLocationSetup] = useState(false);
  const [setup, setSetup] = useState(false);
  const [qr, setQR] = useState(false);
  const [params, setParams] = useState(false);

  const [product, setproduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [cms, setCMS] = useState(false); 
  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      {/* <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li> */}
       <li className="nav-item">
              {" "}
              <Link to="/dashboard" className="nav-link">
            Dashboard
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/form" className="nav-link">
            Question Form
              </Link>
            </li>
      <li className="nav-item">
        <Link
          // className="nav-link menu-link"
          // to="#"
          
          data-bs-toggle="collapse"
          onClick={() => {
            setSetup(!setup);
          }}
        >
          {/* <span data-key="t-apps"> </span> */}
        </Link>

        {/* <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li> 
             

            <li className="nav-item">
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/newspaper" className="nav-link">
                Subscribe Newspaper
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feature" className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cmsmaster" className="nav-link">
                Cms Master
              </Link>
            </li>
           

          </ul>
        </Collapse> */}
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setQR(!qr);
            setCMS(false)
          }}
        >
          <span data-key="t-apps"> BuyQR Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={qr}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
          <li className="nav-item">
              {" "}
              <Link to="/Customer-QR-master" className="nav-link">
              Customer QR masters
              </Link>
            </li>
            {/* <li className="nav-item">
              {" "}
              <Link to="/Franchise-QR-master" className="nav-link">
              Franchise QR masters
              </Link>
            </li> */}
            

             
           
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setQR(false);
            setSetup(!setup);
            setCMS(false)
          }}
        >
          <span data-key="t-apps"> Setup </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={setup}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
          {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li> */}
            <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
              Registered User
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/roles" className="nav-link">
              Team Memeber Master
              </Link>
            </li> */}
            <li className="nav-item">
              {" "}
              <Link to="/getintouch" className="nav-link">
               Contact inquiry
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/service-type" className="nav-link">
                ServiceType
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/service-detail" className="nav-link">
                 Service Details
               </Link>
             </li> */}
             <li className="nav-item">
          <Link to="/newspaper" className="nav-link">
                 Subscribe Newspaper
               </Link>
             </li>
           
           
            {/* <li className="nav-item">
               <Link to="/feature" className="nav-link">
                 Features
               </Link>
             </li> */}
             {/* <li className="nav-item">
            <Link to="/cmsmaster" className="nav-link">                Cms Master
              </Link>
            </li>
             */}

             
           
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setQR(false);
            setSetup(false)
            setCMS(!cms);
          }}
        >
          <span data-key="t-apps">CMS Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cms}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
          <li className="nav-item">
              {" "}
              <Link to="/cms" className="nav-link">
             CMS
              </Link>
            </li>
          <li className="nav-item">
              {" "}
              <Link to="/service-detail" className="nav-link">
             Services
              </Link>
            </li>
            {/* <li className="nav-item">
              {" "}
              <Link to="/Franchise-QR-master" className="nav-link">
              Franchise QR masters
              </Link>
            </li> */}
               <li className="nav-item">
              <Link to="/roles" className="nav-link">
              Team Memeber Master
              </Link>
            </li>

             
           
          </ul>
        </Collapse>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
