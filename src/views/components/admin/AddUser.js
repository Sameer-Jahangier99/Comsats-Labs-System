import React, { useState } from 'react'
import validator from 'validator'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import { register } from 'src/services/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from 'src/components/Breadcrumbs'
const AddUser = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Users" }, { name: "Add User" }];
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [noMatch, setNoMatch] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { error, result } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setNoMatch(true)
    } else if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      dispatch(register(name, email, password, role, phone))
    }
    else {
      setPassErr(true)
    }

  }
  return (
    <>
      <main>
        <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
        <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
          <CRow className="justify-content-center">
            <CCol md={12} className="bg-white rounded-lg">
              <CForm className="row mx-4 g-3" onSubmit={submitHandler}>
                <CCol md={12}>
                  {error && (
                    <CAlert color="danger" style={{ textAlign: 'center' }}>
                      {error}
                    </CAlert>
                  )}
                </CCol>
                <CCol md={12}>
                  {result && (
                    <CAlert color="success" style={{ textAlign: 'center' }}>
                      {result}
                    </CAlert>
                  )}
                </CCol>
                <CCol md={12}>
                  <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add New User</p>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fas fa-envelope-open"></i>
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      autoComplete="user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
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
                  {noMatch && <span className="text-red-500 mb-5">Password not match</span>}
                  {passErr && <span className="text-red-500 mb-5">Password must contain 8 letter,uppercase,lowercase,symbol & number</span>}
                </CCol>
                <CCol md={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  {noMatch && <span className="text-red-500 mb-5">Password not match</span>}
                  {passErr && <span className="text-red-500 mb-5">Password must contain 8 letter,uppercase,lowercase,symbol & number</span>}
                </CCol>
                <CCol xs={6} className="mb-4">
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fas fa-user-tag"></i>
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => {
                        setRole(e.target.value)
                      }}
                    >
                      <option>Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="labstaff">Lab Staff</option>
                      <option value="committee">Committee</option>
                      <option value="dco">DCO</option>
                      <option value="hod">HOD</option>
                      <option value="noc">NOC</option>
                      <option value="teacher">Teacher</option>
                    </CFormSelect>
                  </CInputGroup>
                </CCol>
                <CCol xs={6}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fas fa-phone"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Phone number"
                      autoComplete=""
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </CInputGroup>
                </CCol>
                <CRow className="flex items-center justify-start mb-3">
                  <CCol md={3} xs={8}>
                    <button
                      type="submit"
                      className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Add User
                    </button>
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
          </CRow>
        </div>
      </main>
    </>
  )
}

export default AddUser
