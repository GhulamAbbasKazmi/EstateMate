import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
    style={{ backgroundColor: '#FFFFFF ' }}
    className="text-black text-center text-lg-left"
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">About Estate Mate</h5>

            <p>
            We have built our reputation as true local area experts.
            Welcome to Estate Mate, where your dream home awaits.
            Our expert team of real estate professionals is here to guide you through every step of the home buying and selling process.
            We aim to revolutionize the real estate industry in Pakistan by using modern marketing techniques and mass communication to strengthen our relationship with our trusted clients.
            "He is not a full man who does not own a piece of land."    
             Hebrew Proverb
            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="facebook-f" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="twitter" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#dd4b39" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="google" />
                </MDBBtn>
              </li>
              <li>
                <MDBBtn
                  floating
                  className="m-1"
                  style={{ backgroundColor: "#ac2bac" }}
                  href="#!"
                  role="button"
                >
                  <MDBIcon fab icon="instagram" />
                </MDBBtn>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact</h5>
            <p>
              <MDBIcon icon="home" className="me-2" />
              Office 6 &7, First Floor, City Business Icon 1, A-Block, New city phase 2 Wah Cantt, Wah, Pakistan.
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              estatemate3@Gmail.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> + 0335 7111142
            </p>
            <p>
              <MDBIcon icon="print" className="me-3" /> + +92-335-7111142
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-black">Estate Mate . All Rights Reserved.</a>
      </div>
    </MDBFooter>
  );
}
