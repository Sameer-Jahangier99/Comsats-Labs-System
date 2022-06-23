import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import QrReader from 'react-qr-reader'
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
  CAlert
} from '@coreui/react'
import { uploadProduct } from "../../../services/actions/productActions"
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from 'src/components/Breadcrumbs'
import axios from 'axios'

const AddEquipments = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Inventory" }, { name: "Add Equipment" }];
  const [imageUrl, setImageUrl] = useState('')
  const [qrId, setQrId] = useState();
  const [name, setName] = useState('');
  const [specification, setSpecification] = useState([])
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [lab, setLab] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const[labs, setLabs] = useState([]);
  const[labId, setLabId] = useState();
  const [productImage, setProductImage] = useState('');
  const inputRef = useRef(null);
  const qrRef = useRef(null)
  const dispatch = useDispatch()
  const { loading, product, error } = useSelector((state) => state.addProduct)

  const generateQrCode = async (e) => {
    e.preventDefault()
    try {
      const id = Date.now().toString(36) + Math.random().toString(36)
      const response = await QRCode.toDataURL(id)
      setImageUrl(response)
      setQrId(id);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(async()=>{
    const { data } = await axios.get('/lab/' )
    if(data.success)
    {
      setLabs(data.data);
    }
  },[])
  const specificationHandler = (e, key, value) => {
    e.preventDefault();
    if (key && value) {
      const data = {
        key,
        value
      }
      setSpecification([...specification, data]);
    }
  }

  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
    setProductImage(inputRef.current.files[0]);

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(specification);
    if (productImage && name && lab && specification) {
     
      const formData = new FormData();
      formData.append("productImage", productImage, productImage.name);
      formData.append('name', name);
      //formData.append('specification', specification);
      formData.append('specification', JSON.stringify(specification));
      formData.append('lab', lab)
      formData.append('imageUrl', imageUrl)
      formData.append('qrId', qrId)
      dispatch(uploadProduct(formData))
      console.log(formData);
    }
  }



  return (
    <>
      <main className='main-div'>
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
          <CRow>
            <CCol md={12}>
              {error && (
                <CAlert color="danger" style={{ textAlign: 'center' }}>
                  {error}
                </CAlert>
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={12}>
              {product && (
                <CAlert color="success" style={{ textAlign: 'center' }}>
                  {product.message}
                </CAlert>
              )}
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md={12}>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add New Product</p>
            </CCol>
            <CCol md={12} className="bg-white rounded-lg">
              <CForm className="row mx-4 g-3"  >
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
                      onChange={(e) => {
                        setLab(e.target.value)
                        
                      }}
                    >
                      <option>Select Lab</option>
                      {labs.length && labs.map((item)=> {
 return <option value={item._id}>{item.name}</option>
                      })}
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
                <CRow className="my-4">
                  <CCol md={3} >
                    <CInputGroup >
                      <button

                        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                        onClick={(e) => generateQrCode(e)}
                      >
                        Generate Qr Code
                      </button>
                    </CInputGroup>
                  </CCol>
                  <CCol md={3} className='mt-0'>
                    <CInputGroup className="d-flex justify-content-center align-items-center">
                      {imageUrl ? (
                        <a href={imageUrl} download>
                          <img src={imageUrl} alt="img" />
                        </a>
                      ) : null}
                    </CInputGroup>
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
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Hardware</p>
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
                    <CCol md={2} className="d-flex justify-content-center align-items-center">
                      <button
                        className=" ml-2 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                        onClick={(e) => specificationHandler(e, key, value)}
                      >
                        Add
                      </button>
                    </CCol>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12} >
                    {specification && specification.map((item) => {
                      return <CCard className='d-flex justify-content-center mt-2'>
                        <CCardBody className='d-flex'>
                          <div className='mx-3'>
                            <p><span className="text-gray-800 dark:text-gray-200 text-md font-bold">Name:&nbsp; &nbsp;</span>{item.key}</p>
                          </div>
                          <div className='mx-3'>
                            <p><span className="text-gray-800 dark:text-gray-200 text-md font-bold">Value: &nbsp; &nbsp;</span>{item.value}</p>
                          </div>
                        </CCardBody>

                      </CCard>

                    })}
                  </CCol>
                </CRow>

                <CRow className="flex items-center justify-end my-4">
                  <CCol md={3} xs={8}>
                    <button
                      onClick={submitHandler}
                      className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      {loading ? "Loading" : "Add Product"}
                    </button>
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
          </CRow>
        </div>
      </main>
    </>
  )
}

export default AddEquipments
