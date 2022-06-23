import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CButton, CFormSelect
} from '@coreui/react'
import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import { useHistory } from "react-router-dom"
import Breadcrumbs from 'src/components/Breadcrumbs'

const AllComplaints = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Complaints" }, {
        name: "Approved Complaints"
    }];
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [allComplaints, setAllComplaints] = useState([]);
    const [complaintHistory, setComplaintHistory] = useState([]);
    const [progressComplaints, setProgressComplaints] = useState([]);
    const [showProgress, setShowProgess] = useState(false);
    const history = useHistory();
    function dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        const diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);

        return diff
    }

    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/complaint/allComplaintAprrovedByNOC`, config)
        setAllComplaints(data);
        setComplaintHistory(data);
        setProgressComplaints(data);

    }, [dispatch])


    const filterHandler = (value) => {
        if (value === "deadline") {
            setShowProgess(true)
            let res = complaintHistory.filter((item) => item.deadline && item.status == "progress")
            setShowProgess(true)
            setAllComplaints(res);
        }
        if (value === "all") {
            setShowProgess(false)
            setAllComplaints(complaintHistory)
        }
        if (value === "completed") {
            setShowProgess(true)
            let res = complaintHistory.filter((item) => item.status == "completed")
            setShowProgess(true)
            setAllComplaints(res);

        }

    }

    const complaintCompleted = async (item) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.post(`${BASE_URL}/complaint/mark/completed/${item._id}`, config)
        if (data) {
            item["status"] = "completed";
            let temp = [...allComplaints];
            let filter = temp.filter((t) => t.id == item._id);
            let index = temp.indexOf(filter[0]);
            temp[index] = item;
            setAllComplaints(temp);
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
                                }}>
                                    <option value="all">All</option>
                                    <option value="deadline">In Progress</option>
                                    <option value="completed">Completed</option>
                                </CFormSelect>
                            </div>
                            <div className='col-6'>

                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">Approved Complaints</h4>
                </div>
                {!showProgress ? <div className="flex flex-col">
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
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Days
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allComplaints && allComplaints.length ?
                                            allComplaints.map((item) => (
                                                <tr key={item._id} className={`${item.status == "completed" ? "bg-green-400" : dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) <= -4 ? "bg-red-500" : `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) <= -2 ? "bg-yellow-400" : ""} `} `}>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-gray-900">{item.title}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-gray-900">{item.lab && item.lab.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-gray-900">{item.type && item.type}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-left text-base font-medium">
                                                        {
                                                            item.status == "completed" ? "Completed" : dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) < 0 ? `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)).toString().slice(1, 4)} day exeeded ` : `${isNaN(dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline))) ? "No deadline given" : `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)).toString().slice(0, 4)} days left`} `
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                                        {
                                                            item.deadline ? null : <CButton color="dark" className='text-white' onClick={() => history.push(`/noc/complaintAction/${item._id}`)} >Required Days</CButton>

                                                        }
                                                        {
                                                            item.deadline ? <CButton color="info" className="text-white" onClick={() => complaintCompleted(item)} >{item.status == "completed" ? "Completed" : "Mark Completed"}</CButton> : null

                                                        }


                                                    </td>
                                                </tr>
                                            )) : allComplaints.length}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> : <div className="flex flex-col">
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
                                                Days
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Action
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allComplaints && allComplaints.length ?
                                            allComplaints.map((item) => (
                                                <tr key={item._id} className={`${item.status == "completed" ? "bg-green-400" : dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) <= -4 ? "bg-red-500" : `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) <= -2 ? "bg-yellow-400" : ""} `} `}>

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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.product && item.product.name}
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.user && item.user.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {
                                                            item.status == "completed" ? "Completed" : dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)) < 0 ? `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)).toString().slice(1, 4)} day exeeded ` : `${isNaN(dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline))) ? "No deadline given" : `${dateDiffInDays(new Date(), new Date(item && item.deadline && item.deadline)).toString().slice(0, 4)} days left`} `
                                                        }

                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                                                        {
                                                            item.deadline ? <CButton color="info" className="text-white" onClick={() => complaintCompleted(item)} >{item.status == "completed" ? "Completed" : "Mark Completed"}</CButton> : null

                                                        }


                                                    </td>


                                                </tr>
                                            )) : allComplaints.length}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>}
            </main>
        </>
    )
}

export default AllComplaints