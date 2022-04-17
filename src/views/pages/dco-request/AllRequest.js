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
    const { data } = await axios.get(`${BASE_URL}/request`, config)
    if (data) {
      setRequests(data.data);

    }

  }

  const rejectComplaint = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${BASE_URL}/request/dcoRejected/${item._id}`, config)
    if (data.success) {
      item["dcoApproved"] = false;
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
    const { data } = await axios.get(`${BASE_URL}/request/dcoApproved/${item._id}`, config)

    if (data.success) {
      item["dcoApproved"] = true;
      let temp = [...requests];
      let filter = temp.filter((t) => t.id == item._id);
      let index = temp.indexOf(filter[0]);
      temp[index] = item;
      setRequests(temp);
    }

  }

  return (
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
                          {item.type && item.type}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.user && item.user.name}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.dcoApproved == null ? <> <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.dcoApproved ? 'Approved' : "Approve"}</CButton> <CButton color="danger" className='text-white' onClick={() => rejectComplaint(item)}>{item.dcoApproved == null ? 'Reject ' : "Rejected"}</CButton> </> : item.dcoApproved ? <CButton color="success" className='text-white' onClick={() => approveComplaint(item)}>{item.dcoApproved ? 'Approved' : "Approve"}</CButton> : <CButton color="danger" className='text-white' onClick={() => rejectComplaint(item)}>{!item.dcoApproved ? 'Rejected' : "Reject"}</CButton>}

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