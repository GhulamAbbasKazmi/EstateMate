import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReportDetails.css";

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
  MDBRipple,
} from "mdb-react-ui-kit";

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";

import {
  getUserDetails,
  updateUserDetails,
} from "../../features/user/userActions";

const ReportDetails = ({
  showComplaintDetails,
  setShowComplaintDetails,
  darkMode,
}) => {
  const navigate = useNavigate();

  const {
    loading,
    userInfo,
    update_error,
    delete_error,
    update_success,
    delete_success,
    verify_link_error,
    verify_link_success,
    verify_error,
    verify_success,
    docs_remove_error,
    docs_remove_success,
    allUsers,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const inputElementDocument = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [warningText, setWarningText] = useState("");

  const [basicModal, setBasicModal] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState("");

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [submitResponse, setSubmitResponse] = useState(null);

  useEffect(() => {
    const updatedUser = allUsers?.filter(
      (user_) => user_._id == showComplaintDetails.from._id
    )[0];
    const updatedComplaint = updatedUser.complaints.filter(
      (complaint_) => complaint_._id == showComplaintDetails._id
    )[0];
    setShowComplaintDetails(updatedComplaint);
    dispatch(getUserDetails());
  }, [allUsers]);

  const openDeleteModal = () => {
    setBasicModal(!basicModal);
    setDeleteMessage("");
  };

  const closeModalAfterDelete = () => {
    setBasicModal(!basicModal);
    if (delete_success) {
      navigate("/");
    }
  };

  const downloadFile = (doc) => {
    console.log("downloading...", doc?.fileName);
    axios({
      url: `api/users/docs/download/${doc?.fileName}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        // Create a download link for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc?.documentName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const deleteFile = async (id) => {
    console.log("deleting...", id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/docs`,

        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ id }),
        }
      );
      setSubmitResponse(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        // Handle response errors
        console.log("Response error:", error.response.data);
        setSubmitResponse(error.response.data);
        throw new Error("Authentication failed.");
      } else {
        throw new Error("Network error. Please try again later.");
      }
    }
  };

  console.log("showComplaintDetails", showComplaintDetails);

  const changeDocument = () => {
    inputElementDocument.current.click();
  };

  const removeDocument = () => {
    setSelectedDocument(null);
  };

  const uploadDocument = async () => {
    const file = selectedDocument;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(`/api/users/docs`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setSubmitResponse(response.data);
          setSelectedDocument(null);
          return response.data;
        } catch (error) {
          console.error("Error:", error.message);
          if (error.response) {
            // Handle response errors
            console.log("Response error:", error.response.data);
            setSubmitResponse(error.response.data);
            throw new Error("Authentication failed.");
          } else {
            throw new Error("Network error. Please try again later.");
          }
        }
      }
    } catch (error) {
      setSubmitResponse(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (submitResponse) {
      if (submitResponse.message == "Document uploaded") {
        dispatch(
          updateUserDetails({
            email: showComplaintDetails?.from?.email,
            complaintId: showComplaintDetails._id,
            adminDoc: submitResponse.document,
            admin_email: userInfo?.email,
          })
        );
        setSubmitResponse(null);
      } else if (submitResponse.message == "Document deleted") {
        dispatch(
          updateUserDetails({
            email: showComplaintDetails?.from?.email,
            complaintId: showComplaintDetails._id,
            delete_adminDoc: submitResponse.documentId,
            admin_email: userInfo?.email,
          })
        );
        setSubmitResponse(null);
      }
    }
  }, [submitResponse]);

  console.log("selectedDocument", selectedDocument);

  return (
    <div className="ComplaintDetails_main">
      <MDBBtn
        color="link"
        rounded
        size="sm"
        onClick={() => setShowComplaintDetails(null)}
      >
        Back to Reports
      </MDBBtn>

      <div className="complaint_content my-3">
        <div className="commentsHeading">Report Details</div>
        <div
          style={{
            color: "wheat",
            marginTop: "10px",
          }}
        >
          Status
        </div>
        <MDBBadge
          color={
            showComplaintDetails?.status == "Approved"
              ? "success"
              : showComplaintDetails?.status == "Not Approved" && "warning"
          }
          pill
        >
          {showComplaintDetails?.status}
        </MDBBadge>

        <div className="contentSection">
          <div className="secTopRow">
            <div className="headingContentInput">
              {showComplaintDetails?.title}
            </div>
          </div>

          <div
            style={{
              color: "wheat",
              marginTop: "10px",
            }}
          >
            From
          </div>
          <div className="">
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                src={
                  showComplaintDetails?.from?.image?.url
                    ? showComplaintDetails?.from?.image?.url
                    : showComplaintDetails?.from?.gender == "female"
                    ? femaleAvatar
                    : maleAvatar
                }
                alt="avatar"
                className="rounded-circle my-3"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                fluid
              />
              <div className="ms-3 overflow-auto">
                <p className="fw-bold mb-1">
                  {showComplaintDetails?.from?.user_type}
                </p>
                <p className="fw-bold mb-1">
                  {showComplaintDetails?.from?.username}
                </p>
                <p className="mb-0">{showComplaintDetails?.from?.email}</p>
              </div>
            </MDBRipple>
          </div>

          <div
            style={{
              color: "wheat",
              marginTop: "10px",
            }}
          >
            Details
          </div>

          <div className={"content_"}>
            <div className="contentImagesContainer">
              {showComplaintDetails?.clientPhoto?.url != null && (
                <>
                  <div>Client Photo</div>
                  <img
                    className="contentImageContainer_Image"
                    src={showComplaintDetails?.clientPhoto?.url}
                  />
                </>
              )}

              {showComplaintDetails?.clientIdFront?.url != null && (
                <>
                  <div>Client ID Front</div>
                  <img
                    className="contentImageContainer_Image"
                    src={showComplaintDetails?.clientIdFront?.url}
                  />
                </>
              )}

              {showComplaintDetails?.clientIdBack?.url != null && (
                <>
                  <div>Client ID Back</div>
                  <img
                    className="contentImageContainer_Image"
                    src={showComplaintDetails?.clientIdBack?.url}
                  />
                </>
              )}

              {showComplaintDetails?.nextOfKinIdFront?.url != null && (
                <>
                  <div>Next of Kin ID Front</div>
                  <img
                    className="contentImageContainer_Image"
                    src={showComplaintDetails?.nextOfKinIdFront?.url}
                  />
                </>
              )}

              {showComplaintDetails?.nextOfKinIdBack?.url != null && (
                <>
                  <div>Next of Kin ID Back</div>
                  <img
                    className="contentImageContainer_Image"
                    src={showComplaintDetails?.nextOfKinIdBack?.url}
                  />
                </>
              )}
            </div>

            <div className="contentImagesContainer">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>Client Name</div>
                <div className="">{showComplaintDetails?.clientName}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>Client Contact No.</div>
                <div>{showComplaintDetails?.clientContactNumber}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>Client Email</div>
                <div>{showComplaintDetails?.clientEmail}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>Relation</div>
                <div>{showComplaintDetails?.relation}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>Deal</div>
                <div>{showComplaintDetails?.deal}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "15px" }}>PaymentReceived</div>
                <div>{showComplaintDetails?.paymentReceived}</div>
              </div>
            </div>

            {/* <img className="contentImage" src={content_?.img} /> */}
            <div className="contentTextArea">{showComplaintDetails?.text}</div>
          </div>
          <hr />

          {userInfo?.user_type == "admin" && (
            <>
              <div className="commentsHeading">Send document to User</div>

              {showComplaintDetails?.adminDocs?.length > 0 &&
                showComplaintDetails?.adminDocs.map((document) => {
                  let docLink = `http://localhost:5000/api/users/docs/${document?.fileName}`;
                  return (
                    <div>
                      <div
                        className={"itemContainerReq"}
                        key={document._id}
                        onClick={() => {
                          if (
                            document.fileMimetype.startsWith("image") ||
                            document.fileMimetype === "application/pdf" ||
                            document.fileMimetype === "text/plain"
                          ) {
                            window.open(docLink, "_blank");
                          } else {
                            return downloadFile(document);
                          }
                        }}
                      >
                        <div>
                          <img
                            className={"docImage"}
                            src={
                              document.fileMimetype === "image/jpeg" ||
                              document.fileMimetype === "image/jpg" ||
                              document.fileMimetype === "image/png" ||
                              document.fileMimetype === "image/bmp" ||
                              document.fileMimetype === "image/gif" ||
                              document.fileMimetype === "image/svg+xml"
                                ? docLink
                                : document.fileMimetype === "application/pdf"
                                ? "/icons/pdfFile.svg"
                                : document.fileMimetype ===
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                  document.fileMimetype ===
                                    "application/msword" ||
                                  document.fileMimetype === "text/plain"
                                ? "/icons/wordFile.svg"
                                : document.fileMimetype ===
                                    "application/vnd.ms-excel" ||
                                  document.fileMimetype ===
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                ? "/icons/excelFile.svg"
                                : null
                            }
                            alt="document icon"
                          />
                        </div>
                        <div className={"docContent"}>
                          {document.documentName}
                        </div>
                        <div
                          className={"downloadIconContainer"}
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(document);
                          }}
                        >
                          <img
                            src="/icons/download.svg"
                            alt="download icon"
                            className={"downloadIcon"}
                          />
                        </div>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(document._id);
                          }}
                        >
                          <i class="fas fa-trash"></i>
                        </div>
                      </div>
                      <div className={"divider"} />
                    </div>
                  );
                })}

              <div
                className="contentImageContainer_Image"
                style={{
                  backgroundImage:
                    selectedDocument != null &&
                    `url(${
                      selectedDocument.type === "image/jpeg" ||
                      selectedDocument.type === "image/jpg" ||
                      selectedDocument.type === "image/png" ||
                      selectedDocument.type === "image/bmp" ||
                      selectedDocument.type === "image/gif" ||
                      selectedDocument.type === "image/svg+xml"
                        ? URL.createObjectURL(selectedDocument)
                        : selectedDocument.type === "application/pdf"
                        ? "/icons/pdfFile.svg"
                        : selectedDocument.type ===
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                          selectedDocument.type === "application/msword" ||
                          selectedDocument.type === "text/plain"
                        ? "/icons/wordFile.svg"
                        : selectedDocument.type ===
                            "application/vnd.ms-excel" ||
                          selectedDocument.type ===
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        ? "/icons/excelFile.svg"
                        : null
                    })`,

                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="topRowSectionImage">
                  <MDBIcon
                    fas
                    icon="add"
                    className="editIconFeatureImage"
                    onClick={changeDocument}
                  />
                  {selectedDocument != null && (
                    <MDBIcon
                      fas
                      icon="trash"
                      className="delIconFeatureImage"
                      onClick={removeDocument}
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  ref={inputElementDocument}
                  onChange={(e) => {
                    setSelectedDocument(e.target.files[0]);
                    e.target.value = null;
                  }}
                />
              </div>

              {selectedDocument != null && (
                <MDBBtn
                  className="me-1"
                  color="primary"
                  onClick={uploadDocument}
                >
                  Upload Document <i className="fas fa-upload"></i>
                </MDBBtn>
              )}
            </>
          )}

          {userInfo?.user_type != "admin" && (
            <>
              <div className="commentsHeading">Admin documents</div>

              {showComplaintDetails?.adminDocs?.length > 0 &&
                showComplaintDetails?.adminDocs.map((document) => {
                  let docLink = `http://localhost:5000/api/users/docs/${document?.fileName}`;
                  return (
                    <div>
                      <div
                        className={"itemContainerReq"}
                        key={document._id}
                        onClick={() => {
                          if (
                            document.fileMimetype.startsWith("image") ||
                            document.fileMimetype === "application/pdf" ||
                            document.fileMimetype === "text/plain"
                          ) {
                            window.open(docLink, "_blank");
                          } else {
                            return downloadFile(document);
                          }
                        }}
                      >
                        <div>
                          <img
                            className={"docImage"}
                            src={
                              document.fileMimetype === "image/jpeg" ||
                              document.fileMimetype === "image/jpg" ||
                              document.fileMimetype === "image/png" ||
                              document.fileMimetype === "image/bmp" ||
                              document.fileMimetype === "image/gif" ||
                              document.fileMimetype === "image/svg+xml"
                                ? docLink
                                : document.fileMimetype === "application/pdf"
                                ? "/icons/pdfFile.svg"
                                : document.fileMimetype ===
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                  document.fileMimetype ===
                                    "application/msword" ||
                                  document.fileMimetype === "text/plain"
                                ? "/icons/wordFile.svg"
                                : document.fileMimetype ===
                                    "application/vnd.ms-excel" ||
                                  document.fileMimetype ===
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                ? "/icons/excelFile.svg"
                                : null
                            }
                            alt="document icon"
                          />
                        </div>
                        <div className={"docContent"}>
                          {document.documentName}
                        </div>
                        <div
                          className={"downloadIconContainer"}
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(document);
                          }}
                        >
                          <img
                            src="/icons/download.svg"
                            alt="download icon"
                            className={"downloadIcon"}
                          />
                        </div>

                        {userInfo?.user_type == "admin" && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFile(document._id);
                            }}
                          >
                            <i class="fas fa-trash"></i>
                          </div>
                        )}
                      </div>
                      <div className={"divider"} />
                    </div>
                  );
                })}
            </>
          )}

          <hr />

          {userInfo?.user_type == "admin" && (
            <>
              <div className="commentsHeading">Send warning to</div>
              <div
                style={{
                  color: "wheat",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
              >
                {showComplaintDetails?.from?.email}
              </div>
              <div className="warningTextWrite">
                <div className="commentInput">
                  <textarea
                    className="contentTextArea"
                    value={warningText}
                    onChange={(e) => setWarningText(e.target.value)}
                    placeholder={"Warning Text"}
                  />
                </div>
                <div className="postComment">
                  {loading ? (
                    <div className="my-3">
                      <MDBSpinner color="primary">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>{" "}
                    </div>
                  ) : (
                    <MDBBtn
                      className="me-1"
                      color="primary"
                      onClick={() =>
                        warningText != "" &&
                        dispatch(
                          updateUserDetails({
                            email: showComplaintDetails?.from?.email,
                            warning: warningText,
                            admin_email: userInfo?.email,
                          })
                        )
                      }
                    >
                      Post Warning <MDBIcon fas icon="pencil-alt" />
                    </MDBBtn>
                  )}
                </div>
              </div>
              {loading ? (
                <div className="my-3">
                  <MDBSpinner color="primary">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>{" "}
                </div>
              ) : (
                <MDBCard
                  className={`my-3 ${darkMode ? " text-white bg-dark" : ""}`}
                >
                  <div className="d-flex justify-content-between align-items-center m-4 profileButtons">
                    <MDBCol className="flex-2 mx-1">
                      <MDBBtn
                        color={
                          showComplaintDetails?.status == "Not Approved"
                            ? "success"
                            : "warning"
                        }
                        className="mb-2 btn-rounded"
                        style={{
                          backgroundColor: darkMode ? "#455B8E" : "",
                          width: "100%",
                        }}
                        onClick={() =>
                          dispatch(
                            updateUserDetails({
                              email: showComplaintDetails?.from?.email,
                              complaintId: showComplaintDetails._id,
                              complaintStatus:
                                showComplaintDetails?.status == "Not Approved"
                                  ? true
                                  : false,
                              admin_email: userInfo?.email,
                            })
                          )
                        }
                      >
                        Mark as{" "}
                        {showComplaintDetails?.status == "Approved"
                          ? "Not Approved"
                          : "Approved"}
                      </MDBBtn>
                    </MDBCol>

                    <MDBCol className="flex-2 mx-1">
                      <MDBBtn
                        color={
                          showComplaintDetails?.to?.status == "Blocked"
                            ? "warning"
                            : "danger"
                        }
                        className="mb-2 btn-rounded"
                        style={{
                          backgroundColor: darkMode ? "#581845" : "",
                          width: "100%",
                        }}
                        onClick={openDeleteModal}
                      >
                        {showComplaintDetails?.to?.status == "Blocked"
                          ? "Unblock"
                          : "Block"}{" "}
                        Account
                      </MDBBtn>
                    </MDBCol>
                  </div>
                </MDBCard>
              )}
            </>
          )}
        </div>
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {}
                Account Setting{" "}
                <i className="fas fa-exclamation-triangle text-danger"></i>
              </MDBModalTitle>
            </MDBModalHeader>
            {loading ? (
              <MDBRow className="d-flex justify-content-center align-items-center my-3">
                <MDBSpinner color="primary">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              </MDBRow>
            ) : (
              <>
                <MDBModalBody>
                  {deleteMessage != ""
                    ? deleteMessage
                    : `Are you sure to ${
                        showComplaintDetails?.to?.status == "Blocked"
                          ? "Unblock "
                          : "Block "
                      } your account? `}
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={closeModalAfterDelete}>
                    Close
                  </MDBBtn>

                  {deleteMessage == "" ? (
                    <MDBBtn
                      color={
                        showComplaintDetails?.to?.status == "Blocked"
                          ? "warning"
                          : "danger"
                      }
                      onClick={() =>
                        dispatch(
                          updateUserDetails({
                            email: showComplaintDetails?.to?.email,
                            block:
                              showComplaintDetails?.to?.status == "Blocked"
                                ? false
                                : true,
                            admin_email: userInfo?.email,
                          })
                        )
                      }
                    >
                      {showComplaintDetails?.to?.status == "Blocked"
                        ? "Unblock "
                        : "Block "}{" "}
                      Account
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
};

export default ReportDetails;
