import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader(props) {
    const { height = 250 } = props;

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height={height} width="100%">
            <CircularProgress data-testid="loading" />
        </Box>
    );
}
