const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/api/:date?", (req, res, done) => {
    const { date } = req.params;

    if (!date) {
        let cur = new Date();
        return res.status(200).json({
            unix: Math.floor(cur.getTime()),
            utc: cur.toUTCString(),
        });
    }

    if (typeof date !== "string") {
        return res.status(400).json({ error: "Invalid Date" });
    }

    let result = {};

    if (!isNaN(date)) {
        const timestamp = Number(date);
        const date_ret = new Date(timestamp);
        if (!isNaN(date_ret.getTime())) {
            result.unix = Math.floor(date_ret.getTime());
            result.utc = date_ret.toUTCString();
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ error: "Invalid Date" });
        }
    } else {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ error: "Invalid Date" });
        }
        result.unix = Math.floor(dateObj.getTime());
        result.utc = dateObj.toUTCString();
        return res.status(200).json(result);
    }
});

app.listen(8000);
