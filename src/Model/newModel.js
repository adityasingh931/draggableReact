import React from "react";
import Model from './index'


const NewModal = (props) => {
    return (
        <Model 
            show={props.show}
            handleChange={props.handleChange}
            primaryBtn={{
                text:"Save",
                onClick: props.saveModel
            }}
            secondaryBtn={{
                text:"Cancel",
                onClick: props.hideModel
            }}
        />
    )
}

export default NewModal;