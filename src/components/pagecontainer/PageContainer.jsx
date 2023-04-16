import Container from "@mui/material/Container";

export default function PageContainer({ children }) {
    return (
        <Container maxWidth="lg" sx={{ px: "0 !important" }}>
            {children}
        </Container>
    );
}
