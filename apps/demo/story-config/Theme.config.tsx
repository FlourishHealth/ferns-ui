// import {Box, Button, Field, Heading, SelectList, Text, ThemeContext} from "ferns-ui";
// import React, {useContext, useEffect, useState} from "react";

// function buttonsForColor(color: "primary" | "secondary" | "accent" | "tertiary") { return ( <>
// <Box paddingY={1}> <Button color={`${color}Lighter` as any} text={`${color} Lighter Ghost`}
// onClick={() => {}} /> </Box> <Box paddingY={1}> <Button color={`${color}Light` as any}
// text={`${color} Light Ghost`} onClick={() => {}} /> </Box> <Box paddingY={1}> <Button
// color={color} text={`${color} Solid`} onClick={() => {}} /> </Box> <Box paddingY={1}> <Button
// color={`${color}Dark` as any} text={`${color} Dark Ghost`} onClick={() => {}} /> </Box> <Box
// paddingY={1}> <Button color={`${color}Darker` as any} text={`${color} Darker Ghost`} onClick={()
// => {}} /> </Box> <Box paddingY={1}> <Button color={color} text={`${color} Ghost`} type="ghost"
// onClick={() => {}} /> </Box> <Box paddingY={1}> <Button color={color} text={`${color} Outline`}
// type="outline" onClick={() => {}} /> </Box> </> );
// }

// const ButtonStories = () => {
//   const [themeName, setThemeName] = useState<"purple" | "pink">("purple");
//   const {setTheme} = useContext(ThemeContext);

//   // Set the theme based on the theme name
//   useEffect(() => {
//     if (themeName === "pink") {
//       setTheme({
//         primary: "#e0218a",
//         secondary: "#ed5c9b",
//         tertiary: "#f18dbc",
//         // Leaving accent as default
//       });
//     } else if (themeName === "purple") {
//       setTheme({
//         primary: "#5c58bb",
//         secondary: "#8d58bb",
//         tertiary: "#58b3bb",
//         // Leaving accent as default
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [themeName]);
//   return (
//     <Box
//       direction="column"
//       display="flex"
//       justifyContent="around"
//       marginLeft={2}
//       marginTop={12}
//       width={300}
//     >
//       <Box paddingY={2}>
//         <SelectList
//           options={[
//             {label: "Pink", value: "pink"},
//             {label: "Purple", value: "purple"},
//           ]}
//           value={themeName}
//           onChange={(value) => {
//             setThemeName(value as any);
//           }}
//         />
//       </Box>
//       {buttonsForColor("primary")}
//       {buttonsForColor("secondary")}
//       {buttonsForColor("accent")}
//       {buttonsForColor("tertiary")}
//     </Box>
//   );
// };

// const FontStories = () => { const [font, setFont] = useState("DancingScript-Regular");
// const {setTheme} = useContext(ThemeContext); const fonts = ["Comfortaa-Light", "Comfortaa-Bold",
// "IMFellEnglishSC", "DancingScript-Regular"];

//   // Set the theme on mount.
//   useEffect(() => {
//     setTheme({
//       primaryFont: "DancingScript-Regular",
//       primaryBoldFont: "DancingScript-Regular",
//       buttonFont: "DancingScript-Regular",
//       titleFont: "DancingScript-Regular",
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <Box
//       direction="column"
//       display="flex"
//       height={300}
//       justifyContent="around"
//       padding={4}
//       width={300}
//     >
//       <Field
//         options={fonts.map((f) => ({label: f, value: f}))}
//         type="select"
//         value={font}
//         onChange={(value: string) => {
//           setFont(value);
//           setTheme({
//             primaryFont: value,
//             primaryBoldFont: value,
//             buttonFont: value,
//             titleFont: value,
//           });
//         }}
//       />
//       <Heading>This is a heading</Heading>
//       <Text>This is some text in a new font</Text>
//       <Text weight="bold">And some bolded text in a new font</Text>
//       <Button color="blue" text="Some Button Text" onClick={() => {}} />
//       <Field
//         helperText="Here's some help text"
//         label="Text Field"
//         name="text"
//         placeholder="Placeholder text"
//         type="text"
//         value=""
//         onChange={(): void => {}}
//       />
//     </Box>
//   );
// };

// export const ThemeStories = {
//   title: "Theme",
//   stories: {
//     ButtonTheme() {
//       return <ButtonStories />;
//     },
//     FontTheme() {
//       return <FontStories />;
//     },
//   },
// };
