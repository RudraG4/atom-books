import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";

export default function Loader(props) {
    const { height = 400, timeout = 1000, timeOutRenderer, onTimeout } = props;
    const [isTimeOut, setIsTimeOut] = useState(false);
    const timerRef = useRef();

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setIsTimeOut(true);
            if (onTimeout) {
                onTimeout();
            }
        }, timeout);

        return () => clearTimeout(timerRef.current);
    }, [onTimeout, timeout]);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height={height}>
            {!isTimeOut && <CircularProgress data-testid="loading" />}
            {isTimeOut && React.isValidElement(timeOutRenderer) && timeOutRenderer}
        </Box>
    );
}
