import React, { useState, useEffect, useMemo } from "react";
import { fetchImage, fetchImageUrls } from "../api/index";
import { CircularProgress, Box, Stack, Button } from '@mui/material';

const ImageCarousel = (props) => {
    const [total, setTotal] = useState(0);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentLoaded, setCurrentLoaded] = useState(false);
    const [activeImage, setActiveImage] = useState();

    const nextSlide = useMemo(() => index === total - 1 ? 0 : index + 1, [index, total]);
    const prevSlide = useMemo(() => index === 0 ? total - 1 : index - 1, [index, total]);

    const loadNextImages = () => {
        fetchImage(nextSlide)
            .then(() => console.log('Next Loaded'))
            .catch((err) => console.error(err));

        fetchImage(prevSlide)
            .then(() => console.log('Prev Loaded'))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        setLoading(true);
        fetchImageUrls()
            .then((res) => setTotal(res.length))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!total) return;

        setCurrentLoaded(false);
        fetchImage(index)
            .then((res) => {
                setCurrentLoaded(true);
                setActiveImage(res);
                loadNextImages();
            })
            .catch((err) => console.error(err))
    }, [index, total]);

    return (
        <Box sx={{ display: 'flex', marginTop: 20 }} justifyContent={'center'} p={3}>
            {loading ?
                <CircularProgress /> :
                (
                    <Box sx={{ width: '500px' }}>
                        <Stack direction="row" justifyContent={'space-between'} spacing={2} mb={2}>
                            <Button variant="outlined" onClick={() => setIndex(prevSlide)}>
                                Prev
                            </Button>
                            <Button variant="contained" onClick={() => setIndex(nextSlide)}>
                                Next
                            </Button>
                        </Stack>
                        {activeImage && currentLoaded ?
                            <img src={activeImage} width={500} height={400} style={{ objectFit: 'cover' }} /> :
                            <CircularProgress />
                        }
                    </Box>
                )
            }
        </Box>
    );
};
export default ImageCarousel;
