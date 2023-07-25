import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import config from "../../contractconfig.json";
import { useConnect, useAccount } from "wagmi";
import { useIsMounted } from "../../hooks/useIsMounted";
import * as React from "react";

const ChangeAuthorityPage = () => {
  const address1 = "0x05C8Ed3950dD7B6b12A8e3BB918ED90073E01A15";
  const mounted = useIsMounted();
  const { connector: activeConnector, isConnected } = useAccount();

  const { config: voteop } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "voteopenclose",
  });
  const { write: turnr4 } = useContractWrite(voteop);
  const voteco = async () => {
    try {
      await turnr4?.();
    } catch (error) {
      console.log(error);
    }
  };

  const { config: closeelection } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "closeElection",
  });
  const { write: turnr6 } = useContractWrite(closeelection);
  const closevote = async () => {
    try {
      await turnr6?.();
    } catch (error) {
      console.log(error);
    }
  };

  const { config: deployelection } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "deployNewElection",
  });
  const { write: turnr5 } = useContractWrite(deployelection);
  const deploy = async () => {
    try {
      await turnr5?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden z-0">
        <video
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/demo2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10">
        <div className="flex justify-end">
          <ConnectButton showBalance={false} />
        </div>
        {mounted && isConnected ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4 text-center">Options</h1>
              <div className="flex flex-col space-y-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={voteco}
                >
                  Start Voting
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={closevote}
                >
                  Close Voting
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={deploy}
                >
                  Deploy New Voting
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4 text-white">
                Decentralized Voting System
              </h1>
              <h1 className="text-3xl font-bold mb-4 text-white">
                Connect Your Wallet
              </h1>
              <p className="text-white">
                Please connect your wallet to continue.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeAuthorityPage;
