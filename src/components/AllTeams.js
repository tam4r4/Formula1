import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";

export default class AllTeams extends React.Component {
    state = {
        teamStandings: [],
        loading: true
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        this.setState({
            teamStandings: response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            loading: false
        });
    }

    handleTeamDetails = (name) => {
        console.log(name);
        const linkTo = "/teamDetails/" + name;
        history.push(linkTo);
    }

    

    render() {

        if (this.state.loading) {
            return <div className="kon-loader">
                <Loader />;
            </div>
        }

        return (
            <div >
                <table >
                    {this.state.teamStandings.map(x =>
                        <tbody>
                            <tr>
                                <td>
                                    <h2 className="comments"> {x.position}</h2>
                                </td>
                                <td onClick={() => this.handleTeamDetails(x.Constructor.constructorId)}>
                                    <h2 className="comments"> {x.Constructor.name}  </h2>
                                </td>
                                <td >
                                    <a href= {x.Constructor.url} className="comments">Details </a>
                                </td>
                                <td>
                                    <h2 className="comments">{x.points} </h2>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}