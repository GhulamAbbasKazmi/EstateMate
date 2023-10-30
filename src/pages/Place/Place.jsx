import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Place.css'

import placeImage from "../../assets/mt.png";

export const Place = (props) => {
    const dispatch = useDispatch();
    const { _id, title, price, image } = props.data;




    return (
        <div className="product" >
            <img src={image?.url ? image?.url : placeImage} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p> ${price}</p>
            </div>
        </div>
    );
};