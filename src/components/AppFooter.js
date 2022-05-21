import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Comsats Labs
        </a>
        <span className="ms-1">&copy; 2022.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Created with</span>
        <a href="/" target="_blank" rel="noopener noreferrer">
          &#10084;
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
