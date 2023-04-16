import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function PageHeader({ title, startAdornment, endAdornment }) {
    return (
        <Box mb={3}>
            <Stack direction="row" justifyContent="space-between">
                {startAdornment && startAdornment}
                <Typography variant="h4" component="h1" fontWeight="600">
                    {title}
                </Typography>
                {endAdornment && endAdornment}
            </Stack>
        </Box>
    );
}
