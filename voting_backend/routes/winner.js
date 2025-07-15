const express = require("express");
const router = express.Router();
const voting = require("../services/votingService");

router.get("/", async (req, res) => {
    try {
        const winner = await voting.getWinner();
        console.log(winner);
        res.json({ winner });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve winner" });
    }
});

module.exports = router;