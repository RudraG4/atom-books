import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "@mui/material/styles/styled";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import PropTypes from "prop-types";
import useDebounce from "hooks/useDebounce";

const StyledTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    "&.MuiTextField-root": {
      width: "100%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "&.MuiTextField-root": {
      width: "50%",
    },
  },
}));

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debnSearchTerm = useDebounce(searchTerm);
  const { onSearch } = props;

  const onChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    onSearch(debnSearchTerm);
  }, [onSearch, debnSearchTerm]);

  return (
    <StyledTextField
      value={searchTerm}
      variant="standard"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BiSearch color="text.primary" />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
}

Search.defaultProps = {
  onSearch: () => {},
};

Search.propTypes = {
  onSearch: PropTypes.func,
};

export default Search;
