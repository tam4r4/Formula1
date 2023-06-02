import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";
import Flag from 'react-flagkit';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Breadcrumbs from "./Breadcrumbs";

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
        // const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const url = "https://raw.githubusercontent.com/nkezic/f1/main/AllTeams";
        const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        

        const response = await axios.get(url);
        const response2 = await axios.get(url2);

        this.setState({
            teamStandings: response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            flags: response2.data,
            loading: false
        });
    }

    handleTeamDetails = (name) => {
        const linkTo = "/teamDetails/" + name;
        history.push(linkTo);
    }


    getFlagCode = (nationality) => {
        // let nationality = this.state.teamStandings[1].Constructor.nationality;

        let flag = this.state.flags.filter(x => x.nationality === nationality);
        if (flag.length) {
            return flag[0].alpha_2_code;
        } else {
            if (nationality === "British") {
                return "GB";
            }
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }

        const routes =
            [
                {
                    path: "/teams",
                    title: "Teams"
                }
            ];

        return (
            <div>
                <div>
                    <Breadcrumbs routes={routes} />
                </div>

                <div className="main">
                    <h1>CONSTRUCTORS CHAMPIONSHIP</h1>
                    <table className="tab-container">
                        <thead>
                            <td colSpan={5}>Constructor Championship Standings - 2013</td>
                        </thead>
                        <tbody>
                            {this.state.teamStandings.map((x) => (
                                <tr key={x.position}>
                                    <td> {x.position}</td>
                                    <td onClick={() => this.handleTeamDetails(x.Constructor.constructorId)} className="flag-container cursor">
                                        <Flag
                                            country={this.getFlagCode(x.Constructor.nationality)}
                                            className="flag-icon"
                                        />
                                        {x.Constructor.name}
                                    </td>
                                    <td className="new-tab-container">
                                        <a href={x.Constructor.url} className="new-tab-link cursor" target="_blank">Details
                                            <OpenInNewIcon className="open-new-tab-icon" />
                                        </a>
                                    </td>
                                    <td>{x.points}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}