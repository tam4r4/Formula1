import React from "react";
import { PulseLoader } from "react-spinners";

export default class Loader extends React.Component {
    render() {
        return(
            <div className="loader-container">
                <PulseLoader size={25} color="mediumseagreen" />
            </div>
        );
    }
}