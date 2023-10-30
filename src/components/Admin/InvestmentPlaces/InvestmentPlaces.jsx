import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './InvestmentPlaces.css'
import {
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
    MDBSpinner
} from 'mdb-react-ui-kit';

import { getPlaces, postPlace } from "../../../features/place/placeActions";
import PlaceDetails from "../../PlaceDetails/PlaceDetails";

import placeImage from "../../../assets/mt.png";

const InvestmentPlaces = () => {
    const {
        loading,
        places,
        place,
        error,
        success,
    } = useSelector((state) => state.place);

    const dispatch = useDispatch();

    const [showPlaceDetails, setShowPlaceDetails] = useState(null);

    useEffect(() => {
        dispatch(getPlaces({}))
    }, [place]);


    return (
        <div
            className="InvestmentPlaces_main"
        >
            {showPlaceDetails != null ?

                <PlaceDetails
                    showPlaceDetails={showPlaceDetails}
                    setShowPlaceDetails={setShowPlaceDetails} />

                :
                <>
                  <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px"

                        }}
                        onClick={()=>setShowPlaceDetails({})}
                    >
                        Create new Investment Place
                    </MDBBtn>

                    {places?.length != 0 &&
                        <MDBTable align='middle' className="table">
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {places?.map((placeObj, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={
                                                        placeObj.image?.url
                                                            ? placeObj.image?.url
                                                            : placeImage
                                                    }
                                                    alt="avatar"
                                                    className="rounded-circle m-2"
                                                    style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                                    fluid
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{placeObj?.title}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <MDBBadge color={'success'} pill>
                                                {placeObj?.price} $
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBtn color='link' rounded size='sm'
                                                onClick={() => setShowPlaceDetails(placeObj)}>
                                                Details
                                            </MDBBtn>
                                        </td>
                                    </tr>

                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    }
                </>
            }
        </div>
    );
}

export default InvestmentPlaces;