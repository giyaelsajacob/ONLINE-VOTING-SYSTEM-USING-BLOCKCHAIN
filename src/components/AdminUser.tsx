import React from "react";
import {
  CheckCircleIcon,
  PencilIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const AdminUser = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row justify-center items-center space-x-20">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Change Authority</h2>
          <img
            src="/images/admin.jpg"
            alt="Change Authority"
            className="w-64 h-64 mb-4"
          />
          <Link href="/change">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
              <PencilIcon className="h-5 w-5 mr-2 inline-block" />
              Change
            </button>
          </Link>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add Candidate</h2>
          <img
            src="/images/candidate.png"
            alt="Change Authority"
            className="w-64 h-64 mb-4"
          />
          <Link href="/addcandidate">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
              <CheckCircleIcon className="h-5 w-5 mr-2 inline-block" />
              Add
            </button>
          </Link>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Others</h2>
          <img
            src="/images/settings.png"
            alt="Change Authority"
            className="w-64 h-64 mb-4"
          />
          <Link href="/options">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
              <PencilIcon className="h-5 w-5 mr-2 inline-block" />
              Other Actions
            </button>
          </Link>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Data</h2>
          <img
            src="/images/641101.png"
            alt="Change Authority"
            className="w-64 h-64 mb-4"
          />
          <Link href="/data">
            <button className="bg-gray-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg mb-4">
              <CircleStackIcon className="h-5 w-5 mr-2 inline-block" />
              View Data
            </button>
          </Link>
        </div>

        {/* <div className="bg-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Image Position</h2>
          <div className="w-64 h-64 bg-gray-400 rounded-lg"></div>
          
        </div> */}
      </div>
    </div>
  );
};

export default AdminUser;
