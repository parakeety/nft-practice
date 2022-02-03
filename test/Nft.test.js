import {expect} from "chai";
import hre from "hardhat";
import {TransactionResponse} from "@ethersproject/abstract-provider";
import {BigNumber} from "ethers";

describe('Nft', () => {
    beforeEach(async () => {
        await hre.deployments.fixture();
    })

    const getContracts = async () => {
        const { deployer, tester1, tester2 } = await hre.getNamedAccounts();
        const Nft = await hre.ethers.getContract('Nft', deployer);

        return { Nft, deployer, tester1, tester2 };
    }

    it('Transfer', async () => {
        const { Nft, deployer, tester1 } = await getContracts();

        expect(await Nft.totalSupply()).equal(BigNumber.from(1));
        expect(await Nft.balanceOf(deployer)).equal(BigNumber.from(1));

        await Nft.transferFrom(deployer, tester1, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await Nft.balanceOf(tester1)).equal(BigNumber.from(1));
        expect(await Nft.balanceOf(deployer)).equal(BigNumber.from(0));
        expect(await Nft.ownerOf(0)).equal(tester1);
    })

    it('TransferFrom', async () => {
        const { Nft, deployer, tester1, tester2 } = await getContracts();

        expect(await Nft.getApproved(0)).equal('0x0000000000000000000000000000000000000000');

        await Nft.approve(tester1, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await Nft.getApproved(0)).equal(tester1);

        await Nft.transferFrom(deployer, tester2, 0).then((tx: TransactionResponse) => tx.wait());

        expect(await Nft.balanceOf(tester2)).equal(BigNumber.from(1));
        expect(await Nft.balanceOf(deployer)).equal(BigNumber.from(0));
        expect(await Nft.ownerOf(0)).equal(tester2);
    })

    it('Transfer Error', async () => {
        const { Nft, deployer, tester1, tester2 } = await getContracts();
        const Nft_2 = await hre.ethers.getContract('Nft', tester1);

        expect(await Nft.transferFrom(tester1, tester2, 0).catch((e: Error) => e.message))
            .to.have.string('ERC721: transfer of token that is not owned');
        expect(await Nft_2.transferFrom(deployer, tester2, 0).catch((e: Error) => e.message))
            .to.have.string('ERC721: transfer caller is not owner or approved');
    })
})
