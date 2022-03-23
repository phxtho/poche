import { FunctionComponent, useCallback, useState, useEffect } from "react";
import Modal, { Styles } from "react-modal";
import jsQR from "jsqr";

interface QRCodeScannerProps {
  isOpen?: boolean;
  onAfterOpen?;
  onRequestClose?;
  onScanned?;
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

const QRCodeScanner: FunctionComponent<QRCodeScannerProps> = (props) => {
  const [canvasEl, setCanvasEl] = useState(null);
  const [videoEl, setVideoEl] = useState(null);
  const [_, setScannedData] = useState<string>("");
  const [stream, setStream] = useState<MediaStream>();

  const canvasRef = useCallback((node) => {
    if (node !== null) {
      setCanvasEl(node);
    }
  }, []);
  const videoRef = useCallback((node) => {
    if (node !== null) {
      setVideoEl(node);
    }
  }, []);

  useEffect(() => {
    const constraints = {
      video: { facingMode: "environment", frameRate: { ideal: 10, max: 15 } },
    };

    try {
      navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        setStream(mediaStream);
        if (videoEl) {
          videoEl.srcObject = mediaStream;
          videoEl.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
          videoEl.play();
          requestAnimationFrame(tick);
        }
      });
    } catch (error) {
      console.log(`Couldn't set up video stream \n:${error}`);
    }

    return () => {
      tick = null;
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [videoEl]);

  // Attempt to close the video stream while QRCode component is in the DOM
  useEffect(() => {
    if (!props.isOpen && stream?.active) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, [props.isOpen, stream]);

  let tick = () => {
    if (videoEl && videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
      let canvasCtx = canvasEl.getContext("2d");

      canvasEl.height = videoEl.videoHeight;
      canvasEl.width = videoEl.videoWidth;
      canvasCtx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      var imageData = canvasCtx.getImageData(
        0,
        0,
        canvasEl.width,
        canvasEl.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code?.data) {
        console.log("Got QR Code");
        console.log(code.data);
        setScannedData(code.data);
        props?.onScanned(code.data);
        tick = null;
      }
    }
    if (tick) requestAnimationFrame(tick);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterClose={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={modalStyle}
    >
      <canvas id="videoOutCanvas" ref={canvasRef} hidden></canvas>
      <video id="video" ref={videoRef}></video>
    </Modal>
  );
};

export default QRCodeScanner;
