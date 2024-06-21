import React, {useContext} from "react";
import {View} from "react-native";

import {BannerProps, SurfaceTheme} from "./Common";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";
import {Unifier} from "./Unifier";

function getKey(id: string): string {
  return `@FernsUI:${id}`;
}

export const hideBanner = (id: string): Promise<void> => {
  console.debug(`[banner] Hiding ${getKey(id)} `);
  return Unifier.storage.setItem(getKey(id), "true");
};

export const Banner = ({
  // id,
  text,
  status = "info",
  // dismissible = false,
  // hasIcon = false,
  // buttonProps,
}: BannerProps): React.ReactElement | null => {
  const {theme} = useContext(ThemeContext);

  let bgColor: keyof SurfaceTheme = "secondaryDark";

  if (status === "alert") {
    bgColor = "error";
  } else if (status === "warning") {
    bgColor = "warning";
  }

  // // If the banner is not type dismiss, show it immediately.
  // const [show, setShow] = useState(dismissible);

  // // Load seen from async storage.
  // useEffect(() => {
  //   if (dismissible) {
  //     void Unifier.storage.getItem(getKey(id)).then((isSeen) => {
  //       console.debug(`[banner] ${getKey(id)} seen? ${isSeen}`);
  //       setShow(!isSeen);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // const dismiss = async (): Promise<void> => {
  //   if (!dismissible) {
  //     return;
  //   }
  //   await hideBanner(id);
  //   setShow(false);
  // };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.surface[bgColor],
        height: "auto",
        width: "auto",
        flexDirection: "row",
      }}
    >
      <Text align="center" color="inverted">
        {text}
      </Text>
    </View>
  );
};
