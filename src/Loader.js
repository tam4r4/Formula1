import React from "react";
import { BeatLoader } from "react-spinners";

export default class BeatLoader extends React.Component {
    render() {
        return(
            <div>
                <BeatLoader size={50} />
            </div>
        );
    }
}