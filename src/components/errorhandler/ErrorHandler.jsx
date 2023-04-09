import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// eslint-disable-next-line
export default function ErrorHandler({ resetErrorBoundary }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      role="alert"
    >
      <Typography component="p">Something went wrong</Typography>
      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary} type="button">
          Try again
        </Button>
      )}
    </Stack>
  );
}
