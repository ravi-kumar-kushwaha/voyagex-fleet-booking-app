import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

app.use((req, res) => {
    res.send("Welcome to Vehicle Booking App");
})

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        success: false,
    });
    next(err);
})
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});