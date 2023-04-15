import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

const FlexContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}));

const StyledWrapper = styled(FlexContainer)(({ theme }) => ({
    "&": {
        "> span": {
            display: "block",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
        },
        "> p": {
            fontSize: "14px",
            fontWeight: "400",
        },
        [theme.breakpoints.up("sm")]: {
            height: "40px",
            flexDirection: "row",
            " > span ": {
                borderRight: "1px solid #EAEAEA",
                borderBottom: "0",
                width: "auto",
                paddingBottom: "0",
                paddingRight: "20px",
            },
        },
        [theme.breakpoints.down("sm")]: {
            " > span ": {
                borderRight: "0",
                borderBottom: "1px solid #EAEAEA",
                width: "100px",
                paddingRight: "0px",
                paddingBottom: "20px",
            },
        },
    },
}));

export default function NotFound() {
    return (
        <FlexContainer component="section" sx={{ height: "100%" }}>
            <StyledWrapper gap="1rem">
                <Typography component="span">404</Typography>
                <Typography component="p">
                    The page you are looking for is not found
                </Typography>
            </StyledWrapper>
        </FlexContainer>
    );
}
