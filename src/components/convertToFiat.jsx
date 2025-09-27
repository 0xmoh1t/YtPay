// import React from 'react'
// import React, { useState, useEffect, useRef } from "react";
// import { MyModal } from "./MyModal";
// import { MyNavbar } from "./MyNavbar";
// import BackgroundAnimation from './BackgroundAnimation';
// import CurrentConversionRate from './CurrentConversionRate'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/css/convertToFiat.css"




// function convertToFiat() {
    
//       const [show, setShow] = useState(false);
//       const [sellInput, setSellInput] = useState(false);
//       const [showResult, setShowResult] = useState(false);
//       const myRef = useRef(null);
//   return (
//     <>
//       {/* HTML */}
//       <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//         {/*  Background*/}
//         <div style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}>
//           <BackgroundAnimation
//             mouseControls={true}
//             touchControls={true}
//             gyroControls={false}
//             minHeight={200.0}
//             minWidth={200.0}
//             scale={1.0}
//             scaleMobile={1.0}
//             color={0x61404b}
//             points={20.0}
//             spacing={12.0}
//           />
//         </div>

//         {/* Navbar */}
        

//         <div className="flex-container">
//           <h1 style={{ color: "white", marginBottom: "50px" }}> Swap Coins</h1>

//           <h1 style={{ color: "white" }}>Payment receive on ash@okicici</h1>

//           <div className="inputBoxContainer">
//             <div className="sellContainer">
//               <h3>Sell USDC</h3>
//               <input
//                 type="number"
//                 className="sellInputBox"
//                 id=""
//                 min={0}
//                 placeholder="0"
//                 onChange={(e) => {
//                   setSellInput(e.target.value);
//                   setShowResult(false);
//                 }}
//               />
//               {showResult && <CurrentConversionRate />}
//               <li className="coinDropdown" type="button" onClick={handleShow}>
//                 COIN
//                 <i className="fa-solid fa-angle-down"></i>
//               </li>
//             </div>

//             <div className="buyContainer">
//               <h3>Buy INR</h3>

//               <input
//                 type="number"
//                 className="buyInputBox"
//                 id=""
//                 min={0}
//                 placeholder="0"
//               />
//               <li className="coinDropdown" type="button" onClick={handleShow}>
//                 COIN
//                 <i className="fa-solid fa-angle-down"></i>
//               </li>
//             </div>

//             <center>
//               <button style={{ marginTop: "20px", borderRadius: "20px" }}>
//                 Get Started
//               </button>
//             </center>
//             <MyModal
//               handleShow={show}
//               handleClose={handleClose}
//               title={"Select a token"}
//               body={"Body"}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default convertToFiat