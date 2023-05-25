import React from "react";
import Loader from "./Loader";
import axios from "axios";

export default class TeamDetails extends React.Component {

    state = {
        someRaces: [],
        vozaci: "",
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
            vozaci: response.data.MRData.RaceTable.Races[0].Results,
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
            <div>

                <table >
                    <tr>
                        <td>Formula 1 2013 Results</td>
                    </tr>
                    <div>
                        <tr>
                            <td>Round</td>
                            <td>Grand Prix</td>
                            <td> {this.state.vozaci[0].Driver.familyName} </td>
                            <td> {this.state.vozaci[1].Driver.familyName}  </td>
                            <td>Points</td>
                        </tr>
                    </div>

                    {this.state.someRaces.map(x =>

                        <tbody>

                            <tr>
                                <td>
                                    <h2 className="comments"> {x.round}</h2>
                                </td>
                                <td >
                                    <h2 className="comments"> {x.raceName}  </h2>
                                </td>
                                <td >
                                    <h2 className="comments"> {x.Results[0].position} </h2>
                                </td>
                                <td >
                                    <h2 className="comments"> {x.Results[1].position} </h2>
                                </td>
                                <td>
                                    <h2 className="comments"> {parseInt(x.Results[0].points) + parseInt(x.Results[1].points)} </h2>
                                </td>
                            </tr>
                        </tbody>

                    )}
                </table>

            </div>

        );


    }
}






