import React from 'react'
import { VictoryPie } from "victory";
import { Card } from 'react-bootstrap';
import Breadcrumbs from 'src/components/Breadcrumbs'

const SemesterWise = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Reports" }, { name: "Requests" }];
  const data = [
    { x: "Completed", y: 80 },
    { x: "Rejected", y: 10 },
    { x: "Progress", y: 10 },
  ]
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
              <div className='ml-1' style={{ fontSize: "1rem" }}>400 Completed </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#EC6B56" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>87 Rejected </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#FFC154" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>28 Progress </div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ width: "1.3rem", height: "1.3rem", background: "#007ED6" }} ></div>
              <div className='ml-1' style={{ fontSize: "1rem" }}>515 Total </div>
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
                  <p> Approved Requests</p>
                  <p>100</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>20</p>

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
                  <p> Approved Requests</p>
                  <p>100</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>20</p>

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
                  <p> Approved Requests</p>
                  <p>100</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>20</p>

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
                  <p> Approved Requests</p>
                  <p>100</p>

                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 bg-indigo-100 d-flex align-items-center justify-content-between  pt-3 pb-1">
                  <p> Rejected Requests</p>
                  <p>20</p>

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
