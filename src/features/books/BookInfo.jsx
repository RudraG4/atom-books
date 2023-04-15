import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookById } from "./slice/BookSlice";

export default function BookInfo() {
    const { bookId } = useParams();
    const [book, setBook] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const bookData = await dispatch(fetchBookById(bookId)).unwrap();
            setBook(bookData);
        })();
    // eslint-disable-next-line
  }, [bookId]);

    if (!book) {
        return (
            <Container maxWidth="lg" sx={{ px: 0 }}>
                <Box display="flex" justifyContent="center" m="auto">
                    <Typography variant="body2" fontWeight="600" color="text.secondary">
                        Loading...
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ px: "0 !important" }}>
            <Box component="section">
                <Box className="book-title" mb={3}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        sx={{ gap: "1.5rem" }}
                    >
                        <Box sx={{ width: { xs: "auto", md: 350 }, minWidth: "250px" }}>
                            <Box
                                component="img"
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    maxHeight: { xs: 300, md: 480 },
                                }}
                                alt={book.title}
                                src={book.bookCover}
                            />
                        </Box>
                        <Box sx={{ flex: "1 0 50%" }}>
                            <Box className="meta-data" mb={2}>
                                <Typography
                                    variant="h3"
                                    component="h1"
                                    fontWeight={600}
                                    mb={1.5}
                                >
                                    {book.title}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">By </Typography>
                                    <Typography component="span" color="red">
                                        {book.authors}
                                    </Typography>
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">Publisher(s): </Typography>
                                    <Typography component="span">{book.publisher}</Typography>
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">Published on: </Typography>
                                    <Typography component="span">{book.publishedDate}</Typography>
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">ID: </Typography>
                                    <Typography component="span">{book.id}</Typography>
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">ISBN: </Typography>
                                    <Typography component="span">{book.isbns}</Typography>
                                </Typography>
                                <Typography variant="body1" component="div">
                                    <Typography component="span">Pages: </Typography>
                                    <Typography component="span">{book.pageCount}</Typography>
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">{book.subtitle}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="book-description" mb="3">
                    <Box>
                        <Typography variant="h4" component="h4" fontWeight={600} mb={2}>
                            Book Description
                        </Typography>
                        <Typography component="p">{parse(book.description)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}