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
import {
  createAdminUser,
  getAdminUser,
  removeAdminUser,
  updateAdminUser,
} from "../../functions/Auth/AdminUser";

const initialState = {
  Que: "",
  // Ans: "",
  category: "",
  

  IsActive: true,
};

const QuestionForm = () => {
  
  const [values, setValues] = useState(initialState);
  const { Que  , category, IsActive } =
    values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [Adminuser, setAdminuser] = useState([]);
  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setCategoryPlaceholder2("")
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    set_Id(_id);
    console.log(_id)
    axios.get(  `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/getFormQuestionById/${_id}`)
      .then((res) => {
        console.log(res)
        setValues({
          ...values,
          Que: res.Que,
          // Ans: res.Ans,
          category: res.category, 
          IsActive: res.IsActive,
         
        });
        // setAnswers(res.Ans)
        // setCategoryPlaceholder( res.category.category)
        setCategoryPlaceholder2( res.category.category)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);
    console.log(values)
    // console.log(answers)
    if (Object.keys(erros).length === 0) {
      const formdata = new FormData();
 
      formdata.append("Que", values.Que);
      // formdata.append("Ans", answers);
      formdata.append("IsActive", true);
      formdata.append("category", values.category); 
     axios.post(   `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/create/FormQuestion`,formdata)
        .then((res) => {
          setmodal_list(!modal_list);
          setValues(initialState);
          // setCategoryPlaceholder("")
          setCategoryPlaceholder2("")
          setCheckImagePhoto(false);
          setIsSubmit(false);
          setFormErrors({});
          setPhotoAdd("");
          fetchData(speciality)
          fetchUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/delete/FormQuestion/${remove_id}`)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchUsers();
        fetchData(speciality)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      const formdata = new FormData();
 
      formdata.append("Que", values.Que);
      // formdata.append("Ans", values.Ans);
      formdata.append("IsActive", values.IsActive);
      formdata.append("category", values.category); 

      axios.put(   `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/update/FormQuestion/${_id}`,
      values)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchUsers();
          fetchData(speciality)
          setPhotoAdd("");

          setCheckImagePhoto(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      setValues({ ...values, bannerImage: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };
  const [errFN, setErrFN] = useState(false);
  const [errLN, setErrLN] = useState(false);
  const [errEM, setErrEM] = useState(false);
  const [errPA, setErrPA] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const validate = (values) => {
    const errors = {};

    if (values.Que === "") {
      errors.Que = "First Name is required!";
      setErrFN(true);
    }
    if (values.Que !== "") {
      setErrFN(false);
    }

    if (values.category === "") {
      errors.category = "category is required!";
      setErrLN(true);
    }
    if (values.category !== "") {
      setErrLN(false);
    }
    // if (values.Ans === "") {
    //   errors.Ans = "Last Name is required!";
    //   setErrLN(true);
    // }
    // if (values.Ans !== "") {
    //   setErrLN(false);
    // }

    // if (values.category === "") {
    //   errors.category = "category is required!";
    //   setErrEM(true);
    // }
    // if (values.category !== "") {
    //   setErrEM(false);
    // }

    if (values.category === "") {
      errors.category = "category address is invalid";
      // Assuming you have a setter function for the error state of category field
      setErrEM(true);
    }
    else{
      setErrEM(false);
  }
    
    

    

    return errors;
  };

  const validClassFN =
    errFN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassLN =
    errLN && isSubmit ?" h-100 p-0 form-control is-invalid p-0" : "h-100 p-0 form-control";

  const validClassEM =
    errEM && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPA =
    errPA && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";
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
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_API_URL_CONTACTUS}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px", padding: "5px" }}
      />
    );
  };

  useEffect(() => {
    console.log(questionData)
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    // fetchUsers();
    // fetchquestions()
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/listByparams/adminUser`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          console.log(">>>", res);
          setLoading(false);
          setAdminuser(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setAdminuser([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };
  const[category_id, setcategoryid] = useState("")
const fetchquestions= async()=>{
    console.log(category_id)
    try{

        axios.get( `${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/FormQuestion/${category_id}`)
        .than((res)=>{
            console.log(res)
        })
    }
    catch{
        console.log("erro")
    }
}
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
      name: "First Name",
      selector: (row) => row.Que,
      sortable: true,
      sortField: "Que",
      minWidth: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.Ans,
      sortable: true,
      sortField: "Ans",
      minWidth: "150px",
    },
    {
      name: "category",
      selector: (row) => row.category,
      sortable: true,
      sortField: "category",
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
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
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


  const options = [
 
    { value: '664b697eb47af88b434b40fb', label: 'Buisness QR' },
    { value: '664b698db47af88b434b40fd', label: 'Vehical QR' },
    { value: '664b6997b47af88b434b40ff', label: 'Pet QR' },
    { value: '664b23653107eed1529ef152', label: 'Keychain QR' },
    { value: '664b699cb47af88b434b4101', label: 'Home QR' },
  ];
  const options2 = [
 
    { value: '6648ec6aa3d0406b27c008b5', label: 'Programming' },
    // { value: 'VehicalQR', label: 'Vehical QR' },
    // { value: 'PetQR', label: 'Pet QR' },
    { value: '664b23653107eed1529ef152', label: 'Keychain QR' },
    // { value: 'HomeQR', label: 'Home QR' },
  ];
  const[questionData, setData]= useState([])
  const [speciality,setSpeciality]=useState('');

  const fetchData = async (categoryId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL_CONTACTUS}/api/auth/getbyid/FormQuestion/${categoryId}`);
      console.log(res);
      setData(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const[categoryPlaceholder, setCategoryPlaceholder]= useState("")
  const[categoryPlaceholder2, setCategoryPlaceholder2]= useState("")
  const handleSpecialityChange = (selectedOption) => {
    console.log('Selected speciality:', selectedOption.value);
    setSpeciality(selectedOption.value);
    setCategoryPlaceholder(selectedOption.label)
    setValues({
        ...values,
        category: selectedOption.value // Assuming label is the property holding the speciality value
    });
    fetchData(selectedOption.value);
  };
  const [speciality2,setSpeciality2]=useState('');
    const handleSpecialityChangeAdd = (selectedOption) => {
    console.log('Selected speciality:', selectedOption.value);
    setSpeciality2(selectedOption.value);
    setCategoryPlaceholder2(selectedOption.label)
    setValues({
        ...values,
        category: selectedOption.value // Assuming label is the property holding the speciality value
    });
    // fetchData(selectedOption.value);
  };
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [isSubmitAns, setIsSubmitAns] = useState(false);
  const [formErrorsAns, setFormErrorsAns] = useState({});

  // Handle change event for inputs
  // const handleChangeAns = (index, event) => {
  //   const newAnswers = [...answers];
  //   newAnswers[index] = event.target.value;
  //   setAnswers(newAnswers);
  // };

  // Validate form and submit
  const handleSubmitAns = (e) => {
    e.preventDefault()
    let errors = {};
    console.log(answers)
    answers.forEach((answer, index) => {
      if (!answer) {
        errors[`Ans${index}`] = 'This field is required';
      }
    });

    setFormErrorsAns(errors);
    setIsSubmitAns(true);

    if (Object.keys(errors).length === 0) {
      // Submit form or handle valid data
      console.log('Form submitted:', answers);
    }
  };
  document.title = "Link Form|Contact to Owner" ;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb  title="Link Form"  pageTitle="Set up" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Link Form</h2>
                    </Col>

                    {/* <Col sm={6} lg={4} md={6}>
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
                    </Col> */}
                    <Col className="col-sm-auto" sm={12} lg={8} md={12}>
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
                        {/* <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <Card className="p-5">
                <Row>
                      <Col lg={12}>
                      <label>
                                       Form category{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                placeholder={categoryPlaceholder}
                name="category"
                id="category"
                value={category}
                // className={validClassLN}
                options={options}
                onChange={handleSpecialityChange}
              /> 

               {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.category}
                                        </p>
                                      )}
                                    </div>
                      </Col>
                    </Row>
                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-1 mb-1 text-right">
                      {/* <DataTable
                        columns={col}
                        data={Adminuser}
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
                      /> */}
                      <Card>
  {questionData.length>0 ? (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Sr</th>
          <th scope="col">Que</th>
          {/* <th scope="col">Ans</th> */}
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {questionData.map((data, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{data.Que}</td>
            {/* <td>{data.Ans}</td> */}
            <td>
              <div className="d-flex gap-2">
                <div className="edit">
                  <button
                    className="btn btn-sm btn-success edit-item-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#showModal"
                    onClick={() => handleTog_edit(data._id)}
                  >
                    Edit
                  </button>
                </div>
                <div className="remove">
                  <button
                    className="btn btn-sm btn-danger remove-item-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteRecordModal"
                    onClick={() => tog_delete(data._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) :null }
</Card>

                    </div>
                  </div>
                </CardBody>
                </Card>
               
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
          Add Admin
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
            <label>
                                       Form category{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    {console.log(categoryPlaceholder2)}
                                    <div className="form-floating mb-3">
                                    <Select
                placeholder={categoryPlaceholder2}
                name="category"
                id="category"
                value={category}
                className={validClassLN}
                options={options}
                onChange={handleSpecialityChangeAdd}
              /> 

               {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.category}
                                        </p>
                                      )}
            </div>
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter last Name"
                required
                name="Que"
                value={Que}
                onChange={handleChange}
              />
              <Label>
               Question<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.que}</p>}
            </div>
            {/* {[0, 1, 2, 3].map((index) => (
        <div className="form-floating mb-3" key={index}>
          <Input
            type="text"
            className={formErrors[`Ans${index}`] ? 'is-invalid' : ''}
            placeholder={`Enter answer ${index + 1}`}
            required
            name={`Ans${index}`}
            value={answers[index]}
            onChange={(e) => handleChangeAns(index, e)}
          />
          <Label>
            Ans {index + 1} <span className="text-danger">*</span>
          </Label>
          {isSubmitAns && formErrorsAns[`Ans${index}`] && <p className="text-danger">{formErrorsAns[`Ans${index}`]}</p>}
        </div>
      ))} */}
      {/* <button onClick={handleSubmitAns} className="btn btn-primary">Submit</button> */}
    
            {/* <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div> */}
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
                  setCategoryPlaceholder2("")
                  setCategoryPlaceholder("")
                  setIsSubmit(false);
                  setCheckImagePhoto(false);
                  setPhotoAdd("");
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
          Edit Link Form
        </ModalHeader>
        <form>
        <ModalBody>
        {/* <div className="form-floating mb-3">
            <label>
                                       Form category{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                    isDisabled
                placeholder={categoryPlaceholder2}
                name="category"
                id="category"
                value={category}
                className={validClassLN}
                options={options2}
                onChange={handleSpecialityChangeAdd}
              /> 

               {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.category}
                                        </p>
                                      )}
            </div>
            </div> */}
            {/* <div className="form-floating mb-3">
            <label>
                                       Form category{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                placeholder={category}
                name="category"
                id="category"
                value={category}
                // className={validClassSP}
                options={options2}
                onChange={handleSpecialityChange}
              /> 

               {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.speciality}
                                        </p>
                                      )}
            </div>
            </div> */}
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter last Name"
                required
                name="Que"
                value={Que}
                onChange={handleChange}
              />
              <Label>
               Question<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.que}</p>}
            </div>
            {/* <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassLN}
                placeholder="Enter last Name"
                required
                name="Ans"
                value={Ans}
                onChange={handleChange}
              />
              <Label>
               Ans<span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Ans}</p>}
            </div> */}
            {/* {[0, 1, 2, 3].map((index) => (
        <div className="form-floating mb-3" key={index}>
          <Input
            type="text"
            className={formErrors[`Ans${index}`] ? 'is-invalid' : ''}
            placeholder={`Enter answer ${index + 1}`}
            required
            name={`Ans${index}`}
            value={answers[index]}
            onChange={(e) => handleChangeAns(index, e)}
          />
          <Label>
            Ans {index + 1} <span className="text-danger">*</span>
          </Label>
          {isSubmitAns && formErrorsAns[`Ans${index}`] && <p className="text-danger">{formErrorsAns[`Ans${index}`]}</p>}
        </div>
      ))} */}

            {/* <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div> */}
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
          Remove Admin
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

export default QuestionForm;
