import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import axios from "axios";
import DataTable from "react-data-table-component";
import Select from 'react-select' 

const QRCode = require('qrcode');
const { PDFDocument, rgb } = require('pdf-lib');

// import {
//   createContact,
//   removeContact,
//   updateContact,
//   getContact,
// } from '../../functions/Conatct1/Contacct'

const initialState = {
    Name: "",
    Email: "",
    Contact1: "",
    Contact2: "", // There are two Contact fields, but the target form only has three fields, so one field will be left blank
    State: "",
    City: "",
    Area: "",
    Pin: "",
    Address: "",
    Package: "",
    pdf:"",
    IsActive: false,
    pdf:""
};

const Franchise_QR = () => {
  const [values, setValues] = useState(initialState);
  const {  Name,Email,Contact1,Contact2,State,City,Area,Pin,Address,Package, IsActive,pdf } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [errCN, setErrCN] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (row) => {
    setmodal_delete(!modal_delete);
    set_Id(row._id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (row, _id) => {
    console.log("ididiidididididididi", row);
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(row._id);
    setValues(row);
    // getContact(_id)
    //   .then((res) => {
    //     console.log(res);
    //     setValues({
    //       ...values,
    //       contactno: res.contactno,
    //       address:res.address,
    //       email:res.email,
    //       IsActive: res.IsActive,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setFormErrors({});
    console.log("country", values);
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
  
    if (Object.keys(errors).length === 0) {
      try {
        // Make API call to server to create customer QR
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/CustomerQR`,
          values // Send necessary data to server (values object)
        );
  
        // Handle response from server
        const { data } = response;
        console.log(data)
        if (data ) {
          // PDF generation successful
          console.log("PDF with QR codes generated successfully");
          fetchCategories()
          setmodal_list(false);
          setValues(initialState);
          setIsSubmit(false);
          // Handle the generated PDF based on your requirements
          // For example, you can download the PDF or display it to the user
          // Here, we'll initiate a download
          // const blob = new Blob([data], { type: "application/pdf" });
          // const url = window.URL.createObjectURL(blob);
          // const a = document.createElement("a");
          // a.href = url;
          // const temp=values.Name
          // a.download = `${process.env.REACT_APP_API_URL_CONTACTUS}/${response.pdf}` 
          // document.body.appendChild(a);
          // a.click();
          // window.URL.revokeObjectURL(url);
        } else {
          // PDF generation failed
          console.error("Error generating PDF with QR codes");
        }
      } catch (error) {
        console.error("Error generating PDF with QR codes:", error);
      }
    }
  };
  
  

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(
        `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/remove/CustomerQR/${_id}`
      )
      .then((response) => {
        if(response.isOk){
          console.log(response)
          
        }
        fetchCategories();
      });

    setmodal_delete(!modal_delete);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormErrors({});
 
    console.log("country", values);
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    console.log("hii",values.pdf)
    const form= new FormData()
    form.append("pdf", values.pdf);
    form.append("Name", values.Name);
form.append("Email", values.Email);
form.append("Contact1", values.Contact1);
form.append("Contact2", values.Contact2);
form.append("State", values.State);
form.append("City", values.City);
form.append("Area", values.Area);
form.append("Pin", values.Pin);
form.append("Address", values.Address);
form.append("Package", values.Package);
form.append("IsActive", values.IsActive);

    if (Object.keys(errors).length === 0) {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/CustomerQR/${_id}`,
          form
        )
        .then((response) => {
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
      setmodal_edit(!modal_edit);
    }
  };

  const validate = (values) => {
    const errors = {};

    // if (values.ServiceName === "") {
    //   errors.ServiceName = " Name is required!";
    //   setErrCN(true);
    // }
    // if (values.ServiceName !== "") {
    //   setErrCN(false);
    // }

    return errors;
  };

  const validClassCategoryName =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/listCustomerQRbyparam`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setCategories(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCategories([]);
        }
        // console.log(res);
      });
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };
  const col = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
      sortField: "srno",
      minWidth: "150px",
    },
    {
      name: " Name",
      selector: (row) => row.Name,
      sortable: true,
      sortField: "Name",
      minWidth: "150px",
    },
    {
      name: "pdf",
      selector: (row) => (
        <div>
          {console.log(row.pdf)}
          <a
            href={`${process.env.REACT_APP_API_URL_CONTACTUS}${row.pdf}`}
            
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.pdf && row.pdf.endsWith(".pdf") ? "PDF Preview" : "File Preview"}
          </a>
        </div>
      ),
      sortable: true,
      sortField: "Name", // Assuming Name is the field used for sorting
      minWidth: "150px",
    },
    
    {
      name: " Email",
      selector: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      minWidth: "150px",
    },
    {
      name: " Contact1",
      selector: (row) => row.Contact1,
      sortable: true,
      sortField: "Contact1",
      minWidth: "150px",
    },

    {
      name: " Contact2",
      selector: (row) => row.Contact2,
      sortable: true,
      sortField: "Contact2",
      minWidth: "150px",
    },
    {
      name: " State",
      selector: (row) => row.State,
      sortable: true,
      sortField: "State",
      minWidth: "150px",
    },
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
      sortField: "City",
      minWidth: "150px",
    },
    {
      name: "Area",
      selector: (row) => row.Area,
      sortable: true,
      sortField: "Area",
      minWidth: "150px",
    },
    {
      name: "Pin",
      selector: (row) => row.Pin,
      sortable: true,
      sortField: "Pin",
      minWidth: "150px",
    },
    {
      name: "Address",
      selector: (row) => row.Address,
      sortable: true,
      sortField: "Address",
      minWidth: "150px",
    },
    {
      name: "Package",
      selector: (row) => row.Package,
      sortable: true,
      sortField: "Package",
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row, index)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];
// const [PackageOptions,setPackageOptions]=useState([])

const PackageOptions=[
  {label:"Gold",value:"Gold"},
  {label:"Silver",value:"Silver"},
  {label:"Platenium",value:"Platenium"}, 
]

const handleSelectChange=(selectoptions) =>{
  console.log(selectoptions)
   setValues({...values,Package:selectoptions.value})
}
const fileUpload = (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    if (
      file.type === "application/pdf" 
       
    ) {
      console.log("File:", file);
      setValues({...values,pdf:file})
    } else {
      console.error(
        "Invalid file type. Please select a PDF, Word, Excel, or PowerPoint file."
      );
    }
  }
};

  document.title = "Customer QR Master|Contact to Owner";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
        
            title="Customer QR Master"
          
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Customer QR Master</h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
                      <div className="text-end mt-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="ms-2">
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div>
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-1 mb-1 text-right">
                      <DataTable
                        columns={col}
                        data={categories}
                        progressPending={loading}
                        sortServer
                        onSort={(column, sortDirection, sortedRows) => {
                          handleSort(column, sortDirection);
                        }}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        paginationRowsPerPageOptions={[10, 50, 100, totalRows]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Customer QR Master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                // className={validClassCategoryName}
                placeholder="Enter Area Type"
                required
                name="Name"
                value={values.Name}
                onChange={handleChange}
              />
              <Label>
                 Name <span className="text-danger">*</span>
              </Label>
              {/* {isSubmit && <p className="text-danger">{formErrors.ServiceName}</p>} */}
            </div>
            <div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Email"
    required
    name="Email"
    value={values.Email}
    onChange={handleChange}
  />
  <Label>
    Email <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Email}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Contact1"
    required
    name="Contact1"
    value={values.Contact1}
    onChange={handleChange}
  />
  <Label>
    Contact1 <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Contact1}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Contact2"
    name="Contact2"
    value={values.Contact2}
    onChange={handleChange}
  />
  <Label>Contact2<span className="text-danger">*</span></Label>
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter State"
    required
    name="State"
    value={values.State}
    onChange={handleChange}
  />
  <Label>
    State <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.State}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter City"
    required
    name="City"
    value={values.City}
    onChange={handleChange}
  />
  <Label>
    City <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.City}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Area"
    required
    name="Area"
    value={values.Area}
    onChange={handleChange}
  />
  <Label>
    Area <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Area}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Pin"
    required
    name="Pin"
    value={values.Pin}
    onChange={handleChange}
  />
  <Label>
    Pin <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Pin}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Address"
    required
    name="Address"
    value={values.Address}
    onChange={handleChange}
  />
  <Label>
    Address <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Address}</p>} */}
</div>
<Label>
    Package <span className="text-danger">*</span>
  </Label>
<div className="form-floating mb-3">
  {/* <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Package"
    required
    name="Package"
    value={values.Package}
    onChange={handleChange}
  /> */}
  <Select
  name="Package"
  options={PackageOptions}
  onChange={handleSelectChange}
   />
 
  {/* {isSubmit && <p className="text-danger">{formErrors.Package}</p>} */}
</div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(initialState);
                  setIsSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
            setIsSubmit(false);
          }}
        >
      Edit Service Type
        </ModalHeader>
        <form>
        <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                // className={validClassCategoryName}
                placeholder="Enter Area Type"
                required
                name="Name"
                value={values.Name}
                onChange={handleChange}
              />
              <Label>
                 Name <span className="text-danger">*</span>
              </Label>
              {/* {isSubmit && <p className="text-danger">{formErrors.ServiceName}</p>} */}
            </div>
            <div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Email"
    required
    name="Email"
    value={values.Email}
    onChange={handleChange}
  />
  <Label>
    Email <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Email}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Contact1"
    required
    name="Contact1"
    value={values.Contact1}
    onChange={handleChange}
  />
  <Label>
    Contact1 <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Contact1}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Contact2"
    name="Contact2"
    value={values.Contact2}
    onChange={handleChange}
  />
  <Label>Contact2<span className="text-danger">*</span></Label>
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter State"
    required
    name="State"
    value={values.State}
    onChange={handleChange}
  />
  <Label>
    State <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.State}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter City"
    required
    name="City"
    value={values.City}
    onChange={handleChange}
  />
  <Label>
    City <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.City}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Area"
    required
    name="Area"
    value={values.Area}
    onChange={handleChange}
  />
  <Label>
    Area <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Area}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Pin"
    required
    name="Pin"
    value={values.Pin}
    onChange={handleChange}
  />
  <Label>
    Pin <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Pin}</p>} */}
</div>

<div className="form-floating mb-3">
  <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Address"
    required
    name="Address"
    value={values.Address}
    onChange={handleChange}
  />
  <Label>
    Address <span className="text-danger">*</span>
  </Label>
  {/* {isSubmit && <p className="text-danger">{formErrors.Address}</p>} */}
</div>
<Label>
    Package <span className="text-danger">*</span>
  </Label>
<div className="form-floating mb-3">
  {/* <Input
    type="text"
    // className={validClassCategoryName}
    placeholder="Enter Package"
    required
    name="Package"
    value={values.Package}
    onChange={handleChange}
  /> */}
  <Select
  name="Package"
  options={PackageOptions}
  onChange={handleSelectChange}
   />
 
  {/* {isSubmit && <p className="text-danger">{formErrors.Package}</p>} */}
</div>
<label>
                                     QR PDF{" "}
                                      <span className="text-danger">*</span>
                                    </label>
<div className="form-floating mb-3">

<div style={{ paddingTop: "10px" }}>
                                      {pdf && (
                                        <div>
                                          <a
                                            href={`${process.env.REACT_APP_API_URL_CONTACTUS}${pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {pdf.name &&
                                            pdf.name.endsWith(".pdf")
                                              ? "PDF Preview"
                                              : "File Preview"}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                    <Input
                                      key={"File_" + _id}
                                      type="file"
                                      name="pdf"
                                      // className={validClassBT}
                                      accept=".pdf "
                                      onChange={fileUpload}
                                    />
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.File}
                                      </p>
                                    )} */}

                                  
</div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_edit(false);
                  setIsSubmit(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Service Type
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Franchise_QR;