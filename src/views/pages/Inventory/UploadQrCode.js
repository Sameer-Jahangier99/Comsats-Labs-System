import React, { useState, useRef } from 'react'
import {
  CContainer,
  CRow,
  CCol
} from '@coreui/react'
import QrReader from 'react-qr-reader';
import { findProductByQrId } from "src/services/actions/productActions"
import { useDispatch, useSelector } from 'react-redux'
import { imageUrl } from 'src/utils.js/imageUrl'
import Breadcrumbs from 'src/components/Breadcrumbs'
const UploadQrCode = () => {
  const breadCrumbsInfo = [{ name: "Home", href: '/' }, { name: "Inventory" }, { name: "Upload QrCode" }];
  const dispatch = useDispatch()
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [showCam, setShowCam] = useState(true);
  const [displayProduct, setDisplayProduct] = useState(false);
  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);
  const { loading, product, error } = useSelector((state) => state.findProduct)


  const scanAgain = () => {
    setShowCam(true);
    setDisplayProduct(false);
  }

  const handleErrorFile = (error) => {
    console.log(error);
  }

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
      dispatch(findProductByQrId(result))
      setShowCam(false);
      setDisplayProduct(true);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  return (
    <main>
      <Breadcrumbs breadCrumbsInfo={breadCrumbsInfo} />
      <CContainer>
        <CRow>
          <CCol md={12} className="mb-4">
            <h3>Scan Qr Code</h3>
          </CCol>
        </CRow>
        <CRow>
          {
            showCam ? <CCol md={4}>
              <button
                className="py-2 px-4 mt-2 mb-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={onScanFile}
              >
                Upload File
              </button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />

            </CCol> : <CCol md={4} className="d-flex justify-content-center align-items-center">
              <div>
                <h1 class="text-gray-900 font-bold text-2xl text-center">
                  Scanned
                </h1>
                <button
                  className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={scanAgain}
                >
                  Scan Again
                </button>
              </div>
            </CCol>

          }
          <CCol md={8}>
            {
              displayProduct && <div class="bg-white overflow-hidden" >
                <CRow >
                  <CCol md={4}>
                    <img style={{ height: "100% ", width: "100%", objectFit: "cover" }} src={`${imageUrl}${product && product.product.productImage}`} alt={product && product.product.name} ></img>
                  </CCol>
                  <CCol md={7}>
                    <CRow>
                      <CCol md={12}>
                        <h1 class="text-gray-900 font-bold text-2xl text-center">
                          {product && product.product.name}
                        </h1>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6} >
                        <div className='d-flex'>
                          <h3 class="text-gray-900 font-bold text-xl">
                            Lab:
                          </h3>
                          <div>
                            <p class="text-gray-600 text-xl ml-4">
                              {product && product.product.lab.name}
                            </p>
                          </div>
                        </div>
                      </CCol>
                      <CCol md={6} >
                        <div className='d-flex'>
                          <h3 class="text-gray-900 font-bold text-xl">
                            Added By:
                          </h3>
                          <div>
                            <p class="text-gray-600 text-xl ml-4">
                              {product && product.product.user.name}
                            </p>
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol md={6}>
                        <h3 class="text-gray-900 font-bold text-xl">
                          Specification:
                        </h3>
                        {
                          product && product.product.specification && product.product.specification.map((item) => {
                            return <div key={item._id} class="flex item-center  mt-3">
                              <h1 class="text-gray-700 font-bold text-xl">
                                {item.key}
                              </h1>
                              <p class="text-gray-600 text-xl ml-4">
                                {item.value}
                              </p>
                            </div>
                          })
                        }

                      </CCol>
                      <CCol md={6}>
                        <h3 class="text-gray-900 font-bold text-xl">
                          Qr Code
                        </h3>
                        <div className="d-flex justify-content-center align-items-center">
                          <a href={product && product.product.imageUrl} download>
                            <img style={{ width: "7rem", height: "7rem" }} src={product && product.product.imageUrl} alt={product && product.product.name} ></img>
                          </a>
                        </div>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </div>
            }
          </CCol>
        </CRow>
      </CContainer>
    </main>
  )
}

export default UploadQrCode
