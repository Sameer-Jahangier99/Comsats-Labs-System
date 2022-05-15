import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import { useSelector } from 'react-redux'
import {
    CRow,
    CCol,

    CButton
} from '@coreui/react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router'
import Breadcrumbs from 'src/components/Breadcrumbs'


const RequestTime = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Requests" }, {
        name: "Request Time"
    }];
    const params = useParams();
    const history = useHistory()
    const [complaintId, setComplaintId] = useState(params.id);
    const [request, setRequest] = useState();
    const [showCalender, setShowCalender] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateToShow, setDateToShow] = useState();
    const [ApiDate, setApiDate] = useState();
    const [show, setShow] = useState();
    const [loading, setLoading] = useState(false);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const DateSelect = (e) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDateToShow(e.toLocaleDateString("en-US", options))
        setShow(true)
        setSelectedDate(e);
        setApiDate(e);
    }


    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/request/${complaintId}`, config)
        setRequest(data[0]);
    }, [])

    console.log(request);

    const submitHandler = async (e, id) => {
        e.preventDefault();

        if (!ApiDate) {
            return;
        }
        if (ApiDate) {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }

            const { data } = await axios.post(`${BASE_URL}/request/deadline/${id}`, { ApiDate }, config)
            if (data) {
                setLoading(false)
                history.push("noc/approve/requests")
            }
        }

    }


    return (
        <>

            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
                <CRow>
                    <CCol className='mb-3'>
                        <button style={{ background: "#3C4B64" }} class=" text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300" onClick={() => history.push("/noc/AllApprovedcomplaints")}>Go Back</button>
                    </CCol>

                </CRow>
                <CRow className="d-flex justify-content-center">
                    <CCol md={9} className="bg-white p-3 shadow-sm rounded-sm ">
                        <CRow>
                            <CCol md={6} className="d-flex">
                                <p className='font-bold'>Title: </p>
                                <p className='ml-2 font-bold'>{request && request.title && request.title}</p>
                            </CCol>
                            {
                                show && <CCol md={6} className="d-flex justify-content-center">
                                    <p className='font-bold'>Selected Date: </p>
                                    <p className='ml-2'>{dateToShow}</p>
                                </CCol>
                            }

                        </CRow>
                        <CRow>
                            <CCol md={8}>

                                <CRow>
                                    <CCol md={12} className="d-flex">
                                        <h6>Complaint Note: </h6>
                                        <p className='ml-2'>{request && request.note && request.note}</p>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol md={12} className="d-flex">
                                        <h6>Complaint Type: </h6>
                                        <p className='ml-2'>{request && request.type}</p>
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol md={12} className="d-flex">
                                        <h6>Lab: </h6>
                                        <p className='ml-2'>{request && request.lab && request.lab}</p>
                                    </CCol>
                                </CRow>


                            </CCol>


                        </CRow>

                        <CRow>
                            <CCol md={4} className="">
                                <CButton color="primary" className='text-white w-full' onClick={() => setShowCalender(true)}>Select Date</CButton>
                            </CCol>
                            <CCol md={4}>

                            </CCol>
                            <CCol md={4} className="d-flex justify-content-end">
                                <CButton color="primary" className='text-white w-full' onClick={(e) => submitHandler(e, request && request._id)}>{loading ? "Sumbiting..." : "Submit"}</CButton>
                            </CCol>

                        </CRow>

                    </CCol>

                    <CCol md={3} className="d-flex justify-content-center" >
                        {showCalender && <Calendar onChange={(e) => DateSelect(e)} value={selectedDate} />}
                    </CCol>
                </CRow>
            </main>
        </>
    )
}

export default RequestTime