import { expect } from "chai";
import hre from "hardhat";
import { Token } from "../typechain-types";
import TokenModule from "../ignition/modules/Token";

describe("Token Tests", function () {
    let token: Token;
    let owner: any;
    let otherAccount: any;

    before(async () => {
        [owner, otherAccount] = await hre.ethers.getSigners();
        if (!owner?.address || !otherAccount?.address) {
            throw new Error("Owner or other account not found");
        } 
        // else {
        //     console.log("Owner address:", owner.address);
        //     console.log("Other account address:", otherAccount.address);
        // }
        
        // Deploy using ignition module
        const { token: deployedToken } = await hre.ignition.deploy(TokenModule);
        token = deployedToken as unknown as Token;
    });

    it("should mint tokens to the owner", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(ownerBalance).to.be.greaterThan(0n);
    });

    it("should transfer tokens to the other account", async function () {
        const transferAmount = hre.ethers.parseEther("100");
        await token.transfer(otherAccount.address, transferAmount);
        const otherAccountBalance = await token.balanceOf(otherAccount.address);
        expect(otherAccountBalance).to.be.greaterThanOrEqual(transferAmount);
    });

    it("should allow anyone to mint tokens", async function () {
        const mintAmount = hre.ethers.parseEther("100");
        const otherAccountBalance = await token.balanceOf(otherAccount.address);
        // console.log("Other account balance:", otherAccountBalance);
        const tx = await token.connect(otherAccount).mint(otherAccount.address, mintAmount);
        await tx.wait();
        const newOtherAccountBalance = await token.balanceOf(otherAccount.address);
        // console.log("New other account balance:", newOtherAccountBalance);
        expect(newOtherAccountBalance).to.equal(otherAccountBalance + mintAmount);
    });
    it("should allow anyone to burn tokens", async function () {
        const burnAmount = hre.ethers.parseEther("100");
        const otherAccountBalance = await token.balanceOf(otherAccount.address);
        await token.connect(otherAccount).burn(otherAccount.address, burnAmount);
        const newOtherAccountBalance = await token.balanceOf(otherAccount.address);
        expect(newOtherAccountBalance).to.equal(otherAccountBalance - burnAmount);
    });

});