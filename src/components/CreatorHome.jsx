import React from "react";
import BackgroundAnimation from "./BackgroundAnimation";
import { useRef } from "react";
import "../assets/css/creatorHome.css"
import { MyNavbar } from "./MyNavbar";



function CreatorHome() {


    const myRef = useRef(null);

  return (
    // Main Page
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Background Animation */}
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}>
        <BackgroundAnimation
          mouseControls={true}
          touchControls={true}
          gyroControls={false}
          minHeight={200.0}
          minWidth={200.0}
          scale={1.0}
          scaleMobile={1.0}
          color={0x61404b}
          points={20.0}
          spacing={12.0}
        />

        {/* Navbar */}
        <div ref={myRef} style={{ position: "relative", zIndex: 1 }}>
          <MyNavbar
            theme="dark"
            brand="YT Pay"
            navLink1="Example 1"
            navLink2="Example 2"
            navLink3="About Us"
            navLink4="EXTRA"
            dropdownTitle="Wallet"
            selectRoleDropdowntTitle="Select Role"
            select_Role_dropDownAction_1="Creator"
            select_Role_dropDownAction_2="Contributor"
            // currentUser={user}
            dropDownAction_1="My Profile"
            // dropDownAction_2="Convert to Fiat"
            dropDownAction_3=" Deposit / Withdraw"
          ></MyNavbar>
        </div>

        {/* Main Content */}
        <div className="main">
          <h1 style={{ color: "#ffff" }}>Search Creator</h1>

          <input
            className="searchModal"
            type="search"
            placeholder="Creator Name"
          />

          <div className="grid-container">
            <div className="item item1">
              <h1 style={{ color: "#ffff" }}>Top Creators</h1>
              <li>Creator 1</li>
              <li>Creator 2</li>
            </div>

            <div className="item item2">
              <h1 style={{ color: "#ffff" }}>Top Contributors</h1>
              <li>Contributor 1</li>
              <li>Contributor 2</li>
            </div>
          </div>
        </div>

        <footer className="blockquote-footer auto">
          <center>About us</center>
        </footer>
      </div>
    </div>
  );
}

export default CreatorHome;