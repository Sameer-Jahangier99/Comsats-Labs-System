import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import { adminNav, staffNav, committeNav, hodNav, dcoNav, TeacherNav, nocNav, worksNav } from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand to="/">
        <div className=" flex items-center font-bold gray-400">
          <div>
            <i className="fa fa-user-circle mr-2 text-xl" aria-hidden="true"></i>
          </div>
          <div>Inventory Management</div>
        </div>
      </CSidebarBrand>
      {userInfo && userInfo.role === 'admin' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={adminNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'dco' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={dcoNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'teacher' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={TeacherNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'hod' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={hodNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'labstaff' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={staffNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'committee' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={committeNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'noc' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={nocNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      {userInfo && userInfo.role === 'works' && (
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={worksNav} />
          </SimpleBar>
        </CSidebarNav>
      )}
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
