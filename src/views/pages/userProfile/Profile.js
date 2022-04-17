/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { update } from 'src/services/actions/userActions'
import Breadcrumbs from 'src/components/Breadcrumbs'

const Profile = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Profile" }];
  const [showUpdateProfile, setShowUpdateProfile] = useState(false)
  const [updateName, setUpdateName] = useState(null)
  const [updateEmail, setUpdateEmail] = useState(null)
  const [updatePassword, setUpdatePassword] = useState(null)
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState(null)
  const [updateRole, setUpdateRole] = useState(null)
  const [updatePhone, setUpdatePhone] = useState(null)
  const [matchErr, setMatchErr] = useState(null)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const { loading } = useSelector((state) => state.userUpdate)

  const dispatch = useDispatch()
  const handleEdit = () => {
    setShowUpdateProfile(true)
    setUpdateName(userInfo.name)
    setUpdateEmail(userInfo.email)
    setUpdateRole(userInfo.role)
    setUpdatePhone(userInfo.phone)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (updatePassword) {
      if (updatePassword !== updateConfirmPassword) {
        setMatchErr('Password are not same')
        return
      }
    }
    dispatch(update(updateName, updateEmail, updatePassword, updateRole, updatePhone))
  }

  return (
    <>
      <main className='main-div'>
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="tracking-wide">About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold"> Name</div>
                <div className="px-4 py-2">{userInfo && userInfo.name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">{userInfo && userInfo.email}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2">{userInfo && userInfo.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Role</div>
                <div className="px-4 py-2">{userInfo && userInfo.role}</div>
              </div>
            </div>
          </div>
          {userInfo && userInfo.role === 'admin' && (
            <button
              className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
              onClick={handleEdit}
            >
              Update Profile
            </button>
          )}
        </div>
        {userInfo && userInfo.role === 'admin' && showUpdateProfile && (
          <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">Update Profile</span>
              <div className="flex justify-center items-center">
                <span className="text-red-500 mr-2 ">*</span>
                <span className="text-red-600 font-normal text-sm">
                  If you don't change password then password remain same
                </span>
              </div>
            </div>
            <div className="text-gray-700">
              <CRow className="justify-content-center">
                <CCol md={12} className="bg-white rounded-lg">
                  <CForm className="row m-5 g-3" onSubmit={handleUpdate}>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </CInputGroupText>
                        <CFormInput
                          required
                          value={updateName}
                          onChange={(e) => setUpdateName(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <i className="fas fa-envelope-open"></i>
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          value={updateEmail}
                          onChange={(e) => setUpdateEmail(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6} className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          value={updatePassword}
                          onChange={(e) => setUpdatePassword(e.target.value)}
                        />
                      </CInputGroup>
                      {matchErr ? <small className="text-red-500 mb-5 mt-0">{matchErr}</small> : null}
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup>
                        <CInputGroupText>
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Confirm Password"
                          value={updateConfirmPassword}
                          onChange={(e) => setUpdateConfirmPassword(e.target.value)}
                        />
                      </CInputGroup>
                      {matchErr ? <small className="text-red-500 mb-5 mt-0">{matchErr}</small> : null}
                    </CCol>
                    <CCol xs={6} className="mb-4">
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <i className="fas fa-user-tag"></i>
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Default select example"
                          value={updateRole}
                          onChange={(e) => setUpdateRole(e.target.value)}
                        >
                          <option>Select User Role</option>
                          <option value="admin">Admin</option>
                          <option value="labstaff">Lab Staff</option>
                          <option value="committee">Committee</option>
                          <option value="dco">DCO</option>
                          <option value="hod">HOD</option>
                          <option value="teacher">Teacher</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6} className="mb-4">
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <i className="fas fa-phone"></i>
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Phone number"
                          value={updatePhone}
                          onChange={(e) => setUpdatePhone(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CRow className="flex items-center justify-between ">
                      <CCol md={3} xs={8}>
                        <button
                          type="submit"
                          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          {loading ? <CSpinner size="sm" style={{ color: '#fff' }} /> : '  Update'}
                        </button>
                      </CCol>
                      <CCol md={3} xs={8}>
                        <button
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring rounded-lg focus:ring-red-200 disabled:opacity-25 transition"
                          onClick={() => setShowUpdateProfile(false)}
                        >
                          Close
                        </button>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCol>
              </CRow>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Profile
