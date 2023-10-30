import React from 'react'
import { MDBRipple } from 'mdb-react-ui-kit';
import WA from "../../assets/WhatsApp.png";
import './WhatsApp.css'

function WhatsApp() {
    return (
        <MDBRipple rippleTag='div' className='bg-image1 hover-zoom '>
          <img src={WA} className='w-100' />
          <a href="whatsapp://send?phone=+923357111142">
            <div className='mask'></div>
          </a>
        </MDBRipple>
      );
}

export default WhatsApp


