import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";
import "./AttendancePost.css";
import { MDBBtn, MDBCardTitle, MDBCardText, MDBCardImage, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { attendances } from "../../utils/attendancesData";
import useDynamicRefs from 'use-dynamic-refs';

import femaleAvatar from "../../assets/female-avatar-3.png";
import maleAvatar from "../../assets/male-avatar-1.png";

import {
  getAttendances, postAttendance, updateAttendance, updateAttendanceByUser
} from "../../features/attendance/attendanceActions";

const AttendancePost = () => {
  const { id } = useParams();
  const location = useLocation();
  const { width, height } = useWindowSize();

  const inputElement = useRef();

  const [getRef, setRef] = useDynamicRefs();

  const {
    loading,
    userInfo,
  } = useSelector((state) => state.user);

  const {
    loading: loadingAttendance,
    attendances,
    success: successAttendance,
    error: errorAttendance
  } = useSelector((state) => state.attendance);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attendanceObj = attendances?.filter((attendance_) => attendance_._id == id)[0]

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSection, setSelectedImageSection] = useState(null);
  const [attendanceTitleError, setAttendanceTitleError] = useState("");
  const [attendanceComment, setAttendanceComment] = useState("");
  const [attendanceReplies, setAttendanceReplies] = useState([]);
  var deletedSecImages = [];

  const [newAttendance, setNewAttendance] = useState({

    title: "",
    content: [{ heading: "", img: { imageToBase64: null, url: null }, text: "" }],
    feature_image: { imageToBase64: null, url: null },
    // likes: { count: 0, users: [{}] },
    // comments: [{ comment: "", user: {}, replies: [{ reply: "", user: {} }] },]
  });


  useEffect(() => {
    if (attendanceObj) {

      var content_ = []

      for (const contentSection of attendanceObj.attendance.content) {

        var newContentSec = {
          ...contentSection,
          heading: contentSection.heading,
          img: {
            ...contentSection.img,
            // imageToBase64: null,
          },
          text: contentSection.text
        }
        content_.push(newContentSec)
      }

      setNewAttendance({
        ...attendanceObj.attendance,
        title: attendanceObj.attendance.title,
        content: content_,
        feature_image: {
          ...attendanceObj.attendance.feature_image,
          // imageToBase64: null 
        }
      })

      var replies_ = []

      attendanceObj?.attendance?.comments?.map((commentObj, index) => {
        var newReply = { reply: "", index }
        replies_.push(newReply)
      })

      setAttendanceReplies(replies_)
    }

  }, [attendanceObj]);


  useEffect(() => {

    if (JSON.stringify(attendanceObj?.attendance) == JSON.stringify(newAttendance)) {
      addNewSectionHandler()
    }

  }, [newAttendance]);


  useEffect(() => {
    if (selectedImage) {

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setNewAttendance({ ...newAttendance, feature_image: { ...newAttendance.feature_image, imageToBase64: reader.result, url: URL.createObjectURL(selectedImage) } })
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImageSection) {

      const reader = new FileReader();
      reader.readAsDataURL(selectedImageSection.file);
      reader.onloadend = () => {

        newAttendance.content.splice(selectedImageSection.index, 1, { heading: newAttendance.content[selectedImageSection.index].heading, img: { ...newAttendance.content[selectedImageSection.index].img, imageToBase64: reader.result, url: URL.createObjectURL(selectedImageSection.file) }, text: newAttendance.content[selectedImageSection.index].text })
        setNewAttendance({ ...newAttendance, content: newAttendance.content })

      };
    }
  }, [selectedImageSection]);


  useEffect(() => {
    if (newAttendance?.title == "") {
      setAttendanceTitleError("");
    } else if (newAttendance?.title?.length < 8) {
      setAttendanceTitleError("Attendance & Progress title should be atleast of 8 characters");
    } else {
      setAttendanceTitleError("");
    }
  }, [newAttendance?.title]);


  const handleSubmitPostAttendance = (e) => {
    e.preventDefault();

    if (newAttendance.title == "") {
      setAttendanceTitleError("Attendance & Progress title is empty");
    }
    if (
      attendanceTitleError == "" &&
      newAttendance.title != ""
    ) {

      if (id) {
        dispatch(
          updateAttendance({
            email: userInfo.email,
            attendance: newAttendance,
            id,
            deletedSecImages
          })
        );
      }
      else {

        dispatch(
          postAttendance({
            email: userInfo.email,
            attendance: newAttendance
          })
        );
      }
      console.log("attendance Create!");
    } else {
      console.log("Error!");
    }
  }

  const changeFeatureImage = () => {
    inputElement.current.click();
  };

  const changeSectionImage = (index) => {

    getRef(`${index}`).current.click();
  }

  const removeFeatureImage = () => {
    setSelectedImage(null);
    setNewAttendance({ ...newAttendance, feature_image: { ...newAttendance.feature_image, imageToBase64: null, url: null } })
  };

  const removeSectionImage = (index) => {
    setSelectedImageSection(null)
    newAttendance.content.splice(index, 1, { heading: newAttendance.content[index].heading, img: { ...newAttendance.content[index].img, imageToBase64: null, url: null }, text: newAttendance.content[index].text })
    setNewAttendance({ ...newAttendance, content: newAttendance.content })
  }

  const addNewSectionHandler = () => {
    setNewAttendance({ ...newAttendance, content: [...newAttendance.content, { heading: "", img: { imageToBase64: null, url: null }, text: "" }] })
  }

  const deleteSectionHandler = (contentSectionIndex) => {

    deletedSecImages.push(newAttendance.content[contentSectionIndex].img)
    newAttendance.content.splice(contentSectionIndex, 1)
    setNewAttendance({ ...newAttendance, content: newAttendance.content })
  }

  const updateSectionHeading = (e, contentSectionIndex) => {
    newAttendance.content.splice(contentSectionIndex, 1, { heading: e.target.value, img: newAttendance.content[contentSectionIndex].img, text: newAttendance.content[contentSectionIndex].text })
    setNewAttendance({ ...newAttendance, content: newAttendance.content })
  }

  const updateSectionText = (e, contentSectionIndex) => {
    newAttendance.content.splice(contentSectionIndex, 1, { heading: newAttendance.content[contentSectionIndex].heading, img: newAttendance.content[contentSectionIndex].img, text: e.target.value })
    setNewAttendance({ ...newAttendance, content: newAttendance.content })
  }

  const getDateTime = (date_) =>{
    const date = new Date(Date.parse(date_))
    const day = date.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })
    const time = [date.getHours(), date.getMinutes(),].join(':')
    
    return {day, time}
  }

  // console.log('newAttendance', newAttendance)
  console.log('attendancereplies', attendanceReplies)

  return (
    <div className="Attendance-main">
      {location.pathname != "/attendance/create" && !location.pathname.includes('/attendance/update/') ?
        <>
          <p
            className="main-heading_"
            style={{
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            {attendanceObj.attendance?.title}
          </p>

          <img src={attendanceObj?.attendance?.feature_image?.url} className="attendance_post_image" />

          <div className="attendance_post_content">
            {attendanceObj?.attendance.content?.map((content_, index) => (
              <div className="contentSection" key={index}>
                <div className="headingContent">{content_.heading}</div>
                <div className={index % 2 == 0 ? "content_" : "content_reverse"}>
                  {content_.img?.url != "" &&
                    <img className="contentImage" src={content_.img?.url} />
                  }
                  <div className="contentText">{content_.text}</div>
                </div>
                <hr />
              </div>
            ))}

            <div className="attendanceInfoTopRow">
              <div className="likeContainer">

                {loadingAttendance ?
                  <div className="my-3">
                    <MDBSpinner color="primary">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner> </div>

                  : userInfo == null ?
                    <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                      <MDBIcon fas icon="sign-in-alt" />{" "}
                      Sign In to Like
                    </MDBBtn> :

                    attendanceObj.attendance?.likes.users.some(userId => userId == userInfo?.id) ?
                      <MDBBtn className='me-1' color='warning' onClick={() => dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, like: false }))}>
                        <MDBIcon fas icon="thumbs-down" />{" "}
                        Un Like
                      </MDBBtn>
                      : <MDBBtn className='me-1' color='success' onClick={() => dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, like: true }))}>
                        <MDBIcon fas icon="thumbs-up" />{" "}
                        Like
                      </MDBBtn>
                }
              </div>
              <div className="attendanceUser">{attendanceObj.attendance?.likes.count}{" "}Likes</div>

              <div className="attendanceUser">
                <MDBCardImage
                  src={
                    attendanceObj?.userId?.image?.url
                      ? attendanceObj?.userId?.image?.url
                      : attendanceObj?.userId?.gender == "female"
                        ? femaleAvatar
                        : maleAvatar
                  }
                  alt="avatar"
                  className="rounded-circle m-2"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  fluid
                />
                {attendanceObj?.userId?.username}</div>
              <div className="attendanceDate">{getDateTime(attendanceObj?.createdAt).time + "  " + getDateTime(attendanceObj?.createdAt).day}</div>
            </div>
          </div>
          <div className="attendanceInfoContainer">
            <div className="attendanceComments">
              <div className="commentsHeading">Comments</div>
              <div className="attendanceCommentWrite">
                <div className="commentInput">
                  <textarea className="contentTextArea"
                    value={attendanceComment}
                    onChange={(e) => setAttendanceComment(e.target.value)}
                    placeholder={"Comment Text"}
                  />
                </div>
                <div className="postComment">

                  {loadingAttendance ?
                    <div className="my-3">
                      <MDBSpinner color="primary">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner> </div>

                    : userInfo == null ?
                      <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                        <MDBIcon fas icon="sign-in-alt" />{" "}
                        Sign In to Post Comment
                      </MDBBtn> :
                      <MDBBtn className='me-1' color='primary' onClick={() => attendanceComment != "" && dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, comment: attendanceComment }))}>
                        Post Comment {" "}<MDBIcon fas icon="pencil-alt" />
                      </MDBBtn>}
                </div>
              </div>

              {
                attendanceObj.attendance?.comments?.map((commentObj, index) => (

                  <div className="attendanceComment" key={index}>
                    <div className="commentTextContainer">
                      <div className="commentText">
                        {commentObj?.comment}
                      </div>

                      {loadingAttendance ?
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner> </div>
                        : (commentObj?.user?._id == userInfo?.id) &&
                        <MDBIcon 
                        onClick={() => dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, delete_comment_id: commentObj._id }))} 
                        className="delIconComment" fas icon="trash" />}

                    </div>
                    <div className="attendanceInfoTopRow">
                      <div className="attendanceUser">
                        <MDBCardImage
                          src={
                            commentObj?.user?.image?.url
                              ? commentObj?.user?.image?.url
                              : commentObj?.user?.gender == "female"
                                ? femaleAvatar
                                : maleAvatar
                          }
                          alt="avatar"
                          className="rounded-circle m-2"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          fluid
                        />
                        {commentObj?.user?.username}</div>
                      <div className="attendanceDate">{getDateTime(commentObj?.createdAt).time + "  " + getDateTime(commentObj?.createdAt).day}</div>
                    </div>
                    <div className="ReplyContainer">
                      <div className="replyWrite">
                        <div className="replyInput">
                          <textarea className="replyTextArea"
                            value={attendanceReplies[index]?.reply}
                            onChange={(e) => {
                              attendanceReplies.splice(index, 1, { reply: e.target.value, index })
                              setAttendanceReplies([...attendanceReplies])
                            }}
                            placeholder={"Reply Text"}
                          />
                        </div>
                        <div className="postReply">
                          {loadingAttendance ?
                            <div className="my-3">
                              <MDBSpinner color="primary">
                                <span className="visually-hidden">Loading...</span>
                              </MDBSpinner> </div>
                            : userInfo == null ?
                              <MDBBtn className='me-1' color='success' onClick={() => navigate('/login')}>
                                <MDBIcon fas icon="sign-in-alt" />{" "}
                                Sign In to Post Reply
                              </MDBBtn> :
                              <MDBBtn className='replyBtn' color='primary' onClick={() => attendanceReplies[index].reply != "" && dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, comment_id: commentObj?._id, reply: attendanceReplies[index].reply }))}>
                                Post Reply {" "}<MDBIcon fas icon="pencil-alt" />
                              </MDBBtn>}
                        </div>
                      </div>

                      {commentObj?.replies?.map((replyObj, index) => (
                        <>
                          <div className="replyTextContainer" key={index}>
                            <div className="commentText">
                              {replyObj?.reply}
                            </div>
                            {loadingAttendance ?
                        <div className="my-3">
                          <MDBSpinner color="primary">
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner> </div>
                        :
                        (replyObj?.user?._id == userInfo?.id) &&
                        <MDBIcon 
                        onClick={() => dispatch(updateAttendanceByUser({ id: attendanceObj?._id, email: userInfo?.email, comment_id: commentObj._id, delete_reply_id: replyObj?._id }))} 
                        className="delIconComment" fas icon="trash" />
                        
                        }
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
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                fluid
                              />
                              {replyObj?.user?.username}</div>
                            <div className="attendanceDate">{getDateTime(replyObj?.createdAt).time + "  " + getDateTime(replyObj?.createdAt).day}</div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
        :
        <>
          <input
            className="main-heading_Input"
            style={{
              fontWeight: "bolder",
              fontFamily: "sans-serif",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              padding: "1% 2%",
            }}
            value={newAttendance.title}
            onChange={(e) => setNewAttendance({ ...newAttendance, title: e.target.value })}
            placeholder={width > 570 ? "Write Your Title of Progress" : "Write Progress Title"}
          />
          {
            attendanceTitleError != "" &&
            <div className="Attendance-field-error-mesage">
              {attendanceTitleError}
            </div>
          }

          {newAttendance?.feature_image?.url != null ?

            <div className="attendance_post_image_Container_feature" style={{
              backgroundImage: `url(${newAttendance?.feature_image?.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}>
              <div className="topRowFeatureImage">
                <MDBIcon fas icon="edit" size="2x" className="editIconFeatureImage" onClick={changeFeatureImage} />
                <MDBIcon fas icon="trash" size="2x" className="delIconFeatureImage" onClick={removeFeatureImage} />
              </div>
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
            </div>
            :
            <div className="attendance_post_image_Container" onClick={changeFeatureImage}>
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
              + Add Feature Image
            </div>
          }

          <div className="attendance_post_content">
            {newAttendance?.content?.map((content_, index) => (
              <div className="contentSection" key={index}>

                <div className="secTopRow">
                  <input className="headingContentInput"
                    value={content_.heading}
                    onChange={(e) => updateSectionHeading(e, index)}
                    placeholder={"Section Heading"}
                  />
                  <MDBIcon className="secDelIcon" far icon="trash-alt" onClick={() => deleteSectionHandler(index)} />
                </div>

                <div className={index % 2 == 0 ? "content_" : "content_reverse"}>

                  {content_?.img?.url != null ?

                    <div className="contentImageContainer_Image" style={{
                      backgroundImage: `url(${content_?.img?.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    }}>
                      <div className="topRowSectionImage">
                        <MDBIcon fas icon="edit" className="editIconFeatureImage" onClick={() => changeSectionImage(index)} />
                        <MDBIcon fas icon="trash" className="delIconFeatureImage" onClick={() => removeSectionImage(index)} />
                      </div>

                      <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        ref={setRef(`${index}`)}
                        onChange={(e) => {
                          setSelectedImageSection({ file: e.target.files[0], index });
                          e.target.value = null;
                        }}
                      />
                    </div>

                    :
                    <div className="contentImageContainer" onClick={() => changeSectionImage(index)}>
                      <input
                        key={index}
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        ref={setRef(`${index}`)}
                        onChange={(e) => {
                          setSelectedImageSection({ file: e.target.files[0], index });
                          e.target.value = null;
                        }}
                        className="secInput"
                      />
                      + Add Section Image
                    </div>
                  }

                  {/* <img className="contentImage" src={content_?.img} /> */}
                  <textarea className="contentTextArea"
                    value={newAttendance.content[index].text}
                    onChange={(e) => updateSectionText(e, index)}
                    placeholder={"Section Text"}
                  />
                </div>
                <hr />
              </div>
            ))}
            <MDBBtn
              className="btn-rounded heroSecBtn-2"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px"

              }}
              onClick={addNewSectionHandler}
            >
              + Add new Section
            </MDBBtn>
          </div>
          {

            loadingAttendance ?
              <div className="my-3">
                <MDBSpinner color="primary">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner> </div> :

              <MDBBtn
                className="btn-rounded heroSecBtn-1"
                style={{
                  width: "70%",
                  margin: "2rem",
                  fontWeight: "bolder"
                }}
                onClick={handleSubmitPostAttendance}
              >
                {location.pathname.includes('/attendance/update/') ? 'Update ' : 'Post '}Attendance & Progress
              </MDBBtn>
          }

          {errorAttendance && (
            <div className="text-danger text-center mb-2">
              {errorAttendance}{" "}
              <i className="fas fa-exclamation-triangle text-danger"></i>
            </div>)
          }

          {(successAttendance == 'Attendance & Progress has been posted successfully!' || successAttendance == 'Attendance & Progress has been updated successfully!') && (
            <div className="text-success text-center mb-2">
              {successAttendance}{" "}
              <i className="fas fa-exclamation-triangle text-success"></i>
            </div>)
          }
        </>
      }
    </div >
  );
};
export default AttendancePost;
