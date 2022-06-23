import React, { useState, useEffect } from 'react'
import { VictoryPie } from 'victory'
import { Card } from 'react-bootstrap'
import Breadcrumbs from 'src/components/Breadcrumbs'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from 'src/services/axios'
const SemesterWise = () => {
  const [completed, setCompleted] = useState()
  const [progress, setProgress] = useState()
  const [rejected, setRejected] = useState()
  const [rejectedByDco, setRejectedByDco] = useState()
  const [approvedByDco, setApprovedByDco] = useState()
  const [rejectedByCommittee, setRejectedByCommittee] = useState()
  const [approvedByCommittee, setApprovedByCommittee] = useState()
  const [rejectedByWorks, setRejectedByWorks] = useState()
  const [approvedByWorks, setApprovedByWorks] = useState()
  const [rejectedByNOC, setRejectedByNOC] = useState()
  const [approvedByNOC, setApprovedByNOC] = useState()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const breadCrumbsInfo = [{ name: 'Home', href: '/' }, { name: 'Reports' }, { name: 'Requests' }]
  const data = [
    { x: 'Completed', y: completed && completed },
    { x: 'Rejected', y: rejected && rejected },
    { x: 'Progress', y: progress && progress },
  ]
  const getCompletedRequests = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allCompletedRequest`, config)

    setCompleted(data.length)
  }

  const getInProgressComplaints = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allInProgressRequests`, config)

    setProgress(data.length)
  }
  const getRejectedComplaints = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRejectedRequest`, config)

    setRejected(data.length)
  }
  const getApprovedRequestsByDco = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestAprrovedByDco`, config)

    setApprovedByDco(data.length)
  }
  const getRejectedRequestByDco = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestRejectedByDcoReport`, config)

    setRejectedByDco(data.length)
  }
  const getApprovedRequestByCommittee = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${BASE_URL}/request/allRequestAprrovedByCommitteeReport`,
      config,
    )

    setApprovedByCommittee(data.length)
  }
  const getRejectedRequestsByCommittee = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `${BASE_URL}/request/allRequestRejectedByCommitteeReport`,
      config,
    )

    setRejectedByCommittee(data.length)
  }
  const getApprovedRequestsByWorks = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestAprrovedByWorksReport`, config)

    setApprovedByWorks(data.length)
  }
  const getRejectedRequestsByWorks = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestRejectedByWorksReport`, config)

    setRejectedByWorks(data.length)
  }

  const getApprovedRequestsByNOC = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestAprrovedByNOCReport`, config)

    setApprovedByNOC(data.length)
  }
  const getRejectedRequestsByNOC = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`${BASE_URL}/request/allRequestRejectedByNOCReport`, config)

    setRejectedByNOC(data.length)
  }
  useEffect(() => {
    getCompletedRequests()
    getInProgressComplaints()
    getRejectedComplaints()
    getApprovedRequestsByDco()
    getRejectedRequestByDco()
    getApprovedRequestByCommittee()
    getRejectedRequestsByCommittee()
    getApprovedRequestsByWorks()
    getRejectedRequestsByWorks()
    getApprovedRequestsByNOC()
    getRejectedRequestsByNOC()
  }, [])
  return (
    <>
      <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
      <div className="row" style={{ margin: '0px 1px' }}>
        <div className="col-12 bg-white rounded-sm d-flex justify-content-center align-items-center ">
          <div>
            <VictoryPie data={data} radius={100} colorScale={['#47B39C', '#EC6B56', '#FFC154']} />
          </div>

          <div>
            <div className="d-flex align-items-center">
              <div style={{ width: '1.3rem', height: '1.3rem', background: '#47B39C' }}></div>
              <div className="ml-1" style={{ fontSize: '1rem' }}>
                {completed} Completed{' '}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '1.3rem', height: '1.3rem', background: '#EC6B56' }}></div>
              <div className="ml-1" style={{ fontSize: '1rem' }}>
                {rejected} rejected{' '}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '1.3rem', height: '1.3rem', background: '#FFC154' }}></div>
              <div className="ml-1" style={{ fontSize: '1rem' }}>
                {progress} progress{' '}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{ width: '1.3rem', height: '1.3rem', background: '#007ED6' }}></div>
              <div className="ml-1" style={{ fontSize: '1rem' }}>
                {completed + progress + rejected} Total{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6 ">
          <Card>
            <Card.Header style={{ backgroundColor: '#3C4B64', color: '#fff' }}>DCO</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Requests</p>
                  <p>{approvedByDco}</p>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>{rejectedByDco}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6   ">
          <Card>
            <Card.Header style={{ backgroundColor: '#3C4B64', color: '#fff' }}>
              COMMITTEE
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Requests</p>
                  <p>{approvedByCommittee}</p>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>{rejectedByCommittee}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-2 ">
          <Card>
            <Card.Header style={{ backgroundColor: '#3C4B64', color: '#fff' }}>WORKS</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Requests</p>
                  <p>{approvedByWorks}</p>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>{rejectedByWorks}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6 mt-2 ">
          <Card>
            <Card.Header style={{ backgroundColor: '#3C4B64', color: '#fff' }}>NOC</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Approved Requests</p>
                  <p>{approvedByNOC}</p>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
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

export default SemesterWise
