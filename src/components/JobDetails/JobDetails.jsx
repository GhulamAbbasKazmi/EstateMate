import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './JobDetails.css'

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInputGroup,
    MDBIcon,
    MDBCardTitle,
    MDBRadio,
    MDBBadge,
    MDBRipple
} from "mdb-react-ui-kit";


import jobImage from "../../assets/mt.png";

import { getJob, postJob, updateJob, deleteJob } from "../../features/job/jobActions";

const JobDetails = ({ showJobDetails, setShowJobDetails, darkMode }) => {

    const dispatch = useDispatch();

    const {
        userInfo
    } = useSelector((state) => state.user);

    const {
        loading,
        jobs,
        job,
        error,
        success,
    } = useSelector((state) => state.job);
    


    const inputElementJobImage = useRef();

    const [newJob, setNewJob] = useState({
        title: "",
        image: { imageToBase64: null, url: null },
        price: null,
        description: ""
    });

    const [jobError, setJobError] = useState('')


    const [selectedImageJob, setSelectedImageJob] = useState(null);

    const [basicModal, setBasicModal] = useState(false);
    const [basicModalUpdate, setBasicModalUpdate] = useState(false);

    const [updateMessage, setUpdateMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {

        if (showJobDetails._id) {
            dispatch(getJob({ id: showJobDetails._id }))
        }
        
    }, []);

    useEffect(() => {
        if (showJobDetails._id) {
            setNewJob(job)
        }
    }, [job]);


    useEffect(() => {
        if (selectedImageJob) {

            const reader = new FileReader();
            reader.readAsDataURL(selectedImageJob);
            reader.onloadend = () => {
                setNewJob({ ...newJob, image: { ...newJob.image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImageJob) } })
            };
        }
    }, [selectedImageJob]);

    useEffect(() => {
        if (success == 'Job has been posted successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Job has been updated successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Job has been delete successfully!') {
            setUpdateMessage(success);
        }
        if (error) {
            setUpdateMessage(error);
        }
    }, [success, error]);



    const changeJobImage = () => {
        inputElementJobImage.current.click();
    };

    const removeJobImage = () => {
        setSelectedImageJob(null);
        setNewJob({ ...newJob, image: { ...newJob.image, imageToBase64: null, url: null } })
    };


    const openUpdateModal = () => {
        setBasicModalUpdate(!basicModalUpdate);
        setUpdateMessage("");
    };

    const closeModalAfterUpdate = () => {
        setBasicModalUpdate(!basicModalUpdate);
    };

    const openDeleteModal = () => {
        setBasicModal(!basicModal);
        setDeleteMessage("");
    };
    const closeModalAfterDelete = () => {
        setBasicModal(!basicModal);
        setShowJobDetails(null)
    };

    const submitNewJob = () => {

        console.log('submitting')

        if (newJob.title == "") {
            setJobError('Job title is empty!')
        }
        // else if (newJob.image.url == null) {
        //     setJobError('Job Image is not selected!')
        // }

        else if (newJob.price == null) {
            setJobError('Job price is empty!')
        }

        else if (newJob.description == "") {
            setJobError('Job description is empty!')
        }
        else {
            setJobError(null)
            dispatch(postJob({ admin_email: userInfo?.email, job: newJob }))
        }
    }

    return (
        <div
            className="ComplaintDetails_main"
        >
            <MDBBtn color='link' rounded size='sm' onClick={() => setShowJobDetails(null)}>Back to Jobs</MDBBtn>

            <div className="complaint_content my-3">
                <div className="commentsHeading">Job Details</div>

                <div className="contentSection">
                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Title
                    </div>
                    <div className="secTopRow">

                        {userInfo?.user_type == 'admin' ?
                            <input className="headingContentInput"
                                value={newJob?.title}
                                onChange={(e) => {
                                    setNewJob({ ...newJob, title: e.target.value })
                                    setJobError('')
                                }}
                                jobholder={"Job Title"}
                            />
                            :
                            <div className="headingContentInput">
                                {newJob?.title}
                            </div>
                        }

                    </div>

                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Price
                    </div>

                    {userInfo?.user_type == 'admin' ?
                        <input className="headingContentInput"
                            value={newJob?.price}
                            type="number"
                            onChange={(e) => {
                                setNewJob({ ...newJob, price: e.target.value })
                                setJobError('')
                            }}
                            jobholder={"Job Price $"}
                        /> :
                        <MDBBadge color={'success'} pill>
                            {newJob?.price}
                        </MDBBadge>
                    }

                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Details
                    </div>

                    <div className={"content_"}>

                        {newJob?.image?.url != null && userInfo?.user_type == 'admin' ?

                            <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${newJob?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <div className="topRowSectionImage">
                                    <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={changeJobImage} />
                                    <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={removeJobImage} />
                                </div>

                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    ref={inputElementJobImage}
                                    onChange={(e) => {
                                        setSelectedImageJob(e.target.files[0]);
                                        e.target.value = null;
                                    }}
                                />
                            </div>

                            : userInfo?.user_type == 'admin' ?
                                <div className="contentImageContainer" onClick={changeJobImage}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{ display: "none" }}
                                        ref={inputElementJobImage}
                                        onChange={(e) => {
                                            setSelectedImageJob(e.target.files[0]);
                                            e.target.value = null;
                                        }}
                                        className="secInput"
                                    />
                                    + Add Job Image
                                </div>

                                :
                                <div className="contentImageContainer_Image" style={{
                                    backgroundImage: `url(${newJob?.image?.url
                                        ? newJob?.image?.url
                                        : jobImage})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}>
                                </div>
                        }

                        {userInfo?.user_type == 'admin' ?
                            <textarea className="contentTextArea"
                                value={newJob?.description}
                                onChange={(e) => {
                                    setNewJob({ ...newJob, description: e.target.value })
                                    setJobError('')
                                }}
                                jobholder={"Job Description"}
                            /> :
                            <div className="contentTextArea">
                                {newJob?.description}
                            </div>
                        }

                    </div>
                    <hr />
                    {userInfo?.user_type == 'admin' && (showJobDetails._id != null) &&  
                        <>
                            {
                                loading ?
                                    <div className="my-3">
                                        <MDBSpinner color="primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </MDBSpinner> </div>
                                    :
                                    <MDBCard
                                        className={`my-3 ${darkMode ? " text-white bg-dark" : ""}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-center m-4 profileButtons">
                                            <MDBCol className="flex-2 mx-1">
                                                <MDBBtn
                                                    color={'success'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#455B8E" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={openUpdateModal}
                                                >
                                                    Update Job
                                                </MDBBtn>
                                            </MDBCol>

                                            <MDBCol className="flex-2 mx-1">
                                                <MDBBtn
                                                    color={'danger'}
                                                    className="mb-2 btn-rounded"
                                                    style={{
                                                        backgroundColor: darkMode ? "#581845" : "",
                                                        width: "100%",
                                                    }}
                                                    onClick={openDeleteModal}
                                                >
                                                    Delete Job
                                                </MDBBtn>
                                            </MDBCol>
                                        </div>
                                    </MDBCard>

                            }

                        </>

                    }

                    {(error || jobError) && (
                        <div className="text-danger text-center mb-2">
                            {error || jobError}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                        </div>)
                    }

                    {(success && jobError == null) && (
                        <div className="text-success text-center mb-2">
                            {updateMessage }{" "}
                            <i className="fas fa-exclamation-triangle text-success"></i>
                        </div>)
                    }
                    {
                        loading ?
                            <div className="my-3">
                                <MDBSpinner color="primary">
                                    <span className="visually-hidden">Loading...</span>
                                </MDBSpinner> </div> : userInfo?.user_type == 'admin' && showJobDetails._id == null &&
                            <MDBBtn
                                className="btn-rounded heroSecBtn-2"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "4px"

                                }}
                                onClick={submitNewJob}
                            >
                                Post Job
                            </MDBBtn>
                    }
                    {userInfo?.user_type != 'admin' &&
                        <MDBBtn
                        className="btn-rounded heroSecBtn-2"
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px"

                        }}
                    >
                    </MDBBtn>
                    }
                </div>
            </div>


            <MDBModal
                show={basicModal}
                setShow={setBasicModal}
                tabIndex="-1"
            >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                { }
                                Delete Job{" "}
                                <i className="fas fa-exclamation-triangle text-danger"></i>
                            </MDBModalTitle>
                        </MDBModalHeader>
                        {loading ? (
                            <MDBRow className="d-flex justify-content-center align-items-center my-3">
                                <MDBSpinner color="primary">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </MDBSpinner>
                            </MDBRow>
                        ) : (
                            <>
                                <MDBModalBody>
                                    {updateMessage != ""
                                        ? updateMessage
                                        : "Are you sure to remove the job? "}
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn
                                        color="secondary"
                                        onClick={closeModalAfterDelete}
                                    >
                                        Close
                                    </MDBBtn>

                                    {updateMessage == "" ? (
                                        <MDBBtn
                                            color="danger"
                                            onClick={() => dispatch(deleteJob({ admin_email: userInfo?.email, job: newJob }))}
                                        >
                                            Delete Job
                                        </MDBBtn>
                                    ) : null}
                                </MDBModalFooter>
                            </>
                        )}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal
                show={basicModalUpdate}
                setShow={setBasicModalUpdate}
                tabIndex="-1"
            >
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>
                                { }
                                Update Job{" "}
                                <i className="fas fa-user-edit text-success"></i>
                            </MDBModalTitle>
                        </MDBModalHeader>

                        {loading ? (
                            <MDBRow className="d-flex justify-content-center align-items-center my-3">
                                <MDBSpinner color="primary">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </MDBSpinner>
                            </MDBRow>
                        ) : (
                            <>
                                <MDBModalBody>
                                    {updateMessage != ""
                                        ? updateMessage
                                        : "Are you sure to update the job? "}
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn
                                        color="secondary"
                                        onClick={closeModalAfterUpdate}
                                    >
                                        Close
                                    </MDBBtn>

                                    {updateMessage == "" ? (
                                        <MDBBtn
                                            color="success"
                                            onClick={() => dispatch(updateJob({ job: newJob, admin_email: userInfo?.email }))}
                                        >
                                            Update Job
                                        </MDBBtn>
                                    ) : null}
                                </MDBModalFooter>
                            </>
                        )}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    );
}

export default JobDetails;