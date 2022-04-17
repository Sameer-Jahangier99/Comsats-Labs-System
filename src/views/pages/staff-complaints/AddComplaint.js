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
    CFormTextarea
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { allProducts } from "src/services/actions/productActions"
import { addComplaint } from "src/services/actions/complaintActions"
import { Alert } from "src/components/Alert"
import Breadcrumbs from 'src/components/Breadcrumbs'
const AddComplaint = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Complaints" }, { name: "Add Complaint" }];
    const [complaint, setComplaint] = useState({
        title: "",
        type: "",
        lab: "",
        product: "",
        note: ""
    })
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.allProductRed)
    const { userInfo } = useSelector((state) => state.userLogin)
    const { error, loading, result } = useSelector((state) => state.addComplaint)

    useEffect(() => {
        dispatch(allProducts())
    }, [dispatch])

    const labHandler = (lab) => {
        const labProducts = products.filter((item) => item.lab == lab);
        setFilteredProducts(labProducts);
        setComplaint({ ...complaint, lab: lab })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        let data = {
            ...complaint, user: userInfo._id
        }
        dispatch(addComplaint(data));
    }


    return (
        <>
            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
                <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                    <CRow className="justify-content-center">
                        <CCol md={12} className="bg-white rounded-lg">
                            <CForm className="row mx-4 g-3" onSubmit={submitHandler}>
                                <CCol md={12}>
                                    {error && (
                                        <Alert msg={error} color={"danger"} />
                                    )}
                                </CCol>
                                <CCol md={12}>
                                    {result && (
                                        <Alert msg={"Complaint has been registered"} color={"success"} />
                                    )}
                                </CCol>
                                <CCol md={12}>
                                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Complaint</p>
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
                                            onClick={(e) => labHandler(e.target.value)}
                                        >
                                            <option>Select Lab</option>
                                            <option value="Lab-1">Lab-1</option>
                                            <option value="Lab-2">Lab-2</option>
                                            <option value="Lab-3">Lab-3</option>
                                            <option value="Lab-4">Lab-4</option>
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
                                            onChange={(e) => setComplaint({ ...complaint, product: e.target.value })}
                                        >
                                            <option>Select Product</option>

                                            {
                                                filteredProducts && filteredProducts.length && filteredProducts.map((item) => {
                                                    return <option key={item._id} value={item._id}>{item.name}</option>

                                                })

                                            }

                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                                <CCol xs={12} className="mb-4">
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <i className="fas fa-user-tag"></i>
                                        </CInputGroupText>
                                        <CFormTextarea id="exampleFormControlTextarea1" placeholder="Enter detail of complaint" rows="5" value={complaint.note} onChange={(e) => setComplaint({ ...complaint, note: e.target.value })}></CFormTextarea>
                                    </CInputGroup>
                                </CCol>
                                <CRow className="flex items-center justify-start mb-3">
                                    <CCol md={3} xs={8}>
                                        <button
                                            type="submit"
                                            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        >
                                            {loading ? "Loading..." : "Add Complaint"}
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

export default AddComplaint
