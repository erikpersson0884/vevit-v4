import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3001", 10);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
