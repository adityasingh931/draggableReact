import React from "react";
import Modal from "react-bootstrap/Modal";
import "./Style.css";

export default ({show,handleChange,primaryBtn,secondaryBtn}) => {
    
    return (
      <Modal
        className='warning-container'
        show={show}
        onHide={secondaryBtn.onClick}
        centered
        animation
        handlechange
      >
        <div className="warning-body">
          <Modal.Body>
              <div className="warning-img">
                  <img src="" alt=''/>
              </div>
              <div className="text">
                <p>Select the type of widget</p>
                <select 
                // value={""} 
                onChange={handleChange} 
                >
                <option value="none" disabled selected>None</option>
                <option value="barChart">Bar Chart</option>
                <option value="lineChart">Line Chart</option>
                <option value="count">Count</option>
                </select>
              </div>
          </Modal.Body>
        </div>
        <div className="warning-footer">
          <Modal.Footer>
            <button type='button' className='fancy_btn' onClick={() => secondaryBtn.onClick()}>
              {secondaryBtn.text}
            </button>
            <button type='button' className='fancy_btn active' onClick={() => primaryBtn.onClick()}>
              {primaryBtn.text}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };