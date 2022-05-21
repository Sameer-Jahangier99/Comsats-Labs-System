import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { allProducts } from 'src/services/actions/productActions'
import { addComplaint } from 'src/services/actions/complaintActions'
import { Alert } from 'src/components/Alert'
import Breadcrumbs from 'src/components/Breadcrumbs'
import { Checkbox } from 'antd'
import axios from 'axios'
const AddComplaint = () => {
  const breadCrumbsInfo = [
    { name: 'Home', href: '/' },
    { name: 'Complaints' },
    { name: 'Add Complaint' },
  ]
  const [complaint, setComplaint] = useState({
    title: '',
    type: '',
  })
  const [softwareComplaint, setSoftwareComplaint] = useState({
    type: '',
    lab: '',
    note: '',
    softwares: [],
  })
  const [hardwareComplaint, setHardwareComplaint] = useState({
    lab: '',
    product: '',
    component: [],
    note: '',
  })
  const [networkComplaint, setNetworkComplaint] = useState({
    type: '',
    lab: '',
    note: '',
  })
  const [otherComplaint, setOtherComplaint] = useState({
    lab: '',
    type: '',
    note: '',
  })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [labs, setLabs] = useState([])
  const [availableSoftware, setAvailableSoftware] = useState([])
  const [labProducts, setLabProducts] = useState([])
  const [availableHardware, setAvailableHardware] = useState([])
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.allProductRed)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { error, loading, result } = useSelector((state) => state.addComplaint)

  console.log("user info",userInfo)

  useEffect(() => {
    dispatch(allProducts())
  }, [dispatch])

  useEffect(async () => {
    const { data } = await axios.get('/lab/')
    if (data.success) {
      setLabs(data.data)
    }
  }, [])

  const labHandler = (lab) => {
    const labProducts = products.filter((item) => item.lab == lab)
    setFilteredProducts(labProducts)
    setComplaint({ ...complaint, lab: lab })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    let data = {
      ...complaint,
      user: userInfo._id,
    }
    dispatch(addComplaint(data))
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues)
    setSoftwareComplaint({ ...softwareComplaint, softwares: checkedValues })
  }

  function onHardwareChange(checkedValues) {
    console.log('checked = ', checkedValues)
    setHardwareComplaint({ ...hardwareComplaint, component: checkedValues })
  }

  const softwareComplaintHandler = (id) => {
    setSoftwareComplaint({ ...softwareComplaint, lab: id })
    const result = labs.filter((item) => item._id === id)
    setAvailableSoftware(result[0].softwares)
  }

  const hardwareComplaintHandler = async (id) => {
    let object = {
      lab: id,
    }
    setHardwareComplaint({ ...hardwareComplaint, lab: id })
    const { data } = await axios.post('/product/lab', object)
    setLabProducts(data)
  }

  const hardwareProdcutHandler = (id) => {
    setHardwareComplaint({ ...hardwareComplaint, product: id })
    const result = labProducts.filter((item) => item._id == id)
    console.log('result', result[0].specification)
    setAvailableHardware(result[0].specification)
  }

  const softwareComplaintSubmit = async(e) => {
    e.preventDefault()
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    let dataToSend = {
        title: complaint.title,
        user: userInfo._id,
        type: complaint.type,
        lab: softwareComplaint.lab,
        software: softwareComplaint,
    }
    const { data } = await axios.post('/complaint', dataToSend, config)
    console.log(data);
   
  }

  const hardwareComplaintSubmit = async(e) => {
    e.preventDefault()
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    let dataToSend = {
        title: complaint.title,
        user: userInfo._id,
        type: complaint.type,
        lab: hardwareComplaint.lab,
        hardware: hardwareComplaint,
    }
    const { data } = await axios.post('/complaint', dataToSend, config)
    console.log(data);
   
  }

  const networkComplaintSubmit = async(e) => {
    e.preventDefault() 
     const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }

    let dataToSend = {
        title: complaint.title,
        user: userInfo._id,
        type: complaint.type,
        lab: networkComplaint.lab,
        network: networkComplaint,
    }
    const { data } = await axios.post('/complaint', dataToSend, config)
    console.log(data);
  }

  const otherComplaintSubmit = async(e) => {
    e.preventDefault()
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    let dataToSend = {
        title: complaint.title,
        user: userInfo._id,
        type: complaint.type,
        lab: otherComplaint.lab,
        other: otherComplaint,
    }
    const { data } = await axios.post('/complaint', dataToSend, config)
    console.log(data);
    
  }

  return (
    <>
      <main className="main-div">
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <CRow>
          <CCol md={12}>
            <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Complaint</p>
          </CCol>
        </CRow>

        {/* main complaints */}
        <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
          <CRow className="justify-content-center">
            <CCol md={12} className="bg-white rounded-lg">
              <CForm className="row mx-4 g-3">
                <CCol md={12}>
                  {result && <Alert msg={'Complaint has been registered'} color={'success'} />}
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fas fa-phone"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Title"
                      autoComplete=""
                      value={complaint.title}
                      onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fas fa-user-tag"></i>
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => setComplaint({ ...complaint, type: e.target.value })}
                    >
                      <option>Select Complaint Type</option>
                      <option value="hardware">Hardware</option>
                      <option value="software">Software</option>
                      <option value="network">Network</option>
                      <option value="other">Other Equipment</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
              </CForm>
            </CCol>
          </CRow>
        </div>

        {/* software complaints */}
        {complaint && complaint['type']
          ? complaint['type'] == 'software' && (
              <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                <CRow className="justify-content-center">
                  <CCol md={12}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Software</p>
                  </CCol>
                  <CCol md={12} className="bg-white rounded-lg">
                    <CForm className="row mx-4 g-3">
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) => softwareComplaintHandler(e.target.value)}
                          >
                            <option>Select Lab</option>

                            {labs.length &&
                              labs.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                              })}
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>

                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setSoftwareComplaint({ ...softwareComplaint, type: e.target.value })
                            }
                          >
                            <option>Software Complaint Type</option>
                            <option value="notAvailabe">Not Available</option>
                            <option value="notRegistered">Not Registered</option>
                            <option value="notWorking">Not Working</option>
                            <option value="other">Other</option>
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <Checkbox.Group style={{ width: '100vw' }} onChange={onChange}>
                        <CCol md={12}>
                          {availableSoftware.length > 0
                            ? availableSoftware.map((item) => {
                                return (
                                  <Checkbox value={item} className="me-3">
                                    {' '}
                                    {item}
                                  </Checkbox>
                                )
                              })
                            : null}
                        </CCol>
                      </Checkbox.Group>

                      <CCol xs={12} className="mb-4">
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            placeholder="Enter detail of complaint"
                            rows="5"
                            value={softwareComplaint.note}
                            onChange={(e) =>
                              setSoftwareComplaint({ ...softwareComplaint, note: e.target.value })
                            }
                          ></CFormTextarea>
                        </CInputGroup>
                      </CCol>
                      <CRow className="flex items-center justify-start mb-3">
                        <CCol md={3} xs={8}>
                          <button
                            onClick={(e) => softwareComplaintSubmit(e)}
                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Add Complaint
                          </button>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </div>
            )
          : null}

        {/* hardware complaints */}
        {complaint && complaint['type']
          ? complaint['type'] == 'hardware' && (
              <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                <CRow className="justify-content-center">
                  <CCol md={12}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Hardware</p>
                  </CCol>
                  <CCol md={12} className="bg-white rounded-lg">
                    <CForm className="row mx-4 g-3">
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) => hardwareComplaintHandler(e.target.value)}
                          >
                            <option>Select Lab</option>
                            {labs.length &&
                              labs.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                              })}
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) => hardwareProdcutHandler(e.target.value)}
                          >
                            <option>Select Product</option>
                            {labProducts &&
                              labProducts.length &&
                              labProducts.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                              })}
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>

                      <Checkbox.Group style={{ width: '100vw' }} onChange={onHardwareChange}>
                        <CCol md={12}>
                          {availableHardware.length
                            ? availableHardware.map((item) => {
                                return (
                                  <Checkbox value={item.key} className="me-3">
                                    {' '}
                                    {item.key}
                                  </Checkbox>
                                )
                              })
                            : null}
                        </CCol>
                      </Checkbox.Group>

                      <CCol xs={12} className="mb-4">
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            placeholder="Enter detail of complaint"
                            rows="5"
                            value={hardwareComplaint.note}
                            onChange={(e) =>
                              setHardwareComplaint({ ...hardwareComplaint, note: e.target.value })
                            }
                          ></CFormTextarea>
                        </CInputGroup>
                      </CCol>
                      <CRow className="flex items-center justify-start mb-3">
                        <CCol md={3} xs={8}>
                          <button
                            onClick={hardwareComplaintSubmit}
                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Add Complaint
                          </button>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </div>
            )
          : null}

        {/* network complaints */}
        {complaint && complaint['type']
          ? complaint['type'] == 'network' && (
              <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                <CRow className="justify-content-center">
                  <CCol md={12}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Network</p>
                  </CCol>
                  <CCol md={12} className="bg-white rounded-lg">
                    <CForm className="row mx-4 g-3">
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setNetworkComplaint({ ...networkComplaint, lab: e.target.value })
                            }
                          >
                            <option>Select Lab</option>
                            {labs.length &&
                              labs.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                              })}
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setNetworkComplaint({ ...networkComplaint, type: e.target.value })
                            }
                          >
                            <option>select network complaint type</option>
                            <option value="network-switch">Network Switch</option>
                            <option value="wifi-devices">Wifi Devices</option>
                            <option value="lan-cables">Lan Cables</option>
                            <option value="lan-cable-connector">Lan Cable connector</option>
                            <option value="network-card">Network Card</option>
                            <option value="up-link-connectivity">Up-link connectivity</option>
                            <option value="internet-not-available">Internet not available</option>
                            <option value="server-connectivity-issue">
                              Server connectivity issue
                            </option>
                            <option value="wifi-devices">Wifi Devices</option>
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12} className="mb-4">
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            placeholder="Enter detail of complaint"
                            rows="5"
                            value={networkComplaint.note}
                            onChange={(e) =>
                              setNetworkComplaint({ ...networkComplaint, note: e.target.value })
                            }
                          ></CFormTextarea>
                        </CInputGroup>
                      </CCol>
                      <CRow className="flex items-center justify-start mb-3">
                        <CCol md={3} xs={8}>
                          <button
                            onClick={networkComplaintSubmit}
                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Add Complaint
                          </button>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </div>
            )
          : null}

        {/* other complaints */}
        {complaint && complaint['type']
          ? complaint['type'] == 'other' && (
              <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                <CRow className="justify-content-center">
                  <CCol md={12}>
                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Network</p>
                  </CCol>
                  <CCol md={12} className="bg-white rounded-lg">
                    <CForm className="row mx-4 g-3">
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setOtherComplaint({ ...otherComplaint, lab: e.target.value })
                            }
                          >
                            <option>Select Lab</option>
                            {labs.length &&
                              labs.map((item) => {
                                return <option value={item._id}>{item.name}</option>
                              })}
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormSelect
                            aria-label="Default select example"
                            onChange={(e) =>
                              setOtherComplaint({ ...otherComplaint, type: e.target.value })
                            }
                          >
                            <option>select other complaint type</option>
                            <option value="multimedia-systems">Multimedia Systems</option>
                            <option value="multimedia-ups">Multimedia UPS</option>
                            <option value="multimedia-vga-cables">Multimedia VGA Cable</option>
                            <option value="lab-ups">Lab UPS</option>
                            <option value="lab-camera">Lab Camera</option>
                            <option value="lights">Lights</option>
                            <option value="bulb">Bulb</option>
                            <option value="fans">Fans</option>
                            <option value="sockets">Sockets</option>
                            <option value="acs">ACs</option>
                            <option value="electricity-cables">Electricity Cable</option>
                            <option value="electricity-switches">Electricity Switches</option>
                            <option value="ducts">Ducts</option>
                            <option value="Multimedia">Multimedia</option>
                            <option value="fire-extinguisher">Fire Extinguisher</option>
                            <option value="table">Table</option>
                            <option value="table-locks">Table Locks</option>
                            <option value="chairs">Chairs</option>
                            <option value="chair-wheel">Chair Wheels</option>
                            <option value="working-cabinet">Working Cabinets</option>
                            <option value="chair-hydrolic-problem">Chair Hydrolic Problem</option>
                            <option value="white-boards">White Boards</option>
                            <option value="notice-boards">Notice Board</option>
                            <option value="paint-problem">Paint Problem</option>
                            <option value="seepage-problem">Seepage Problem</option>
                            <option value="binds">Blinds</option>
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12} className="mb-4">
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <i className="fas fa-user-tag"></i>
                          </CInputGroupText>
                          <CFormTextarea
                            id="exampleFormControlTextarea1"
                            placeholder="Enter detail of complaint"
                            rows="5"
                            value={otherComplaint.note}
                            onChange={(e) =>
                              setOtherComplaint({ ...otherComplaint, note: e.target.value })
                            }
                          ></CFormTextarea>
                        </CInputGroup>
                      </CCol>
                      <CRow className="flex items-center justify-start mb-3">
                        <CCol md={3} xs={8}>
                          <button
                            onClick={otherComplaintSubmit}
                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Add Complaint
                          </button>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </div>
            )
          : null}
      </main>
    </>
  )
}

export default AddComplaint
