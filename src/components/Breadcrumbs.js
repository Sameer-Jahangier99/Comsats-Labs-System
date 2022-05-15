import React from 'react'
import {
    CBreadcrumb,
    CBreadcrumbItem
} from '@coreui/react'

const Breadcrumbs = (props) => {

    return (
        <div className='row bg-white pt-2 pl-2 mb-4 ' style={{ margin: "0px 1px" }} >
            <div className='col-12  '>
                <CBreadcrumb className='d-flex  align-items-center' style={{ "--cui-breadcrumb-divider": "'>'" }}>
                    {
                        props.breadCrumbsInfo && props.breadCrumbsInfo.length && props.breadCrumbsInfo.map((item) => {
                            return <CBreadcrumbItem href={item.href ? item.href : null}>{item.name}</CBreadcrumbItem>
                        })
                    }
                </CBreadcrumb>
            </div>
        </div>
    )
}

export default Breadcrumbs