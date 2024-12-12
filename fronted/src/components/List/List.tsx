import Grid from "@mui/material/Grid2";
import {Alert, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Loader from "../../UI/Loader/Loader.tsx";
import {getMessages} from "../../slices/messageSlice/messageSlice.tsx";
import {apiURL} from "../../globalConstant.ts";

const List = () => {
    const { messages, isLoading, error } = useAppSelector((state) => state.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">There is no data. Send a new message or try again!</Alert>
            ) : (
                <Grid container spacing={2} sx={{mt: 4}}>
                    {messages.map((m, index) => (
                        <Grid size={12} key={index}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    border: "3px solid",
                                    borderRadius: "10px",
                                }}
                            >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Grid container spacing={2}>
                                        <Grid size={12}>
                                            <Typography sx={{fontSize: 20, ml: 1, fontWeight: 'bold'}}>
                                                <strong style={{ color: "red" }}>Author: </strong> {m.author}
                                            </Typography>
                                        </Grid>
                                        <Grid size={12}>
                                            <Typography sx={{fontSize: 20, ml: 1}}>
                                                <strong style={{ color: "blue" }}>Message:</strong> "{m.message}"
                                            </Typography>
                                        </Grid>
                                        {m.image && (
                                            <Grid size={12}>
                                                <CardMedia
                                                    component="img"
                                                    src={apiURL + `/${m.image}`}
                                                    title={m.author}
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: "8px",
                                                        width: "100px",
                                                        height: "100px",
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default List;