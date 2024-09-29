import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

const LinkForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname + location.search; 

  const pathParts = pathname.split("/form/")[1]?.split("&") || [];
  const idPart = pathParts[0] || "";

  const params = new URLSearchParams(pathParts.slice(1).join('&'));
  const name = params.get('name') || "";
 
 


  const _id = idPart.replace("/form/", "");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await loginUser(values);
      if (response.status === 200 && response.data.data.IsActive === true) {
        const { token } = response.data.data; 
        localStorage.setItem("authtoken", token);
        navigate("/");
      } else if (
        response.status === 200 &&
        response.data.data.IsActive === false
      ) {
        alert("The User is Inactive");
      } else {
        alert("Invalid email or password ");
        setFieldError("email", "Invalid email or password");
        setFieldError("password", "Invalid email or password");
      }
    } catch (error) {
      setFieldError("email", "Invalid email or password");
      setFieldError("password", "Invalid email or password");
    }
    setSubmitting(false);
  };

  const loginUser = async (userData) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/login`,
      userData
    );
  };

  const [QRdata, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmitForm = async (values, { setSubmitting, setFieldError }) => {
    try {
    } catch (error) {}
    setSubmitting(false);
  };
  const [isActive, setisActive] = useState("")
  const [heading , setHeading] = useState("")
  const [contact , setContact]= useState("")
  const fetchData = async () => {
    try {
      const categoryId = "664b23653107eed1529ef152";
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/FormQuestion/${idPart}`
      );
      setHeading(res.data[0].category.category);
      setData(res.data);
      const res2 = await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/get/CustomerQR/${name}`)
      setisActive(res2.data.IsActive)
      setContact(res2.data.Contact )
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, name, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, name]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== name));
    }
  };
  const handleWhatsAppRedirect = () => {
    const phoneNumber = contact; 
    const formattedSelectedOptions = selectedOptions.join('\n');
    const customMessage = `Hello Contact to Owner, Kindly Share me the Information for :-\n${formattedSelectedOptions}`;

    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      customMessage
    )}`;

    
    window.open(whatsappURL, "_blank");
  };
  return (
    <>
      {isLoading ? (
            <section className="registration-section pt_130 pb_150">
            <div className="auto-container">
              <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
                <div className="text p_relative d_block mb_25">
                  <h3 className="d_block fs_30 lh_40 fw_bold mb_5">Loading.........</h3>
                </div>
              </div>
            </div>
          </section>
      ) : isActive === true ? (
        <section className="registration-section pt_130 pb_150">
          <div className="auto-container">
            <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
              <div className="text p_relative d_block mb_25">
                <h3 className="d_block fs_30 lh_40 fw_bold mb_5">What is your query</h3>
                {QRdata ? <h5 className="d_block fs_30 lh_40 fw_bold mb_5">{heading}</h5> : null}
              </div>
              <div className="form-inner">
                <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                  {({ errors, touched }) => (
                    <Form className="default-form">
                      <div className="form-group">
                        <label className="p_relative d_block fs_15 font_family_poppins mb_5 color_black">Select Any one</label>
                        {QRdata.map((item, index) => (
                          <div key={index}>
                            <Field
                              type="checkbox"
                              name={item.Que}
                              value={item._id}
                              checked={selectedOptions.includes(item.Que)}
                              onChange={handleCheckboxChange}
                            />
                            <label>{item.Que}</label>
                          </div>
                        ))}
                        {errors.selectedOptions && touched.selectedOptions && (
                          <div className="text-danger">{errors.selectedOptions}</div>
                        )}
                      </div>
                      <div className="row">
                        <div className="form-group message-btn col">
                          <button
                            type="submit"
                            style={{ backgroundColor: "#fec20e" }}
                            className="theme-btn theme-btn-five"
                            onClick={handleWhatsAppRedirect}
                          >
                            Send Msg via whatsapp <i className="icon-4"></i>
                          </button>
                        </div>
                        <div className="form-group message-btn col">
                          <a href="tel:8881636363">
                            <div style={{ backgroundColor: "#fec20e" }} className="theme-btn theme-btn-five">
                              Call <i className="icon-4"></i>
                            </div>
                          </a>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="registration-section pt_130 pb_150">
          <div className="auto-container">
            <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
              <div className="text p_relative d_block mb_25">
                <h3 className="d_block fs_30 lh_40 fw_bold mb_5">QR Not Active</h3>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default LinkForm;
