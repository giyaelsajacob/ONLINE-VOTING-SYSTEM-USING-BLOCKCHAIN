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
  const address1 = "0x15E6C4d2B0b04b4a2aB2200F6f91C66E2f4c1A0a";
  const mounted = useIsMounted();
  const { connector: activeConnector, isConnected } = useAccount();
  const [candidatename, setCandidate] = React.useState("");
  const [candidateparty, setCandidateParty] = React.useState("");
  const [datastatus, setDataStatus] = React.useState(false);

  const { config: candidatecreate } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "createCandidate",
    args: [candidatename, candidateparty],
    enabled: datastatus,
    onSuccess(data) {
      setDataStatus(false);
    },
  });
  const { write: turnr7 } = useContractWrite(candidatecreate);
  const adddata = async () => {
    try {
      await turnr7?.();
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonCreate = () => {
    // Do something with the input value
    setDataStatus(true);
    console.log("Input value:", candidatename, candidateparty);
    adddata();
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
              <h1 className="text-2xl font-bold mb-4 text-center">
                Add Candidate
              </h1>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Candidate Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => setCandidate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="party" className="block font-medium mb-2">
                  Candidate Party:
                </label>
                <input
                  type="text"
                  id="party"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => setCandidateParty(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleButtonCreate}
              >
                Submit
              </button>
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
