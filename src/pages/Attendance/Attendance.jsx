import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";
import "./Attendance.css";
import { MDBCol, MDBBtn, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { attendances } from "../../utils/attendancesData";
import {
  getAttendances
} from "../../features/attendance/attendanceActions";

const Attendance = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

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


  useEffect(() => {
    dispatch(getAttendances())
  }, []);

  return (
    <div className="Attendance-main">
      <p
        style={{
          fontSize: "4rem",
          marginTop: "2rem",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        Daily Attendance & Progress!
      </p>

      {userInfo != null &&
        <MDBCol md="6" className="d-flex align-items-center justify-content-center">
          <MDBBtn
            className="btn-rounded heroSecBtn-2"
            style={{
              width: "70%",
            }}
            onClick={() => navigate('/attendance/create')}
          >
            Add Attendance & Progress
          </MDBBtn>
        </MDBCol>
      }

      <div className="Attendance-content">
        {attendances?.map((attendanceObj, index) => (

          <div className="attendance-post-card p-3 my-2" key={index}>
            {index % 2 == 0 || (index % 2 == 1 && width <= 996) ? (
              <img src={attendanceObj.attendance.feature_image?.url} className="home-attendance-image" />
            ) : null}
            <div className="attendance-post-text-container text-white">
              <MDBCardTitle className="fw-bold">
                {attendanceObj.attendance.title}
              </MDBCardTitle>
              <MDBCardText className="my-3">
                {attendanceObj.attendance.content[0].heading + ' ...'}
              </MDBCardText>

              <div className="AttendanceBtnContainer">
                <MDBBtn className="attendanceCardBtn" onClick={() => navigate(`/attendance/${attendanceObj._id}`)}
                >Read More</MDBBtn>
                {userInfo?.id === attendanceObj?.userId?._id &&
                  <MDBBtn className="attendanceCardBtn" onClick={() => navigate(`/attendance/update/${attendanceObj._id}`)}
                  >Edit </MDBBtn>
                }
              </div>
            </div>
            {index % 2 == 1 && width > 996 ? (
              <img src={attendanceObj.attendance.feature_image.url} className="home-attendance-image" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Attendance;
