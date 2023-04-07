import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Search from "../../components/search/Search";
import BookGrid from "../../components/book/BookGrid";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: "0 !important",
      }}
    >
      <Box mb={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" component="h4" fontWeight="600">
            Books
          </Typography>
          <Button variant="contained" size="small">
            Create New Book
          </Button>
        </Stack>
      </Box>
      <Box mb={3}>
        <Search />
      </Box>
      <Box mb={3}>
        <Typography variant="body1" fontWeight="600" color="text.secondary">
          All Books
        </Typography>
      </Box>
      <Box mb={2}>
        <BookGrid />
      </Box>
    </Container>
  );
}
