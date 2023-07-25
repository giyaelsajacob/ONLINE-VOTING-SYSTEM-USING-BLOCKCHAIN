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
  const [inputadmin, setInputAdmin] = useState("");
  const [adminstatus, setAdminStatus] = React.useState(false);
  const handleInputChange = (event) => {
    setInputAdmin(event.target.value);
  };
  const { config: adminchange } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "changeAuthority",
    args: [inputadmin],
    enabled: adminstatus,
    onSuccess(data) {
      setAdminStatus(false);
    },
  });
  const { write: turnr2 } = useContractWrite(adminchange);
  const changeAdmin = async () => {
    try {
      await turnr2?.();
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonAdmin = () => {
    // Do something with the input value
    setAdminStatus(true);
    console.log("Input value:", inputadmin);
    changeAdmin();
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
                Change Authority
              </h1>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-2">
                  User Address:
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleButtonAdmin}
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
