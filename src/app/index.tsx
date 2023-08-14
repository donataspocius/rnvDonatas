import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { store } from "./state/store";
import MainTab from "./navigation/MainTab";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent" />
      <MainTab />
    </Provider>
  );
}

export default App;

// import React, { useContext, useEffect, useState } from "react";
// import { Text, Image, View, PixelRatio, TouchableOpacity } from "react-native";
// import { Api } from "@rnv/renative";
// import {
//   ICON_LOGO,
//   CONFIG,
//   ThemeProvider,
//   ThemeContext,
//   testProps,
// } from "../config";
// import packageJson from "../../package.json";
// import Main from "./screens/Main";

// const App = () => (
//   <ThemeProvider>
//     {/* <AppThemed /> */}
//     <Main />
//   </ThemeProvider>
// );

// const AppThemed = () => {
//   const { theme, toggle }: any = useContext(ThemeContext);

//   const [pixelRatio, setPixelRatio] = useState(1);
//   const [fontScale, setFontScale] = useState(1);

//   useEffect(() => {
//     setPixelRatio(PixelRatio.get());
//     setFontScale(PixelRatio.getFontScale());
//   }, []);

//   return (
//     <View style={theme.styles.container}>
//       <Image
//         style={theme.styles.image}
//         source={ICON_LOGO}
//         {...testProps("template-starter-home-screen-renative-image")}
//       />
//       <Text
//         style={theme.styles.textH2}
//         {...testProps("template-starter-home-screen-welcome-message-text")}
//       >
//         {CONFIG.welcomeMessage}
//       </Text>
//       <Text
//         style={theme.styles.textH2}
//         {...testProps("template-starter-home-screen-version-number-text")}
//       >
//         v {packageJson.version}
//       </Text>
//       <Text style={theme.styles.textH3}>
//         {`platform: ${Api.platform}, factor: ${Api.formFactor}, engine: ${Api.engine}`}
//       </Text>
//       <Text style={theme.styles.textH3}>
//         {
//           //@ts-ignore
//           `hermes: ${global.HermesInternal === undefined ? "no" : "yes"}`
//         }
//       </Text>
//       <Text
//         style={theme.styles.textH3}
//       >{`pixelRatio: ${pixelRatio}, ${fontScale}`}</Text>
//       <TouchableOpacity
//         onPress={toggle}
//         style={theme.styles.button}
//         {...testProps("template-starter-home-screen-try-my-button")}
//       >
//         <Text style={theme.styles.buttonText}>Try me!</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;
