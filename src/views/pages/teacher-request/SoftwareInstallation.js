import React,{useState,useEffect} from 'react'
import {
  CRow,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,

  CFormSelect,
  CFormTextarea
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { BASE_URL } from 'src/services/axios';
import axios from 'axios';
import Breadcrumbs from 'src/components/Breadcrumbs' 
const SoftwareInstallation = () => {
    const [loading,setLoading]=useState(false)
    const [labs, setLabs] = useState([])
    const [name,setName]=useState('')
    const [courseCode,setCourseCode]=useState('')
    const [courseTitle,setCourseTitle]=useState('')
    const [numberOfStudent,setNumberOfStudent]=useState()
    const [lab,setLab]=useState('')
    const [type,setType]=useState('Software')
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 

  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Add Request" }]

  const submitHandler=async (e)=>{
      e.preventDefault()
      setLoading(true)
      const t=typeof(type)
      console.log(t)
      try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const user =userInfo._id
        console.log(user)
          const {data} = await axios.post(`${BASE_URL}/request/addFacultyRequest`,{user,name,courseCode,courseTitle,numberOfStudent,lab,type},config)
          if(data){
              setLoading(false)
              console.log(data)
              

          }
      } catch (error) {
          console.log(error)
          
      }
      console.log('submitted')
      console.log(name)
      console.log(lab)
      console.log(courseCode)
      console.log(courseTitle)
      console.log(numberOfStudent)
      console.log(type)
  }
  useEffect(async () => {
      try {
        const { data } = await axios.get('/lab/')
        if (data) {
          setLabs(data)
       
        }
      } catch (error) {
          console.log(error)
      }
  
    
  }, [])
  return (
    <>
       <main>
                <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
                <div className="bg-white p-3 shadow-sm rounded-sm mt-3">
                    <CRow className="justify-content-center">
                        <CCol md={12} className="bg-white rounded-lg">
                            <CForm className="row mx-4 g-3" onSubmit={submitHandler} >


                                <CCol md={12}>
                                    <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add Request</p>
                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Name of Software"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <i className="fas fa-user-tag"></i>
                                        </CInputGroupText>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            
                                        >
                                            <option>Request Type</option>
                                            <option value="software">software</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Course Code"
                                            value={courseCode}
                                            onChange={(e) => setCourseCode(e.target.value)}
                                            required
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <i className="fas fa-user-tag"></i>
                                        </CInputGroupText>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            onChange={(e)=>setLab(e.target.value)}
                                        >
                                            <option>Select Lab</option>

     { labs &&  
  labs.map((item) => {
    return <option   value={item.name}>{item.name}</option>
  })}   
                                        </CFormSelect>
                                    </CInputGroup>

                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Course Title"
                                            value={courseTitle}
                                            onChange={(e) => setCourseTitle(e.target.value)}
                                            required
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={4}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder=" Number of student"
                                            type='Number'
                                            value={numberOfStudent}
                                            onChange={(e) => setNumberOfStudent(e.target.value)}
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
                                            {loading ? "Adding..." : "Add Request"}
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

export default SoftwareInstallation
