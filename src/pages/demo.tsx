import React, { useEffect, useState } from "react";
import SearchBar from "components/searchbar/searchbar";
import { Connect, Replicate } from "replication/webrtc";
import QRCode from "qrcode";
import jsQR from "jsqr";
import PeerConnections from "components/peer-connections/peer-connections";

export default function Demo() {
  const [peerId, setPeerId] = useState<string>("");
  const [dataToSend, setDataToSend] = useState<string>();
  let qrcode;
  let video;
  let videoOutCanvasElement: HTMLCanvasElement;

  const setupVideoStream = async () => {
    const constraints = {
      video: { facingMode: "environment", frameRate: { ideal: 10, max: 15 } },
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);

    video = document.getElementById("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
  };

  useEffect(() => {
    // Generate QR Code
    let canvas = document.getElementById("qrcode");
    QRCode?.toCanvas(canvas, localStorage.getItem("peerId"));

    // Read QR Code
    videoOutCanvasElement = document.getElementById(
      "videoOutCanvas"
    ) as HTMLCanvasElement;
  }, []);

  let tick = () => {
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      let canvasCtx = videoOutCanvasElement.getContext("2d");

      videoOutCanvasElement.height = video.videoHeight;
      videoOutCanvasElement.width = video.videoWidth;
      canvasCtx.drawImage(
        video,
        0,
        0,
        videoOutCanvasElement.width,
        videoOutCanvasElement.height
      );
      var imageData = canvasCtx.getImageData(
        0,
        0,
        videoOutCanvasElement.width,
        videoOutCanvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        console.log("Got QR Code");
        console.log(code.data);
        setPeerId(code.data);
      }
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  return (
    <>
      <div className="flex">
        <div className="flex flex-col">
          <input
            className="border border-black"
            type="text"
            value={peerId}
            onChange={(e) => {
              setPeerId(e.target.value);
            }}
          />
          <button
            className="rounded bg-blue-500 text-white"
            onClick={(e) => {
              Connect(peerId);
            }}
          >
            Connect
          </button>
        </div>
        <div className="flex flex-col">
          <textarea
            className="border border-black"
            onChange={(e) => {
              setDataToSend(e.target.value);
            }}
          ></textarea>
          <button
            className="bg-green-500 text-white rounded"
            onClick={(e) => {
              Replicate();
            }}
          >
            Send
          </button>
        </div>
      </div>

      <PeerConnections />
      <canvas id="videoOutCanvas" hidden></canvas>
      <video id="video"></video>
    </>
  );
}
