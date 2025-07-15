const express = require("express");
const router = express.Router();
const voting = require("../services/votingService");

//POST /candidates
router.post("/", async (req, res) => {
    try{
        const { name } = req.body;
        const result = await voting.addCandidate(name);
        res.status(201).json({ txHash: result.transactionHash });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Candidate creation failed "});
    }
});

//GET /candidates
router.get("/", async (req, res) => {
    try {
        const rawCandidates = await voting.getCandidates();
        const candidates = cleanCandidateArray(rawCandidates);
        res.json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch candidates"});
    }
});

function cleanCandidateArray(rawArray) {
    return rawArray.map(item => ({
        name: item.name,
        voteCount: item.voteCount.toString()
    }));
}

module.exports = router;