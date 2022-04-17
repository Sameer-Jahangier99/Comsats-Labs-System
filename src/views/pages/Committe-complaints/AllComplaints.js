import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allComplaintAction, complaintApproveByDco } from "src/services/actions/complaintActions";
import {
  CButton
} from '@coreui/react'
import axios from 'axios';
import { BASE_URL } from 'src/services/axios';
import Breadcrumbs from 'src/components/Breadcrumbs'

const AllComplaints = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Complaints" }, { name: "All Complaints" }];
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { msg, loading: approveLoading } = useSelector((state) => state.complaintApproveByDcoReducer)
  const [allComplaints, setAllComplaints] = useState([]);

  const approveComplaint = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    let _id = item._id;
    const { data } = await axios.post(`${BASE_URL}/complaint/approvedByCommittee`, { _id }, config)

    if (data) {
      item["committeApproved"] = true;
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
    const { data } = await axios.post(`${BASE_URL}/complaint/rejectedByComittee`, { _id }, config)
    if (data) {
      item["committeApproved"] = false;
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
    const { data } = await axios.get(`${BASE_URL}/complaint/committee`, config)
    setAllComplaints(data);
  }, [dispatch])


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
                        Action
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

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
    </>
  )
}

export default AllComplaints