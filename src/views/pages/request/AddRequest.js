import React, { useState } from 'react'
import {
    CRow,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CAlert,
    CFormSelect,
    CFormTextarea
} from '@coreui/react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import Breadcrumbs from 'src/components/Breadcrumbs'
const AddRequest = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Request" }, { name: "Add Request" }];
    const [request, setRequest] = useState({
        title: "",
        type: "",
        lab: "",
        note: ""
    })
    const [loading, setLoading] = useState(false);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin




    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        let dataToSend = { ...request, user: userInfo._id }

        const { data } = await axios.post(`${BASE_URL}/request/add`, dataToSend, config)
        if (data.success) {
            console.log("data======>", data)
            setLoading(false);
        }

    }

    return (
        <>
            <main>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
                <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                    <CRow className="justify-content-center">
                        <CCol md={12} className="bg-white rounded-lg">
                            <CForm className="row mx-4 g-3" onSubmit={submitHandler}>


                                <CCol md={12}>
                                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Request</p>
                                </CCol>
                                <CCol md={6}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Title"
                                            value={request.title}
                                            onChange={(e) => setRequest({ ...request, title: e.target.value })}
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
                                            onChange={(e) => setRequest({ ...request, type: e.target.value })}
                                        >
                                            <option>Request Type</option>
                                            <option value="software">software</option>
                                            <option value="hardware">hardware</option>

                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={12}>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <i className="fas fa-user-tag"></i>
                                        </CInputGroupText>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            onChange={(e) => setRequest({ ...request, lab: e.target.value })}
                                        >
                                            <option>Select Lab</option>
                                            <option value="lab 1">lab 1</option>
                                            <option value="lab 2">lab 2</option>
                                            <option value="lab 3">lab 3</option>
                                            <option value="lab 4">lab 4</option>
                                        </CFormSelect>
                                    </CInputGroup>

                                </CCol>

                                <CCol xs={12}>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <i className="fas fa-user-tag"></i>
                                        </CInputGroupText>
                                        <CFormTextarea id="exampleFormControlTextarea1" value={request.note} onChange={(e) => setRequest({ ...request, note: e.target.value })} placeholder="Enter detail of Request" rows="5"  ></CFormTextarea>
                                    </CInputGroup>
                                </CCol>
                                <CRow className="flex items-center justify-start mb-3">
                                    <CCol md={3} xs={8}>
                                        <button
                                            type="submit"
                                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        >
                                            {loading ? "Adding..." : "Add Request"}
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

export default AddRequest
