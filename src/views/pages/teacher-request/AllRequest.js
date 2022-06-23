import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/services/axios';
import { useSelector } from 'react-redux'
import axios from "axios"
import Breadcrumbs from 'src/components/Breadcrumbs'
import { Modal, Button } from 'react-bootstrap';

const AllRequest = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "All Request" }];
   
    const [modalShow, setModalShow] = React.useState(false);
   
    const [facultyRequest,setFacultyRequest]=useState()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const facultyRequests=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/request/getFacultyRequest`, config)
        setFacultyRequest(data && data.data);
    }
    useEffect(() => {
        
        facultyRequests();
    }, [])
    return (
        <>
            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />              
                <div>
                    <h4 className="font-semibold mt-4">All Requests</h4>
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
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                courseTitle
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                courseCode
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
                                                lab
                                            </th>
                                             <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                        number of Students
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                        Teacher name
                                            </th>
                                          
                                          
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {facultyRequest &&
                                            facultyRequest.map((item) => (
                                                <tr key={item._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.courseTitle}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.courseCode}</div>
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
                                                        {item.lab}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.numberOfStudent}
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.user && item.user.name}
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

export default AllRequest