import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
// const Accordion = React.lazy(() => import('./views/components/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/components/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/components/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/components/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/components/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/components/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/components/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/components/base/paginations/Paginations'))
// const Popovers = React.lazy(() => import('./views/components/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/components/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/components/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/components/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/components/base/tooltips/Tooltips'))

//admin
const AddUser = React.lazy(() => import('./views/components/admin/AddUser'))
const AllUser = React.lazy(() => import('./views/components/admin/AllUser'))


//lab management
const AddLab = React.lazy(() => import('./views/pages/lab/AddLab'))
const AllLab = React.lazy(() => import('./views/pages/lab/AllLab'))
// Buttons
// const Buttons = React.lazy(() => import('./views/components/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() =>
//   import('./views/components/buttons/button-groups/ButtonGroups'),
// )
// const Dropdowns = React.lazy(() => import('./views/components/buttons/dropdowns/Dropdowns'))

// staff 
const AddComplaint = React.lazy(() => import('./views/pages/staff-complaints/AddComplaint'))
const AllComplaint = React.lazy(() => import('./views/pages/staff-complaints/AllComplaints'))
const AcceptedComplaints = React.lazy(() => import('./views/pages/staff-complaints/AcceptedComplaints'))
//request
const AddRequest = React.lazy(() => import('./views/pages/request/AddRequest'))
const AllRequests = React.lazy(() => import('./views/pages/request/AllRequests'))
const AcceptedRequests = React.lazy(() => import('./views/pages/request/AcceptedRequest'))
//Forms
// const ChecksRadios = React.lazy(() => import('./views/components/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() =>
//   import('./views/components/forms/floating-labels/FloatingLabels'),
// )
// const FormControl = React.lazy(() => import('./views/components/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/components/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/components/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/components/forms/range/Range'))
// const Select = React.lazy(() => import('./views/components/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/components/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/components/charts/Charts'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/components/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/components/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/components/icons/brands/Brands'))

//All Equipmemts
const AllEquipments = React.lazy(() => import('./views/pages/Inventory/AllEquipments'))
const ScanEquipment = React.lazy(() => import('./views/pages/Inventory/ScanEquipment'))
const AddEquipment = React.lazy(() => import('./views/pages/Inventory/AddEquipment'))
const ViewEquipment = React.lazy(() => import('./views/pages/Inventory/ViewEquipment'))
const UploadQrCode = React.lazy(() => import('./views/pages/Inventory/UploadQrCode'))

//Reports
const Weekly = React.lazy(() => import('./views/pages/reports/Weekly'))
const Yearly = React.lazy(() => import('./views/pages/reports/Yearly'))
const RequestReports = React.lazy(() => import('./views/pages/reports/Requests'))
const ComplaintsReports = React.lazy(() => import('./views/pages/reports/Complaints'))

//Comitte Complaints pages
const CommitteeAcceptedComplaints = React.lazy(() =>
  import('./views/pages/Committe-complaints/AcceptedComplaints'),
)
const CommitteeRejectedComplaints = React.lazy(() =>
  import('./views/pages/Committe-complaints/RejectedComplaints'),
)
const CommitteeAllComplaints = React.lazy(() =>
  import('./views/pages/Committe-complaints/AllComplaints'),
)

//DCO Complaints pages
const DCOAcceptedComplaints = React.lazy(() =>
  import('./views/pages/dco-complaints/AcceptedComplaints'),
)
const DCORejectedComplaints = React.lazy(() =>
  import('./views/pages/dco-complaints/RejectedComplaints'),
)
const DCOAllComplaints = React.lazy(() => import('./views/pages/dco-complaints/AllComplaints'))

//Comittee Request pages
const CommitteeAllRequest = React.lazy(() => import('./views/pages/committee-requests/AllRequest'))
const CommitteeAcceptedRequest = React.lazy(() =>
  import('./views/pages/committee-requests/AcceptedRequest'),
)
const CommitteeRejectedRequest = React.lazy(() =>
  import('./views/pages/committee-requests/RejectedRequest'),
)

//DCO Request pages
const DCOAllRequest = React.lazy(() => import('./views/pages/dco-request/AllRequest'))
const DCOAcceptedRequest = React.lazy(() =>
  import('./views/pages/committee-requests/AcceptedRequest'),
)
const DCORejectedRequest = React.lazy(() => import('./views/pages/dco-request/RejectedRequest'))

//Teacher Request
const SoftwareInstallation = React.lazy(() =>
  import('./views/pages/teacher-request/SoftwareInstallation'),
)

//Teacher Feedback
const InstalledSoftware = React.lazy(() =>
  import('./views/pages/teacher-feedback/InstalledSoftware'),
)

// userProfile
const Profile = React.lazy(() => import('./views/pages/userProfile/Profile'))

//noc 
const NocComplaints = React.lazy(() => import('./views/pages/noc/AllComplaints'))
const NocApprovedComplaints = React.lazy(() => import("./views/pages/noc/ApprovedComplaints"))
const NocComplaintAction = React.lazy(() => import("./views/pages/noc/ComplaintTime"))
const NocRequests = React.lazy(() => import("./views/pages/noc-requests/AllRequest"))
const NocApproveRequests = React.lazy(() => import("./views/pages/noc-requests/ApproveRequests"))
const NocRequestAction = React.lazy(() => import("./views/pages/noc-requests/RequestTime"));
//works
const WorksComplaints = React.lazy(() => import('./views/pages/works/AllComplaints'))
const WorksApprovedComplaints = React.lazy(() => import("./views/pages/works/ApprovedComplaints"))
const WorksComplaintAction = React.lazy(() => import("./views/pages/works/ComplaintTime"))


// Notifications
// const Alerts = React.lazy(() => import('./views/components/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/components/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/components/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/components/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/components/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  //{ path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/userprofile', name: 'Profle', component: Profile, exact: true },
  { path: '/allusers', name: 'User', component: AllUser, exact: true },
  { path: '/adduser', name: 'User', component: AddUser, exact: true },
  { path: '/allequipments', name: 'AllEquipmemts', component: AllEquipments, exact: true },
  { path: '/viewEquipment/:id', name: 'AllEquipmemts', component: ViewEquipment, exact: true },
  { path: '/uploadQrCode', name: 'AllEquipmemts', component: UploadQrCode, exact: true },
  { path: '/scanequipment', name: 'Scan Equipment', component: ScanEquipment, exact: true },
  { path: '/addequipment', name: 'Barcode Search', component: AddEquipment, exact: true },
  { path: '/weeklyreports', name: 'Weekly Reports', component: Weekly, exact: true },
  { path: '/complaint/reports', name: 'Complaints', component: ComplaintsReports, exact: true },
  {
    path: '/request/reports',
    name: 'Request Reports',
    component: RequestReports,
    exact: true,
  },
  {
    path: '/works/complaints',
    name: 'All Complaints',
    component: WorksComplaints,
    exact: true,
  },
  {
    path: '/lab/addlab',
    name: 'Add Lab',
    component: AddLab,
    exact: true,
  },
  {
    path: '/lab/alllab',
    name: 'All Lab',
    component: AllLab,
    exact: true,
  },
  {
    path: '/works/approved/complaints',
    name: 'Approved Complaints',
    component: WorksApprovedComplaints,
    exact: true,
  },
  {
    path: '/works/complaints/action/:id',
    name: 'Complaint Action',
    component: WorksComplaintAction,
    exact: true,
  },
  {
    path: '/yearlyreports',
    name: 'Yearly Reports',
    component: Yearly,
    exact: true,
  },
  {
    path: '/committeeallcomplaints',
    name: 'All Complaints',
    component: CommitteeAllComplaints,
    exact: true,
  },
  {
    path: '/committeeacceptedcomplaints',
    name: 'Accepted Complaints',
    component: CommitteeAcceptedComplaints,
    exact: true,
  },
  {
    path: '/committeerejectedcomplaints',
    name: 'Rejected Complaints',
    component: CommitteeRejectedComplaints,
    exact: true,
  },
  {
    path: '/add/request',
    name: 'Add Request',
    component: AddRequest,
    exact: true,
  },

  {
    path: '/all/requests',
    name: 'Add Request',
    component: AllRequests,
    exact: true,
  },
  {
    path: '/all/accepted/requests',
    name: 'Accepted Request',
    component: AcceptedRequests,
    exact: true,
  },
  {
    path: '/committeerejectedrequest',
    name: 'Rejected Request',
    component: CommitteeRejectedRequest,
    exact: true,
  },
  {
    path: '/committeeacceptedrequest',
    name: 'Accepted Request',
    component: CommitteeAcceptedRequest,
    exact: true,
  },
  {
    path: '/committee/all/requests',
    name: 'All Request',
    component: CommitteeAllRequest,
    exact: true,
  },

  {
    path: '/staff-add/complaints',
    name: 'Add Complaints',
    component: AddComplaint,
    exact: true,
  },
  {
    path: '/all/accepted/complaints',
    name: 'Accepted Complaints',
    component: AcceptedComplaints,
    exact: true,
  },
  {
    path: '/staff/Allcomplaints',
    name: 'All Complaints',
    component: AllComplaint,
    exact: true,
  },
  {
    path: '/noc/Allcomplaints',
    name: 'All Complaints',
    component: NocComplaints,
    exact: true,
  },
  {
    path: '/noc/all/requests',
    name: 'All Request',
    component: NocRequests,
    exact: true,
  },
  {
    path: '/noc/approve/requests',
    name: 'All Request',
    component: NocApproveRequests,
    exact: true,
  },

  {
    path: '/noc/AllApprovedcomplaints',
    name: 'Approved Complaints',
    component: NocApprovedComplaints,
    exact: true,
  },
  {
    path: '/noc/complaintAction/:id',
    name: 'Complaint Action',
    component: NocComplaintAction,
    exact: true,
  },
  {
    path: '/noc/RequestAction/:id',
    name: 'Request Action',
    component: NocRequestAction,
    exact: true,
  },
  {
    path: '/dcoallcomplaints',
    name: 'All Complaints',
    component: DCOAllComplaints,
    exact: true,
  },
  {
    path: '/dcoacceptedcomplaints',
    name: 'Accepted Complaints',
    component: DCOAcceptedComplaints,
    exact: true,
  },
  {
    path: '/dcorejectedcomplaints',
    name: 'Rejected Complaints',
    component: DCORejectedComplaints,
    exact: true,
  },
  {
    path: '/dcoallrequest',
    name: 'All Request',
    component: DCOAllRequest,
    exact: true,
  },
  {
    path: '/dcorejectedrequest',
    name: 'Rejected Request',
    component: DCOAcceptedRequest,
    exact: true,
  },
  {
    path: '/dcoacceptedrequest',
    name: 'Accepted Request',
    component: DCORejectedRequest,
    exact: true,
  },
  {
    path: '/softwareinstallationrequest',
    name: 'Software Request',
    component: SoftwareInstallation,
    exact: true,
  },
  {
    path: '/installedSoftware',
    name: 'Software Request',
    component: InstalledSoftware,
    exact: true,
  },
  // { path: '/base/accordion', name: 'Accordion', component: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress', name: 'Progress', component: Progress },
  // { path: '/base/spinners', name: 'Spinners', component: Spinners },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  // { path: '/forms/select', name: 'Select', component: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  // { path: '/forms/range', name: 'Range', component: Range },
  // { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', component: Layout },
  // { path: '/forms/validation', name: 'Validation', component: Validation },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/brands', name: 'Brands', component: Brands },
  // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
