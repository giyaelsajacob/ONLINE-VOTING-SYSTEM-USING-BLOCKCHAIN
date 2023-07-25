// @ts-nocheck
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import config from "../contractconfig.json";
import { useConnect, useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@material-ui/core";
import AdminUser from "@/components/AdminUser";
import User from "@/components/User";
import styles from "../styles/Marquee.module.css";
export default function Home() {
  const address1 = "0x05C8Ed3950dD7B6b12A8e3BB918ED90073E01A15";
  const { address, isConnecting, isDisconnected } = useAccount();
  const mounted = useIsMounted();
  const [data1, setData] = useState(null);
  const [inputadmin, setInputAdmin] = useState("");
  const [totalvotes, setTotalVotes] = useState(0);
  const [electionAuthority, setelectionAuthority] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const [tokenvote, settokenvote] = React.useState("");
  const [votestatus, setVoteStatus] = React.useState(false);
  const [adminstatus, setAdminStatus] = React.useState(false);
  const [candidatename, setCandidate] = React.useState("");
  const [candidateparty, setCandidateParty] = React.useState("");
  const [datastatus, setDataStatus] = React.useState(false);
  const { connector: activeConnector, isConnected } = useAccount();
  let myarray = [];
  const {
    data: admin,
    isError,
    isLoading,
  } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "electionAuthority",
    watch: true,
  });

  const { data: votingopen } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "isVotingOpen",
    watch: true,
  });
  const { data: allcandidate } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "getAllCandidates",
    watch: true,
  });
  const { data: candidatecount1 } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "candidateCount",
    watch: true,
  });
  const { data: totalvoteread } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "totalVotes",
    watch: true,
    onSuccess(data) {
      setTotalVotes(parseInt(data, 16));
    },
  });
  const { data: electionauth } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "electionAuthority",
    watch: true,
    onSuccess(data) {
      setelectionAuthority(data);
    },
  });
  const { data: voted } = useContractRead({
    address: address1,
    abi: config.abi,
    functionName: "hasVoted",
    watch: true,
    onSuccess(data) {
      setIsVoted(data);
      console.log(data);
    },
  });
  //write contract
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
  // admin data
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

  const { config: closeelection } = usePrepareContractWrite({
    address: address1,
    abi: config.abi,
    functionName: "closeElection",
  });
  const { write: turnr6 } = useContractWrite(deployelection);
  const closevote = async () => {
    try {
      await turnr6?.();
    } catch (error) {
      console.log(error);
    }
  };

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

  //function state change
  const handleInputChange = (event) => {
    setInputAdmin(event.target.value);
  };

  const handleButtonAdmin = () => {
    // Do something with the input value
    setAdminStatus(true);
    console.log("Input value:", inputadmin);
    changeAdmin();
  };
  const handleButtonCreate = () => {
    // Do something with the input value
    setDataStatus(true);
    console.log("Input value:", candidatename, candidateparty);
    adddata();
  };

  const handleButtonClick1 = (index) => {
    settokenvote(index);
    console.log(`Button ${index} clicked`);
    vote();
  };

  if (allcandidate) {
    // @ts-ignores
    myarray = [...allcandidate];
  }
  //
  //ui
  // @ts-ignores
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
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10">
        <div className="flex justify-end">
          <ConnectButton showBalance={false} />
        </div>
        {mounted && isConnected ? (
          <div>
            <h1 className="text-center text-4xl font-bold text-white bg-blue-500 py-4 px-6 rounded-lg shadow-md">
              MBC ELECTIONS 2023
            </h1>

            {admin === address ? (
              <AdminUser />
            ) : (
              <div className="flex justify-center">
                {votingopen ? <User /> : <div> voting not open</div>}
              </div>
            )}
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
}
