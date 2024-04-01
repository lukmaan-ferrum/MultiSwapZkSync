/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  WithAdmin,
  WithAdminInterface,
} from "../../../contracts/common/WithAdmin";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x0000008003000039000000400030043f000000000301001900000060033002700000002e033001970000000102200190000000190000c13d000000040230008c000000ab0000413d000000000201043b000000e002200270000000340420009c000000330000a13d000000350420009c0000004c0000613d000000360420009c000000540000613d000000370120009c000000ab0000c13d0000000001000416000000000101004b000000ab0000c13d0000000101000039000000000101041a000000500000013d0000000001000416000000000101004b000000ab0000c13d000000000200041a0000002f012001970000000006000411000000000161019f000000000010041b0000002e0100004100000000030004140000002e0430009c0000000003018019000000c00130021000000030011001c700000031052001970000800d020000390000000303000039000000320400004100b200ad0000040f0000000101200190000000ab0000613d0000002001000039000001000010044300000120000004430000003301000041000000b30001042e000000380420009c000000720000613d000000390120009c000000ab0000c13d0000000001000416000000000101004b000000ab0000c13d000000000100041a00000031021001970000000005000411000000000252004b000000910000c13d0000002f01100197000000000010041b0000002e0100004100000000020004140000002e0320009c0000000002018019000000c00120021000000030011001c70000800d02000039000000030300003900000032040000410000000006000019000000a60000013d0000000001000416000000000101004b000000ab0000c13d000000000100041a0000003101100197000000800010043f0000003a01000041000000b30001042e0000000002000416000000000202004b000000ab0000c13d000000040230008a000000200220008c000000ab0000413d0000000401100370000000000101043b0000003106100197000000310110009c000000ab0000213d000000000100041a00000031021001970000000005000411000000000252004b000000910000c13d000000000206004b0000009a0000c13d0000003b01000041000000800010043f0000002001000039000000840010043f0000002601000039000000a40010043f0000003c01000041000000c40010043f0000003d01000041000000e40010043f0000003e01000041000000b4000104300000000002000416000000000202004b000000ab0000c13d000000040230008a000000200220008c000000ab0000413d0000000401100370000000000201043b0000003101200197000000310220009c000000ab0000213d000000000200041a00000031022001970000000003000411000000000232004b000000910000c13d0000000103000039000000000203041a0000002f02200197000000000212019f000000000023041b000000800010043f0000002e0100004100000000020004140000002e0420009c0000000002018019000000c00120021000000041011001c70000800d020000390000004204000041000000a60000013d0000003b01000041000000800010043f0000002001000039000000840010043f000000a40010043f0000003f01000041000000c40010043f0000004001000041000000b4000104300000002f01100197000000000161019f000000000010041b0000002e0100004100000000020004140000002e0320009c0000000002018019000000c00120021000000030011001c70000800d020000390000000303000039000000320400004100b200ad0000040f0000000101200190000000ab0000613d0000000001000019000000b30001042e0000000001000019000000b400010430000000b0002104210000000102000039000000000001042d0000000002000019000000000001042d000000b200000432000000b30001042e000000b40001043000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffff8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e00000000200000000000000000000000000000040000001000000000000000000000000000000000000000000000000000000000000000000000000008da5cb5a000000000000000000000000000000000000000000000000000000008da5cb5b00000000000000000000000000000000000000000000000000000000f2fde38b00000000000000000000000000000000000000000000000000000000f851a44000000000000000000000000000000000000000000000000000000000704b6c0200000000000000000000000000000000000000000000000000000000715018a6000000000000000000000000000000000000002000000080000000000000000008c379a0000000000000000000000000000000000000000000000000000000004f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000840000008000000000000000004f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572000000000000000000000000000000000000006400000080000000000000000002000000000000000000000000000000000000200000008000000000000000008fe72c3e0020beb3234e76ae6676fa576fbfcae600af1c4fea44784cf0db329c00000000000000000000000000000000000000000000000000000000000000004259567ecd2fbcca9a0c4159997a8d8c6ce63db1ba549198337225a9f7e7989e";

type WithAdminConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WithAdminConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WithAdmin__factory extends ContractFactory {
  constructor(...args: WithAdminConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      WithAdmin & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): WithAdmin__factory {
    return super.connect(runner) as WithAdmin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WithAdminInterface {
    return new Interface(_abi) as WithAdminInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): WithAdmin {
    return new Contract(address, _abi, runner) as unknown as WithAdmin;
  }
}