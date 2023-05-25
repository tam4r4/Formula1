import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";
import Flag from 'react-flagkit';

export default class AllTeams extends React.Component {
    state = {
        teamStandings: [],
        flags: [],
        loading: true
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);

        const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

        const response2 = await axios.get(url2);


        console.log("response2", response2);


        this.setState({
            teamStandings: response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            flags: response2.data,
            loading: false
        });
    }

    handleTeamDetails = (name) => {
        console.log(name);
        const linkTo = "/teamDetails/" + name;
        history.push(linkTo);
    }


    getFlagCode = (nationality) => {

        console.log("getFlagCode");

        // let nationality = this.state.teamStandings[1].Constructor.nationality;

        let zastava = this.state.flags.filter(x => x.nationality === nationality);
        if (zastava.length) {
            return zastava[0].alpha_2_code;
        } else {
            if (nationality === "British") {
                return "GB";
            }
        }

        //console.log("zastava", zastava);
    }



    render() {

        if (this.state.loading) {
            return <div className="kon-loader">
                <Loader />
            </div>
        }

        return (
            <div >
                <h1>Constructors Championship</h1>
                <table className="tab-container">
                    <thead>
                        <tr>Constructor Championship Standings - 2013</tr>
                    </thead>
                    {this.state.teamStandings.map(x =>
                        <tbody>
                            <tr>
                                <td> {x.position}</td>
                                <td onClick={() => this.handleTeamDetails(x.Constructor.constructorId)}>
                                    <Flag country={this.getFlagCode(x.Constructor.nationality)} /> {x.Constructor.name}
                                </td>
                                <td >
                                    <a href={x.Constructor.url}>Details </a>
                                </td>
                                <td>{x.points}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}