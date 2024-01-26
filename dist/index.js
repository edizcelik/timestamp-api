"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.static("public"));
app.get("/api/:date?", (req, res) => {
    try {
        const unixNumber = Number(req.params.date);
        const date = Number.isNaN(unixNumber)
            ? new Date(req.params.date)
            : new Date(unixNumber);
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    }
    catch (error) {
        res.status(400);
        res.json({
            error: "Invalid Date",
        });
    }
});
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
