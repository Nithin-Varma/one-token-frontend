import { ETH_CHAIN_ID, ETH_TOKEN_ADDRESS, POLY_CHAIN_ID, POLY_TOKEN_ADDRESS } from "../../consts";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { usePublicClient, useContractEvent } from "wagmi";


import tokenAbi from "../../tokenAbi.json"
import { create } from "zustand";
import useTransactionsStore, { Transaction } from "./store";



export const useTransactionsHistory = () => {

    const { setEthTransactions, setPolygonTransactions } = useTransactionsStore((state) => state)
    const [loading, setLoading] = useState(false)
    const ethClient = usePublicClient({ chainId: ETH_CHAIN_ID })
    const polygonClient = usePublicClient({ chainId: POLY_CHAIN_ID })
    const refresh = async () => {
        setLoading(true);
        const ethLogs = await ethClient.getLogs({
            address: ETH_TOKEN_ADDRESS,
            fromBlock: "earliest",
            toBlock: "latest",
        })
        const polygonLogs = await polygonClient.getLogs({
            address: POLY_TOKEN_ADDRESS,
            fromBlock: "earliest",
            toBlock: "latest",

        })
        console.log({ polygonLogs })
        //@ts-ignore
        const properEthLogs = ethLogs.length > 10 ? ethLogs.sort((a, b) => parseInt(b!.blockNumber) - parseInt(a!.blockNumber!)).slice(0, 10) : ethLogs
        //@ts-ignore
        const properPolygonLogs = polygonLogs.length > 10 ? polygonLogs.sort((a, b) => parseInt(b!.blockNumber) - parseInt(a!.blockNumber!)).slice(0, 10) : polygonLogs

        const ethTransactions: Transaction[] = []
        for await (const log of properEthLogs) {
            if (log.blockNumber) {
                const block = await ethClient.getBlock({
                    blockNumber: log.blockNumber
                })
                if (block.timestamp) {
                    const timeAgo = formatDistanceToNow(new Date(parseInt(block.timestamp.toString()) * 1000), {
                        addSuffix: true,

                    })
                    ethTransactions.push({
                        from: `0x${log.topics[1]?.slice(26)}`,
                        to: `0x${log.topics[2]?.slice(26)}`,
                        amount: formatEther(BigInt(parseInt(log.data)), "wei"),
                        hash: log.transactionHash,
                        timeAgo,
                        timestamp: parseInt(block.timestamp.toString())
                    })
                }
            }
        }
        setEthTransactions(ethTransactions)
        console.log({ ethTransactions })

        const polygonTransactions: Transaction[] = [];
        console.log(polygonClient.chain, "chain id ")
        for await (const log of properPolygonLogs) {
            if (log.blockNumber) {
                const block = await polygonClient.getBlock({
                    blockNumber: log.blockNumber
                }).catch(console.log);

                if (block && block.timestamp) {
                    const timeAgo = formatDistanceToNow(new Date(parseInt(block.timestamp.toString()) * 1000), {
                        addSuffix: true,

                    })
                    polygonTransactions.push({
                        from: `0x${log.topics[1]?.slice(26)}`,
                        to: `0x${log.topics[2]?.slice(26)}`,
                        amount: formatEther(BigInt(parseInt(log.data)), "wei"),
                        hash: log.transactionHash,
                        timeAgo,
                        timestamp: parseInt(block.timestamp.toString())
                    })
                }
            }
        };





        setPolygonTransactions(
            polygonTransactions.sort((a, b) => b.timestamp - a.timestamp)
        )



        setLoading(false)

    }



    // const unWatchEth = useContractEvent({
    //     address: ETH_TOKEN_ADDRESS,
    //     abi: tokenAbi,
    //     eventName: 'Transfer',
    //     chainId: ETH_CHAIN_ID,
    //     async listener(log) {
    //         console.log({ log });
    //         await refresh()
    //     }

    // })
    // const unWatchPoly = useContractEvent({
    //     address: POLY_TOKEN_ADDRESS,
    //     abi: tokenAbi,
    //     eventName: 'Transfer',
    //     chainId: POLY_CHAIN_ID,
    //     async listener(log) {
    //         console.log({ log })
    //         await refresh()
    //     }
    // })
    useEffect(() => {
        refresh()
        // return () => { unWatchEth?.(); unWatchPoly?.() }
    }, [])

    return {
        refresh,
        loading,
        ethTransactions: useTransactionsStore((state) => state.ethTransactions),
        polygonTransactions: useTransactionsStore((state) => state.polygonTransactions)
    }
}