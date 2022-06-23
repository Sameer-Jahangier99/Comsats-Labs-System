import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allComplaintAction } from 'src/services/actions/complaintActions'
import { CRow, CCol, CFormSelect } from '@coreui/react'

import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL } from 'src/services/axios'
import Breadcrumbs from 'src/components/Breadcrumbs'

const AllComplaints = () => {
  const breadCrumbsInfo = [
    { name: 'Home', href: '/' },
    { name: 'Complaints' },
    { name: 'All Complaints' },
  ]
  const dispatch = useDispatch()
  const [showSoftware, setShowSoftware] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [allComplaints, setAllComplaints] = useState([])
  const [complaintHistory, setComplaintHistory] = useState([])
  const [modalShow, setModalShow] = React.useState(false)
  const [refresh, setRefresh] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  // useEffect(async () => {
  //     dispatch(allComplaintAction());
  //     const config = {
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${userInfo.token}`,
  //         },
  //     }
  //     const { data } = await axios.get(`${BASE_URL}/complaint/all/software`, config)
  //     setAllComplaints(data && data.data);

  //     setShowSoftware(true);
  // }, [dispatch, refresh])
  // const hardwareComplaint = async () => {
  //     const config = {
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${userInfo.token}`,
  //         },
  //     }
  //     const { data } = await axios.get(`${BASE_URL}/complaint/all/hardware`, config)
  //     setAllComplaints(data && data.data);
  //     setShowSoftware(false);
  // }

  // const softwareComplaints = async () => {
  //     const config = {
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${userInfo.token}`,
  //         },
  //     }
  //     const { data } = await axios.get(`${BASE_URL}/complaint/all/software`, config)
  //     setAllComplaints(data && data.data);
  //     setShowSoftware(true);
  // }

  useEffect(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/complaint`, config)
    console.log('data===>', data)
    setAllComplaints(data && data)
    setComplaintHistory(data && data)
  }, [])

  const filterHandler = (value) => {
    if (value == 'software') {
      const result = complaintHistory.filter((item) => item.type === 'software')
      setAllComplaints(result)
    }
    if (value == 'hardware') {
      const result = complaintHistory.filter((item) => item.type === 'hardware')
      setAllComplaints(result)
    }
    if (value == 'network') {
      const result = complaintHistory.filter((item) => item.type === 'network')
      setAllComplaints(result)
    }
    if (value == 'other') {
      const result = complaintHistory.filter((item) => item.type === 'other')
      setAllComplaints(result)
    }
    if (value == 'all') {
      setAllComplaints(complaintHistory)
    }
  }

  const deleteHandler = (id) => {
    setDeleteId(id)
    setModalShow(true)
  }

  const deleteComplaint = async () => {
    const { data } = await axios.delete(`${BASE_URL}/complaint/delete/${deleteId}`)
    if (data.success) {
      setDeleteId('')
      setModalShow(false)
      setRefresh(true)
    }
  }

  const editHandler = (item) => {
    console.log('update handler')
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="">
          <div className="d-flex justify-content-between">
            <h4>Are you sure ?</h4>
            <i
              className="fa fa-times mouse-over "
              aria-hidden="true"
              onClick={() => setModalShow(false)}
            ></i>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <Button
                variant="danger"
                size="lg"
                onClick={deleteComplaint}
                className="mouse-over"
                style={{ width: '10rem' }}
              >
                Yes
              </Button>{' '}
              <Button
                variant="warning"
                size="lg"
                className="ml-3 mouse-over"
                onClick={() => setModalShow(false)}
                style={{ width: '10rem' }}
              >
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  return (
    <>
      <main className="main-div">
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center mr-3">
                  Complaints
                </div>

                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => {
                    filterHandler(e.target.value)
                  }}
                >
                  <option value="all">All</option>
                  <option value="software">Software</option>

                  <option value="hardware">Hardware</option>
                  <option value="network">Network</option>
                  <option value="other">other equipment</option>
                </CFormSelect>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">All Complaints</h4>
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
                        Title
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
                        Added By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        DCO Aprroved
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Committee Aprroved
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Noc Status
                      </th>{' '}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Works Status
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
                    {allComplaints &&
                      allComplaints.map((item) => (
                        <tr key={item._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.lab && item.lab.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.user && item.user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item && item.type && item.type}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.dcoApproved ? 'Approved' : 'pending'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.committeApproved ? 'Approved' : 'pending'}
                          </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.type != "hardware" ?  item.nocApproved ? 'Approved' : 'pending' : null}
                            </td>
                        
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.type == "hardware" ?  item.worksApproved ? 'Approved' : 'pending' : null}
                            </td>
                      
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                           
                            <button
                              style={{ padding: '5px' }}
                              onClick={() => deleteHandler(item._id)}
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
      </main>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default AllComplaints
