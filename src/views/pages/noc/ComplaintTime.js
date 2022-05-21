import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from 'src/services/axios'
import { useSelector } from 'react-redux'
import { CRow, CCol, CButton } from '@coreui/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useHistory } from 'react-router'
import Breadcrumbs from 'src/components/Breadcrumbs'

const ComplaintTime = () => {
  const breadCrumbsInfo = [
    { name: 'Home', href: '/' },
    { name: 'Complaints' },
    {
      name: 'Complaint Time',
    },
  ]
  const params = useParams()
  const history = useHistory()
  const [complaintId, setComplaintId] = useState(params.id)
  const [complaint, setComplaint] = useState()
  const [showCalender, setShowCalender] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateToShow, setDateToShow] = useState()
  const [ApiDate, setApiDate] = useState()
  const [show, setShow] = useState()
  const [loading, setLoading] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const DateSelect = (e) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    setDateToShow(e.toLocaleDateString('en-US', options))
    setShow(true)
    setSelectedDate(e)
    setApiDate(e)
  }

  useEffect(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/complaint/${complaintId}`, config)
    setComplaint(data)
  }, [])

  const submitHandler = async (e, id) => {
    e.preventDefault()

    if (!ApiDate) {
      return
    }
    if (ApiDate) {
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(`${BASE_URL}/complaint/deadline/${id}`, { ApiDate }, config)
      if (data) {
        setLoading(false)
        history.push('/noc/AllApprovedcomplaints')
      }
    }
  }
  return (
    <>
      <main className="main-div">
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <CRow>
          <CCol className="mb-3">
            <button
              style={{ background: '#3C4B64' }}
              class=" text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300"
              onClick={() => history.push('/noc/AllApprovedcomplaints')}
            >
              Go Back
            </button>
          </CCol>
        </CRow>
        <CRow className="d-flex justify-content-center">
          <CCol md={9} className="bg-white p-3 shadow-sm rounded-sm ">
            <CRow>
              <CCol md={6} className="d-flex">
                <p className="font-bold">Title: </p>
                <p className="ml-2 font-bold">{complaint && complaint.title && complaint.title}</p>
              </CCol>
              {show && (
                <CCol md={6} className="d-flex justify-content-center">
                  <p className="font-bold">Selected Date: </p>
                  <p className="ml-2">{dateToShow}</p>
                </CCol>
              )}
            </CRow>
            <CRow>
              <CCol md={8}>
                <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Complaint Type: </div>
                    <div className="ml-2">{complaint && complaint.type}</div>
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>
                <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Complaint Note: </div>

                    {complaint && complaint.type == 'software' && (
                      <div className="ml-2 ">
                        {' '}
                        {complaint &&
                          complaint.type == 'software' &&
                          complaint.software &&
                          complaint.software.note}
                      </div>
                    )}
                    {complaint && complaint.type == 'network' && (
                      <div className="ml-2 ">
                        {' '}
                        {complaint &&
                          complaint.type == 'network' &&
                          complaint.network &&
                          complaint.network.note}
                      </div>
                    )}
                    {complaint && complaint.type == 'other' && (
                      <div className="ml-2 ">
                        {' '}
                        {complaint &&
                          complaint.type == 'other' &&
                          complaint.other &&
                          complaint.other.note}
                      </div>
                    )}
                    {complaint && complaint.type == 'hardware' && (
                      <div className="ml-2 ">
                        {' '}
                        {complaint &&
                          complaint.type == 'hardware' &&
                          complaint.hardware &&
                          complaint.hardware.note}
                      </div>
                    )}
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>

                <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Added By: </div>
                    <div className="ml-2 ">
                      {complaint && complaint.user && complaint.user.name}
                    </div>
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>
                {complaint && complaint.type =="network" &&  <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Network Issue: </div>
                    <div className="ml-2 ">
                      {complaint && complaint.network && complaint.network.type}
                    </div>
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>}
                {complaint && complaint.type =="other" &&  <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Other Equipement Issue: </div>
                    <div className="ml-2 ">
                      {complaint && complaint.other && complaint.other.type}
                    </div>
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>}
                <CRow>
                  <CCol md={12} className="d-flex align-items-center my-2">
                    <div className='font-bold'>Lab: </div>
                    <div className="ml-2">{complaint && complaint.lab && complaint.lab.name}</div>
                  </CCol>
                  <hr className="m-0"></hr>
                </CRow>
                {complaint && complaint.type == 'software' && (
                  <CRow className='my-2'>
                    <CCol md={12} className="">
                      <h6 className='font-bold'>Issues In Softwares: </h6>
                      {complaint && complaint.type == 'software' ? (
                        <div>
                          <ul className="">
                            {complaint.software.softwares.length &&
                              complaint.software.softwares.map((item, i) => {
                                return (
                                  <div style={{ display: 'block' }}>
                                    {i + 1} &nbsp; {item} &nbsp;
                                  </div>
                                )
                              })}
                          </ul>
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                )}

                {/* {complaint && complaint.type == 'hardware' && (
                  <CRow>
                    <CCol md={12} className="">
                      <h6>Issues In Softwares: </h6>
                      {complaint && complaint.type == 'hardware' ? (
                        <div>
                          <ul className="">
                            {complaint.hardware.component.length &&
                              complaint.hardware.component.map((item, i) => {
                                return (
                                  <div style={{ display: 'block' }}>
                                    {i + 1} &nbsp; {item} &nbsp;
                                  </div>
                                )
                              })}
                          </ul>
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                )} */}

                {/* <CRow>
                                    <CCol md={12} className="d-flex">
                                        <h6>Equipment: </h6>
                                        <p className='ml-2'>{complaint && complaint.product && complaint.product.name && complaint.product.name}</p>
                                    </CCol>
                                </CRow> */}
              </CCol>
              {/* <CCol md={4} className="d-flex justify-content-center ">
                                <div className="d-flex justify-content-center align-items-center">
                                    <a href={complaint && complaint.product && complaint.product.imageUrl && complaint.product.imageUrl} download>
                                        <img src={complaint && complaint.product && complaint.product.imageUrl && complaint.product.imageUrl} alt={complaint && complaint.product.name && complaint.product.name} ></img>
                                    </a>
                                </div>
                            </CCol> */}
            </CRow>

            <CRow>
              <CCol md={4} className="">
                <CButton
                  color="primary"
                  className="text-white w-full"
                  onClick={() => setShowCalender(true)}
                >
                  Select Date
                </CButton>
              </CCol>
              <CCol md={4}></CCol>
              <CCol md={4} className="d-flex justify-content-end">
                <CButton
                  color="primary"
                  className="text-white w-full"
                  onClick={(e) => submitHandler(e, complaint && complaint._id)}
                >
                  {loading ? 'Sumbiting...' : 'Submit'}
                </CButton>
              </CCol>
            </CRow>
          </CCol>

          <CCol md={3} className="d-flex justify-content-center">
            {showCalender && <Calendar onChange={(e) => DateSelect(e)} value={selectedDate} />}
          </CCol>
        </CRow>
      </main>
    </>
  )
}

export default ComplaintTime
