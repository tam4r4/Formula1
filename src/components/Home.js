import React from "react";
import YearContext from "../context/YearContext";

export default class Home extends React.Component {
    state = {
        year: "2010",
        years: []
    }

    handleChange = (e) => {
        this.setState({
            year: e.target.value
        });

        this.context.updateYear(e.target.value);
    }

    componentDidMount() {
        this.setState({
            years: this.handleYears()
        });
    }

    handleYears = () => {
        let items = [];
        for (let i = 1950; i <= 2022; i++) {
            items.push(<option key={i} value={i}>{i}</option>);
        }
        return items;
    }

    render() {
        return (
            <div className="year-container">
                <h2>SELECT YEAR </h2>
                <select size="4" id="dropdown" onChange={this.handleChange} className="select-container" >
                    {this.handleYears()}
                </select>
            </div>
        );
    }
}

Home.contextType = YearContext;

