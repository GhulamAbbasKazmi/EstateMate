import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Jobs.css'
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

import { getJobs, postJob } from "../../../features/job/jobActions";
import JobDetails from "../../JobDetails/JobDetails";

import jobImage from "../../../assets/mt.png";

const Jobs = () => {
    const {
        loading,
        jobs,
        job,
        error,
        success,
    } = useSelector((state) => state.job);

    const dispatch = useDispatch();

    const [showJobDetails, setShowJobDetails] = useState(null);

    useEffect(() => {
        dispatch(getJobs({}))
    }, [job]);


    return (
        <div
            className="Jobs_main"
        >
            {showJobDetails != null ?

                <JobDetails
                    showJobDetails={showJobDetails}
                    setShowJobDetails={setShowJobDetails} />

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
                        onClick={()=>setShowJobDetails({})}
                    >
                        Create new  Job
                    </MDBBtn>

                    {jobs?.length != 0 &&
                        <MDBTable align='middle' className="table">
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {jobs?.map((jobObj, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={
                                                        jobObj.image?.url
                                                            ? jobObj.image?.url
                                                            : jobImage
                                                    }
                                                    alt="avatar"
                                                    className="rounded-circle m-2"
                                                    style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                                    fluid
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{jobObj?.title}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <MDBBadge color={'success'} pill>
                                                {jobObj?.price} $
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBtn color='link' rounded size='sm'
                                                onClick={() => setShowJobDetails(jobObj)}>
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

export default Jobs;