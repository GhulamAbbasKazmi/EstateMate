import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Vacancy.css'

import jobImage from "../../assets/11.jpg";

export const Vacancy = (props) => {
    const dispatch = useDispatch();
    const { _id, title, price, image } = props.data;




    return (
        <div className="product" >
            <img src={image?.url ? image?.url : jobImage} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p> ${price}</p>
            </div>
        </div>
    );
};