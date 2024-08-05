import React from "react";
import './item.css'


export default function Item () {



    return (
        <>
      <div className="item">
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" alt="" />
        <div className="desc">
          <h1>Tower Street Apartments</h1>
          <span className="dist">500m from center</span>
          <span className="texi">Free airport taxi</span>
          <span className="subTitle">
            Studio Apartment with Air conditioning
          </span>
          <span className="feature">
            Entire studio • 1 bathroom • 21m² 1 full bed
          </span>
          <span className="cancle-1">Free cancellation </span>
          <span className="cancle-2">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="details">
          <div className="rate">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="prices">
            <span className="price">$112</span>
            <span className="tax">Includes taxes and fees</span>
           <button className="check-btn">See availability</button>
          </div>
        </div>
      </div>
        </>
    )
}