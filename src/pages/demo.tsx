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
  let canvasElement: HTMLCanvasElement;

  useEffect(() => {
    // Generate QR Code
    let canvas = document.getElementById("qrcode");
    QRCode?.toCanvas(canvas, localStorage.getItem("peerId"));

    // Read QR Code
    canvasElement = document.getElementById(
      "outputCanvas"
    ) as HTMLCanvasElement;

    video = document.getElementById("video");

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
      });
  }, []);

  let tick = () => {
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      let canvasCtx = canvasElement.getContext("2d");

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvasCtx.drawImage(
        video,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var imageData = canvasCtx.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
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
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <SearchBar />
      </div>
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

      <canvas id="qrcode"></canvas>
      <canvas id="outputCanvas" hidden></canvas>
      <video id="video"></video>
    </div>
  );
}
