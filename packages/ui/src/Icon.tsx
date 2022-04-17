import {FontAwesome} from "@expo/vector-icons";
import React from "react";
import {iconNumberToSize, IconProps, iconSizeToNumber} from "./Common";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {library} from "@fortawesome/fontawesome-svg-core";
// import {library} from "@fortawesome/fontawesome-svg-core";
// // import {fal as proFal} from "@fortawesome/pro-light-svg-icons";
// import {
//   faHeart as farHeart,
//   // faPlus as farPlus,
//   faEdit as farEdit,
//   faNewspaper as farNewspaper,
// } from "@fortawesome/free-regular-svg-icons";
// import {
//   faChevronLeft,
//   faEnvelopeOpen,
//   faCarrot,
//   faComment,
//   faUserCircle,
//   faSearch,
//   faChevronRight,
//   faEllipsisV,
//   faPaperPlane,
//   faExclamationCircle,
//   faMailBulk,
//   faTrashAlt,
//   faTrashRestoreAlt,
//   faEnvelope,
//   faSpinner,
// } from "@fortawesome/free-solid-svg-icons";
import {Unifier} from "./Unifier";
// library.add(
//   farHeart,
//   // farPlus,
//   farEdit,
//   farNewspaper,
//   faChevronLeft,
//   faCarrot,
//   faComment,
//   faUserCircle,
//   faEnvelopeOpen,
//   faSearch,
//   faChevronRight,
//   faEllipsisV,
//   faPaperPlane,
//   faExclamationCircle,
//   faMailBulk,
//   faTrashAlt,
//   faTrashRestoreAlt,
//   faEnvelope,
//   faSpinner
// );

export function initIcons() {
  console.log("Initializing icons");
}

let iconSet = new Set();

function addIcon(icon: string, prefix = "far") {
  let prev = new Set(iconSet);
  iconSet.add(`${prefix}-${icon}`);
  if (
    prev.size !== iconSet.size &&
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  ) {
    console.debug("[Icon] current icon set:", iconSet);
  }
}

export class Icon extends React.Component<IconProps, {}> {
  render() {
    addIcon(this.props.name, this.props.prefix);
    const color = Unifier.theme[this.props.color || "primary"];
    let size: string = iconNumberToSize(this.props.size);
    if (size === "xl") {
      size = "2x";
    } else if (size === "md") {
      size = "1x";
    }
    return <FontAwesome icon={this.props.name as any} color={color} size={size as any} />;
  }
}

export class IconExpo extends React.Component<IconProps, {}> {
  render() {
    const color = Unifier.theme[this.props.color || "primary"];
    // Standardize the size (pretty hacky..)
    let size = iconSizeToNumber(iconNumberToSize(this.props.size));
    return (
      <FontAwesome
        icon={[this.props.prefix || "far", this.props.name as any]}
        color={color}
        size={size}
      />
    );
    // const {name, prefix} = this.props;
    // const color = Unifier.theme[this.props.color || "primary"];
    // const size = this.props.size;

    // const map = {
    //   fapro: FAPro,
    //   fas: FAIcon,
    //   fa: FAIcon,
    //   fal: FAIcon,
    //   "fa-brand": FAIcon,
    //   ant: AntDesignIcon,
    //   entypo: EntypoIcon,
    //   evil: EvilIcons,
    //   material: MaterialIcons,
    //   "material-community": MaterialCommunityIcons,
    //   ionicon: Ionicons,
    //   octicon: Octicons,
    //   zocial: Zocial,
    //   "simple-line": SimpleLineIcons,
    //   feather: Feather,
    // };
    // const Component: any = map[prefix];
    // if (!Component) {
    //   console.warn(`[icons] could not find icon: ${prefix}:${name}`);
    //   return null;
    // }

    // if (["fapro", "fal", "fa", "fas", "fa-brand"].indexOf(this.props.prefix) > -1) {
    //   return (
    //     <Component
    //       solid={this.props.prefix === "fas"}
    //       light={this.props.prefix === "fal"}
    //       brand={this.props.prefix === "fa-brand"}
    //       name={name}
    //       color={color}
    //       size={size}
    //     />
    //   );
    // }
    // return <Component name={name} color={color} size={size} />;
  }
}
