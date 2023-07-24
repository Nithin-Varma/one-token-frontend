import { useContractWrite, usePrepareContractWrite } from "wagmi";
import tokenAbi from "../../tokenAbi.json"
import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS, POLY_TOKEN_ADDRESS } from "../../consts";
import { useState } from "react";
import { parseEther } from "viem";
const abi = [
    {

        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        type: "function"
    },
] as const;

const useSendToken = (chainId: number) => {
    const [enabled, setEnabled] = useState(false);
    const { config, } = usePrepareContractWrite({
        abi,
        address: chainId === ETH_CHAIN_ID ? ETH_TOKEN_ADDRESS : POLY_TOKEN_ADDRESS,
        functionName: "transfer",
        chainId: chainId,
        enabled: enabled
    })
    const { writeAsync, write, data, error, isLoading, isSuccess, isError } = useContractWrite(config)
    const sendToken = async (to: string, amount: number) => {
        if (!enabled) {
            setEnabled(true);
        }
        //@ts-ignore
        await writeAsync?.({
            "_to": to as `0x${string}`,
            "_value": parseEther(amount.toString()),

        })
    };
    return {
        sendToken,
        data,
        error,
        isLoading,
        isSuccess,
        isError
    }

}
export default useSendToken;