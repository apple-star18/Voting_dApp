const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let voting, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        await voting.waitForDeployment();
    });

    it("Should allow owner to add a condidate", async function () {
        await voting.connect(owner).addCandidate("Alice");
        const candidates = await voting.getCandidates();
        expect(candidates[0].name).to.equal("Alice");
    });

    it("Should NOT allow non-owner to add a candidate", async function () {
        await expect(
        voting.connect(addr1).addCandidate("Bob")
        ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow users to vote once", async function () {
        await voting.connect(owner).addCandidate("Alice");
        await voting.connect(addr1).vote(0);
        const candidates = await voting.getCandidates();
        expect(candidates[0].voteCount).to.equal(1);
    });

    it("Should NOT allow users to vote twice", async function () {
        await voting.connect(owner).addCandidate("Alice");
        await voting.connect(addr1).vote(0);
        await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted");
    });

    it("Should return correct winner", async function () {
        await voting.connect(owner).addCandidate("Alice");
        await voting.connect(owner).addCandidate("Bob");
        await voting.connect(addr1).vote(0);
        await voting.connect(addr2).vote(0);
        const winner = await voting.getWinner();
        expect(winner).to.equal("Alice");
    });
})