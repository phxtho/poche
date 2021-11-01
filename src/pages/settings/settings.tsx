import React, { FunctionComponent, useState } from "react";
import PeerDetailsModal from "components/peer-details-modal/peer-details-modal";
import { ImQrcode } from "react-icons/im";
import { BsUpcScan } from "react-icons/bs";
import PeerConnections from "components/peer-connections/peer-connections";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [showPeerDetails, setShowPeerDetails] = useState(false);

  return (
    <>
      <div className="p-5">
        <div className="flex flex-col items-center">
          <h1>Connected Devices</h1>
          <PeerConnections />

          <h1>Add Devices</h1>
          <div className="flex items-center justify-center w-full flex-wrap md:space-x-4">
            <button
              className="rounded-3xl bg-black text-white flex space-x-1 p-2 items-center justify-center w-full md:w-1/3 mb-2"
              onClick={() => setShowPeerDetails(true)}
            >
              <ImQrcode /> <span>Show QR Code</span>
            </button>
            <button className="rounded-3xl bg-black text-white flex space-x-1 p-2 items-center justify-center w-full md:w-1/3 mb-2">
              <BsUpcScan /> <span>Scan</span>
            </button>
          </div>
        </div>
      </div>
      <PeerDetailsModal
        isOpen={showPeerDetails}
        onRequestClose={() => setShowPeerDetails(false)}
      />
    </>
  );
};

export default Settings;
