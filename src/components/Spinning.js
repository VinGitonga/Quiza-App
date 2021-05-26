import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './Loader.css'

const Spinning = ({visible=false})=>{
    return (
        <div className="loading-screen">
            <Loader
                type="Bars"
                color="#00bfff"
                height={100}
                width={100}
                timeout={2000}
                visible={visible}
            />
        </div>
    )
}

export default Spinning