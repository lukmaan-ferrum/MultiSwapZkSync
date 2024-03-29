/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC5267__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712__factory>;
    getContractFactory(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ShortStrings__factory>;
    getContractFactory(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: "IOneInchSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOneInchSwap__factory>;
    getContractFactory(
      name: "OneInchDecoder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OneInchDecoder__factory>;
    getContractFactory(
      name: "SigCheckable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SigCheckable__factory>;
    getContractFactory(
      name: "TokenReceivable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenReceivable__factory>;
    getContractFactory(
      name: "IUniswapV2Factory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Factory__factory>;
    getContractFactory(
      name: "IUniswapV2Router01",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router01__factory>;
    getContractFactory(
      name: "IUniswapV2Router02",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router02__factory>;
    getContractFactory(
      name: "WithAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WithAdmin__factory>;
    getContractFactory(
      name: "FerrumDeployer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FerrumDeployer__factory>;
    getContractFactory(
      name: "FiberRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FiberRouter__factory>;
    getContractFactory(
      name: "ForgeFundManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ForgeFundManager__factory>;
    getContractFactory(
      name: "FundManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FundManager__factory>;
    getContractFactory(
      name: "IVersioned",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVersioned__factory>;
    getContractFactory(
      name: "LiquidityManagerRole",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LiquidityManagerRole__factory>;
    getContractFactory(
      name: "MultiSwapForge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiSwapForge__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC5267",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC5267>;
    getContractAt(
      name: "IERC20Permit",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "EIP712",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712>;
    getContractAt(
      name: "ShortStrings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ShortStrings>;
    getContractAt(
      name: "IWETH",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: "IOneInchSwap",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOneInchSwap>;
    getContractAt(
      name: "OneInchDecoder",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OneInchDecoder>;
    getContractAt(
      name: "SigCheckable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SigCheckable>;
    getContractAt(
      name: "TokenReceivable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenReceivable>;
    getContractAt(
      name: "IUniswapV2Factory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Factory>;
    getContractAt(
      name: "IUniswapV2Router01",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router01>;
    getContractAt(
      name: "IUniswapV2Router02",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router02>;
    getContractAt(
      name: "WithAdmin",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.WithAdmin>;
    getContractAt(
      name: "FerrumDeployer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FerrumDeployer>;
    getContractAt(
      name: "FiberRouter",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FiberRouter>;
    getContractAt(
      name: "ForgeFundManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ForgeFundManager>;
    getContractAt(
      name: "FundManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FundManager>;
    getContractAt(
      name: "IVersioned",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVersioned>;
    getContractAt(
      name: "LiquidityManagerRole",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LiquidityManagerRole>;
    getContractAt(
      name: "MultiSwapForge",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiSwapForge>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH>;
    deployContract(
      name: "IOneInchSwap",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOneInchSwap>;
    deployContract(
      name: "OneInchDecoder",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OneInchDecoder>;
    deployContract(
      name: "SigCheckable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SigCheckable>;
    deployContract(
      name: "TokenReceivable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenReceivable>;
    deployContract(
      name: "IUniswapV2Factory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Factory>;
    deployContract(
      name: "IUniswapV2Router01",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Router01>;
    deployContract(
      name: "IUniswapV2Router02",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Router02>;
    deployContract(
      name: "WithAdmin",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WithAdmin>;
    deployContract(
      name: "FerrumDeployer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FerrumDeployer>;
    deployContract(
      name: "FiberRouter",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FiberRouter>;
    deployContract(
      name: "ForgeFundManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ForgeFundManager>;
    deployContract(
      name: "FundManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FundManager>;
    deployContract(
      name: "IVersioned",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVersioned>;
    deployContract(
      name: "LiquidityManagerRole",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManagerRole>;
    deployContract(
      name: "MultiSwapForge",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MultiSwapForge>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC5267",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "IERC20Permit",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "EIP712",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "ShortStrings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "IWETH",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH>;
    deployContract(
      name: "IOneInchSwap",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOneInchSwap>;
    deployContract(
      name: "OneInchDecoder",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OneInchDecoder>;
    deployContract(
      name: "SigCheckable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SigCheckable>;
    deployContract(
      name: "TokenReceivable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenReceivable>;
    deployContract(
      name: "IUniswapV2Factory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Factory>;
    deployContract(
      name: "IUniswapV2Router01",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Router01>;
    deployContract(
      name: "IUniswapV2Router02",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV2Router02>;
    deployContract(
      name: "WithAdmin",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.WithAdmin>;
    deployContract(
      name: "FerrumDeployer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FerrumDeployer>;
    deployContract(
      name: "FiberRouter",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FiberRouter>;
    deployContract(
      name: "ForgeFundManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ForgeFundManager>;
    deployContract(
      name: "FundManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FundManager>;
    deployContract(
      name: "IVersioned",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVersioned>;
    deployContract(
      name: "LiquidityManagerRole",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManagerRole>;
    deployContract(
      name: "MultiSwapForge",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MultiSwapForge>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}