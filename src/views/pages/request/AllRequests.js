import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/services/axios';
import { useSelector } from 'react-redux'
import axios from "axios"
import Breadcrumbs from 'src/components/Breadcrumbs'
import { Modal, Button } from 'react-bootstrap';
const AllRequest = () => {
    const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Request" }, { name: "All Requests" }];
    const [requests, setRequests] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [refresh, setRefresh] = useState(false);
    const [deleteId, setDeleteId] = useState("");
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
        getRequests();
        facultyRequests();
    }, [refresh])

    const getRequests = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_URL}/request`, config)
        if (data) {
            setRequests(data.data);
            console.log(data)
        }
    }

    const deleteHandler = (id) => {
        setDeleteId(id);
        setModalShow(true)
    }

    const deleteComplaint = async () => {
        const { data } = await axios.delete(`${BASE_URL}/request/delete/${deleteId}`)
        if (data.success) {
            setDeleteId("");
            setModalShow(false)
            setRefresh(true)
        }
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body className="">
                    <div className='d-flex justify-content-between'>
                        <h4>Are you sure ?</h4>
                        <i className="fa fa-times mouse-over " aria-hidden="true" onClick={() => setModalShow(false)}></i>
                    </div>

                    <div className='row'>
                        <div className='col-12 d-flex justify-content-center'>
                            <Button variant="danger" size="lg" onClick={deleteComplaint} className="mouse-over" style={{ width: "10rem" }}>
                                Yes
                            </Button>{' '}
                            <Button variant="warning" size="lg" className='ml-3 mouse-over' onClick={() => setModalShow(false)} style={{ width: "10rem" }}>
                                No
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        );
    }
    return (
        <>
            <main className='main-div'>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />

                <div>
                    <h4 className="font-semibold">All Requests</h4>
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
                                                Noc Aprroved
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
                                        {requests &&
                                            requests.map((item) => (
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.nocApproved ? "Approved" : "pending"}
                                                    </td>
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
                <div>
                    <h4 className="font-semibold mt-4">Faculty Requests</h4>
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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default AllRequest