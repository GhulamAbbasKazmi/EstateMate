import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import './PlaceDetails.css'

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


import placeImage from "../../assets/mt.png";

import { getPlace, postPlace, updatePlace, deletePlace } from "../../features/place/placeActions";

const PlaceDetails = ({ showPlaceDetails, setShowPlaceDetails, darkMode }) => {

    const dispatch = useDispatch();

    const {
        userInfo
    } = useSelector((state) => state.user);

    const {
        loading,
        places,
        place,
        error,
        success,
    } = useSelector((state) => state.place);
    


    const inputElementPlaceImage = useRef();

    const [newPlace, setNewPlace] = useState({
        title: "",
        image: { imageToBase64: null, url: null },
        price: null,
        description: ""
    });

    const [placeError, setPlaceError] = useState('')


    const [selectedImagePlace, setSelectedImagePlace] = useState(null);

    const [basicModal, setBasicModal] = useState(false);
    const [basicModalUpdate, setBasicModalUpdate] = useState(false);

    const [updateMessage, setUpdateMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {

        if (showPlaceDetails._id) {
            dispatch(getPlace({ id: showPlaceDetails._id }))
        }
        
    }, []);

    useEffect(() => {
        if (showPlaceDetails._id) {
            setNewPlace(place)
        }
    }, [place]);


    useEffect(() => {
        if (selectedImagePlace) {

            const reader = new FileReader();
            reader.readAsDataURL(selectedImagePlace);
            reader.onloadend = () => {
                setNewPlace({ ...newPlace, image: { ...newPlace.image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImagePlace) } })
            };
        }
    }, [selectedImagePlace]);

    useEffect(() => {
        if (success == 'Place has been posted successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Place has been updated successfully!') {
            setUpdateMessage(success);
        }
        if (success == 'Place has been delete successfully!') {
            setUpdateMessage(success);
        }
        if (error) {
            setUpdateMessage(error);
        }
    }, [success, error]);



    const changePlaceImage = () => {
        inputElementPlaceImage.current.click();
    };

    const removePlaceImage = () => {
        setSelectedImagePlace(null);
        setNewPlace({ ...newPlace, image: { ...newPlace.image, imageToBase64: null, url: null } })
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
        setShowPlaceDetails(null)
    };

    const submitNewPlace = () => {

        console.log('submitting')

        if (newPlace.title == "") {
            setPlaceError('Place title is empty!')
        }
        // else if (newPlace.image.url == null) {
        //     setPlaceError('Place Image is not selected!')
        // }

        else if (newPlace.price == null) {
            setPlaceError('Place price is empty!')
        }

        else if (newPlace.description == "") {
            setPlaceError('Place description is empty!')
        }
        else {
            setPlaceError(null)
            dispatch(postPlace({ admin_email: userInfo?.email, place: newPlace }))
        }
    }

    return (
        <div
            className="ComplaintDetails_main"
        >
            <MDBBtn color='link' rounded size='sm' onClick={() => setShowPlaceDetails(null)}>Back to Places</MDBBtn>

            <div className="complaint_content my-3">
                <div className="commentsHeading">Place Details</div>

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
                                value={newPlace?.title}
                                onChange={(e) => {
                                    setNewPlace({ ...newPlace, title: e.target.value })
                                    setPlaceError('')
                                }}
                                placeholder={"Place Title"}
                            />
                            :
                            <div className="headingContentInput">
                                {newPlace?.title}
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
                            value={newPlace?.price}
                            type="number"
                            onChange={(e) => {
                                setNewPlace({ ...newPlace, price: e.target.value })
                                setPlaceError('')
                            }}
                            placeholder={"Place Price $"}
                        /> :
                        <MDBBadge color={'success'} pill>
                            {newPlace?.price}
                        </MDBBadge>
                    }

                    <div style={{
                        color: "wheat",
                        marginTop: "10px"
                    }}>
                        Details
                    </div>

                    <div className={"content_"}>

                        {newPlace?.image?.url != null && userInfo?.user_type == 'admin' ?

                            <div className="contentImageContainer_Image" style={{
                                backgroundImage: `url(${newPlace?.image?.url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                                <div className="topRowSectionImage">
                                    <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={changePlaceImage} />
                                    <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={removePlaceImage} />
                                </div>

                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    ref={inputElementPlaceImage}
                                    onChange={(e) => {
                                        setSelectedImagePlace(e.target.files[0]);
                                        e.target.value = null;
                                    }}
                                />
                            </div>

                            : userInfo?.user_type == 'admin' ?
                                <div className="contentImageContainer" onClick={changePlaceImage}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="select-image"
                                        style={{ display: "none" }}
                                        ref={inputElementPlaceImage}
                                        onChange={(e) => {
                                            setSelectedImagePlace(e.target.files[0]);
                                            e.target.value = null;
                                        }}
                                        className="secInput"
                                    />
                                    + Add Place Image
                                </div>

                                :
                                <div className="contentImageContainer_Image" style={{
                                    backgroundImage: `url(${newPlace?.image?.url
                                        ? newPlace?.image?.url
                                        : placeImage})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}>
                                </div>
                        }

                        {userInfo?.user_type == 'admin' ?
                            <textarea className="contentTextArea"
                                value={newPlace?.description}
                                onChange={(e) => {
                                    setNewPlace({ ...newPlace, description: e.target.value })
                                    setPlaceError('')
                                }}
                                placeholder={"Place Description"}
                            /> :
                            <div className="contentTextArea">
                                {newPlace?.description}
                            </div>
                        }

                    </div>
                    <hr />
                    {userInfo?.user_type == 'admin' && (showPlaceDetails._id != null) &&  
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
                                                    Update Place
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
                                                    Delete Place
                                                </MDBBtn>
                                            </MDBCol>
                                        </div>
                                    </MDBCard>

                            }

                        </>

                    }

                    {(error || placeError) && (
                        <div className="text-danger text-center mb-2">
                            {error || placeError}{" "}
                            <i className="fas fa-exclamation-triangle text-danger"></i>
                        </div>)
                    }

                    {(success && placeError == null) && (
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
                                </MDBSpinner> </div> : userInfo?.user_type == 'admin' && showPlaceDetails._id == null &&
                            <MDBBtn
                                className="btn-rounded heroSecBtn-2"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "4px"

                                }}
                                onClick={submitNewPlace}
                            >
                                Post Place
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
                                Delete Place{" "}
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
                                        : "Are you sure to remove the place? "}
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
                                            onClick={() => dispatch(deletePlace({ admin_email: userInfo?.email, place: newPlace }))}
                                        >
                                            Delete Place
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
                                Update Place{" "}
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
                                        : "Are you sure to update the place? "}
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
                                            onClick={() => dispatch(updatePlace({ place: newPlace, admin_email: userInfo?.email }))}
                                        >
                                            Update Place
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

export default PlaceDetails;