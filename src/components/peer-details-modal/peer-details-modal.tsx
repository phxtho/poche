import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import Modal, { Styles } from "react-modal";
import QRCode from "qrcode";

interface PeerDetailsModalProps {
  isOpen?: boolean;
  onAfterOpen?;
  onRequestClose?;
}

const modalStyle: Styles = {
  content: {
    borderRadius: ".5rem",
    height: "fit-content",
    maxWidth: "40rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
Modal.setAppElement("#root");

const PeerDetailsModal: FunctionComponent<PeerDetailsModalProps> = (
  props: PeerDetailsModalProps
) => {
  const [peerId, setPeerId] = useState<string>();
  const [canvasEl, setCanvasEl] = useState(null);

  const canvasRef = useCallback((node) => {
    if (node !== null) {
      setCanvasEl(node);
    }
  }, []);

  useEffect(() => {
    const storedPeerId = localStorage.getItem("peerId");
    setPeerId(storedPeerId);
  }, []);

  useEffect(() => {
    if (canvasEl) QRCode?.toCanvas(canvasEl, peerId);
  }, [peerId, canvasEl]);

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterClose={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={modalStyle}
    >
      <div className="flex flex-col justify-center items-center">
        <canvas id="qrcode" ref={canvasRef} />
        <p className="text-center">{peerId}</p>
      </div>
    </Modal>
  );
};

export default PeerDetailsModal;
