import React, { lazy } from 'react'
import { useSelector } from 'react-redux'

// const WidgetsBrand = lazy(() => import('../components/widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <>
      {/* <WidgetsBrand withCharts /> */}
      <div>
        <h3>Hi <span style={{ color: "#3399FF" }}>{userInfo && userInfo.name}</span> Welcome to Dashboard</h3>

      </div>
    </>
  )
}

export default Dashboard
