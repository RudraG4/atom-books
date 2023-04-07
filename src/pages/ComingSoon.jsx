import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function ComingSoon() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: "0 !important",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        Coming Soon
      </Box>
    </Container>
  );
}
