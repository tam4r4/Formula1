import React from "react";
import axios from "axios";
import Loader from "./Loader";
import history from "../history";
import Flag from 'react-flagkit';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import YearContext from "../context/YearContext";
import Breadcrumbs from "./Breadcrumbs";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default class AllTeams extends React.Component {
    state = {
        teamStandings: [],
        flags: [],
        loading: true,
        searchText: ""
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        let year = this.context.year;
        const url = `https://ergast.com/api/f1/${year}/constructorStandings.json`;
        const url2 = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

        const response = await axios.get(url);
        const response2 = await axios.get(url2);

        this.setState({
            teamStandings: response.data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings,
            flags: response2.data,
            loading: false
        });
    }

    handleTeamDetails = (name) => {
        const linkTo = "/teamDetails/" + name;
        history.push(linkTo);
    }

    getFlagCode = (nationality) => {
        let flag = this.state.flags.filter(x => x.nationality === nationality);
        if (flag.length) {
            return flag[0].alpha_2_code;
        } else {
            if (nationality === "British") {
                return "GB";
            }
        }
    }

    handleInput = (e) => {
        this.setState({
            searchText: e.target.value
        });
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
            <div className="bgImg">

                <Breadcrumbs routes={routes} />

                <div className="main">
                    <h1>CONSTRUCTORS CHAMPIONSHIP</h1>

                    <Box className="search-container">
                        <FormControl fullWidth>
                            <TextField id="search-field" size="small" label="Search" variant="outlined" onChange={this.handleInput} className="cursor" />
                        </FormControl>
                    </Box>

                    <table className="tab-container">
                        <thead>
                            <td colSpan={5}>Constructor Championship Standings {this.context.year}</td>
                        </thead>
                        <tbody>
                            {this.state?.teamStandings?.filter((x) => {
                                if (this.state.searchText == "") {
                                    return x;
                                } else if (
                                    x?.Constructor?.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                                ) {
                                    return x;
                                }
                            }).map((x) => (
                                <tr key={x?.position}>
                                    <td> {x?.position}</td>
                                    <td onClick={() => this.handleTeamDetails(x?.Constructor?.constructorId)}
                                        className="flag-container cursor">
                                        <Flag
                                            country={this.getFlagCode(x?.Constructor?.nationality)}
                                            className="flag-icon"
                                        />
                                        {x?.Constructor?.name}
                                    </td>
                                    <td className="cursor">
                                        <a href={x?.Constructor?.url}
                                            className="new-tab-link new-tab-icon new-tab-cont"
                                            target="_blank">Details
                                            <OpenInNewIcon className="new-tab-icon-black"/>
                                        </a>
                                    </td>
                                    <td>{x?.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

AllTeams.contextType = YearContext;