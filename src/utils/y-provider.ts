import { Doc } from "yjs";
import { WebrtcProvider } from "y-webrtc";

interface User {
  name: string;
  color?: string;
}

function randomColor(): string {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomHex;
}

function getWebRTCProvider(roomId, user: User): WebrtcProvider {
  const ydoc = new Doc();
  const provider = new WebrtcProvider("poche-room", ydoc);
  provider.awareness.setLocalStateField("user", {
    color: user.color ?? randomColor(),
    name: user.name,
  });
  return provider;
}

export { getWebRTCProvider };
