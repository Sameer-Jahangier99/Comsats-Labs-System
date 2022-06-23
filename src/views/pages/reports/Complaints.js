import React,{useState,useEffect} from 'react'
import { VictoryPie } from "victory";
import { Card } from 'react-bootstrap';
import Breadcrumbs from 'src/components/Breadcrumbs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from 'src/services/axios';
const Monthly = () => {
  const [completed,setCompleted]=useState()
  const [progress,setProgress]=useState()
  const [rejected,setRejected]=useState()
  const [rejectedByDco,setRejectedByDco]=useState()
  const [approvedByDco,setApprovedByDco]=useState()
  const [rejectedByCommittee,setRejectedByCommittee]=useState()
  const [approvedByCommittee,setApprovedByCommittee]=useState()
  const [rejectedByWorks,setRejectedByWorks]=useState()
  const [approvedByWorks,setApprovedByWorks]=useState()
  const [rejectedByNOC,setRejectedByNOC]=useState()
  const [approvedByNOC,setApprovedByNOC]=useState()
  const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Reports" }, { name: "Complaints" }];
  const data = [
    { x: "Completed", y:  completed && completed},
    { x: "Rejected", y: rejected && rejected },
    { x: "Progress", y:  progress && progress},
  ]
  const getCompletedComplaints=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/completedComplaint`,config)
    
    setCompleted(data.length)
  }

  const getInProgressComplaints=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/ProgressComplaint`,config)
    
    setProgress(data.length)
  }
  const getRejectedComplaints=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/rejectedComplaint`,config)
   
    setRejected(data.length)
  }
  const getRejectedComplaintsByDco=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allRejectedByDco`,config)
 
    setRejectedByDco(data.length)
  }
  const getApprovedComplaintsByDco=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allApprovedByDco`,config)
 
    setApprovedByDco(data.length)
  }
  const getApprovedComplaintsByCommittee=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintApprovedByCommittee`,config)
 
    setApprovedByCommittee(data.length)
  }
  const getRejectedComplaintsByCommittee=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintRejectedByCommittee`,config)
 
    setRejectedByCommittee(data.length)
  }
  const getApprovedComplaintsByWorks=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintApprovedByWorks`,config)
 
    setApprovedByWorks(data.length)
  }
  const getRejectedComplaintsByWorks=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintRejectedByWorks`,config)
 
    setRejectedByWorks(data.length)
  }

  const getApprovedComplaintsByNOC=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintApprovedByNOC`,config)
 
    setApprovedByNOC(data.length)
  }
  const getRejectedComplaintsByNOC=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
      },
  }
    const {data}= await axios.get(`${BASE_URL}/complaint/allComplaintRejectedByNOC`,config)
 
    setRejectedByNOC(data.length)
  }
useEffect(()=>{
  getCompletedComplaints()
  getInProgressComplaints()
  getRejectedComplaints()
  getRejectedComplaintsByDco()
  getApprovedComplaintsByDco()
  getRejectedComplaintsByCommittee()
  getApprovedComplaintsByCommittee()
  getApprovedComplaintsByWorks()
  getRejectedComplaintsByWorks()
  getApprovedComplaintsByNOC()
  getRejectedComplaintsByNOC()
},[])

  return (
    <>
      <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
      <div className='row' style={{ margin: "0px 1px" }}>

        <div className='col-12 bg-white rounded-sm d-flex justify-content-center align-items-center '>
          <div  >
            <VictoryPie data={data} radius={100} colorScale={["#47B39C", "#EC6B56", "#FFC154"]} />
          </div>

          <div  >
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#47B39C" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>{completed} Completed </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#EC6B56" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>{ rejected} rejected </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#FFC154" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>{progress} progress </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#007ED6" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>{completed + progress + rejected} Total </div>
            </div>

          </div>
        </div>
      </div>
      <div className='row mt-4' >
        <div className='col-6 '>
          <Card >
            <Card.Header style={{ backgroundColor: "#3C4B64", color: "#fff" }}>DCO</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Complaints</p>
                  <p>{approvedByDco}</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Complaints</p>
                  <p>{rejectedByDco}</p>

                </div>
              </div>

            </Card.Body>
          </Card>
        </div>

        <div className='col-6   '>
          <Card >
            <Card.Header style={{ backgroundColor: "#3C4B64", color: "#fff" }}>COMMITTEE</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Complaints</p>
                  <p>{approvedByCommittee}</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Complaints</p>
                  <p>{rejectedByCommittee}</p>

                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
        <div className='col-6 mt-2 '>
          <Card >
            <Card.Header style={{ backgroundColor: "#3C4B64", color: "#fff" }}>WORKS</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Complaints</p>
                  <p>{approvedByWorks}</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Complaints</p>
                  <p>{rejectedByWorks}</p>

                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className='col-6 mt-2 '>
          <Card >
            <Card.Header style={{ backgroundColor: "#3C4B64", color: "#fff" }}>NOC</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Complaints</p>
                  <p>{approvedByNOC}</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Complaints</p>
                  <p>{rejectedByNOC}</p>

                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
      </div>

    </>
  )
}

export default Monthly
