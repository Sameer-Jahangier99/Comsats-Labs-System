import React from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CContainer } from '@coreui/react'
import { useDispatch } from 'react-redux'
import { logout } from 'src/services/actions/userActions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 " caret={false}>
        <CContainer className="flex justify-between items-center">
          <i className="far fa-user-circle text-4xl text-center mr-2"></i>
          <p className="text-center p-0 m-0 ">{userInfo && userInfo.name}</p>
        </CContainer>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <Link to="/userprofile" className="no-underline">
          <CDropdownItem>
            <i className="far fa-user font-bold text-lg mr-3"></i>
            Profile
          </CDropdownItem>
        </Link>

        <CDropdownItem onClick={logoutHandler}>
          <i className="fa fa-sign-out text-lg mr-3" aria-hidden="true"></i>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
