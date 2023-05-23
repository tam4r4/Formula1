import React from "react";
import { CircleLoader } from "react-spinners";


export default class Loader extends React.Component {

    render() {

        return(
            <div className="loader-container">
                <CircleLoader size={50} />
            </div>
        );
    }
}