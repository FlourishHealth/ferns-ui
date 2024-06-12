import {SaveFormat} from "expo-image-manipulator";
import React, {ReactElement, ReactNode, SyntheticEvent} from "react";
import {ListRenderItemInfo, StyleProp, ViewStyle} from "react-native";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {Styles} from "react-native-google-places-autocomplete";

import {SelectListOptions} from "./SelectList";

export interface BaseProfile {
  email: string;
  id: string;
  backOffice: {
    testUser?: boolean;
  };
}

export interface ThemePrimitiveColors {
  neutral000: string;
  neutral050: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;

  primary000: string;
  primary050: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;

  secondary000: string;
  secondary050: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;

  accent000: string;
  accent050: string;
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;
  accent600: string;
  accent700: string;
  accent800: string;
  accent900: string;

  error000: string;
  error100: string;
  error200: string;

  warning000: string;
  warning100: string;
  warning200: string;

  success000: string;
  success100: string;
  success200: string;
}

export interface ThemePrimitiveRadius {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  radius2xl: number;
  radius3xl: number;
}

export interface ThemePrimitiveSpacing {
  spacing0: number;
  spacing1: number;
  spacing2: number;
  spacing3: number;
  spacing4: number;
  spacing5: number;
  spacing6: number;
  spacing7: number;
  spacing8: number;
  spacing9: number;
  spacing10: number;
  spacing11: number;
  spacing12: number;
}

export type ThemePrimitives = ThemePrimitiveColors & ThemePrimitiveRadius & ThemePrimitiveSpacing;

export interface TextThemeConfig {
  primary: keyof ThemePrimitiveColors;
  inverted: keyof ThemePrimitiveColors;
  secondaryLight: keyof ThemePrimitiveColors;
  extraLight: keyof ThemePrimitiveColors;
  secondaryDark: keyof ThemePrimitiveColors;
  link: keyof ThemePrimitiveColors;
  linkLight: keyof ThemePrimitiveColors;
  accent: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
}

export interface SurfaceThemeConfig {
  base: keyof ThemePrimitiveColors;
  primary: keyof ThemePrimitiveColors;
  secondaryLight: keyof ThemePrimitiveColors;
  secondaryDark: keyof ThemePrimitiveColors;
  secondaryExtraDark: keyof ThemePrimitiveColors;
  neutral: keyof ThemePrimitiveColors;
  neutralLight: keyof ThemePrimitiveColors;
  neutralDark: keyof ThemePrimitiveColors;
  disabled: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  errorLight: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
  successLight: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
  warningLight: keyof ThemePrimitiveColors;
}

export interface BorderThemeConfig {
  default: keyof ThemePrimitiveColors;
  dark: keyof ThemePrimitiveColors;
  activeNeutral: keyof ThemePrimitiveColors;
  activeAccent: keyof ThemePrimitiveColors;
  hover: keyof ThemePrimitiveColors;
  focus: keyof ThemePrimitiveColors;
  error: keyof ThemePrimitiveColors;
  success: keyof ThemePrimitiveColors;
  warning: keyof ThemePrimitiveColors;
}

export interface StatusThemeConfig {
  active: keyof ThemePrimitiveColors;
  doNotDisturb: keyof ThemePrimitiveColors;
  away: keyof ThemePrimitiveColors;
}

export interface RadiusThemeConfig {
  minimal: keyof ThemePrimitiveRadius;
  default: keyof ThemePrimitiveRadius;
  full: keyof ThemePrimitiveRadius;
  rounded: keyof ThemePrimitiveRadius;
}

export interface SpacingThemeConfig {
  none: keyof ThemePrimitiveSpacing;
  xs: keyof ThemePrimitiveSpacing;
  sm: keyof ThemePrimitiveSpacing;
  md: keyof ThemePrimitiveSpacing;
  lg: keyof ThemePrimitiveSpacing;
  xl: keyof ThemePrimitiveSpacing;
  "2xl": keyof ThemePrimitiveSpacing;
  "3xl": keyof ThemePrimitiveSpacing;
}

export interface TextTheme {
  primary: string;
  inverted: string;
  secondaryLight: string;
  extraLight: string;
  secondaryDark: string;
  link: string;
  linkLight: string;
  accent: string;
  error: string;
  warning: string;
  success: string;
}

export interface SurfaceTheme {
  base: string;
  primary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryExtraDark: string;
  neutral: string;
  neutralLight: string;
  neutralDark: string;
  disabled: string;
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
}

export interface BorderTheme {
  default: string;
  dark: string;
  activeNeutral: string;
  activeAccent: string;
  hover: string;
  focus: string;
  error: string;
  success: string;
  warning: string;
}

export interface StatusTheme {
  active: string;
  doNotDisturb: string;
  away: string;
}

export interface RadiusTheme {
  minimal: string;
  default: string;
  full: string;
  rounded: string;
}

export interface SpacingTheme {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export type TextColor = keyof TextTheme;
export type SurfaceColor = keyof SurfaceTheme;
export type BorderColor = keyof BorderTheme;
export type StatusColor = keyof StatusTheme;
// TODO: Remove ButtonColor. Buttons no longer have colors, only types (called style in Figma)
export type ButtonColor =
  | "blue"
  | "gray"
  | "red"
  // | "transparent"
  | "white"
  | "primary"
  | "secondary"
  | "accent"
  | "tertiary"
  | string;

// TODO: we may want/need to expand icon color options from just text colors.
export type IconColor = TextColor;

export interface FontTheme {
  primary: string;
  title: string;
}
export type Font = keyof FontTheme;

export interface FernsTheme {
  text: TextTheme;
  surface: SurfaceTheme;
  border: BorderTheme;
  status: StatusTheme;
  radius: RadiusTheme;
  spacing: SpacingTheme;
  font: FontTheme;
  primitives: ThemePrimitives;
}

export type Direction = "up" | "right" | "down" | "left";

export interface OnChangeResult {
  event?: SyntheticEvent<any>;
  value: string;
}
export type OnChangeCallback = (result: OnChangeResult) => void;

// Update if we start supporting more icon packs from Expo Icons.
export type IconName = FontAwesome5IconName;

export type FontAwesome5IconName =
  | "500px"
  | "accessible-icon"
  | "accusoft"
  | "acquisitions-incorporated"
  | "ad"
  | "address-book"
  | "address-card"
  | "adjust"
  | "adn"
  | "adversal"
  | "affiliatetheme"
  | "air-freshener"
  | "airbnb"
  | "algolia"
  | "align-center"
  | "align-justify"
  | "align-left"
  | "align-right"
  | "alipay"
  | "allergies"
  | "amazon"
  | "amazon-pay"
  | "ambulance"
  | "american-sign-language-interpreting"
  | "amilia"
  | "anchor"
  | "android"
  | "angellist"
  | "angle-double-down"
  | "angle-double-left"
  | "angle-double-right"
  | "angle-double-up"
  | "angle-down"
  | "angle-left"
  | "angle-right"
  | "angle-up"
  | "angry"
  | "angrycreative"
  | "angular"
  | "ankh"
  | "app-store"
  | "app-store-ios"
  | "apper"
  | "apple"
  | "apple-alt"
  | "apple-pay"
  | "archive"
  | "archway"
  | "arrow-alt-circle-down"
  | "arrow-alt-circle-left"
  | "arrow-alt-circle-right"
  | "arrow-alt-circle-up"
  | "arrow-circle-down"
  | "arrow-circle-left"
  | "arrow-circle-right"
  | "arrow-circle-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrows-alt"
  | "arrows-alt-h"
  | "arrows-alt-v"
  | "artstation"
  | "assistive-listening-systems"
  | "asterisk"
  | "asymmetrik"
  | "at"
  | "atlas"
  | "atlassian"
  | "atom"
  | "audible"
  | "audio-description"
  | "autoprefixer"
  | "avianex"
  | "aviato"
  | "award"
  | "aws"
  | "baby"
  | "baby-carriage"
  | "backspace"
  | "backward"
  | "bacon"
  | "bacteria"
  | "bacterium"
  | "bahai"
  | "balance-scale"
  | "balance-scale-left"
  | "balance-scale-right"
  | "ban"
  | "band-aid"
  | "bandcamp"
  | "barcode"
  | "bars"
  | "baseball-ball"
  | "basketball-ball"
  | "bath"
  | "battery-empty"
  | "battery-full"
  | "battery-half"
  | "battery-quarter"
  | "battery-three-quarters"
  | "battle-net"
  | "bed"
  | "beer"
  | "behance"
  | "behance-square"
  | "bell"
  | "bell-slash"
  | "bezier-curve"
  | "bible"
  | "bicycle"
  | "biking"
  | "bimobject"
  | "binoculars"
  | "biohazard"
  | "birthday-cake"
  | "bitbucket"
  | "bitcoin"
  | "bity"
  | "black-tie"
  | "blackberry"
  | "blender"
  | "blender-phone"
  | "blind"
  | "blog"
  | "blogger"
  | "blogger-b"
  | "bluetooth"
  | "bluetooth-b"
  | "bold"
  | "bolt"
  | "bomb"
  | "bone"
  | "bong"
  | "book"
  | "book-dead"
  | "book-medical"
  | "book-open"
  | "book-reader"
  | "bookmark"
  | "bootstrap"
  | "border-all"
  | "border-none"
  | "border-style"
  | "bowling-ball"
  | "box"
  | "box-open"
  | "box-tissue"
  | "boxes"
  | "braille"
  | "brain"
  | "bread-slice"
  | "briefcase"
  | "briefcase-medical"
  | "broadcast-tower"
  | "broom"
  | "brush"
  | "btc"
  | "buffer"
  | "bug"
  | "building"
  | "bullhorn"
  | "bullseye"
  | "burn"
  | "buromobelexperte"
  | "bus"
  | "bus-alt"
  | "business-time"
  | "buy-n-large"
  | "buysellads"
  | "calculator"
  | "calendar"
  | "calendar-alt"
  | "calendar-check"
  | "calendar-day"
  | "calendar-minus"
  | "calendar-plus"
  | "calendar-times"
  | "calendar-week"
  | "camera"
  | "camera-retro"
  | "campground"
  | "canadian-maple-leaf"
  | "candy-cane"
  | "cannabis"
  | "capsules"
  | "car"
  | "car-alt"
  | "car-battery"
  | "car-crash"
  | "car-side"
  | "caravan"
  | "caret-down"
  | "caret-left"
  | "caret-right"
  | "caret-square-down"
  | "caret-square-left"
  | "caret-square-right"
  | "caret-square-up"
  | "caret-up"
  | "carrot"
  | "cart-arrow-down"
  | "cart-plus"
  | "cash-register"
  | "cat"
  | "cc-amazon-pay"
  | "cc-amex"
  | "cc-apple-pay"
  | "cc-diners-club"
  | "cc-discover"
  | "cc-jcb"
  | "cc-mastercard"
  | "cc-paypal"
  | "cc-stripe"
  | "cc-visa"
  | "centercode"
  | "centos"
  | "certificate"
  | "chair"
  | "chalkboard"
  | "chalkboard-teacher"
  | "charging-station"
  | "chart-area"
  | "chart-bar"
  | "chart-line"
  | "chart-pie"
  | "check"
  | "check-circle"
  | "check-double"
  | "check-square"
  | "cheese"
  | "chess"
  | "chess-bishop"
  | "chess-board"
  | "chess-king"
  | "chess-knight"
  | "chess-pawn"
  | "chess-queen"
  | "chess-rook"
  | "chevron-circle-down"
  | "chevron-circle-left"
  | "chevron-circle-right"
  | "chevron-circle-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "child"
  | "chrome"
  | "chromecast"
  | "church"
  | "circle"
  | "circle-notch"
  | "city"
  | "clinic-medical"
  | "clipboard"
  | "clipboard-check"
  | "clipboard-list"
  | "clock"
  | "clone"
  | "closed-captioning"
  | "cloud"
  | "cloud-download-alt"
  | "cloud-meatball"
  | "cloud-moon"
  | "cloud-moon-rain"
  | "cloud-rain"
  | "cloud-showers-heavy"
  | "cloud-sun"
  | "cloud-sun-rain"
  | "cloud-upload-alt"
  | "cloudflare"
  | "cloudscale"
  | "cloudsmith"
  | "cloudversify"
  | "cocktail"
  | "code"
  | "code-branch"
  | "codepen"
  | "codiepie"
  | "coffee"
  | "cog"
  | "cogs"
  | "coins"
  | "columns"
  | "comment"
  | "comment-alt"
  | "comment-dollar"
  | "comment-dots"
  | "comment-medical"
  | "comment-slash"
  | "comments"
  | "comments-dollar"
  | "compact-disc"
  | "compass"
  | "compress"
  | "compress-alt"
  | "compress-arrows-alt"
  | "concierge-bell"
  | "confluence"
  | "connectdevelop"
  | "contao"
  | "cookie"
  | "cookie-bite"
  | "copy"
  | "copyright"
  | "cotton-bureau"
  | "couch"
  | "cpanel"
  | "creative-commons"
  | "creative-commons-by"
  | "creative-commons-nc"
  | "creative-commons-nc-eu"
  | "creative-commons-nc-jp"
  | "creative-commons-nd"
  | "creative-commons-pd"
  | "creative-commons-pd-alt"
  | "creative-commons-remix"
  | "creative-commons-sa"
  | "creative-commons-sampling"
  | "creative-commons-sampling-plus"
  | "creative-commons-share"
  | "creative-commons-zero"
  | "credit-card"
  | "critical-role"
  | "crop"
  | "crop-alt"
  | "cross"
  | "crosshairs"
  | "crow"
  | "crown"
  | "crutch"
  | "css3"
  | "css3-alt"
  | "cube"
  | "cubes"
  | "cut"
  | "cuttlefish"
  | "d-and-d"
  | "d-and-d-beyond"
  | "dailymotion"
  | "dashcube"
  | "database"
  | "deaf"
  | "deezer"
  | "delicious"
  | "democrat"
  | "deploydog"
  | "deskpro"
  | "desktop"
  | "dev"
  | "deviantart"
  | "dharmachakra"
  | "dhl"
  | "diagnoses"
  | "diaspora"
  | "dice"
  | "dice-d20"
  | "dice-d6"
  | "dice-five"
  | "dice-four"
  | "dice-one"
  | "dice-six"
  | "dice-three"
  | "dice-two"
  | "digg"
  | "digital-ocean"
  | "digital-tachograph"
  | "directions"
  | "discord"
  | "discourse"
  | "disease"
  | "divide"
  | "dizzy"
  | "dna"
  | "dochub"
  | "docker"
  | "dog"
  | "dollar-sign"
  | "dolly"
  | "dolly-flatbed"
  | "donate"
  | "door-closed"
  | "door-open"
  | "dot-circle"
  | "dove"
  | "download"
  | "draft2digital"
  | "drafting-compass"
  | "dragon"
  | "draw-polygon"
  | "dribbble"
  | "dribbble-square"
  | "dropbox"
  | "drum"
  | "drum-steelpan"
  | "drumstick-bite"
  | "drupal"
  | "dumbbell"
  | "dumpster"
  | "dumpster-fire"
  | "dungeon"
  | "dyalog"
  | "earlybirds"
  | "ebay"
  | "edge"
  | "edge-legacy"
  | "edit"
  | "egg"
  | "eject"
  | "elementor"
  | "ellipsis-h"
  | "ellipsis-v"
  | "ello"
  | "ember"
  | "empire"
  | "envelope"
  | "envelope-open"
  | "envelope-open-text"
  | "envelope-square"
  | "envira"
  | "equals"
  | "eraser"
  | "erlang"
  | "ethereum"
  | "ethernet"
  | "etsy"
  | "euro-sign"
  | "evernote"
  | "exchange-alt"
  | "exclamation"
  | "exclamation-circle"
  | "exclamation-triangle"
  | "expand"
  | "expand-alt"
  | "expand-arrows-alt"
  | "expeditedssl"
  | "external-link-alt"
  | "external-link-square-alt"
  | "eye"
  | "eye-dropper"
  | "eye-slash"
  | "facebook"
  | "facebook-f"
  | "facebook-messenger"
  | "facebook-square"
  | "fan"
  | "fantasy-flight-games"
  | "fast-backward"
  | "fast-forward"
  | "faucet"
  | "fax"
  | "feather"
  | "feather-alt"
  | "fedex"
  | "fedora"
  | "female"
  | "fighter-jet"
  | "figma"
  | "file"
  | "file-alt"
  | "file-archive"
  | "file-audio"
  | "file-code"
  | "file-contract"
  | "file-csv"
  | "file-download"
  | "file-excel"
  | "file-export"
  | "file-image"
  | "file-import"
  | "file-invoice"
  | "file-invoice-dollar"
  | "file-medical"
  | "file-medical-alt"
  | "file-pdf"
  | "file-powerpoint"
  | "file-prescription"
  | "file-signature"
  | "file-upload"
  | "file-video"
  | "file-word"
  | "fill"
  | "fill-drip"
  | "film"
  | "filter"
  | "fingerprint"
  | "fire"
  | "fire-alt"
  | "fire-extinguisher"
  | "firefox"
  | "firefox-browser"
  | "first-aid"
  | "first-order"
  | "first-order-alt"
  | "firstdraft"
  | "fish"
  | "fist-raised"
  | "flag"
  | "flag-checkered"
  | "flag-usa"
  | "flask"
  | "flickr"
  | "flipboard"
  | "flushed"
  | "fly"
  | "folder"
  | "folder-minus"
  | "folder-open"
  | "folder-plus"
  | "font"
  | "font-awesome"
  | "font-awesome-alt"
  | "font-awesome-flag"
  | "font-awesome-logo-full"
  | "fonticons"
  | "fonticons-fi"
  | "football-ball"
  | "fort-awesome"
  | "fort-awesome-alt"
  | "forumbee"
  | "forward"
  | "foursquare"
  | "free-code-camp"
  | "freebsd"
  | "frog"
  | "frown"
  | "frown-open"
  | "fulcrum"
  | "funnel-dollar"
  | "futbol"
  | "galactic-republic"
  | "galactic-senate"
  | "gamepad"
  | "gas-pump"
  | "gavel"
  | "gem"
  | "genderless"
  | "get-pocket"
  | "gg"
  | "gg-circle"
  | "ghost"
  | "gift"
  | "gifts"
  | "git"
  | "git-alt"
  | "git-square"
  | "github"
  | "github-alt"
  | "github-square"
  | "gitkraken"
  | "gitlab"
  | "gitter"
  | "glass-cheers"
  | "glass-martini"
  | "glass-martini-alt"
  | "glass-whiskey"
  | "glasses"
  | "glide"
  | "glide-g"
  | "globe"
  | "globe-africa"
  | "globe-americas"
  | "globe-asia"
  | "globe-europe"
  | "gofore"
  | "golf-ball"
  | "goodreads"
  | "goodreads-g"
  | "google"
  | "google-drive"
  | "google-pay"
  | "google-play"
  | "google-plus"
  | "google-plus-g"
  | "google-plus-square"
  | "google-wallet"
  | "gopuram"
  | "graduation-cap"
  | "gratipay"
  | "grav"
  | "greater-than"
  | "greater-than-equal"
  | "grimace"
  | "grin"
  | "grin-alt"
  | "grin-beam"
  | "grin-beam-sweat"
  | "grin-hearts"
  | "grin-squint"
  | "grin-squint-tears"
  | "grin-stars"
  | "grin-tears"
  | "grin-tongue"
  | "grin-tongue-squint"
  | "grin-tongue-wink"
  | "grin-wink"
  | "grip-horizontal"
  | "grip-lines"
  | "grip-lines-vertical"
  | "grip-vertical"
  | "gripfire"
  | "grunt"
  | "guilded"
  | "guitar"
  | "gulp"
  | "h-square"
  | "hacker-news"
  | "hacker-news-square"
  | "hackerrank"
  | "hamburger"
  | "hammer"
  | "hamsa"
  | "hand-holding"
  | "hand-holding-heart"
  | "hand-holding-medical"
  | "hand-holding-usd"
  | "hand-holding-water"
  | "hand-lizard"
  | "hand-middle-finger"
  | "hand-paper"
  | "hand-peace"
  | "hand-point-down"
  | "hand-point-left"
  | "hand-point-right"
  | "hand-point-up"
  | "hand-pointer"
  | "hand-rock"
  | "hand-scissors"
  | "hand-sparkles"
  | "hand-spock"
  | "hands"
  | "hands-helping"
  | "hands-wash"
  | "handshake"
  | "handshake-alt-slash"
  | "handshake-slash"
  | "hanukiah"
  | "hard-hat"
  | "hashtag"
  | "hat-cowboy"
  | "hat-cowboy-side"
  | "hat-wizard"
  | "hdd"
  | "head-side-cough"
  | "head-side-cough-slash"
  | "head-side-mask"
  | "head-side-virus"
  | "heading"
  | "headphones"
  | "headphones-alt"
  | "headset"
  | "heart"
  | "heart-broken"
  | "heartbeat"
  | "helicopter"
  | "highlighter"
  | "hiking"
  | "hippo"
  | "hips"
  | "hire-a-helper"
  | "history"
  | "hive"
  | "hockey-puck"
  | "holly-berry"
  | "home"
  | "hooli"
  | "hornbill"
  | "horse"
  | "horse-head"
  | "hospital"
  | "hospital-alt"
  | "hospital-symbol"
  | "hospital-user"
  | "hot-tub"
  | "hotdog"
  | "hotel"
  | "hotjar"
  | "hourglass"
  | "hourglass-end"
  | "hourglass-half"
  | "hourglass-start"
  | "house-damage"
  | "house-user"
  | "houzz"
  | "hryvnia"
  | "html5"
  | "hubspot"
  | "i-cursor"
  | "ice-cream"
  | "icicles"
  | "icons"
  | "id-badge"
  | "id-card"
  | "id-card-alt"
  | "ideal"
  | "igloo"
  | "image"
  | "images"
  | "imdb"
  | "inbox"
  | "indent"
  | "industry"
  | "infinity"
  | "info"
  | "info-circle"
  | "innosoft"
  | "instagram"
  | "instagram-square"
  | "instalod"
  | "intercom"
  | "internet-explorer"
  | "invision"
  | "ioxhost"
  | "italic"
  | "itch-io"
  | "itunes"
  | "itunes-note"
  | "java"
  | "jedi"
  | "jedi-order"
  | "jenkins"
  | "jira"
  | "joget"
  | "joint"
  | "joomla"
  | "journal-whills"
  | "js"
  | "js-square"
  | "jsfiddle"
  | "kaaba"
  | "kaggle"
  | "key"
  | "keybase"
  | "keyboard"
  | "keycdn"
  | "khanda"
  | "kickstarter"
  | "kickstarter-k"
  | "kiss"
  | "kiss-beam"
  | "kiss-wink-heart"
  | "kiwi-bird"
  | "korvue"
  | "landmark"
  | "language"
  | "laptop"
  | "laptop-code"
  | "laptop-house"
  | "laptop-medical"
  | "laravel"
  | "lastfm"
  | "lastfm-square"
  | "laugh"
  | "laugh-beam"
  | "laugh-squint"
  | "laugh-wink"
  | "layer-group"
  | "leaf"
  | "leanpub"
  | "lemon"
  | "less"
  | "less-than"
  | "less-than-equal"
  | "level-down-alt"
  | "level-up-alt"
  | "life-ring"
  | "lightbulb"
  | "line"
  | "link"
  | "linkedin"
  | "linkedin-in"
  | "linode"
  | "linux"
  | "lira-sign"
  | "list"
  | "list-alt"
  | "list-ol"
  | "list-ul"
  | "location-arrow"
  | "lock"
  | "lock-open"
  | "long-arrow-alt-down"
  | "long-arrow-alt-left"
  | "long-arrow-alt-right"
  | "long-arrow-alt-up"
  | "low-vision"
  | "luggage-cart"
  | "lungs"
  | "lungs-virus"
  | "lyft"
  | "magento"
  | "magic"
  | "magnet"
  | "mail-bulk"
  | "mailchimp"
  | "male"
  | "mandalorian"
  | "map"
  | "map-marked"
  | "map-marked-alt"
  | "map-marker"
  | "map-marker-alt"
  | "map-pin"
  | "map-signs"
  | "markdown"
  | "marker"
  | "mars"
  | "mars-double"
  | "mars-stroke"
  | "mars-stroke-h"
  | "mars-stroke-v"
  | "mask"
  | "mastodon"
  | "maxcdn"
  | "mdb"
  | "medal"
  | "medapps"
  | "medium"
  | "medium-m"
  | "medkit"
  | "medrt"
  | "meetup"
  | "megaport"
  | "meh"
  | "meh-blank"
  | "meh-rolling-eyes"
  | "memory"
  | "mendeley"
  | "menorah"
  | "mercury"
  | "meteor"
  | "microblog"
  | "microchip"
  | "microphone"
  | "microphone-alt"
  | "microphone-alt-slash"
  | "microphone-slash"
  | "microscope"
  | "microsoft"
  | "minus"
  | "minus-circle"
  | "minus-square"
  | "mitten"
  | "mix"
  | "mixcloud"
  | "mixer"
  | "mizuni"
  | "mobile"
  | "mobile-alt"
  | "modx"
  | "monero"
  | "money-bill"
  | "money-bill-alt"
  | "money-bill-wave"
  | "money-bill-wave-alt"
  | "money-check"
  | "money-check-alt"
  | "monument"
  | "moon"
  | "mortar-pestle"
  | "mosque"
  | "motorcycle"
  | "mountain"
  | "mouse"
  | "mouse-pointer"
  | "mug-hot"
  | "music"
  | "napster"
  | "neos"
  | "network-wired"
  | "neuter"
  | "newspaper"
  | "nimblr"
  | "node"
  | "node-js"
  | "not-equal"
  | "notes-medical"
  | "npm"
  | "ns8"
  | "nutritionix"
  | "object-group"
  | "object-ungroup"
  | "octopus-deploy"
  | "odnoklassniki"
  | "odnoklassniki-square"
  | "oil-can"
  | "old-republic"
  | "om"
  | "opencart"
  | "openid"
  | "opera"
  | "optin-monster"
  | "orcid"
  | "osi"
  | "otter"
  | "outdent"
  | "page4"
  | "pagelines"
  | "pager"
  | "paint-brush"
  | "paint-roller"
  | "palette"
  | "palfed"
  | "pallet"
  | "paper-plane"
  | "paperclip"
  | "parachute-box"
  | "paragraph"
  | "parking"
  | "passport"
  | "pastafarianism"
  | "paste"
  | "patreon"
  | "pause"
  | "pause-circle"
  | "paw"
  | "paypal"
  | "peace"
  | "pen"
  | "pen-alt"
  | "pen-fancy"
  | "pen-nib"
  | "pen-square"
  | "pencil-alt"
  | "pencil-ruler"
  | "penny-arcade"
  | "people-arrows"
  | "people-carry"
  | "pepper-hot"
  | "perbyte"
  | "percent"
  | "percentage"
  | "periscope"
  | "person-booth"
  | "phabricator"
  | "phoenix-framework"
  | "phoenix-squadron"
  | "phone"
  | "phone-alt"
  | "phone-slash"
  | "phone-square"
  | "phone-square-alt"
  | "phone-volume"
  | "photo-video"
  | "php"
  | "pied-piper"
  | "pied-piper-alt"
  | "pied-piper-hat"
  | "pied-piper-pp"
  | "pied-piper-square"
  | "piggy-bank"
  | "pills"
  | "pinterest"
  | "pinterest-p"
  | "pinterest-square"
  | "pizza-slice"
  | "place-of-worship"
  | "plane"
  | "plane-arrival"
  | "plane-departure"
  | "plane-slash"
  | "play"
  | "play-circle"
  | "playstation"
  | "plug"
  | "plus"
  | "plus-circle"
  | "plus-square"
  | "podcast"
  | "poll"
  | "poll-h"
  | "poo"
  | "poo-storm"
  | "poop"
  | "portrait"
  | "pound-sign"
  | "power-off"
  | "pray"
  | "praying-hands"
  | "prescription"
  | "prescription-bottle"
  | "prescription-bottle-alt"
  | "print"
  | "procedures"
  | "product-hunt"
  | "project-diagram"
  | "pump-medical"
  | "pump-soap"
  | "pushed"
  | "puzzle-piece"
  | "python"
  | "qq"
  | "qrcode"
  | "question"
  | "question-circle"
  | "quidditch"
  | "quinscape"
  | "quora"
  | "quote-left"
  | "quote-right"
  | "quran"
  | "r-project"
  | "radiation"
  | "radiation-alt"
  | "rainbow"
  | "random"
  | "raspberry-pi"
  | "ravelry"
  | "react"
  | "reacteurope"
  | "readme"
  | "rebel"
  | "receipt"
  | "record-vinyl"
  | "recycle"
  | "red-river"
  | "reddit"
  | "reddit-alien"
  | "reddit-square"
  | "redhat"
  | "redo"
  | "redo-alt"
  | "registered"
  | "remove-format"
  | "renren"
  | "reply"
  | "reply-all"
  | "replyd"
  | "republican"
  | "researchgate"
  | "resolving"
  | "restroom"
  | "retweet"
  | "rev"
  | "ribbon"
  | "ring"
  | "road"
  | "robot"
  | "rocket"
  | "rocketchat"
  | "rockrms"
  | "route"
  | "rss"
  | "rss-square"
  | "ruble-sign"
  | "ruler"
  | "ruler-combined"
  | "ruler-horizontal"
  | "ruler-vertical"
  | "running"
  | "rupee-sign"
  | "rust"
  | "sad-cry"
  | "sad-tear"
  | "safari"
  | "salesforce"
  | "sass"
  | "satellite"
  | "satellite-dish"
  | "save"
  | "schlix"
  | "school"
  | "screwdriver"
  | "scribd"
  | "scroll"
  | "sd-card"
  | "search"
  | "search-dollar"
  | "search-location"
  | "search-minus"
  | "search-plus"
  | "searchengin"
  | "seedling"
  | "sellcast"
  | "sellsy"
  | "server"
  | "servicestack"
  | "shapes"
  | "share"
  | "share-alt"
  | "share-alt-square"
  | "share-square"
  | "shekel-sign"
  | "shield-alt"
  | "shield-virus"
  | "ship"
  | "shipping-fast"
  | "shirtsinbulk"
  | "shoe-prints"
  | "shopify"
  | "shopping-bag"
  | "shopping-basket"
  | "shopping-cart"
  | "shopware"
  | "shower"
  | "shuttle-van"
  | "sign"
  | "sign-in-alt"
  | "sign-language"
  | "sign-out-alt"
  | "signal"
  | "signature"
  | "sim-card"
  | "simplybuilt"
  | "sink"
  | "sistrix"
  | "sitemap"
  | "sith"
  | "skating"
  | "sketch"
  | "skiing"
  | "skiing-nordic"
  | "skull"
  | "skull-crossbones"
  | "skyatlas"
  | "skype"
  | "slack"
  | "slack-hash"
  | "slash"
  | "sleigh"
  | "sliders-h"
  | "slideshare"
  | "smile"
  | "smile-beam"
  | "smile-wink"
  | "smog"
  | "smoking"
  | "smoking-ban"
  | "sms"
  | "snapchat"
  | "snapchat-ghost"
  | "snapchat-square"
  | "snowboarding"
  | "snowflake"
  | "snowman"
  | "snowplow"
  | "soap"
  | "socks"
  | "solar-panel"
  | "sort"
  | "sort-alpha-down"
  | "sort-alpha-down-alt"
  | "sort-alpha-up"
  | "sort-alpha-up-alt"
  | "sort-amount-down"
  | "sort-amount-down-alt"
  | "sort-amount-up"
  | "sort-amount-up-alt"
  | "sort-down"
  | "sort-numeric-down"
  | "sort-numeric-down-alt"
  | "sort-numeric-up"
  | "sort-numeric-up-alt"
  | "sort-up"
  | "soundcloud"
  | "sourcetree"
  | "spa"
  | "space-shuttle"
  | "speakap"
  | "speaker-deck"
  | "spell-check"
  | "spider"
  | "spinner"
  | "splotch"
  | "spotify"
  | "spray-can"
  | "square"
  | "square-full"
  | "square-root-alt"
  | "squarespace"
  | "stack-exchange"
  | "stack-overflow"
  | "stackpath"
  | "stamp"
  | "star"
  | "star-and-crescent"
  | "star-half"
  | "star-half-alt"
  | "star-of-david"
  | "star-of-life"
  | "staylinked"
  | "steam"
  | "steam-square"
  | "steam-symbol"
  | "step-backward"
  | "step-forward"
  | "stethoscope"
  | "sticker-mule"
  | "sticky-note"
  | "stop"
  | "stop-circle"
  | "stopwatch"
  | "stopwatch-20"
  | "store"
  | "store-alt"
  | "store-alt-slash"
  | "store-slash"
  | "strava"
  | "stream"
  | "street-view"
  | "strikethrough"
  | "stripe"
  | "stripe-s"
  | "stroopwafel"
  | "studiovinari"
  | "stumbleupon"
  | "stumbleupon-circle"
  | "subscript"
  | "subway"
  | "suitcase"
  | "suitcase-rolling"
  | "sun"
  | "superpowers"
  | "superscript"
  | "supple"
  | "surprise"
  | "suse"
  | "swatchbook"
  | "swift"
  | "swimmer"
  | "swimming-pool"
  | "symfony"
  | "synagogue"
  | "sync"
  | "sync-alt"
  | "syringe"
  | "table"
  | "table-tennis"
  | "tablet"
  | "tablet-alt"
  | "tablets"
  | "tachometer-alt"
  | "tag"
  | "tags"
  | "tape"
  | "tasks"
  | "taxi"
  | "teamspeak"
  | "teeth"
  | "teeth-open"
  | "telegram"
  | "telegram-plane"
  | "temperature-high"
  | "temperature-low"
  | "tencent-weibo"
  | "tenge"
  | "terminal"
  | "text-height"
  | "text-width"
  | "th"
  | "th-large"
  | "th-list"
  | "the-red-yeti"
  | "theater-masks"
  | "themeco"
  | "themeisle"
  | "thermometer"
  | "thermometer-empty"
  | "thermometer-full"
  | "thermometer-half"
  | "thermometer-quarter"
  | "thermometer-three-quarters"
  | "think-peaks"
  | "thumbs-down"
  | "thumbs-up"
  | "thumbtack"
  | "ticket-alt"
  | "tiktok"
  | "times"
  | "times-circle"
  | "tint"
  | "tint-slash"
  | "tired"
  | "toggle-off"
  | "toggle-on"
  | "toilet"
  | "toilet-paper"
  | "toilet-paper-slash"
  | "toolbox"
  | "tools"
  | "tooth"
  | "torah"
  | "torii-gate"
  | "tractor"
  | "trade-federation"
  | "trademark"
  | "traffic-light"
  | "trailer"
  | "train"
  | "tram"
  | "transgender"
  | "transgender-alt"
  | "trash"
  | "trash-alt"
  | "trash-restore"
  | "trash-restore-alt"
  | "tree"
  | "trello"
  | "tripadvisor"
  | "trophy"
  | "truck"
  | "truck-loading"
  | "truck-monster"
  | "truck-moving"
  | "truck-pickup"
  | "tshirt"
  | "tty"
  | "tumblr"
  | "tumblr-square"
  | "tv"
  | "twitch"
  | "twitter"
  | "twitter-square"
  | "typo3"
  | "uber"
  | "ubuntu"
  | "uikit"
  | "umbraco"
  | "umbrella"
  | "umbrella-beach"
  | "uncharted"
  | "underline"
  | "undo"
  | "undo-alt"
  | "uniregistry"
  | "unity"
  | "universal-access"
  | "university"
  | "unlink"
  | "unlock"
  | "unlock-alt"
  | "unsplash"
  | "untappd"
  | "upload"
  | "ups"
  | "usb"
  | "user"
  | "user-alt"
  | "user-alt-slash"
  | "user-astronaut"
  | "user-check"
  | "user-circle"
  | "user-clock"
  | "user-cog"
  | "user-edit"
  | "user-friends"
  | "user-graduate"
  | "user-injured"
  | "user-lock"
  | "user-md"
  | "user-minus"
  | "user-ninja"
  | "user-nurse"
  | "user-plus"
  | "user-secret"
  | "user-shield"
  | "user-slash"
  | "user-tag"
  | "user-tie"
  | "user-times"
  | "users"
  | "users-cog"
  | "users-slash"
  | "usps"
  | "ussunnah"
  | "utensil-spoon"
  | "utensils"
  | "vaadin"
  | "vector-square"
  | "venus"
  | "venus-double"
  | "venus-mars"
  | "vest"
  | "vest-patches"
  | "viacoin"
  | "viadeo"
  | "viadeo-square"
  | "vial"
  | "vials"
  | "viber"
  | "video"
  | "video-slash"
  | "vihara"
  | "vimeo"
  | "vimeo-square"
  | "vimeo-v"
  | "vine"
  | "virus"
  | "virus-slash"
  | "viruses"
  | "vk"
  | "vnv"
  | "voicemail"
  | "volleyball-ball"
  | "volume-down"
  | "volume-mute"
  | "volume-off"
  | "volume-up"
  | "vote-yea"
  | "vr-cardboard"
  | "vuejs"
  | "walking"
  | "wallet"
  | "warehouse"
  | "watchman-monitoring"
  | "water"
  | "wave-square"
  | "waze"
  | "weebly"
  | "weibo"
  | "weight"
  | "weight-hanging"
  | "weixin"
  | "whatsapp"
  | "whatsapp-square"
  | "wheelchair"
  | "whmcs"
  | "wifi"
  | "wikipedia-w"
  | "wind"
  | "window-close"
  | "window-maximize"
  | "window-minimize"
  | "window-restore"
  | "windows"
  | "wine-bottle"
  | "wine-glass"
  | "wine-glass-alt"
  | "wix"
  | "wizards-of-the-coast"
  | "wodu"
  | "wolf-pack-battalion"
  | "won-sign"
  | "wordpress"
  | "wordpress-simple"
  | "wpbeginner"
  | "wpexplorer"
  | "wpforms"
  | "wpressr"
  | "wrench"
  | "x-ray"
  | "xbox"
  | "xing"
  | "xing-square"
  | "y-combinator"
  | "yahoo"
  | "yammer"
  | "yandex"
  | "yandex-international"
  | "yarn"
  | "yelp"
  | "yen-sign"
  | "yin-yang"
  | "yoast"
  | "youtube"
  | "youtube-square"
  | "zhihu";

export type AlignContent = "start" | "end" | "center" | "between" | "around" | "stretch";
export type AlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
export type JustifyContent = "start" | "end" | "center" | "between" | "around";

export type UnsignedUpTo12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SignedUpTo12 =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | UnsignedUpTo12;
export type Margin = SignedUpTo12 | "auto";
export const SPACING_MAP = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 40,
  8: 48,
  9: 56,
  10: 64,
  11: 72,
  12: 80,
};

export function getSpacing(spacing: SignedUpTo12) {
  if (spacing < 0) {
    return SPACING_MAP[Math.abs(spacing) as UnsignedUpTo12] * -1;
  }
  return SPACING_MAP[spacing as UnsignedUpTo12];
}

export type TextFieldType =
  | "date"
  | "datetime"
  | "decimal"
  | "decimalRange"
  | "email"
  | "height"
  | "password"
  | "phoneNumber"
  | "number"
  | "numberRange"
  | "search"
  | "text"
  | "time"
  | "url"
  | "username";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const iconSizeToNumber = (size?: IconSize) => {
  return {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  }[size || "md"];
};

export type TextSize = "sm" | "md" | "lg" | "xl";

export type IconPrefix = "far" | "fas";

export interface BlurBoxProps extends BoxProps {
  blurType?: "regular" | "dark" | "prominent";
}

export interface LayerProps {
  children: ReactChildren;
}

export interface BoxProps {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  bottom?: boolean;
  children?: ReactChildren;
  color?: BoxColor;
  column?: UnsignedUpTo12;
  smColumn?: UnsignedUpTo12;
  mdColumn?: UnsignedUpTo12;
  lgColumn?: UnsignedUpTo12;
  dangerouslySetInlineStyle?: {
    __style: {
      [key: string]: any;
    };
  };
  direction?: "row" | "column";
  smDirection?: "row" | "column";
  mdDirection?: "row" | "column";
  lgDirection?: "row" | "column";
  display?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  smDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  mdDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  lgDisplay?: "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
  fit?: boolean;
  flex?: "grow" | "shrink" | "none";
  height?: number | string;
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  left?: boolean;
  margin?: SignedUpTo12;
  smMargin?: SignedUpTo12;
  mdMargin?: SignedUpTo12;
  lgMargin?: SignedUpTo12;
  marginBottom?: SignedUpTo12;
  smMarginBottom?: SignedUpTo12;
  mdMarginBottom?: SignedUpTo12;
  lgMarginBottom?: SignedUpTo12;
  marginEnd?: SignedUpTo12;
  smMarginEnd?: SignedUpTo12;
  mdMarginEnd?: SignedUpTo12;
  lgMarginEnd?: SignedUpTo12;
  marginLeft?: SignedUpTo12;
  smMarginLeft?: SignedUpTo12;
  mdMarginLeft?: SignedUpTo12;
  lgMarginLeft?: SignedUpTo12;
  marginRight?: SignedUpTo12;
  smMarginRight?: SignedUpTo12;
  mdMarginRight?: SignedUpTo12;
  lgMarginRight?: SignedUpTo12;
  marginStart?: SignedUpTo12;
  smMarginStart?: SignedUpTo12;
  mdMarginStart?: SignedUpTo12;
  lgMarginStart?: SignedUpTo12;
  marginTop?: SignedUpTo12;
  smMarginTop?: SignedUpTo12;
  mdMarginTop?: SignedUpTo12;
  lgMarginTop?: SignedUpTo12;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  overflow?: "visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto";
  padding?: UnsignedUpTo12;
  smPadding?: UnsignedUpTo12;
  mdPadding?: UnsignedUpTo12;
  lgPadding?: UnsignedUpTo12;
  paddingX?: UnsignedUpTo12;
  smPaddingX?: UnsignedUpTo12;
  mdPaddingX?: UnsignedUpTo12;
  lgPaddingX?: UnsignedUpTo12;
  paddingY?: UnsignedUpTo12;
  smPaddingY?: UnsignedUpTo12;
  mdPaddingY?: UnsignedUpTo12;
  lgPaddingY?: UnsignedUpTo12;
  position?: "static" | "absolute" | "relative" | "fixed";
  right?: boolean;
  rounding?: Rounding | "circle";
  top?: boolean;
  width?: number | string;
  wrap?: boolean;
  zIndex?: number | "auto";

  onClick?: () => void | Promise<void>;
  className?: string;
  style?: any;
  onHoverStart?: () => void | Promise<void>;
  onHoverEnd?: () => void | Promise<void>;
  scroll?: boolean;
  shadow?: boolean;
  border?: BorderColor;
  borderBottom?: BorderColor;
  borderTop?: BorderColor;
  borderLeft?: BorderColor;
  borderRight?: BorderColor;

  avoidKeyboard?: boolean;
  keyboardOffset?: number;
  scrollRef?: React.RefObject<any>;
  onScroll?: (offsetY: number) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  testID?: string;
}

export type BoxColor = SurfaceColor | "transparent";

export interface ErrorBoundaryProps {
  onError?: (error: Error, stack: any) => void;
  children?: ReactNode;
}

export interface IconProps {
  prefix?: IconPrefix; // For support FA solid/regular/light/duotone, as well as other icon packs in the future.
  name: IconName;
  color?: IconColor;
  size?: IconSize;
  iconStyle?: any;
  containerStyle?: any;
  testID?: string;
}

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export type IndicatorDirection = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

type BaseSegmentedControlProps = {
  items: string[];
  responsive?: boolean;
  size?: "md" | "lg";
  selectLimit?: number;
};

export type SegmentedControlPropsSingleSelect = BaseSegmentedControlProps & {
  multiselect?: false;
  onChange: ({activeIndex}: {activeIndex: number}) => void;
  selectedItemIndex?: number;
};

export type SegmentedControlPropsMultiSelect = BaseSegmentedControlProps & {
  multiselect: true;
  onChange: ({activeIndex}: {activeIndex: number[]}) => void;
  selectedItemIndexes?: number[];
};

export type SegmentedControlProps =
  | SegmentedControlPropsSingleSelect
  | SegmentedControlPropsMultiSelect;

// Shared props for fields with labels, subtext, and error messages.
export interface FieldWithLabelsProps {
  testID?: string;
  errorMessage?: string;
  errorMessageColor?: TextColor; // Default: error.
  label?: string;
  labelColor?: TextColor;
  helperText?: string;
  helperTextColor?: TextColor;
  children?: ReactChildren;
}

export interface DateTimeFieldProps extends FieldWithLabelsProps {
  label?: string;
  mode: "date" | "time" | "datetime";
  value: Date;
  onChange: (date: Date) => void;
  dateFormat?: string;
  pickerType?: "default" | "compact" | "inline" | "spinner";
  showTimezone?: boolean; // defaults to true
}

export interface TimezonePickerProps {
  timezone?: string;
  onChange: (tz: string | undefined) => void | Promise<void>;
  showLabel?: boolean; // defaults to true
  width?: number | string; // defaults to 100
}

export interface TextFieldProps extends FieldWithLabelsProps {
  innerRef?: any;
  id?: string;
  onChange: OnChangeCallback;
  autoComplete?: "current-password" | "on" | "off" | "username";
  disabled?: boolean;

  idealErrorDirection?: Direction;
  name?: string;
  onBlur?: OnChangeCallback;
  onFocus?: OnChangeCallback;
  placeholder?: string;
  type?: TextFieldType;
  value?: string;
  style?: any;
  // If type === search, indicates whether to show the search icon or spinner
  searching?: boolean;

  returnKeyType?: "done" | "go" | "next" | "search" | "send";

  // TODO: still needed?
  autoFocus?: boolean;
  grow?: boolean;
  // react-native-autofocus
  inputRef?: any;
  onSubmitEditing?: any;
  onEnter?: any;
  // blurOnSubmit defaults to true
  // if blurOnSubmit is false and multiline is true, return will create a new line
  blurOnSubmit?: boolean;
  multiline?: boolean;
  rows?: number;
  height?: number;
  // Required for type=numberRange
  min?: number;
  max?: number;
  // Options to translate values
  transformValue?: TransformValueOptions;
}

export type TextAreaProps = TextFieldProps;

export interface SwitchProps extends FieldWithLabelsProps {
  id?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  switched: boolean;
  // Pattern Addition
  label?: string;
}

export interface MaskProps {
  children?: ReactChildren;
  shape?: "circle" | "rounded" | "square";
  height?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  rounding?: Rounding;
  willChangeTransform?: boolean;
  wash?: boolean;
}

export interface IconRowProps {
  icon: string;
  label: string;
  value: string;
}

export interface LinkProps {
  href: string;
  inline?: boolean;
  text: string;
  onClick?: () => void;
  // TODO: support target on link
  // target?: null | "blank";
}

export type Rounding =
  | "minimal" // alias "sm"
  | "default" // alias "md"
  | "full" // alias "lg"
  | "rounded" // alias "3xl"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

const ROUNDING_MAP = {
  minimal: 2,
  default: 3,
  full: 16,
  rounded: 360,
  sm: 2,
  md: 4,
  lg: 16,
  xl: 32,
  "2xl": 128,
  "3xl": 360,
};

export function getRounding(rounding: Rounding) {
  return ROUNDING_MAP[rounding];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeadingProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: TextColor;
  overflow?: "normal" | "breakWord"; // default "breakWord"
  size?: "sm" | "md" | "lg" | "xl"; // default "sm"
  truncate?: boolean; // default false
  testID?: string;
}

export interface MetaProps {
  itemProp?: string;
  content?: string;
  itemType?: string;
  key?: string;
  property?: string;
  children?: ReactNode;
}

export interface ImageProps {
  alt?: string;
  color: BoxColor;
  naturalHeight?: number;
  naturalWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  src: string;
  children?: ReactChildren;
  fit?: "cover" | "contain" | "none";
  onError?: () => void;
  onLoad?: () => void;
  size?: string;
  srcSet?: string;
  fullWidth?: boolean;
  style?: any;
}

export interface SearchButtonProps {
  color: ButtonColor;
  onClick: () => void;
}

export interface BackButtonInterface {
  onBack: () => void;
}

export interface CheckBoxProps {
  onChange: ({value}: {value: boolean}) => void;
  checked?: boolean;
  hasError?: boolean;
  indeterminate?: boolean;
  name?: string;
  onClick?: any;
  size?: "sm" | "md";
  type?: "default" | "accent" | "neutral";
  radio?: boolean;

  label?: string;
  subLabel?: string;
  labelColor?: TextColor;
  testID?: string;
}

interface LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutChangeEvent {
  nativeEvent: {
    layout: LayoutRectangle;
  };
}

export interface SplitPageProps {
  /**
   * can accept either one React Child or any array of ReactChild. If this is not provided,
   * renderContent must return one or many ReactChild.
   */
  children?: ReactChild | ReactChild[] | null;
  /**
   * The names of the tabs that will be generated per ReactChild provided.
   * Tabs will not be generated if renderContent is provided in place of children
   */
  tabs?: string[];
  // The select limit for the number of tabs that can be selected
  selectLimit?: number;
  // Provide in mobile if you have a bottomTabBar so that split page can adjust accordingly
  bottomNavBarHeight?: number;
  // boolean to initiate and handle state from the app that has imported ferns-ui
  showItemList?: boolean;
  loading?: boolean;
  color?: SurfaceColor;
  keyboardOffset?: number;
  renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => ReactElement | null;
  renderListViewHeader?: () => ReactElement | null;
  renderContent?: (index?: number) => ReactElement | ReactElement[] | null;
  listViewData: any[];
  listViewExtraData?: any;
  listViewWidth?: number;
  renderChild?: () => ReactChild;
  onSelectionChange?: (value?: any) => void | Promise<void>;
}

export type PermissionKind =
  | "location"
  | "locationAlways"
  | "camera"
  | "microphone"
  | "photo"
  | "contacts"
  | "event"
  | "reminder"
  | "bluetooth"
  | "notification"
  | "backgroundRefresh"
  | "speechRecognition"
  | "mediaLibrary"
  | "motion";
export type PermissionStatus =
  | "authorized"
  | "denied"
  | "softDenied"
  | "restricted"
  | "undetermined";

export interface AddressInterface {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  countyName?: string;
  countyCode?: string;
}

export interface TransformValueOptions {
  func?: (value: string) => string;
  options?: {
    [key: string]: any;
  };
}

// TODO: Tighten up type to exclude string, which is almost never an acceptable type for React
// Native children (except Heading or Text for example.).
export type ReactChild = ReactNode;
export type ReactChildren = ReactNode;
export type WithChildren<P> = P & {children?: ReactNode};

export interface AddressAutocompleteProps {
  disabled?: boolean;
  googleMapsApiKey?: string;
  includeCounty?: boolean;
  inputValue: string;
  styles?: Styles;
  handleAddressChange: OnChangeCallback;
  handleAutoCompleteChange: (value: AddressInterface) => void;
  googlePlacesMobileStyles?: Styles;
  testID?: string;
}

export type ActionSheetProps = {
  children?: React.ReactNode;
  ref?: React.MutableRefObject<{
    /**
     * Open or close the ActionSheet.
     */
    setModalVisible(visible?: boolean): void;

    /**
     * Open the Action Sheet.
     */
    show(): void;

    /**
     * Close the ActionSheet.
     */
    hide(): void;

    /**
     * Attach this to any child ScrollView Component's onScrollEndDrag,
     * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
     * closing and bouncing back properly.
     */
    handleChildScrollEnd(): void;

    /**
     * Snap ActionSheet to given offset
     */
    snapToOffset(offset: number): void;
  }>;
  /**
   * Animate the opening and closing of ActionSheet.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  animated?: boolean;

  /**
   * Use if you want to show the ActionSheet Partially on Opening.
   * **Requires `gestureEnabled=true`**

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default:`1`
   */

  initialOffsetFromBottom?: number;

  /**
   * When touch ends and user has not moved farther from the set springOffset,
   * the ActionSheet will return to previous position.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `50`
   */
  springOffset?: number;
  /**
   * Add elevation to the ActionSheet container.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `0`

   #
   */
  elevation?: number;

  /**
   * Color of the gestureEnabled Indicator.

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"#f0f0f0"`
   */
  indicatorColor?: string;

  /**
   * Normally when the ActionSheet is fully opened, a small portion from the bottom is hidden by
   * default. Use this prop if you want the ActionSheet to hover over the bottom of screen and not
   * hide a little behind it.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default:`0`
   */
  extraScroll?: number;
  /**
   * Color of the overlay/backdrop.

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"black"`
   */
  overlayColor?: string;

  /**
   * Keep the header always visible even when gestures are disabled.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  headerAlwaysVisible?: boolean;

  /**
   * Delay draw of ActionSheet on open for android.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */

  delayActionSheetDraw?: boolean;

  /**
   * Delay draw of ActionSheet on open for android time.

   | Type | Required |
   | ---- | -------- |
   | number (ms) | no |

   Default: `50`
   */

  delayActionSheetDrawTime?: number;

  /**
   * Your custom header component. Using this will hide the default indicator.

   | Type | Required |
   | ---- | -------- |
   | React.Component | no |
   */
  CustomHeaderComponent?: React.ReactNode;

  /**
   * Any custom styles for the container.

   | Type | Required |
   | ---- | -------- |
   | Object | no |
   */
  containerStyle?: ViewStyle;

  /**
   * Control closing ActionSheet by touching on backdrop.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  closeOnTouchBackdrop?: boolean;

  /**
   * Speed of opening animation. Higher means the ActionSheet will open more quickly.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `12`
   */
  openAnimationSpeed?: number;
  /**
   * Duration of closing animation.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `300`
   */
  closeAnimationDuration?: number;
  /**
   *
   How much you want the ActionSheet to bounce when it is opened.

   | Type | Required |
   | ---- | -------- |
   | number | no |

   Default: `8`
   */
  bounciness?: number;

  /**
   * Will the ActionSheet close on `hardwareBackPress` event.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  closeOnPressBack?: boolean;
  /**
   * Default opacity of the overlay/backdrop.

   | Type | Required |
   | ---- | -------- |
   | number 0 - 1 | no |

   Default: `0.3`
   */
  defaultOverlayOpacity?: number;

  /**
   * Enables gesture control of ActionSheet

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  gestureEnabled?: boolean;

  /**
   * Bounces the ActionSheet on open.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `false`
   */
  bounceOnOpen?: boolean;

  /**
   * Setting the keyboard persistence of the ScrollView component, should be one of "never",
   * "always", or "handled"

   | Type | Required |
   | ---- | -------- |
   | string | no |

   Default: `"never"`
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Determine whether the modal should go under the system statusbar.

   | Type | Required |
   | ---- | -------- |
   | boolean | no |

   Default: `true`
   */
  statusBarTranslucent?: boolean;

  /**
   * Prevent ActionSheet from closing on
   * gesture or tapping on backdrop.
   * Instead snap it to `bottomOffset` location
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | boolean | no |
   */
  closable?: boolean;

  /**
   * Allow ActionSheet to draw under the StatusBar.
   * This is enabled by default.
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | boolean | no |
   Default: `true`
   */
  drawUnderStatusBar?: boolean;

  /**
   * Snap ActionSheet to this location if `closable` is set to false;
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | number | no |
   */

  bottomOffset?: number;

  /**
   * Change how ActionSheet behaves when keyboard is opened.
   *
   *
   * | Type | Required |
   | ---- | -------- |
   | "padding" | "position" | no |
   Default:`padding`
   */

  keyboardMode?: "padding" | "position";

  /**
   * Test ID for unit testing
   */
  testID?: string;

  /**
   *
   Event called when the ActionSheet closes.


   * | Type | Required |
   | ---- | -------- |
   | function | no |


   #
   */

  onClose?: () => void;

  /**
   * An event called when the ActionSheet Opens.

   | Type | Required |
   | ---- | -------- |
   | function | no |
   */
  onOpen?: () => void;

  /**
   * Event called when position of ActionSheet changes.
   */
  onPositionChanged?: (hasReachedTop: boolean) => void;
};

export type AvatarStatus =
  | "online"
  | "offline"
  | "doNotDisturb"
  | "away"
  | "meeting"
  | "vacation"
  | "sick"
  | "outOfOffice"
  | "commuting";

export interface AvatarProps {
  // Color for the background of the circle when no src picture is present.
  backgroundColor?: SurfaceColor;
  // Color for the initials when no src picture is present.
  textColor?: TextColor;
  /**
   * The name of the user. This is used for the placeholder treatment if an image is not available.
   */
  name: string;
  /**
   * Override the generated initials from `name`.
   */
  initials?: string;
  /**
   * Adds a white border around Avatar so it's visible when displayed on other images.
   */
  outline?: boolean;
  /**
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The URL of the user's image.
   */
  src?: string;
  /**
   * The fit for the image within the Avatar: "cover" | "contain" | "none".
   * Default is undefined. See Image.tsx for more info
   */
  imageFit?: "cover" | "contain" | "none";
  /**
   * Allow user to edit the image of the avatar
   */
  editAvatarImage?: boolean;
  /**
   * Function to handle the avatar image edit
   */
  onChange?: (val: any) => void;
  /**
   * Resize image width. If only the width is provided, the image will preserve aspect ratio
   */
  avatarImageWidth?: number;
  /**
   * Resize image height. If avatarImageWidth is also provided, the image aspect ratio may be
   * distorted.
   */
  avatarImageHeight?: number;
  /**
   * The image format that the image will be saved as after any edits by the expo-image-manipulator
   */
  avatarImageFormat?: SaveFormat;
  /**
   * The status of the user to display with the avatar.
   */
  status?: AvatarStatus;
  /**
   * If true, the status indicator will show a mobile icon instead of a dot, if status is one of
   * "online", "away", "offline", or "doNotDisturb". Will show the normal status icon in other
   * cases.
   */
  statusMobile?: boolean;
  /**
   * Text to show when hovering over the avatar image. Only works on web.
   */
  statusText?: string;
  /**
   * If edit icon should be present when no image is present
   */
  shouldShowEditIconIfNoImage?: boolean;
}

export interface BadgeProps {
  iconName?: IconProps;
  // The text to display inside the badge.
  text?: string;
  // Position relative to the text. Top should only be used with headings.
  status?: "info" | "error" | "warning" | "success" | "neutral"; // default "info
  secondary?: boolean;
  hasIcon?: boolean;
  variant?: "iconOnly" | "numberOnly" | "text"; // text is default
  number?: number;
}

export interface BannerProps {
  id: string;
  customButtonProps?: Partial<ButtonProps>;
  color?: BoxColor;
  dismissible?: boolean;
  iconName?: IconName;
  negativeXMargin?: number;
  onClick?: () => void;
  shape?: Rounding;
  subtext?: string;
  text: string;
  textColor?: TextColor;
  type?: "dismiss" | "action" | "permanent" /* deprectiated */ | "customButton";
  width?: number | string;
}

export interface BodyProps {
  scroll?: boolean;
  loading?: boolean;
  padding?: UnsignedUpTo12;
  height?: number | string;
  avoidKeyboard?: boolean; // default true
  children?: ReactNode;
}

export interface ButtonProps {
  text: string;
  // TODO make this work for all colors
  color?: ButtonColor;
  // default gray
  disabled?: boolean; // default false
  inline?: boolean; // default false
  size?: "xs" | "sm" | "md" | "lg"; // default md
  type?: "solid" | "ghost" | "outline"; // default solid
  loading?: boolean;
  onClick: any;
  icon?: IconName;
  iconPrefix?: IconPrefix;
  iconColor?: IconColor;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
  shape?: "rounded" | "pill";
  testID?: string;
  tooltip?: {
    text: string;
    idealDirection?: TooltipDirection;
  };
}

export interface CustomSelectProps {
  value: string;
  onChange: (value?: string) => void;
  options: Array<{label: string; value: string}>;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  labelColor?: string;
}
export interface DateTimeActionSheetProps {
  value?: string;
  mode?: "date" | "time" | "datetime";
  // Returns an ISO 8601 string. If mode is "time", the date portion is today.
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
  visible: boolean;
  onDismiss: () => void;
  transformValue?: TransformValueOptions;
}

export interface DecimalRangeActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface DecimalRangeActionSheetState {
  whole: string;
  decimal: string;
}

export interface ErrorPageProps {
  error: Error;
  resetError: () => void;
}

export interface FieldProps extends FieldWithLabelsProps {
  name?: string;
  label?: string;
  height?: number;
  type?:
    | "address"
    | "boolean"
    | "currency"
    | "customSelect"
    | "date"
    | "datetime"
    | "email"
    | "multiselect"
    | "number"
    | "password"
    | "percent"
    | "phoneNumber"
    | "select"
    | "signature"
    | "text"
    | "textarea"
    | "time"
    | "url";
  rows?: number;
  value?: any;
  onChange?: any;
  onBlur?: any;
  onStart?: any;
  onEnd?: any;
  options?: SelectListOptions;
  placeholder?: string;
  disabled?: boolean;
  useCheckbox?: boolean;
  includeCounty?: boolean;
  googleMapsApiKey?: string;
  googlePlacesMobileStyles?: Styles;
  transformValue?: TransformValueOptions;
}

export interface FormLineProps {
  name: string;
  value: any;
  onSave: (value: any) => void;
  kind: "boolean" | "string" | "textarea" | "select" | "multiboolean";
  options?: string[];
}

export interface HeightActionSheetProps {
  value?: string;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface HyperlinkProps {
  linkDefault?: boolean;
  linkify?: any;
  linkStyle?: StyleProp<any>;
  linkText?: string | ((url: string) => string);
  onPress?: (url: string) => void;
  onLongPress?: (url: string, text: string) => void;
  injectViewProps?: (url: string) => any;
  children?: React.ReactNode;
  style?: StyleProp<any>;
}

export interface IconButtonProps {
  prefix?: IconPrefix;
  icon: IconName;
  accessibilityLabel: string;
  onClick: () => void;
  size?: IconSize;
  type?: "primary" | "secondary" | "muted";
  disabled?: boolean;
  selected?: boolean;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
  tooltip?: {
    text: string;
    idealDirection?: TooltipDirection;
  };
  indicator?: boolean;
  indicatorNumber?: number;
  indicatorStyle?: {position: IndicatorDirection; color: SurfaceColor};
  testID?: string;
}

export interface InfoTooltipButtonProps {
  text: string;
  size?: IconSize;
}

export interface ModalProps {
  onDismiss: () => void;
  visible: boolean;
  // Alignment of the header. Default is "center".
  align?: "center" | "start";
  // Element to render in the middle part of the modal.
  children?: React.ReactElement;
  // Element to render in the bottom of the modal. This takes precedence over primaryButton and
  // secondaryButton.
  footer?: React.ReactElement;
  heading?: string;
  size?: "sm" | "md" | "lg";
  subHeading?: string;
  // Renders a primary colored button all the way to the right in the footer, if no footer prop is
  // provided.
  primaryButtonText?: string;
  primaryButtonOnClick?: (value?: any) => void;
  primaryButtonDisabled?: boolean;
  // Renders a gray button to the left of the primary button in the footer, if no footer prop is
  // provided. Requires primaryButtonText to be defined, but is not required itself.
  secondaryButtonText?: string;
  secondaryButtonOnClick?: (value?: any) => void;
  // Whether to show a close button in the upper left of modals or action sheets.
  showClose?: boolean;
}

export interface NumberPickerActionSheetProps {
  value: string;
  min: number;
  max: number;
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface PageProps {
  // TODO: figure out navigation
  navigation: any;
  scroll?: boolean;
  loading?: boolean;
  display?: "flex" | "none" | "block" | "inlineBlock";
  title?: string;
  backButton?: boolean;
  closeButton?: boolean;
  direction?: "row" | "column";
  padding?: UnsignedUpTo12;
  color?: SurfaceColor;
  maxWidth?: number | string;
  keyboardOffset?: number;
  footer?: any;
  rightButton?: string;
  rightButtonOnClick?: () => void;
  children?: any;
  onError?: (error: Error, stack: any) => void;
}

export interface ProgressBarProps {
  color: SurfaceColor;
  completed: number;
}

export interface SideDrawerProps {
  // Position of the drawer relative to the child
  position?: "right" | "left";
  // Used to open/hide drawer. Use the onClose and onOpen props to control state
  isOpen: boolean;
  // Content within the drawer
  renderContent: () => ReactElement | ReactElement[];
  // TODO: Allow the hardware back button on Android to close the SideDrawer
  onClose?: () => void;
  onOpen?: () => void;
  drawerType?: "front" | "back" | "slide" | "permanent";
  // Content that is wrapped by the drawer. The drawer will use the height of the child it wraps.
  // Can be overwritten via styles prop
  children?: ReactElement;
  drawerStyles?: StyleProp<ViewStyle>;
}

export interface SpinnerProps {
  size?: "sm" | "md";
  // TODO: fix Spinner.color
  color?: any;
}

export type ColumnSortInterface = {
  column: number;
  direction: "asc" | "desc";
};

export interface TableProps {
  /**
   * Must be instances of TableHeader, TableRow, and/or TableFooter components.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Width of columns in the table. This is used to calculate the width of each column.
   * Can be numbers for pixels or strings for percentages.
   */
  columns: Array<number | string>;
  /**
   * Specify a border width for Table: "sm" is 1px.
   */
  borderStyle?: "sm" | "none";
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: DimensionValue;
  /**
   * If true, the header will stick to the top of the table when scrolling. Defaults to true.
   */
  stickyHeader?: boolean;
  /**
   * If true, alternate rows will have a light gray background. Defaults to true.
   */
  alternateRowBackground?: boolean;

  /**
   * Control sort outside of the Table
   */
  sort?: ColumnSortInterface;
  /**
   * Set the page outside of the Table
   */
  page?: number;
  /**
   * Set the page outside of the Table
   */
  setPage?: (page: number) => void;
  /**
   * If true, the table will render a next page button. Defaults to true.
   */
  more?: boolean;
  /**
   * Extra controls to render below the table next to pagination
   */
  extraControls?: React.ReactElement;
}

export interface TableHeaderProps {
  /**
   * Must be an instance of TableRow.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Display `visuallyHidden` ensures the component is visually hidden but still is read by screen
   * readers.
   */
  display?: "tableHeaderGroup" | "visuallyHidden";
  /**
   * If true, the table header will be sticky and the table body will be scrollable. Not yet
   * implemented.
   */
  sticky?: boolean;
  color?: BoxColor;
}

export interface TableHeaderCellProps {
  /**
   * The content of the table header cell.
   */
  children: ReactElement;
  index: number;
  sortable?: boolean;
  onSortChange?: (direction: "asc" | "desc" | undefined) => void;
}

export interface TableRowProps {
  /**
   * Must be instances of TableCell or TableHeaderCell.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Header rows have an extra thick bottom border.
   */
  headerRow?: boolean;
  /**
   * Whether the row should start expanded or not.
   */
  expanded?: boolean;
  /**
   * When the row is expanded, the drawerContents are shown. If not
   */
  drawerContents?: React.ReactNode | React.ReactNode[];
  /**
   * Background color of the row. Defaults to white.
   */
  color?: BoxColor;
}

export type TableFilters = Record<string, string[]>;

export type TableSearch = {search: string; field: string};

export interface TableContextType {
  columns: Array<number | string>;
  hasDrawerContents: boolean;
  sortColumn?: ColumnSortInterface | undefined;
  setSortColumn?: (sort: ColumnSortInterface | undefined) => void;
  stickyHeader?: boolean;
  borderStyle?: "sm" | "none";
  alternateRowBackground?: boolean;
  page?: number;
}

export interface TableContextProviderProps extends TableContextType {
  children: React.ReactElement;
}

export interface TextProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: TextColor;
  inline?: boolean; // default false
  italic?: boolean; // default false
  onPress?: () => void;
  overflow?: "normal" | "breakWord"; // deprecated
  size?: TextSize; // default "md"
  truncate?: boolean; // default false
  font?: Font;
  underline?: boolean;
  numberOfLines?: number;
  skipLinking?: boolean;
  weight?: "bold" | "regular" | "medium" | "semiBold" | "light"; // default "regular"
  testID?: string;
}

export interface TextFieldPickerActionSheetProps {
  value?: string;
  mode?: "date" | "time";
  onChange: OnChangeCallback;
  actionSheetRef: React.RefObject<any>;
}

export interface ToastProps {
  message: string;
  data: {
    variant?: "default" | "warning" | "error";
    buttonText?: string;
    buttonOnClick?: () => void | Promise<void>;
    persistent?: boolean;
    onDismiss?: () => void;
  };
}

export interface TooltipProps {
  children: React.ReactElement;
  // If text is undefined, the children will be rendered without a tooltip.
  text?: string;
  idealDirection?: "top" | "bottom" | "left" | "right";
  // TODO: Fix Tooltip.bgColor.
  bgColor?: any;
}

export interface LinkProps extends TextProps {
  href: string;
}

export interface WithLabelProps {
  children?: ReactChildren;
  show?: boolean;
  label?: string;
  labelInline?: boolean;
  labelColor?: TextColor;
  labelJustifyContent?: JustifyContent;
  labelAlignItems?: AlignItems;
  labelPlacement?: "before" | "after";
  labelSize?: TextSize;
}

export interface TapToEditProps extends Omit<FieldProps, "onChange" | "value"> {
  title: string;
  value: any;
  // Not required if not editable.
  setValue?: (value: any) => void;
  // Not required if not editable.
  onSave?: (value: any) => void | Promise<void>;
  // Defaults to true
  editable?: boolean;
  // enable edit mode from outside the component
  isEditing?: boolean;
  // For changing how the non-editing row renders
  rowBoxProps?: Partial<BoxProps>;
  transform?: (value: any) => string;
  fieldComponent?: (setValue: () => void) => ReactElement;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
  description?: string;
  openApiModel?: string;
  openApiField?: string;
  showDescriptionAsTooltip?: boolean;
  // Default true. If false, description is shown below the value always.
  onlyShowDescriptionWhileEditing?: boolean;
}

export interface APIError {
  status: number;
  data: {
    title: string;
    detail?: string;
    id?: string;
    links?: string;
    about?: string;
    status?: number;
    code?: string;
    source?: string;
    pointer?: string;
    parameter?: string;
    meta?: {[id: string]: any};
  };
}

export type OpenApiPropertyType =
  | "string"
  | "date"
  | "datetime"
  | "boolean"
  | "array"
  | "object"
  | "number"
  | "any";

export type OpenApiProperty = {
  type?: OpenApiPropertyType;
  format?: string;
  properties?: OpenApiProperty;
  items?: OpenApiProperty[];
  description?: string;
  // TODO: is this actually there?
  required?: string[];
  enum?: string[];
};

export type ModelFields = {
  type: "object" | "array";
  required: string[];
  properties: {[name: string]: OpenApiProperty};
};

export interface OpenAPISpec {
  paths: {
    [key: string]: any;
  };
}

export type ModelFieldConfig = any;

export interface OpenAPIProviderProps {
  children: React.ReactElement;
  specUrl?: string;
}

export interface OpenAPIContextType {
  spec: OpenAPISpec | null;
  getModelFields: (modelName: string) => ModelFields | null;
  getModelField: (modelName: string, field: string) => OpenApiProperty | null;
}

// The config for a single column in the table display of a model.
export interface ModelAdminFieldConfig {
  fieldKey: string; // Dot notation representation of the field.
  title: string;
  description?: string;
  type: OpenApiPropertyType;
  width?: number;
  minWidth?: number;
  options?: string[];
  sort?: string;
  CustomComponent?: (props: ModelAdminCustomComponentProps) => React.ReactElement | null;
}

// The props for a custom column component for ModelAdmin.
export interface ModelAdminCustomComponentProps extends Omit<FieldProps, "name"> {
  doc: any; // The rest of the document.
  fieldKey: string; // Dot notation representation of the field.
  // user: User;
  editing: boolean; // Allow for inline editing of the field.
}
