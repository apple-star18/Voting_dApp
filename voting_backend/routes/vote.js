const express = require("experess");
const router = express.Router();
const voting = require("../services/votingService");

router.post("/", async (req, res) => {
    try {
        const { candidateIndex, from } = req.body;
        const receipt = await voting.vote(candidateIndex. from);
        res.json({ txHash: receipt.transactionHash });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Vote failed" });
    }
});

module.exports = router;