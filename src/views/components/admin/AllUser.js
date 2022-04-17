import React, { useEffect, useState } from 'react'
import './Alluser.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers, userList, deleteUser } from 'src/services/actions/userActions'
import { Container, Row, Col } from 'react-bootstrap'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import Breadcrumbs from 'src/components/Breadcrumbs'

const AllUser = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Users" }, { name: "All Users" }];
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(true)
  const [showDelete, setShowDelete] = useState(true)
  const [id, setId] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [role, setRole] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [matchErr, setMatchErr] = useState('')
  const dispatch = useDispatch()
  const listuser = useSelector((state) => state.listuser)
  const { users } = listuser
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete
  const usersUpdate = useSelector((state) => state.usersUpdate)
  const { result } = usersUpdate
  useEffect(() => {
    dispatch(userList())
  }, [dispatch, successDelete, result])
  const submitHandler = (user) => {
    setLoading(false)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setId(user._id)
  }
  const deleteHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteUser(id))
    }
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    if (password) {
      if (password !== confirmPassword) {
        setMatchErr('Password are not same')
        return
      }
    }

    dispatch(updateUsers(id, name, email, password, role))
    setLoading(true)
    // if (window.confirm('User updated')) {

    // }
  }

  return (
    <>
      <main className='main-div'>
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        {show && result && (
          <main className="alert">
            <div>
              <CAlert color="success" style={{ textAlign: 'center' }}>
                user updated
              </CAlert>
            </div>
            <div>
              <button onClick={() => setShow(false)}>
                <i class="far fa-times-circle"></i>
              </button>
            </div>
          </main>
        )}
        {showDelete && successDelete && (
          <main className="alert">
            <div>
              <CAlert color="danger" style={{ textAlign: 'center' }}>
                user deleted
              </CAlert>
            </div>
            <div>
              <button onClick={() => setShowDelete(false)}>
                <i class="far fa-times-circle"></i>
              </button>
            </div>
          </main>
        )}
        <div>
          <h4 className="font-semibold">All Users</h4>
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
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
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
                    {users &&
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => submitHandler(user)}>
                              <i class="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                            <button
                              style={{ padding: '5px' }}
                              onClick={() => deleteHandler(user._id)}
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
        <CModal alignment="center" size="lg" visible={!loading} onClose={() => setLoading(true)}>
          <CModalHeader>
            <CModalTitle>
              {' '}
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
              </div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            {loading ? (
              ''
            ) : (
              <div className="bg-white p-1 shadow-sm rounded-sm mt-2">
                <div className="text-gray-700">
                  <CRow className="justify-content-center">
                    <CCol md={12} className="bg-white rounded-lg">
                      <CForm className="row m-2 g-2">
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </CInputGroupText>
                            <CFormInput
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
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
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </CInputGroup>
                          {matchErr ? (
                            <small className="text-red-500 mb-5 mt-0">{matchErr}</small>
                          ) : null}
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup>
                            <CInputGroupText>
                              <i className="fa fa-lock" aria-hidden="true"></i>
                            </CInputGroupText>
                            <CFormInput
                              type="password"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </CInputGroup>
                          {matchErr ? (
                            <small className="text-red-500 mb-5 mt-0">{matchErr}</small>
                          ) : null}
                        </CCol>
                        <CCol xs={6} className="mb-4">
                          <CInputGroup className="mb-4">
                            <CInputGroupText>
                              <i className="fas fa-user-tag"></i>
                            </CInputGroupText>
                            <CFormSelect
                              aria-label="Default select example"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
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
                      </CForm>
                    </CCol>
                  </CRow>
                  <CCol md={3} xs={8}>
                    <CButton color="primary" onClick={handleUpdate}>
                      Save changes
                    </CButton>
                  </CCol>
                </div>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => setLoading(true)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </main>

    </>
  )
}

export default AllUser
