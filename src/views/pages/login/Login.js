import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/services/actions/userActions'
import { useHistory } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            {error && (
              <CAlert color="danger" style={{ textAlign: 'center' }}>
                {error}
              </CAlert>
            )}
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={submitHandler}>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol className="text-center">
                      <CButton color="primary" className="px-4" type='submit' onClick={submitHandler}>
                        {loading ? <CSpinner size="sm" style={{ color: '#fff' }} /> : 'Login'}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
