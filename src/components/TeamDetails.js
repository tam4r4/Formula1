import React from "react";
import Loader from "./Loader";
import axios from "axios";

export default class TeamDetails extends React.Component {
    state = {
        someRaces: [],
        loading: true
    }

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails = async () => {
        console.log(this.props.match.params.name);
        console.log("iza id");

        const id = this.props.match.params.name;
        const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
        const response = await axios.get(url);

        console.log("response", response.data.MRData.RaceTable.Races);

        this.setState({
            someRaces: response.data.MRData.RaceTable.Races,
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return <div className="kon-loader">
                <Loader />;
            </div>
        }

        return (
            <div >
                <table className="tab-container">
                    <thead>
                        <tr>Formula 1 2013 Results</tr>
                    </thead>

                    {this.state.someRaces.map(x =>
                        <tbody>
                            <tr>
                                <td>Round</td>
                                <td>Grand Prix</td>
                                <td>{x.Results[0].Driver.familyName}</td>
                                <td>{x.Results[1].Driver.familyName}</td>
                                <td>Points</td>
                            </tr>
                            <tr>
                                <td>{x.round}</td>
                                <td >{x.raceName}</td>
                                <td >{x.Results[0].position}</td>
                                <td >{x.Results[1].position}</td>
                                <td>{parseInt(x.Results[0].points) + parseInt(x.Results[1].points)}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}






