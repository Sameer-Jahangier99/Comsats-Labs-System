import React from 'react'
import {
    CAlert,
} from '@coreui/react'

export const Alert = ({ msg, color }) => {
    return (
        <CAlert color={color} style={{ textAlign: 'center' }}>
            {msg}
        </CAlert>
    )
}

export default Alert