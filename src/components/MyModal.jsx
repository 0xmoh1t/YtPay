import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/MyModal.css";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";

export function MyModal({ handleShow, handleClose, title, body }) {
  return (
    <>
      <Modal show={handleShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modalBody">
            <i className="fa fa-magnifying-glass" id="fa"></i>

            <div>
              <input
                className="searchModal"
                type="search"
                placeholder="Search tokens"
              ></input>
            </div>

            <Dropdown className="d-inline mx-2" autoClose="inside">
              <Dropdown.Toggle id="dropdown-autoclose-inside"></Dropdown.Toggle>

              <Dropdown.Menu className="my-dropdown-menu">
                <Dropdown.Item href="#">ETH</Dropdown.Item>
                <Dropdown.Item href="#">HEDERA</Dropdown.Item>
                <Dropdown.Item href="#">POLYGON</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Modal.Body>

        <div className="typeOfEtheriumFlex">
          <li>LOGO</li>
          <li>LOGO</li>
          <li>LOGO</li>
        </div>

        <ListGroup defaultActiveKey="#link1" className="tokenListContainer">
          <ListGroup.Item action href="#link1" className="tokenListItem">
            USDC
          </ListGroup.Item>
          <ListGroup.Item action href="#link2" className="tokenListItem">
            ETH
          </ListGroup.Item>
          <ListGroup.Item action href="#link3" className="tokenListItem">
            WETH
          </ListGroup.Item>
          <ListGroup.Item action href="#link4" className="tokenListItem">
            USDT
          </ListGroup.Item>
          <ListGroup.Item action href="#link5" className="tokenListItem">
            ENA
          </ListGroup.Item>
          <ListGroup.Item action href="#link6" className="tokenListItem">
            ARB
          </ListGroup.Item>
          <ListGroup.Item action href="#link7" className="tokenListItem">
            ZRO
          </ListGroup.Item>
          <ListGroup.Item action href="#link8" className="tokenListItem">
            HNO
          </ListGroup.Item>
        </ListGroup>

        {/* Footer */}
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
