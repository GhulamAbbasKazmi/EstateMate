import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import "./UserProfile.css";

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
} from "mdb-react-ui-kit";

import femaleAvatar from "../../../assets/female-avatar-3.png";
import maleAvatar from "../../../assets/male-avatar-1.png";

import {
  removeUser,
  updateUserDetails,
} from "../../../features/user/userActions";

const UserProfile = ({ setShowUserProfile, user, setUser, darkMode }) => {
  const {
    loading,
    userInfo,
    allUsers,
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
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputElement = useRef();

  const [warningText, setWarningText] = useState("");
  const [warningReplies, setWarningReplies] = useState([]);

  const [basicModal, setBasicModal] = useState(false);
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [editName, setEditName] = useState({
    check: false,
    value: "",
  });
  const [editGender, setEditGender] = useState({
    check: false,
    value: "",
  });
  const [editPassword, setEditPassword] = useState({
    check: false,
    show: false,
    value: "password",
  });
  const [editMobile, setEditMobile] = useState({
    check: false,
    value: "",
  });
  const [editAddress, setEditAddress] = useState({
    check: false,
    value: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToBase64, setImageToBase64] = useState(null);

  const [showDocs, setShowDocs] = useState(false);
  const [userDocuments, setUserDocuments] = useState([]);
  const [filterUserDocuments, setFilterUserDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentsToBase64, setDocumentsToBase64] = useState([]);
  const [userDocumentsSelected, setUserDocumentsSelected] = useState([]);

  const [basicModalUpdateDocs, setBasicModalUpdateDocs] = useState(false);
  const [basicModalRemoveDocs, setBasicModalRemoveDocs] = useState(false);

  const [viewDocs, setViewDocs] = useState([]);

  useEffect(() => {
    const updatedUser = allUsers?.filter((user_) => user_._id == user._id)[0];
    setUser(updatedUser);
  }, [allUsers]);

  useEffect(() => {
    setEditName({ ...editName, value: user?.username });
    setEditMobile({ ...editMobile, value: user?.mobile });
    setEditAddress({ ...editAddress, value: user?.address });
    setEditGender({ ...editGender, value: user?.gender });
    setImageUrl(user?.image?.url);
    setUserDocuments(user?.documents);
    setFilterUserDocuments(user?.documents);
  }, [user]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setImageToBase64(reader.result);
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (update_success) {
      setUpdateMessage("Updated Successfully!");
    }
    if (update_error) {
      setUpdateMessage(update_error);
    }
  }, [update_success, update_error]);

  useEffect(() => {
    if (selectedDocuments.length != 0) {
      if (selectedDocuments[selectedDocuments?.length - 1]) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedDocuments[selectedDocuments?.length - 1]);
        reader.onloadend = () => {
          setDocumentsToBase64([
            ...documentsToBase64,
            {
              name: selectedDocuments[selectedDocuments?.length - 1].name,
              base64: reader.result,
            },
          ]);
        };
      }
    }
  }, [selectedDocuments]);

  const changeImage = () => {
    inputElement.current.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
    setImageToBase64(null);
  };

  const openUpdateModal = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setUpdateMessage("");
  };

  const openDeleteModal = () => {
    setBasicModal(!basicModal);
    setDeleteMessage("");
  };

  const closeModalAfterUpdate = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setEditName({ ...editName, check: false });
    setEditMobile({ ...editMobile, check: false });
    setEditAddress({ ...editAddress, check: false });
    setEditGender({ ...editGender, check: false });
  };

  const closeModalAfterDelete = () => {
    setBasicModal(!basicModal);
    if (delete_success) {
      navigate("/");
    }
  };

  const getDateTime = (date_) => {
    const date = new Date(Date.parse(date_));
    const day = date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const time = [date.getHours(), date.getMinutes()].join(":");

    return { day, time };
  };

  const searchDocs = (e) => {
    if (e.target.value == "") {
      setFilterUserDocuments(userDocuments);
    } else {
      var filterDocs = userDocuments.filter((doc) => {
        const doc_name = doc.public_id
          .substring(doc.public_id.indexOf("/") + 1, doc.public_id.length)
          .toLowerCase();
        if (doc_name.includes(e.target.value.toLowerCase())) {
          return doc;
        }
      });

      setFilterUserDocuments(filterDocs);
    }
  };

  const removeDocumentsBeforeUpload = () => {
    setSelectedDocuments([]);
    setDocumentsToBase64([]);
  };

  return (
    <div className="UserProfile_main">
      <MDBBtn
        color="link"
        rounded
        size="sm"
        onClick={() => {
          setUser(null);
          setShowUserProfile(false);
        }}
      >
        Back to Users
      </MDBBtn>

      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBCard
              className={`mb-4 ${darkMode ? " text-white bg-dark" : ""}`}
            >
              <MDBCardBody className="text-center">
                <MDBBadge
                  color={
                    user?.status == "Active"
                      ? "success"
                      : user?.status == "Warned"
                      ? "warning"
                      : "danger"
                  }
                  pill
                >
                  {user?.status}
                </MDBBadge>
                <MDBCardImage
                  src={
                    imageUrl
                      ? imageUrl
                      : user?.gender == "female"
                      ? femaleAvatar
                      : maleAvatar
                  }
                  alt="avatar"
                  className="rounded-circle profile-image"
                />

                <div className="d-flex justify-content-center mt-4 mb-4">
                  <MDBRow>
                    <MDBCol className="mb-2">
                      <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        ref={inputElement}
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                          e.target.value = null;
                        }}
                      />
                      <MDBBtn
                        className="btn-rounded"
                        style={{
                          backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                        }}
                        onClick={changeImage}
                      >
                        Change
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol>
                      <MDBBtn
                        color="danger"
                        className="btn-rounded"
                        style={{
                          backgroundColor: darkMode ? "#581845" : "",
                        }}
                        onClick={removeImage}
                      >
                        Remove
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCardBody>
            </MDBCard>
            <MDBCard
              className={`mb-4 ${darkMode ? " text-white bg-dark" : ""}`}
            >
              <MDBCardBody>
                <MDBRow className="align-items-center">
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    {!editName.check ? (
                      <MDBCardText className="text-muted">
                        {user?.username}
                      </MDBCardText>
                    ) : (
                      <MDBInput
                        className="mt-1"
                        type="text"
                        id="form2Example1"
                        label="User name"
                        contrast={!darkMode ? false : true}
                        value={editName.value}
                        onChange={(e) =>
                          setEditName({
                            ...editName,
                            value: e.target.value,
                          })
                        }
                      />
                    )}
                  </MDBCol>
                  <MDBCol sm="2">
                    {editName.check ? (
                      <i
                        onClick={() =>
                          setEditName({ ...editName, check: false })
                        }
                        className="fas fa-times profile-icon"
                      ></i>
                    ) : (
                      <i
                        onClick={() =>
                          setEditName({ ...editName, check: true })
                        }
                        className="far fa-edit profile-icon"
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {/* <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Password</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editPassword.check ? (
                                <MDBCardText className="text-muted">
                                  {editPassword.show
                                    ? editPassword.value
                                    : "*********"}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="password"
                                  id="form2Example1"
                                  label="Password"
                                  contrast={!darkMode ? false : true}
                                  value={editPassword.value}
                                  onChange={(e) =>
                                    setEditPassword({
                                      ...editPassword,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>

                            <MDBCol
                              sm="2"
                              className="d-flex justify-content-between"
                            >
                              {editPassword.check ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: false,
                                    })
                                  }
                                  className="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: true,
                                    })
                                  }
                                  className="far fa-edit profile-icon"
                                ></i>
                              )}

                              {editPassword.show ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: false,
                                    })
                                  }
                                  className="far fa-eye-slash profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: true,
                                    })
                                  }
                                  className="far fa-eye profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow> */}
                <MDBRow className="align-items-center">
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="7">
                    {!editGender.check ? (
                      <MDBCardText className="text-muted">
                        {user?.gender}
                      </MDBCardText>
                    ) : (
                      <MDBRow>
                        <MDBCol>
                          <MDBRadio
                            name="GenderRadio"
                            id="GenderRadioMale"
                            label="Male"
                            value="male"
                            defaultChecked={"male" == editGender.value}
                            onChange={(e) =>
                              setEditGender({
                                ...editGender,
                                value: e.target.value,
                              })
                            }
                          />
                        </MDBCol>
                        <MDBCol>
                          {" "}
                          <MDBRadio
                            name="GenderRadio"
                            id="GenderRadioFemale"
                            label="Female"
                            value="female"
                            defaultChecked={"female" == editGender.value}
                            onChange={(e) =>
                              setEditGender({
                                ...editGender,
                                value: e.target.value,
                              })
                            }
                          />
                        </MDBCol>
                        <MDBCol>
                          {" "}
                          <MDBRadio
                            name="GenderRadio"
                            id="GenderRadioOther"
                            label="Other"
                            value="other"
                            defaultChecked={"other" == editGender.value}
                            onChange={(e) =>
                              setEditGender({
                                ...editGender,
                                value: e.target.value,
                              })
                            }
                          />
                        </MDBCol>
                      </MDBRow>
                    )}
                  </MDBCol>
                  <MDBCol sm="2">
                    {editGender.check ? (
                      <i
                        onClick={() =>
                          setEditGender({
                            ...editGender,
                            check: false,
                          })
                        }
                        className="fas fa-times profile-icon"
                      ></i>
                    ) : (
                      <i
                        onClick={() =>
                          setEditGender({
                            ...editGender,
                            check: true,
                          })
                        }
                        className="far fa-edit profile-icon"
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="align-items-center">
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    {!editMobile.check ? (
                      <MDBCardText className="text-muted">
                        {user?.mobile}
                      </MDBCardText>
                    ) : (
                      <MDBInput
                        className="mt-1"
                        type="text"
                        id="form2Example1"
                        label="Mobile"
                        contrast={!darkMode ? false : true}
                        value={editMobile.value}
                        onChange={(e) =>
                          setEditMobile({
                            ...editMobile,
                            value: e.target.value,
                          })
                        }
                      />
                    )}
                  </MDBCol>
                  <MDBCol sm="2">
                    {editMobile.check ? (
                      <i
                        onClick={() =>
                          setEditMobile({
                            ...editMobile,
                            check: false,
                          })
                        }
                        className="fas fa-times profile-icon"
                      ></i>
                    ) : (
                      <i
                        onClick={() =>
                          setEditMobile({
                            ...editMobile,
                            check: true,
                          })
                        }
                        className="far fa-edit profile-icon"
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="align-items-center">
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    {!editAddress.check ? (
                      <MDBCardText className="text-muted">
                        {user?.address}
                      </MDBCardText>
                    ) : (
                      <MDBInput
                        className="mt-1"
                        type="text"
                        id="form2Example1"
                        label="Address"
                        contrast={!darkMode ? false : true}
                        value={editAddress.value}
                        onChange={(e) =>
                          setEditAddress({
                            ...editAddress,
                            value: e.target.value,
                          })
                        }
                      />
                    )}
                  </MDBCol>
                  <MDBCol sm="2">
                    {editAddress.check ? (
                      <i
                        onClick={() =>
                          setEditAddress({
                            ...editAddress,
                            check: false,
                          })
                        }
                        className="fas fa-times profile-icon"
                      ></i>
                    ) : (
                      <i
                        onClick={() =>
                          setEditAddress({
                            ...editAddress,
                            check: true,
                          })
                        }
                        className="far fa-edit profile-icon"
                      ></i>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBCard className={`${darkMode ? " text-white bg-dark" : ""}`}>
          <div className="d-flex justify-content-between align-items-center m-4 profileButtons">
            <MDBCol className="flex-2 mx-1">
              <MDBBtn
                color="success"
                className="mb-2 btn-rounded"
                style={{
                  backgroundColor: darkMode ? "#455B8E" : "",
                  width: "100%",
                }}
                onClick={openUpdateModal}
              >
                Update Profile
              </MDBBtn>
            </MDBCol>

            <MDBCol className="flex-2 mx-1">
              <MDBBtn
                color={user.status == "Blocked" ? "warning" : "danger"}
                className="mb-2 btn-rounded"
                style={{
                  backgroundColor: darkMode ? "#581845" : "",
                  width: "100%",
                }}
                onClick={openDeleteModal}
              >
                {user.status == "Blocked" ? "Unblock" : "Block"} Account
              </MDBBtn>
            </MDBCol>
          </div>
        </MDBCard>

        {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

        {!showDocs ? (
          <>
            {user?.is_verified ? (
              <MDBContainer>
                <MDBCard className={`${darkMode ? " text-white bg-dark" : ""}`}>
                  <div className="d-flex justify-content-around align-items-center m-4 profileButtons">
                    <MDBCol className="flex-2 m-1">
                      <MDBInputGroup className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <MDBInput
                            label="Search"
                            placeholder=""
                            onChange={searchDocs}
                          />
                          <span className="searchIcon d-flex justify-content-center align-items-center">
                            <MDBIcon icon="search" />
                          </span>
                        </div>
                      </MDBInputGroup>
                    </MDBCol>
                    {/* <MDBCol className="flex-1 m-1">
                      <input
                        type="file"
                        id="select-document"
                        style={{ display: "none" }}
                        ref={inputElementUpload}
                        onChange={(e) => {
                          console.log("uploaded file", e.target.files[0]);
                          if (
                            e.target.files[0] &&
                            !selectedDocuments.some((doc) => {
                              if (doc.name == e.target.files[0].name) {
                                setUploadFileSelectedError(
                                  `Sorry! selected document is already added with the same name: ${e.target.files[0].name.substring(
                                    0,
                                    e.target.files[0].name.lastIndexOf(".")
                                  )}!`
                                );
                                return true;
                              }
                              return false;
                            }) &&
                            !userDocuments.some((doc) => {
                              if (
                                doc.public_id.includes(
                                  e.target.files[0].name.substring(
                                    0,
                                    e.target.files[0].name.lastIndexOf(".")
                                  )
                                )
                              ) {
                                setUploadFileSelectedError(
                                  `Sorry! selected document is already uploaded with the same name: ${e.target.files[0].name.substring(
                                    0,
                                    e.target.files[0].name.lastIndexOf(".")
                                  )}!`
                                );
                                return true;
                              }
                              return false;
                            })
                          ) {
                            setSelectedDocuments([
                              ...selectedDocuments,
                              e.target.files[0],
                            ]);
                          }
                          e.target.value = null;
                        }}
                      />
                      <MDBBtn
                        className="btn-rounded d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                          width: "100%",
                        }}
                        onClick={changeDocument}
                      >
                        <i className="fas fa-upload"></i>
                        <span className="upload-btn-text">Upload Document</span>
                      </MDBBtn>
                    </MDBCol> */}
                  </div>
                  {/* {uploadFileSelectedError != "" ? (
                    <div className="text-danger text-center m-2">
                      {uploadFileSelectedError}{" "}
                      <i className="fas fa-exclamation-triangle text-danger"></i>
                    </div>
                  ) : null} */}
                </MDBCard>

                <MDBCard
                  className={`p-4 mt-2 ${
                    darkMode ? " text-white bg-dark" : ""
                  }`}
                >
                  {selectedDocuments.length != 0 ? (
                    <MDBRow className="d-flex justify-content-center">
                      {selectedDocuments.map((doc, index) => {
                        const extension = doc?.name.substring(
                          doc?.name.lastIndexOf(".") + 1
                        );

                        return (
                          <MDBCol
                            key={index}
                            md={3}
                            className="d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box"
                          >
                            <i
                              className={`fas ${
                                extension == "pdf"
                                  ? "fa-file-pdf"
                                  : extension == "xlsx" || extension == "xls"
                                  ? "fa-file-excel"
                                  : extension == "docx" || extension == "doc"
                                  ? "fa-file-word"
                                  : extension == "png" ||
                                    extension == "jpg" ||
                                    extension == "jpeg"
                                  ? "fa-file-image"
                                  : "fa-file-alt"
                              } fa-3x mx-2`}
                            ></i>
                            <span>{doc?.name}</span>
                          </MDBCol>
                        );
                      })}
                    </MDBRow>
                  ) : filterUserDocuments?.length != 0 ? (
                    <MDBRow className="d-flex justify-content-center">
                      {filterUserDocuments?.map((doc, index) => {
                        const extension = doc.url.substring(
                          doc.url.lastIndexOf(".") + 1
                        );
                        return (
                          <MDBCol
                            key={index}
                            md={3}
                            className={`d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box ${
                              userDocumentsSelected.some(
                                (document) => document.url == doc.url
                              )
                                ? "selectedFileBox"
                                : null
                            } `}
                            onClick={() => {
                              if (
                                userDocumentsSelected.some(
                                  (document) => document.url == doc.url
                                )
                              ) {
                                const newSelected =
                                  userDocumentsSelected.filter(
                                    (selectedDoc) => selectedDoc.url != doc.url
                                  );

                                const newSelectedViewDocs = newSelected.map(
                                  (document_) => {
                                    return { uri: document_.url };
                                  }
                                );
                                setViewDocs(newSelectedViewDocs);
                                setUserDocumentsSelected(newSelected);
                              } else {
                                setViewDocs([...viewDocs, { uri: doc.url }]);
                                setUserDocumentsSelected([
                                  ...userDocumentsSelected,
                                  doc,
                                ]);
                              }
                            }}
                          >
                            {userDocumentsSelected.some(
                              (document) => document.url == doc.url
                            ) ? (
                              <span className="d-flex justify-content-center align-items-center selectedFile">
                                <i className="fas fa-check text-success"></i>
                              </span>
                            ) : null}
                            <i
                              className={`fas ${
                                extension == "pdf"
                                  ? "fa-file-pdf"
                                  : extension == "xlsx" || extension == "xls"
                                  ? "fa-file-excel"
                                  : extension == "docx" || extension == "doc"
                                  ? "fa-file-word"
                                  : extension == "png" ||
                                    extension == "jpg" ||
                                    extension == "jpeg"
                                  ? "fa-file-image"
                                  : "fa-file-alt"
                              } fa-3x mx-2`}
                            ></i>
                            <span>
                              {doc.public_id.substring(
                                doc.public_id.lastIndexOf("/") + 1
                              )}
                            </span>
                          </MDBCol>
                        );
                      })}
                    </MDBRow>
                  ) : (
                    <p
                      className={` ${darkMode ? "text-light" : "text-dark"}`}
                      style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                      }}
                    >
                      No Documents Found!
                    </p>
                  )}
                </MDBCard>

                {userDocumentsSelected.length != 0 ||
                documentsToBase64.length != 0 ? (
                  <MDBCard
                    className={`${
                      darkMode ? "mt-2 text-white bg-dark" : "mt-2"
                    }`}
                  >
                    <div className="d-flex justify-content-around align-items-center m-4 profileButtons">
                      <MDBCol className="flex-2 mx-1">
                        <MDBBtn
                          color="success"
                          className="mb-2 btn-rounded"
                          style={{
                            backgroundColor: darkMode ? "#455B8E" : "",
                            width: "100%",
                          }}
                          onClick={() => {
                            if (userDocumentsSelected != 0) {
                              setShowDocs(true);
                            } else {
                              setUpdateMessage("");
                              setBasicModalUpdateDocs(!basicModalUpdateDocs);
                            }
                          }}
                        >
                          {userDocumentsSelected != 0
                            ? "Preview Doc(s)"
                            : "Save Doc(s)"}
                        </MDBBtn>
                      </MDBCol>

                      {/* <MDBCol className="flex-2 mx-1">
                        <MDBBtn
                          color="danger"
                          className="mb-2 btn-rounded"
                          style={{
                            backgroundColor: darkMode ? "#581845" : "",
                            width: "100%",
                          }}
                          onClick={() => {
                            if (documentsToBase64.length != 0) {
                              removeDocumentsBeforeUpload();
                            } else {
                              setBasicModalRemoveDocs(!basicModalRemoveDocs);
                              setDeleteMessage("");
                            }
                          }}
                        >
                          Remove Doc(s)
                        </MDBBtn>
                      </MDBCol> */}
                    </div>
                  </MDBCard>
                ) : null}
              </MDBContainer>
            ) : (
              <MDBContainer>
                <MDBCard
                  className={`p-4 ${darkMode ? " text-white bg-dark" : ""}`}
                >
                  <MDBCardBody className="d-flex justify-content-center align-items-center flex-column">
                    <MDBCardTitle className="d-flex align-items-center">
                      <MDBIcon
                        fas
                        icon="user-circle"
                        size="2x"
                        className="mx-3"
                      />{" "}
                      Verify Your Account
                    </MDBCardTitle>

                    <MDBCardText className="text-center my-3">
                      {`Dear ${userInfo.username}, To upload your Docs, please verify your account first.
                          We'll send you a verification link to your email address to verify your account!`}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
            )}
          </>
        ) : (
          <>
            <MDBBtn
              color="link"
              rounded
              size="sm"
              onClick={() => setShowDocs(false)}
              className="mt-3"
              style={{ border: "1px solid #A060FF" }}
            >
              Back to Docs
            </MDBBtn>
            <MDBContainer>
              <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={viewDocs}
                config={{
                  header: {
                    disableHeader: false,
                    disableFileName: false,
                    retainURLParams: false,
                  },
                }}
                style={{ height: 500 }}
              />
            </MDBContainer>
          </>
        )}

        <div className="warningInfoContainer">
          <div className="commentsHeading">Warnings</div>
          {userInfo?.user_type == "admin" && (
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
                          email: user.email,
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
          )}

          {user?.warnings?.map((warningObj, index) => (
            <div className="warningText" key={index}>
              <div className="warningTextContainer">
                <div className="commentText">{warningObj?.warning}</div>

                {loading ? (
                  <div className="my-3">
                    <MDBSpinner color="primary">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>{" "}
                  </div>
                ) : (
                  userInfo?.user_type == "admin" && (
                    <MDBIcon
                      onClick={() =>
                        dispatch(
                          updateUserDetails({
                            email: user.email,
                            delete_warning_id: warningObj._id,
                            admin_email: userInfo?.email,
                          })
                        )
                      }
                      className="delIconComment"
                      fas
                      icon="trash"
                    />
                  )
                )}
              </div>
              <div className="blogInfoTopRow">
                <div className="blogUser">
                  <MDBCardImage
                    src={
                      warningObj?.user?.image?.url
                        ? warningObj?.user?.image?.url
                        : warningObj?.user?.gender == "female"
                        ? femaleAvatar
                        : maleAvatar
                    }
                    alt="avatar"
                    className="rounded-circle m-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  {warningObj?.user?.username}
                </div>
                <div className="blogDate">
                  {getDateTime(warningObj?.createdAt).time +
                    "  " +
                    getDateTime(warningObj?.createdAt).day}
                </div>
              </div>

              <div className="warningReplyContainer">
                {userInfo?.user_type == "admin" && (
                  <div className="replyWrite">
                    <div className="replyInput">
                      <textarea
                        className="replyTextArea"
                        value={warningReplies[index]?.reply}
                        onChange={(e) => {
                          warningReplies.splice(index, 1, {
                            reply: e.target.value,
                            index,
                          });
                          setWarningReplies([...warningReplies]);
                        }}
                        placeholder={"Reply Text"}
                      />
                    </div>
                    <div className="postReply">
                      {loading ? (
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>{" "}
                        </div>
                      ) : (
                        <MDBBtn
                          className="replyBtn"
                          color="primary"
                          onClick={() =>
                            warningReplies[index].reply != "" &&
                            dispatch(
                              updateUserDetails({
                                email: user?.email,
                                admin_email: userInfo?.email,
                                warning_id: warningObj?._id,
                                reply: warningReplies[index].reply,
                              })
                            )
                          }
                        >
                          Post Reply <MDBIcon fas icon="pencil-alt" />
                        </MDBBtn>
                      )}
                    </div>
                  </div>
                )}

                {warningObj?.replies?.map((replyObj, index) => (
                  <>
                    <div className="warningReplyTextContainer" key={index}>
                      <div className="commentText">{replyObj?.reply}</div>
                      {loading ? (
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>{" "}
                        </div>
                      ) : (
                        <MDBIcon
                          onClick={() =>
                            dispatch(
                              updateUserDetails({
                                email: user?.email,
                                warning_id: warningObj?._id,
                                delete_reply_id: replyObj?._id,
                                admin_email: userInfo?.email,
                              })
                            )
                          }
                          className="delIconComment"
                          fas
                          icon="trash"
                        />
                      )}
                    </div>
                    <div className="blogInfoTopRow">
                      <div className="blogUser">
                        <MDBCardImage
                          src={
                            replyObj?.user?.image?.url
                              ? replyObj?.user?.image?.url
                              : replyObj?.user?.gender == "female"
                              ? femaleAvatar
                              : maleAvatar
                          }
                          alt="avatar"
                          className="rounded-circle m-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        {replyObj?.user?.username}
                      </div>
                      <div className="blogDate">
                        {getDateTime(replyObj?.createdAt).time +
                          "  " +
                          getDateTime(replyObj?.createdAt).day}
                      </div>
                    </div>
                    <div className="attendanceInfoTopRow">
                      <div className="attendanceUser">
                        <MDBCardImage
                          src={
                            replyObj?.user?.image?.url
                              ? replyObj?.user?.image?.url
                              : replyObj?.user?.gender == "female"
                              ? femaleAvatar
                              : maleAvatar
                          }
                          alt="avatar"
                          className="rounded-circle m-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        {replyObj?.user?.username}
                      </div>
                      <div className="attendanceDate">
                        {getDateTime(replyObj?.createdAt).time +
                          "  " +
                          getDateTime(replyObj?.createdAt).day}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
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
                          user.status == "Blocked" ? "Unblock " : "Block "
                        } your account? `}
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={closeModalAfterDelete}>
                      Close
                    </MDBBtn>

                    {deleteMessage == "" ? (
                      <MDBBtn
                        color={user.status == "Blocked" ? "warning" : "danger"}
                        onClick={() =>
                          dispatch(
                            updateUserDetails({
                              email: user.email,
                              block: user.status == "Blocked" ? false : true,
                              admin_email: userInfo?.email,
                            })
                          )
                        }
                      >
                        {user.status == "Blocked" ? "Unblock " : "Block "}{" "}
                        Account
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
                  {}
                  Update Profile{" "}
                  <i className="fas fa-user-edit text-success"></i>
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
                    {updateMessage != ""
                      ? updateMessage
                      : "Are you sure to update your profile? "}
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={closeModalAfterUpdate}>
                      Close
                    </MDBBtn>

                    {updateMessage == "" ? (
                      <MDBBtn
                        color="success"
                        onClick={() =>
                          dispatch(
                            updateUserDetails({
                              email: user.email,
                              username: editName.value,
                              mobile: editMobile.value,
                              address: editAddress.value,
                              gender: editGender.value,
                              image: imageToBase64,
                              previous_image_id: user?.image?.public_id,
                              imageUrl,
                              admin_email: userInfo?.email,
                            })
                          )
                        }
                      >
                        Update Profile
                      </MDBBtn>
                    ) : null}
                  </MDBModalFooter>
                </>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>
    </div>
  );
};

export default UserProfile;
