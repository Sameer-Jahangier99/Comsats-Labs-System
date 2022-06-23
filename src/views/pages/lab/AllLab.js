import React, { useEffect, useState } from 'react'
// import './Alluser.css'

import axios from 'axios'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import { Checkbox } from 'antd'
import Breadcrumbs from 'src/components/Breadcrumbs'
const AllLab = () => {
  const breadCrumbsInfo = [{ name: 'Home', href: '/' }, { name: 'Lab ' }, { name: 'All Labs' }]
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(true)
  const [id, setId] = useState(null)
  const [softwares, setSoftwares] = useState()
  const [software, setSoftware] = useState('')
  const [name, setName] = useState(null)
  const [labs, setLabs] = useState()

  useEffect(() => {
    const AllLab = async () => {
      const { data } = await axios.get('/lab/allLab')
      setLabs(data)
    }

    AllLab()
  }, [labs])

  const submitHandler = (lab) => {
    console.log(lab)
    setName(lab.name)
    setId(lab._id)
    setLoading(false)
  }
  const deleteHandler = (id) => {
    console.log(id)
  }
  const handleUpdate = async () => {
    if (software) {
      try {
        const { data } = await axios.put('/lab/updateLab', { _id: id, softwares: software })
        if (data) {
          setShow(true)
        }
      } catch (error) {}
      // setLoading(true)
    }
  }

  return (
    <>
      <main className="main-div">
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        {show && (
          <main className="alert">
            <div>
              <CAlert color="success" style={{ textAlign: 'center' }}>
                Lab updated
              </CAlert>
            </div>
            <div>
              <button onClick={() => setShow(false)}>
                <i class="far fa-times-circle"></i>
              </button>
            </div>
          </main>
        )}
        {/* {showDelete &&  (
          <main className="alert">
            <div>
              <CAlert color="danger" style={{ textAlign: 'center' }}>
                user deleted
              </CAlert>
            </div>
            <div>
              <button onClick={() => setShowDelete(false)}>
                <i class="far fa-times-circle"></i>
              </button>
            </div>
          </main>
        )} */}
        <div>
          <h4 className="font-semibold">All Labs</h4>
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
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {labs &&
                      labs.map((lab) => (
                        <tr key={lab._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{lab.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => submitHandler(lab)}>
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                            <button
                              style={{ padding: '5px' }}
                              onClick={() => deleteHandler(lab._id)}
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
        <CModal alignment="center" size="lg" visible={!loading} onClose={() => setLoading(true)}>
          <CModalHeader>
            <CModalTitle>
              {' '}
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">Update Lab</span>
              </div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            {loading ? (
              ''
            ) : (
              <div className="bg-white p-1 shadow-sm rounded-sm mt-2">
                <div className="text-gray-700">
                  <CRow className="justify-content-center">
                    <CCol md={12} className="bg-white rounded-lg">
                      <CForm className="row m-2 g-2">
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </CInputGroupText>
                            <CFormInput
                              placeholder="Name"
                              autoComplete=""
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              disabled
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6} className="mb-4">
                          <CInputGroup>
                            <CInputGroupText>
                              <i className="fas fa-envelope-open"></i>
                            </CInputGroupText>
                            <CFormInput
                              type="email"
                              placeholder="Name of software "
                              value={software}
                              onChange={(e) => setSoftware(e.target.value)}
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CForm>
                    </CCol>
                  </CRow>
                  <CCol md={3} xs={8}>
                    <CButton color="primary" onClick={handleUpdate}>
                      Save changes
                    </CButton>
                  </CCol>
                </div>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => setLoading(true)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </main>
    </>
  )
}

export default AllLab
