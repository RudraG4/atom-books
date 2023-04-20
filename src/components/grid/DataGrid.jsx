import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import Loader from "components/loader/Loader";

function DataGrid(props) {
    const { status, error, results, itemRenderer } = props;

    return (
        <Grid container spacing={2} data-testid="data-grid" minHeight="400px">

            {status === "loading" && <Loader />}

            {status === "error" && (
                <Box display="flex" alignItems="center" justifyContent="center" height={250} width="100%">
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                        {error}
                    </Typography>
                </Box>
            )}

            {status === "done" && !results.length && (
                <Box display="flex" alignItems="center" justifyContent="center" height={250} width="100%">
                    <Typography fontWeight="600" color="text.secondary">
                        No Data
                    </Typography>
                </Box>
            )}

            {status === "done" && !!results.length && (
                results.map((data) => (
                    <Grid item xs={12} md={6} key={data.id}>
                        {itemRenderer(data)}
                    </Grid>
                ))
            )}
        </Grid>
    );
}

DataGrid.defaultProps = {
    status: "done",
    error: "",
    results: []
};

DataGrid.propTypes = {
    status: PropTypes.oneOf(["loading", "done", "error"]),
    error: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({})),
    itemRenderer: PropTypes.func.isRequired
};

export default React.memo(DataGrid);
