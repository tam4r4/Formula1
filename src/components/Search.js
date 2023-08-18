import React from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default class Search extends React.Component {
    state = {
        searchText: ""
    }

    handleInput = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    render() {
        return (
            <Box className="search-container">
                <FormControl className="serach-field">
                    <TextField id="search-field" size="small" label="Search" variant="outlined" onChange={this.handleInput} className="cursor" />
                </FormControl>
            </Box>
        );
    }
}

