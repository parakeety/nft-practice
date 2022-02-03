import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deploy: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts
}: HardhatRuntimeEnvironment) {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const Nft = await deploy("Nft", {
    from: deployer,
    // replace NFT_NAME, TOKEN_SYMBOL, and url
    args: [process.env.PROXY_REGISTRY_ADDRESS, 'NFT_NAME', 'TOKEN_SYMBOL', 'url'],
  })

  console.log('Nft: ' + Nft.address);

  await execute('Nft', { from: deployer }, 'mint', deployer);
}
