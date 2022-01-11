import React, { FunctionComponent, useState } from "react";
import PeerDetailsModal from "components/peer-details-modal/peer-details-modal";
import { ImQrcode } from "react-icons/im";
import { BsUpcScan } from "react-icons/bs";
import PeerConnections from "components/peer-connections/peer-connections";
import QRCodeScanner from "components/qr-code-scanner/qr-code-scanner";
import FileUploadBtn from "components/file-upload-btn/file-upload-btn";
import { Connect, Replicate } from "replication/webrtc";
import ImportFromHtml from "utils/import/importHtml";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [showPeerDetails, setShowPeerDetails] = useState(false);
  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);
  return (
    <>
      <div className="p-5">
        <h1>Import HTML</h1>
        <FileUploadBtn
          accept=".html"
          onUpload={(files) => ImportFromHtml(files)}
        />
        <h1>Replication</h1>
        <div className="flex flex-col items-center">
          <h3>Connected Devices</h3>
          <PeerConnections />

          <h3>Add Devices</h3>
          <div className="flex items-center justify-center w-full flex-wrap md:space-x-4">
            <button
              className="rounded-3xl bg-black text-white flex space-x-1 p-2 items-center justify-center w-full md:w-1/3 mb-2"
              onClick={() => setShowPeerDetails(true)}
            >
              <ImQrcode /> <span>Show QR Code</span>
            </button>
            <button
              className="rounded-3xl bg-black text-white flex space-x-1 p-2 items-center justify-center w-full md:w-1/3 mb-2"
              onClick={() => setShowQRCodeScanner(true)}
            >
              <BsUpcScan /> <span>Scan</span>
            </button>
          </div>
        </div>
      </div>
      <PeerDetailsModal
        isOpen={showPeerDetails}
        onRequestClose={() => setShowPeerDetails(false)}
      />

      <QRCodeScanner
        isOpen={showQRCodeScanner}
        onRequestClose={() => setShowQRCodeScanner(false)}
        onScanned={async (data) => {
          Connect(data);
          await Replicate();
          setShowQRCodeScanner(false);
        }}
      />
    </>
  );
};

export default Settings;
