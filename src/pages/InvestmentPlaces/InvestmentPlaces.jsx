import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import './InvestmentPlaces.css'
import { Place } from "../Place/Place";
import { getPlaces } from "../../features/place/placeActions";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";

const InvestmentPlaces = () => {

    const dispatch = useDispatch();

    const {
        loading,
        places,
        place,
        error,
        success,
    } = useSelector((state) => state.place);


    const [showPlaceDetails, setShowPlaceDetails] = useState(null);

    useEffect(() => {
        dispatch(getPlaces({}))
    }, []);

    return (

        <div className="InvestmentPlaces-main" >
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
                Best Investment Places
            </p>

            {showPlaceDetails != null ?
                < div style={{width:"70%"}}>
                    <PlaceDetails

                        showPlaceDetails={showPlaceDetails}
                        setShowPlaceDetails={setShowPlaceDetails} />

                </div>

                :
                <div className="products">
                    {places?.length != null ? places?.map((place) => (
                        <div onClick={() => {

                            console.log('clicking')
                            setShowPlaceDetails(place)
                        }}>

                            <Place data={place} />
                        </div>
                    ))
                        :
                        'No Place Found!'
                    }
                </div>
            }

        </div>
    )
}

export default InvestmentPlaces;
