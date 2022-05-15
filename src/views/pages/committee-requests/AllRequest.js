import React, { useEffect, useState } from 'react'
import { BASE_URL } from 'src/services/axios';
import { useSelector } from 'react-redux'
import axios from "axios"
import Breadcrumbs from 'src/components/Breadcrumbs'
import {
  CButton, CFormSelect
} from '@coreui/react'
const AllRequest = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Request" }, { name: "All Requests" }];
  const [requests, setRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    getRequests();
  }, [])

  const getRequests = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/committee`, config)
    if (data) {
      setRequests(data.data);
      setRequestHistory(data.data)
    }

  }

  const rejectComplaint = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/committeeRejected/${item._id}`, config)
    if (data.success) {
      item["committeApproved"] = false;
      let temp = [...requests];
      let filter = temp.filter((t) => t.id == item._id);
      let index = temp.indexOf(filter[0]);
      temp[index] = item;
      setRequests(temp);

    }
  }

  const approveComplaint = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/committeeApproved/${item._id}`, config)

    if (data.success) {
      item["committeApproved"] = true;
      let temp = [...requests];
      let filter = temp.filter((t) => t.id == item._id);
      let index = temp.indexOf(filter[0]);
      temp[index] = item;
      setRequests(temp);
    }

  }

  const filterHandler = (value) => {
    if (value == "all") {
      setRequests(requestHistory)
    }
    if (value == "software") {
      const res = requestHistory.filter((item) => item.type == "software");
      setRequests(res);
    }
    if (value == "hardware") {
      const res = requestHistory.filter((item) => item.type == "hardware");
      setRequests(res);
    }

  }

  return (
    <main className='main-div'>
      <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
      <div className='row mb-4'>
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
                <option value="all">All</option>
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
                  {requests &&
                    requests.map((item) => (
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
                              <div className="text-base font-medium text-gray-900">{item.lab}</div>
                            </div>
                          </div>
                        </td>

                        <td className="text-base px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.type && item.type}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-base font-medium text-gray-900">{item.user && item.user.name}</div>
                            </div>
                          </div>
                        </td>

                        <td className="text-base px-6 py-4 whitespace-nowrap text-right text-sm font-medium d-flex justify-content-start">
                          {item.committeApproved == null ? <> <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.committeApproved ? 'Approved' : "Approve"}</CButton> <CButton color="danger" className='text-white' onClick={() => rejectComplaint(item)}>{item.committeApproved == null ? 'Reject ' : "Rejected"}</CButton> </> : item.committeApproved ? <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.committeApproved ? 'Approved' : "Approve"}</CButton> : <CButton color="danger" className='text-white' onClick={() => rejectComplaint(item)}>{!item.committeApproved ? 'Rejected' : "Reject"}</CButton>}

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
  )
}

export default AllRequest