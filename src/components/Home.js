import React from "react";
import YearContext from "../context/YearContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default class Home extends React.Component {
    state = {
        year: "",
        years: []
    }

    handleChange = (e) => {
        this.setState({
            year: e.target.value
        });
        this.context.updateYear(e.target.value);
    }

    componentDidMount() {
        const { year } = this.context;
        this.setState({
            year,
            years: this.handleYears()
        });
    }

    handleYears = () => {
        let items = [];
        for (let i = 1950; i <= 2022; i++) {
            items.unshift(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return items;
    }

    render() {

        return (
            <div>
                <Box sx={{ minWidth: 300 }} className="select-year-container">
                    <FormControl fullWidth>
                        <InputLabel>Select Year</InputLabel>
                        <Select
                            labelId="select-label"
                            id="dropdown"
                            label="Select Year"
                            value={this.state.year}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="" disabled>
                            </MenuItem>
                            {this.handleYears()}
                        </Select>
                    </FormControl>
                </Box>
            </div>
        );
    }
}

Home.contextType = YearContext;
