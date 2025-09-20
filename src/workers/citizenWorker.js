// citizenWorker.js
import { createCitizen } from "../data/citizens";

self.onmessage = (e) => {
  const { size } = e.data;
  const citizens = Array.from({ length: size }, (_, i) => createCitizen(i + 1));
  self.postMessage(citizens);
};
