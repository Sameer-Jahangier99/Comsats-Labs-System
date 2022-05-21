import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Admin',
  },

  {
    component: CNavGroup,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/adduser',
      },
      {
        component: CNavItem,
        name: 'All Users',
        to: '/allusers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: ' Manage Inventory',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Equipement',
        to: '/allequipments',
      },
      {
        component: CNavItem,
        name: 'Scan Equipment',
        to: '/scanequipment',
      },
      // {
      //   component: CNavItem,
      //   name: 'Barcode Search',
      //   to: '/barcodesearch',
      // },
      {
        component: CNavItem,
        name: 'Add Equipment',
        to: '/addequipment',
      },
      // {
      //   component: CNavItem,
      //   name: 'Update Equipement',
      //   to: '/updateequipment',
      // },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Reports',
  //   to: '/',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Weekly Reports',
  //       to: '/weeklyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Montlhy Reports',
  //       to: '/monthlyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Semester Wise Reports',
  //       to: '/semesterwisereports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Yearly Reports',
  //       to: '/yearlyreports',
  //     },
  //   ],
  // },
]

export const staffNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Staff',
  },

  {
    component: CNavGroup,
    name: 'Complaints',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Complaint',
        to: '/staff-add/complaints',
      },
      {
        component: CNavItem,
        name: 'All Complaint',
        to: '/staff/Allcomplaints',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Lab',
    to: '',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Lab',
        to: '/lab/addlab',
      },
      {
        component: CNavItem,
        name: 'All Lab',
        to: '/lab/alllab',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: ' Manage Inventory',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Equipement',
        to: '/allequipments',
      },
      {
        component: CNavItem,
        name: 'Scan Equipment',
        to: '/scanequipment',
      },
      {
        component: CNavItem,
        name: 'Upload QrCode',
        to: '/uploadQrCode',
      },

      {
        component: CNavItem,
        name: 'Add Equipment',
        to: '/addequipment',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Request',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Request',
        to: '/add/request',
      },
      {
        component: CNavItem,
        name: 'All Requests',
        to: '/all/requests',
      },

    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Feedback',
  //   to: '/',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add Feedback',
  //       to: '/addfeedback',
  //     },
  //   ],
  // },
]

export const committeNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Committee',
  },

  // {
  //   component: CNavGroup,
  //   name: 'Reports',
  //   to: '/',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Weekly Reports',
  //       to: '/weeklyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Montlhy Reports',
  //       to: '/monthlyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Semester Wise Reports',
  //       to: '/semesterwisereports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Yearly Reports',
  //       to: '/yearlyreports',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Complaints',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Complaints',
        to: '/committeeallcomplaints',
      },
      // {
      //   component: CNavItem,
      //   name: 'Accepted Complaints',
      //   to: '/committeeacceptedcomplaints',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Reject Comlaints',
      //   to: '/committeerejectedcomplaints',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Request',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Requests',
        to: '/committee/all/requests',
      },

      // {
      //   component: CNavItem,
      //   name: 'Accepted Request',
      //   to: '/committeeacceptedrequest',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Rejected Request',
      //   to: '/committeerejectedrequest',
      // },
    ],
  },
]


export const nocNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Noc',
  },

  {
    component: CNavGroup,
    name: 'Complaints',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Complaints',
        to: '/noc/Allcomplaints',
      },
      {
        component: CNavItem,
        name: 'Approve Complaints',
        to: '/noc/AllApprovedcomplaints',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Requests',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Requests',
        to: '/noc/all/requests',
      },
      {
        component: CNavItem,
        name: 'Approved Requests',
        to: '/noc/approve/requests',
      },


    ],
  },
]



export const worksNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Works',
  },

  {
    component: CNavGroup,
    name: 'Complaints',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Complaints',
        to: '/works/complaints',
      },
      {
        component: CNavItem,
        name: 'Approve Complaints',
        to: '/works/approved/complaints',
      },
    ],
  },
]



export const hodNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Hod',
  },

  {
    component: CNavGroup,
    name: 'Reports',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Complaints',
        to: '/complaint/reports',
      },
      {
        component: CNavItem,
        name: 'Requests',
        to: '/request/reports',
      },
      // {
      //   component: CNavItem,
      //   name: 'Semester Wise Reports',
      //   to: '/semesterwisereports',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Yearly Reports',
      //   to: '/yearlyreports',
      // },
    ],
  },
]

export const dcoNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In DCO',
  },

  // {
  //   component: CNavGroup,
  //   name: 'Reports',
  //   to: '/',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Weekly Reports',
  //       to: '/weeklyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Montlhy Reports',
  //       to: '/monthlyreports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Semester Wise Reports',
  //       to: '/semesterwisereports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Yearly Reports',
  //       to: '/yearlyreports',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Complaints',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Complaints',
        to: '/dcoallcomplaints',
      },
      // {
      //   component: CNavItem,
      //   name: 'Accepted Complaints',
      //   to: '/dcoacceptedcomplaints',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Reject Comlaints',
      //   to: '/dcorejectedcomplaints',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Request',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Request',
        to: '/dcoallrequest',
      },
      // {
      //   component: CNavItem,
      //   name: 'Accepted Request',
      //   to: '/dcoacceptedrequest',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Rejected Request',
      //   to: '/dcorejectedrequest',
      // },
    ],
  },
]

export const TeacherNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Logged In Teacher',
  },
  {
    component: CNavGroup,
    name: 'Software Request',
    to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Software Installation',
        to: '/softwareinstallationrequest',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Feedback',
  //   to: '/',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'To installed Software',
  //       to: '/installedSoftware',
  //     },
  //   ],
  // },
]
