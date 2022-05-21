import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allComplaintAction, complaintApproveByDco } from "src/services/actions/complaintActions";
import {
    CButton, CFormSelect
} from '@coreui/react'
import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import Breadcrumbs from 'src/components/Breadcrumbs'

const AllComplaints = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Complaints" }, {
        name: "All Complaints"
    }];
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [allComplaints, setAllComplaints] = useState([]);

    const approveComplaint = async (item) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        let _id = item._id;
        const { data } = await axios.post(`${BASE_URL}/complaint/noc`, { _id }, config)

        if (data) {
            item["nocApproved"] = true;
            let temp = [...allComplaints];
            let filter = temp.filter((t) => t.id == item._id);
            let index = temp.indexOf(filter[0]);
            temp[index] = item;
            setAllComplaints(temp);
        }

    }

    const rejectComplaint = async (item) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        let _id = item._id;
        const { data } = await axios.post(`${BASE_URL}/complaint/rejectedByNoc`, { _id }, config)
        if (data) {
            item["nocApproved"] = false;
            let temp = [...allComplaints];
            let filter = temp.filter((t) => t.id == item._id);
            let index = temp.indexOf(filter[0]);
            temp[index] = item;
            setAllComplaints(temp);
        }
    }

    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/complaint/noc`, config)
        setAllComplaints(data);
    }, [])





    return (
        <>

            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />

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
                                                Type
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
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allComplaints && allComplaints.length ?
                                            allComplaints.map((item) => (
                                                <tr key={item._id}>
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
                                                    <td className=" text-base px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.type && item.type}
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-base font-medium text-gray-900">{item.user && item.user.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium d-flex justify-content-start">
                                                        {item.nocApproved == null ? <> <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.nocApproved ? 'Approved' : "Approve"}</CButton> <CButton color="danger" className='text-white ml-2' onClick={() => rejectComplaint(item)}>{item.nocApproved == null ? 'Reject ' : "Rejected"}</CButton> </> : item.nocApproved ? <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.nocApproved ? 'Approved' : "Approve"}</CButton> : <CButton color="danger" className='text-white' onClick={() => rejectComplaint(item)}>{!item.nocApproved ? 'Rejected' : "Reject"}</CButton>}
                                                    </td>
                                                </tr>
                                            )) : allComplaints.length}
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