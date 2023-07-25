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

const Vote = () => {
  const address1 = "0x05C8Ed3950dD7B6b12A8e3BB918ED90073E01A15";
  const mounted = useIsMounted();
  const [tokenvote, settokenvote] = React.useState("");
  const { connector: activeConnector, isConnected } = useAccount();
  let myarray = [];
  const { data: allcandidate } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "getAllCandidates",
    watch: true,
  });

  if (allcandidate) {
    // @ts-ignores
    myarray = [...allcandidate];
  }
  const { config: votedata } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "vote",
    args: [tokenvote],
    enabled: Boolean(tokenvote),
  });
  const { write: turnr1 } = useContractWrite(votedata);
  const vote = async () => {
    try {
      await turnr1?.();
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick1 = (index) => {
    settokenvote(index);
    console.log(`Button ${index} clicked`);
    vote();
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
            <div className="rounded-lg border border-primary-dark w-600 h-300 bg-white">
              <h6 className="text-center text-xl font-medium text-primary-dark mb-5">
                List of Candidates
              </h6>
              <div className="flex flex-col gap-8">
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">No</th>
                      <th className="px-4 py-2">Candidate Name</th>
                      <th className="px-4 py-2">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myarray.map(([index, candidate], i) => (
                      <tr>
                        <td className="border px-4 py-2">{i}</td>
                        <td className="border px-4 py-2">{index}</td>
                        <td className="border px-4 py-2">{candidate}</td>
                        <td className="border px-4 py-2">
                          {" "}
                          <button
                            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full"
                            onClick={() => handleButtonClick1(i + 1)}
                          >
                            vote
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Vote;
