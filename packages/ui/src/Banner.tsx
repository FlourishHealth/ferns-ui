import React from "react";

import {Box} from "./Box";
import {BoxColor, ButtonColor, Rounding, TextColor} from "./Common";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

// import {faTimesCircle, faArrowRight} from "@fortawesome/free-solid-svg-icons";

export interface BannerProps {
  id: string;
  text: string;
  subtext?: string;
  color?: BoxColor;
  textColor?: TextColor;
  negativeXMargin?: number;
  bold?: boolean;
  shape?: Rounding;
  type?: "dismiss" | "action";
  onClick?: () => void;
}

// library.add(faTimesCircle);
// library.add(faArrowRight);

interface BannerState {
  show: boolean;
}

function getKey(id: string) {
  return `@ReactUnifier:${id}`;
}

export const hideBanner = (id: string) => {
  console.debug(`[banner] Hiding ${getKey(id)} `);
  Unifier.storage.setItem(getKey(id), "true");
};

export class Banner extends React.Component<BannerProps, BannerState> {
  state = {show: false};

  async componentDidMount() {
    const seen = await Unifier.storage.getItem(getKey(this.props.id));
    console.debug(`[banner] ${getKey(this.props.id)} seen? ${seen}`);
    this.setState({show: !seen});
  }

  dismiss = () => {
    hideBanner(this.props.id);
    this.setState({show: false});
  };

  render() {
    if (!this.state.show) {
      return null;
    }
    const type = this.props.type || "dismiss";

    if (type === "action" && !this.props.onClick) {
      console.warn("Banners with type action require an onClick property.");
    }
    const negativeMargin = (this.props.negativeXMargin || 0) * -4;

    return (
      <Box
        color={this.props.color || "secondaryDark"}
        dangerouslySetInlineStyle={{
          __style: {
            marginLeft: negativeMargin,
            marginRight: negativeMargin,
          },
        }}
        direction="row"
        justifyContent="between"
        marginBottom={3}
        marginTop={3}
        paddingX={3}
        paddingY={2}
        rounding={this.props.shape}
        shadow
        width={Unifier.utils.dimensions().width || "100%"}
        onClick={this.dismiss}
      >
        <Box alignItems="center" direction="column" flex="shrink" justifyContent="center">
          <Box paddingY={1}>
            <Text align="center" color={this.props.textColor || "white"} weight="bold">
              {this.props.text}
            </Text>
          </Box>
          {this.props.subtext && (
            <Box paddingY={1}>
              <Text align="center" color={this.props.textColor || "white"}>
                {this.props.subtext}
              </Text>
            </Box>
          )}
        </Box>
        <Box alignItems="center" display="block" justifyContent="center" width={40}>
          {type === "dismiss" && (
            <IconButton
              accessibilityLabel=""
              icon="times-circle"
              // size="lg"
              iconColor={(this.props.textColor || "white") as ButtonColor}
              prefix="fas"
              onClick={() => this.dismiss()}
            />
          )}
          {type === "action" && (
            <IconButton
              accessibilityLabel=""
              icon="arrow-right"
              // size="lg"
              iconColor={(this.props.textColor || "white") as ButtonColor}
              prefix="fas"
              onClick={() => this.props.onClick && this.props.onClick()}
            />
          )}
        </Box>
      </Box>
    );
  }
}
