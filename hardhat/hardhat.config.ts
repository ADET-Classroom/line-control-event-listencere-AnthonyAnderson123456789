import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28", 
  paths:{
    artifacts: "../frontend/src/app/artifacts"
  }
};

export default config;
