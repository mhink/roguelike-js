import installElectronDebug from 'electron-debug';

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer';

const installDevTools = async () => {
  installElectronDebug();
  try {
    await installExtension(REACT_DEVELOPER_TOOLS);
    console.log('Installed React developer tools.');
    await installExtension(REDUX_DEVTOOLS);
    console.log('Installed Redux developer tools.');
  } catch (err) {
    console.log(`Error installing extensions: ${err}`);
  }
};

export default installDevTools;
