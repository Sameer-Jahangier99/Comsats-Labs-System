import React, { useEffect, useState, useRef } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CCardBody,
  CFormSelect,
  CCard,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
  CAlert
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { allProducts, deleteProduct, updateProducts } from "src/services/actions/productActions"
import { useHistory } from "react-router-dom"
import { imageUrl } from 'src/utils.js/imageUrl'
import Breadcrumbs from 'src/components/Breadcrumbs'
import { Modal, Button } from 'react-bootstrap';

import axios from 'axios';
import { BASE_URL } from 'src/services/axios';

const AllEquipments = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Inventory" }, { name: "All Equipment" }];
  const [name, setName] = useState(null);
  const [specification, setSpecification] = useState([])
  const [key, setKey] = useState(null);
  const [value, setValue] = useState(null);
  const [lab, setLab] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [productImage, setProductImage] = useState('');
  const inputRef = useRef(null);
  const [qrId, setQrId] = useState();
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [deleteId, setDeleteId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState();
  const history = useHistory();

  const { products, error } = useSelector((state) => state.allProductRed)
  const { loading } = useSelector((state) => state.updateProduct)
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log(products)

  useEffect(() => {
    dispatch(allProducts())
  }, [dispatch, loading, refresh])
  const editHandler = (product) => {
    setName(product.name)
    setSpecification(product.specification)
    setLab(product.lab)
    setQrId(product.qrId)
    setId(product._id);
    setVisible(true)
  }

  const specificationHandler = (e) => {
    e.preventDefault();
    console.log("key", key);
    console.log("index", index);
    let data = {
      key, value
    }
    let arr = [];
    specification.map((item) => {
      arr.push(item);
    })
    arr[index] = data;
    setSpecification(arr)
  }


  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
    setProductImage(inputRef.current.files[0]);

  };

  const deleteHandler = (id) => {
    setDeleteId(id);
    setModalShow(true)
  }

  const editSpecHandler = (item, idx) => {
    setIndex(idx);
    setKey(item.key)
    setValue(item.value)
    setShow(true)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (productImage) {
      const formData = new FormData();
      formData.append('_id', id)
      formData.append("productImage", productImage, productImage.name);
      dispatch(updateProducts(formData))
    } else {
      let data = {
        name, _id: id, specification, lab
      }
      console.log("data", data);
    }
    // dispatch(updateProducts(formData))
  }

  const deleteComplaint = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`${BASE_URL}/product/${deleteId}`, config)
    console.log(data)
    if (data.success) {
      setDeleteId("");
      setModalShow(false)
      setRefresh(true)
    }
  }


  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body className="">
          <div className='d-flex justify-content-between'>
            <h4>Are you sure ?</h4>
            <i className="fa fa-times mouse-over " aria-hidden="true" onClick={() => setModalShow(false)}></i>
          </div>

          <div className='row'>
            <div className='col-12 d-flex justify-content-center'>
              <Button variant="danger" size="lg" onClick={deleteComplaint} className="mouse-over" style={{ width: "10rem" }}>
                Yes
              </Button>{' '}
              <Button variant="warning" size="lg" className='ml-3 mouse-over' onClick={() => setModalShow(false)} style={{ width: "10rem" }}>
                No
              </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    );
  }


  return (
    <>
      <main className='main-div'>
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div>
          <h4 className="font-semibold">All Product</h4>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lab
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Qr Code
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Added By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products &&
                      products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <img style={{ width: "7rem", height: "7rem", objectFit: "cover" }} src={`${imageUrl}${product.productImage}`} alt={product.name} ></img>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.lab && product.lab.name && product.lab.name }
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <a href={product.imageUrl} download>
                                  <img style={{ width: "7rem", height: "7rem" }} src={product.imageUrl} alt={product.name} ></img>
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.user && product.user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => editHandler(product)}>
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                            {/* <button onClick={() => history.push(`/viewEquipment/${product._id}`)}>
                              view
                            </button> */}
                            <button
                              style={{ padding: '5px' }}
                              onClick={() => deleteHandler(product._id)}
                            >
                              <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        <CModal alignment="center" size='lg' visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Update Product</p>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className='justify-content-center'>
              <CForm className='row mx-4 g-3'>
                <CCol md={6}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <i class="fas fa-signature"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i class="fas fa-laptop"></i>
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      value={lab}
                      onChange={(e) => {
                        setLab(e.target.value)
                      }}

                    >
                      <option>Select Lab</option>
                      <option value="Lab-1">Lab-1</option>
                      <option value="Lab-2">Lab-2</option>
                      <option value="Lab-3">Lab-3</option>
                      <option value="Lab-4">Lab-4</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
                <CRow className='my-3'>
                  <CCol md={3}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">
                      Update Picture
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <input
                      ref={inputRef}
                      onChange={handleDisplayFileDetails}
                      type="file"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Update specification</p>
                  </CCol>
                </CRow>
                <CRow className='my-4'>
                  <CCol md={12} className="d-flex justify-content-center align-items-center">
                    <CCol md={4} className=''>
                      <CInputGroup >
                        <CInputGroupText>
                          <i class="fas fa-star"></i>
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Enter Name"
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={1}>
                    </CCol>
                    <CCol md={5} className=''>
                      <CInputGroup >
                        <CInputGroupText>
                          <i class="fas fa-star"></i>
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Enter Value"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={2} className=''>
                      <button
                        className=" ml-2 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                        onClick={(e) => specificationHandler(e)}
                      >
                        Update
                      </button>
                    </CCol>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12} >
                    {specification && specification.map((item, index) => {
                      return <CCard key={index} className='d-flex justify-content-center mt-2'>
                        <CCardBody className='d-flex'>
                          <CCol md={11} className='d-flex justify-content-start'>
                            <div className='mx-3'>
                              <p><span className="text-gray-800 dark:text-gray-200 text-md font-bold">Name:&nbsp; &nbsp;</span>{item.key}</p>

                            </div>

                            <div className='mx-3'>
                              <p><span className="text-gray-800 dark:text-gray-200 text-md font-bold">Value: &nbsp; &nbsp;</span>{item.value}</p>

                            </div>
                          </CCol>
                          <CCol md={1}>

                            <CButton color='info' variant='ghost' onClick={() => editSpecHandler(item, index)}>
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                            </CButton>
                          </CCol>

                        </CCardBody>
                      </CCard>
                    })}
                  </CCol>
                </CRow>
              </CForm>

            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={submitHandler}> {loading ? "Loading" : "upload Product"}</CButton>
          </CModalFooter>
        </CModal>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </main>

    </>
  )
}

export default AllEquipments
