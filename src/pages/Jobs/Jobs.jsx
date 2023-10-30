import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import './Jobs.css'
import { Vacancy } from "../Vacancy/Vacancy";
import { getJobs } from "../../features/job/jobActions";
import JobDetails from "../../components/JobDetails/JobDetails";

const Jobs = () => {

    const dispatch = useDispatch();

    const {
        loading,
        jobs,
        job,
        error,
        success,
    } = useSelector((state) => state.job);


    const [showJobDetails, setShowJobDetails] = useState(null);

    useEffect(() => {
        dispatch(getJobs({}))
    }, []);

    return (

        <div className="Jobs-main" >
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
                Current  Openings
            </p>

            {showJobDetails != null ?
                < div style={{width:"70%"}}>
                    <JobDetails

                        showJobDetails={showJobDetails}
                        setShowJobDetails={setShowJobDetails} />

                </div>

                :
                <div className="products">
                    {jobs?.length != null ? jobs?.map((job) => (
                        <div onClick={() => {

                            console.log('clicking')
                            setShowJobDetails(job)
                        }}>

                            <Vacancy data={job} />
                        </div>
                    ))
                        :
                        'No Job Found!'
                    }
                </div>
            }

        </div>
    )
}

export default Jobs;
