import Constants from "expo-constants";

const { manifest } = Constants;

export const baseUrl = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:3001/`;
