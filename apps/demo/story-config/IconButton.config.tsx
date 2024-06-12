// import {Box, Heading, IconButton, IconButtonProps} from "ferns-ui";
// import React from "react";

// import {StorybookContainer} from "./StorybookContainer";

// interface DisplayProps extends IconButtonProps {
//   title: string;
// }

// const IconButtonDisplay = (props: DisplayProps): React.ReactElement => {
//   const {title, ...rest} = props;
//   return (
//     <Box paddingY={2}>
//       <Box paddingY={1}>
//         <Heading size="sm">{title}</Heading>
//       </Box>
//       <Box direction="row" width="100%">
//         <Box color="white" padding={4}>
//           <IconButton {...rest} />
//         </Box>
//         <Box color="lightGray" padding={4}>
//           <IconButton {...rest} />
//         </Box>
//         <Box color="darkGray" padding={4}>
//           <IconButton {...rest} />
//         </Box>
//         <Box color="blue" padding={4}>
//           <IconButton {...rest} />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export const IconButtonStories = {
//   title: "IconButton",
//   component: IconButton,
//   stories: {
//     Colors() {
//       return (
//         <StorybookContainer>
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             title="Primary, Transparent Background"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="secondary"
//             prefix="fas"
//             title="Secondary, Transparent Background"
//             onClick={() => {}}
//           />

//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             size="sm"
//             title="Small Size"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             size="md"
//             title="Medium Size"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             size="lg"
//             title="Large Size"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             size="xl"
//             title="XL Size"
//             onClick={() => {}}
//           />

//           <IconButtonDisplay
//             accessibilityLabel="label"
//             bgColor="lightGray"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             title="Light Gray Background"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             bgColor="primary"
//             icon="plus"
//             iconColor="white"
//             prefix="fas"
//             title="Active State White Icon with Primary Background"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             bgColor="gray"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             title="Gray Background"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             bgColor="transparentDarkGray"
//             icon="plus"
//             iconColor="primary"
//             prefix="fas"
//             title="Primary, Dark Gray Transparent"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             bgColor="transparentDarkGray"
//             icon="plus"
//             iconColor="white"
//             prefix="fas"
//             title="White, Dark Gray Transparent"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             prefix="fas"
//             size="sm"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorStyle={{position: "topRight", color: "red"}}
//             prefix="fas"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorStyle={{position: "bottomRight", color: "green"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorStyle={{position: "bottomLeft", color: "blue"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorStyle={{position: "topLeft", color: "purple"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />

//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorNumber={33}
//             prefix="fas"
//             size="sm"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorNumber={33}
//             indicatorStyle={{position: "topRight", color: "red"}}
//             prefix="fas"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorNumber={33}
//             indicatorStyle={{position: "bottomRight", color: "green"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorNumber={33}
//             indicatorStyle={{position: "bottomLeft", color: "blue"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//           <IconButtonDisplay
//             accessibilityLabel="label"
//             icon="plus"
//             iconColor="primary"
//             indicator
//             indicatorNumber={33}
//             indicatorStyle={{position: "topLeft", color: "purple"}}
//             prefix="fas"
//             size="lg"
//             title="Button with indicator"
//             onClick={() => {}}
//           />
//         </StorybookContainer>
//       );
//     },
//     Confirmation() {
//       return (
//         <Box padding={4}>
//           <IconButton
//             accessibilityLabel="Button with plus icon"
//             bgColor="gray"
//             icon="plus"
//             iconColor="white"
//             prefix="fas"
//             withConfirmation
//             onClick={() => {
//               console.log("Clicked!");
//             }}
//           />
//         </Box>
//       );
//     },
//   },
// };
