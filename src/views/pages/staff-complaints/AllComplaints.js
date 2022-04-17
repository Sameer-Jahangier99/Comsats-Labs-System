import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allComplaintAction } from "src/services/actions/complaintActions";
import {
    CRow,
    CCol,
    CFormSelect

} from '@coreui/react'

import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import Breadcrumbs from "src/components/Breadcrumbs"

const AllComplaints = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Complaints" }, { name: "All Complaints" }];
    const dispatch = useDispatch();
    const [showSoftware, setShowSoftware] = useState(false);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [allComplaints, setAllComplaints] = useState([]);
    useEffect(async () => {
        dispatch(allComplaintAction());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/complaint/all/software`, config)
        setAllComplaints(data && data.data);

        setShowSoftware(true);
    }, [dispatch])
    const hardwareComplaint = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/complaint/all/hardware`, config)
        setAllComplaints(data && data.data);
        setShowSoftware(false);
    }

    const softwareComplaints = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/complaint/all/software`, config)
        setAllComplaints(data && data.data);
        setShowSoftware(true);
    }
    const filterHandler = (value) => {
        if (value == "software") {
            softwareComplaints();
        }
        if (value == "hardware") {
            hardwareComplaint();
        }

    }
    return (
        <>
            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
                <div className='row'>
                    <div className='col-6'>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-6 d-flex justify-content-center'>
                                <div className='d-flex justify-content-center align-items-center mr-3'>
                                    Complaints
                                </div>

                                <CFormSelect aria-label="Default select example" onChange={(e) => {
                                    filterHandler(e.target.value)
                                }} >
                                    <option value="software">Software</option>
                                    <option value="hardware">Hardware</option>

                                </CFormSelect>
                            </div>
                            <div className='col-6'>

                            </div>
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
                                                Product Name
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
                                            {
                                                showSoftware ? <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Noc Status
                                                </th> : <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Works Status
                                                </th>
                                            }
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
                                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.lab}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.product && item.product.name}
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.user && item.user.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item && item.type && item.type}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.dcoApproved ? "Approved" : "pending"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.committeApproved ? "Approved" : "pending"}
                                                    </td>
                                                    {
                                                        showSoftware ? <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.nocApproved ? "Approved" : "pending"}
                                                        </td> : <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.worksApproved ? "Approved" : "pending"}
                                                        </td>
                                                    }
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button >
                                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                                        </button>
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
        </>
    )
}

export default AllComplaints