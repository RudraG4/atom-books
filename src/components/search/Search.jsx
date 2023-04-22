import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import PropTypes from "prop-types";
import useDebounce from "hooks/useDebounce";

function Search(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const debnSearchTerm = useDebounce(searchTerm);
    const { onSearch, placeholder } = props;

    const onChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        onSearch(debnSearchTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debnSearchTerm]);

    return (
        <TextField
            fullWidth
            value={searchTerm}
            variant="standard"
            placeholder={placeholder}
            data-testid="search"
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <BiSearch color="text.primary" data-testid="search-adornment" />
                    </InputAdornment>
                ),
            }}
        />
    );
}

Search.defaultProps = {
    onSearch: () => { },
    placeholder: "Search"
};

Search.propTypes = {
    onSearch: PropTypes.func,
    placeholder: PropTypes.string
};

export default React.memo(Search);
