import React from "react";
import history from "../history";
import AllDrivers from "./AllDrivers";

import YearContext from "../context/YearContext";

export default class Home extends React.Component {

    state = {
        year: "2010",
        years: []
    }

    handleChange = (e) => {

        console.log("handleChange method");

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

        console.log("handleYears");

        let items = [];         
        for (let i = 1950; i <= 2022; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);       
        }
        return items;
    }


    render() {

        return (
            <div className="year-container">

                 <h2>Select year: </h2>

                <select size="4" id="dropdown" onChange={this.handleChange} >
                 
                    {this.handleYears()}
                </select>
 
               {/* <input type="button" value="Click to confirm year" onClick={() => this.handleSomeYear(this.state.year)} /> */}
  
            </div>
        );
    }
}

 Home.contextType = YearContext;



// updateContext = () => {
//     console.log(this.context);
//     this.context.updateYear("1984");
//   }

//   handleChangeSelectYear = (e) => {
//     this.setState({
//       selectedYear: e.target.value
//     });
//     this.context.updateYear(e.target.value);
//   }