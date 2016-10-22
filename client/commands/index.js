import moveCamera from "./move-camera";
import movePlayer from "./move-player";
import quitGame from "./quit-game";
import setInputMode from "./set-input-mode";
import debugIpc from "./debug-ipc";
import toggleCameraFreeze from "./toggle-camera-freeze";
import spawnGoblin from "./spawn-goblin";
import delay from "./delay";

export default {
  "MOVE_CAMERA":          moveCamera,
  "MOVE_PLAYER":          movePlayer,
  "SET_INPUT_MODE":       setInputMode,
  "QUIT_GAME":            quitGame,
  "DEBUG_IPC":            debugIpc,
  "TOGGLE_CAMERA_FREEZE": toggleCameraFreeze,
  "SPAWN_GOBLIN":         spawnGoblin, 
  "DELAY":                delay,
};
