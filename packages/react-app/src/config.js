import { Goerli } from "@usedapp/core";

export const ROUTER_ADDRESS = "0x449A78a83F045a48540bC3BF69E3363688253f14";

export const DAPP_CONFIG = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      "https://eth-goerli.g.alchemy.com/v2/6ZYzlBdx3YQwMvb2EQVShIsnEe3_DrSu",
  },
};
