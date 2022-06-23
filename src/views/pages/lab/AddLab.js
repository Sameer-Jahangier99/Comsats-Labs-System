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
const AddLab = () => {
  const breadCrumbsInfo = [{ name: 'Home', href: '/' }, { name: 'Lab' }, { name: 'Add Lab' }]
  const [name, setName] = useState()
  const [softwares, setSoftwares] = useState()
  const [loading, setLoading] = useState(false)
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues)
    setSoftwares(checkedValues)
  }

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(name, softwares)
    let LabData = {
      name,
      softwares,
    }
    const { data } = await axios.post('/lab/', LabData)
    if (data.success) {
      setLoading(false)
    }
  }

  return (
    <>
      {' '}
      <main className="main-div">
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
          <CRow className="justify-content-center">
            <CCol md={12} className="bg-white rounded-lg">
              <CForm className="row mx-4 g-3">
                <CCol md={12}>
                  {/* {error && (
                            <Alert msg={error} color={"danger"} />
                        )} */}
                </CCol>
                <CCol md={12}>
                  {/* {result && (
                            <Alert msg={"Complaint has been registered"} color={"success"} />
                        )} */}
                </CCol>
                <CCol md={12}>
                  <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Lab</p>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i class="fas fa-signature"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CRow>
                  <Checkbox.Group style={{ width: '100vw' }} onChange={onChange}>
                    <CCol md={12}>
                      <h3>softwares:</h3>

                      <Checkbox value="Netbeans" className="me-3">
                        {' '}
                        Netbeans
                      </Checkbox>

                      <Checkbox value="Erwin" className="me-3">
                        {' '}
                        Erwin
                      </Checkbox>

                      <Checkbox value="SQL Server" className="me-3">
                        {' '}
                        SQL Server
                      </Checkbox>

                      <Checkbox value="MySQL" className="me-3">
                        {' '}
                        MySQL
                      </Checkbox>

                      <Checkbox value="Code Blocks" className="me-3">
                        {' '}
                        Code Blocks
                      </Checkbox>

                      <Checkbox value="Packet Tracer 6.2" className="me-3">
                        {' '}
                        Packet Tracer 6.2
                      </Checkbox>

                      <Checkbox value="Just In Mind" className="me-3">
                        {' '}
                        Just In Mind
                      </Checkbox>
                      <Checkbox value="File of Ubuntu" className="me-3">
                        {' '}
                        File of Ubuntu
                      </Checkbox>
                      <Checkbox value="PHPSTORM" className="me-3">
                        {' '}
                        PHPSTORM
                      </Checkbox>
                      <Checkbox value="XAMPP and WAMP" className="me-3">
                        {' '}
                        XAMPP and WAMP
                      </Checkbox>
                      <Checkbox value="MySQL Work Bench" className="me-3">
                        {' '}
                        MySQL Work Bench
                      </Checkbox>
                      <Checkbox value="MS project 2010" className="me-3">
                        {' '}
                        MS project 2010
                      </Checkbox>
                      <Checkbox value="MS professional visio" className="me-3">
                        {' '}
                        MS professional visio
                      </Checkbox>
                      <Checkbox value="Balmasiq" className="me-3">
                        {' '}
                        Balmasiq
                      </Checkbox>
                      <Checkbox value="EMU8086" className="me-3">
                        {' '}
                        EMU8086
                      </Checkbox>
                      <Checkbox value="Eclipse" className="me-3">
                        {' '}
                        Eclipse
                      </Checkbox>
                      <Checkbox value="Java" className="me-3">
                        {' '}
                        Java
                      </Checkbox>
                      <Checkbox value="MS Office" className="me-3">
                        {' '}
                        MS Office
                      </Checkbox>
                      <Checkbox value="MS Access" className="me-3">
                        {' '}
                        MS Access
                      </Checkbox>
                      <Checkbox value="SunScratchday" className="me-3">
                        {' '}
                        Scratch
                      </Checkbox>
                      <Checkbox value="Matlab" className="me-3">
                        {' '}
                        Matlab
                      </Checkbox>
                      <Checkbox value="C++" className="me-3">
                        {' '}
                        C++
                      </Checkbox>
                      <Checkbox value="Notepad++" className="me-3">
                        {' '}
                        Notepad++
                      </Checkbox>
                      <Checkbox value="Workstation" className="me-3">
                        {' '}
                        Workstation
                      </Checkbox>
                      <p className="fw-light">
                        check the boxes you want to add softwares to this lab
                      </p>
                    </CCol>
                  </Checkbox.Group>
                </CRow>

                <CRow className="flex items-center justify-start mb-3">
                  <CCol md={3} xs={8}>
                    <button
                      onClick={(e) => submitHandler(e)}
                      className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      {loading ? 'Loading...' : 'Add Lab'}
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

export default AddLab

// const [filteredProducts, setFilteredProducts] = useState([]);
// const dispatch = useDispatch()
// const { products } = useSelector((state) => state.allProductRed)
// const { userInfo } = useSelector((state) => state.userLogin)
// const { error, loading, result } = useSelector((state) => state.addComplaint)

// useEffect(() => {
//     dispatch(allProducts())
// }, [dispatch])

// const labHandler = (lab) => {
//     const labProducts = products.filter((item) => item.lab == lab);
//     setFilteredProducts(labProducts);
//     setComplaint({ ...complaint, lab: lab })
// }
// const submitHandler = (e) => {
//     e.preventDefault()
//     let data = {
//         ...complaint, user: userInfo._id
//     }
//     dispatch(addComplaint(data));
// }
