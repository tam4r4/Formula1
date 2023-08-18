import React from "react";

const YearContext = React.createContext();

export class YearProvider extends React.Component {
    state = {
        year: ""
    }

    updateYear = (year) => {
        this.setState({
            year: year
        });
    }

    render() {
        const { year } = this.state;
        const { updateYear } = this;
        return (
            <YearContext.Provider value={{ year, updateYear }}>
                {this.props.children}
            </YearContext.Provider>
        );
    }
}

export default YearContext;