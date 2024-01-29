import {SaveFormat} from "expo-image-manipulator";
import React, {ReactElement, ReactNode, SyntheticEvent} from "react";
import {ListRenderItemInfo, StyleProp, ViewStyle} from "react-native";
import {DimensionValue, FlexStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {Styles} from "react-native-google-places-autocomplete";

import {InstanceFieldOverride, OpenAPIAdminNavigate} from "./admin";

export type SelectListOptions = {label: string; value: string}[];

export interface BaseProfile {
  email: string;
  id: string;
  backOffice: {
    testUser?: boolean;
  };
}

// For using a theme.
export interface UnifiedTheme {
  // TODO: make these configurable.
  blue: string;
  darkGray: string;
  eggplant: string;
  gray: string;
  green: string;
  springGreen: string;
  lightGray: string;
  maroon: string;
  midnight: string;
  navy: string;
  olive: string;
  orange: string;
  orchid: string;
  pine: string;
  purple: string;
  red: string;
  watermelon: string;
  white: string;
  black: string;

  info: string;
  error: string;
  warning: string;
  success: string;
  neutral: string;

  primaryLighter: string;
  primaryLight: string;
  primary: string;
  primaryDark: string;
  primaryDarker: string;

  secondaryLighter: string;
  secondaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryDarker: string;

  accentLighter: string;
  accentLight: string;
  accent: string;
  accentDark: string;
  accentDarker: string;

  tertiaryLighter: string;
  tertiaryLight: string;
  tertiary: string;
  tertiaryDark: string;
  tertiaryDarker: string;

  // Support for light and dark mode.
  background: string;
  backgroundSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  divider: string;

  neutral900: string;
  neutral800: string;
  neutral700: string;
  neutral600: string;
  neutral500: string;
  neutral400: string;
  neutral300: string;
  neutral200: string;
  neutral100: string;
  neutral90: string;
  neutral80: string;
  neutral70: string;
  neutral60: string;
  neutral50: string;
  neutral40: string;
  neutral30: string;
  neutral20: string;
  neutral10: string;

  primaryFont: string;
  primaryBoldFont: string;
  secondaryFont: string;
  secondaryBoldFont: string;
  buttonFont: string;
  accentFont: string;
  accentBoldFont: string;
  titleFont: string;
}

export type Font =
  | "primary"
  | "primaryBold"
  | "secondary"
  | "secondaryBold"
  | "accent"
  | "accentBold"
  | "title"
  | "button";

// type Sizes = "small" | "xsmall" | "sm" | "small" | "medium" | "lg" | "large";

export type Direction = "up" | "right" | "down" | "left";
export type Color =
  | "blue"
  | "darkGray"
  | "eggplant"
  | "gray"
  | "green"
  | "springGreen"
  | "lightGray"
  | "maroon"
  | "midnight"
  | "navy"
  | "olive"
  | "orange"
  | "orchid"
  | "pine"
  | "purple"
  | "red"
  | "watermelon"
  | "white"
  | "black";
export type ThemeColor =
  | "primaryLighter"
  | "primaryLight"
  | "primary"
  | "primaryDark"
  | "primaryDarker"
  | "secondaryLighter"
  | "secondaryLight"
  | "secondary"
  | "secondaryDark"
  | "secondaryDarker"
  | "tertiaryLighter"
  | "tertiaryLight"
  | "tertiary"
  | "tertiaryDark"
  | "tertiaryDarker"
  | "accentLighter"
  | "accentLight"
  | "accent"
  | "accentDark"
  | "accentDarker"
  | "background"
  | "backgroundSecondary";
export type NeutralColor =
  | "neutral900"
  | "neutral800"
  | "neutral700"
  | "neutral600"
  | "neutral500"
  | "neutral400"
  | "neutral300"
  | "neutral200"
  | "neutral100"
  | "neutral90"
  | "neutral80"
  | "neutral70"
  | "neutral60"
  | "neutral50"
  | "neutral40"
  | "neutral30"
  | "neutral20"
  | "neutral10";

export type StatusIndicatorColor = "info" | "error" | "warning" | "success" | "neutral";

export type AllColors = Color | ThemeColor | NeutralColor | StatusIndicatorColor;

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
export const SPACING = 4;

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
    md: 14,
    lg: 20,
    xl: 26,
  }[size || "md"];
};

export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextColor =
  | "blue"
  | "darkGray"
  | "eggplant"
  | "gray"
  | "green"
  | "lightGray"
  | "maroon"
  | "midnight"
  | "navy"
  | "olive"
  | "orange"
  | "orchid"
  | "pine"
  | "purple"
  | "red"
  | "watermelon"
  | "white"; // default "darkGray"

export type ButtonColor =
  | "blue"
  | "gray"
  | "red"
  // | "transparent"
  | "white"
  | "primary"
  | "secondary"
  | "accent"
  | "tertiary";

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
  rounding?: "pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
  border?: AllColors;
  borderBottom?: AllColors;
  borderTop?: AllColors;
  borderLeft?: AllColors;
  borderRight?: AllColors;

  avoidKeyboard?: boolean;
  keyboardOffset?: number;
  scrollRef?: React.RefObject<any>;
  onScroll?: (offsetY: number) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  testID?: string;
}

export type BoxColor = AllColors | "transparent";

export interface ErrorBoundaryProps {
  onError?: (error: Error, stack: any) => void;
  children?: ReactNode;
}

export interface IconProps {
  prefix?: IconPrefix; // For support FA solid/regular/light/duotone, as well as other icon packs in the future.
  name: IconName;
  color?: AllColors;
  size?: IconSize;
  iconStyle?: any;
  containerStyle?: any;
  testID?: string;
}

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export type IndicatorDirection = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface PillProps {
  text: string;
  color: AllColors;
  enabled?: boolean;
  onClick: (enabled: boolean) => void;
}

export interface SegmentedControlProps {
  items: string[];
  onChange?: ({activeIndex}: {activeIndex: number | number[]}) => void;
  selectedItemIndex?: number;
  selectedItemIndexes?: number[];
  responsive?: boolean;
  size?: "md" | "lg"; // defaults to md
  multiselect?: boolean;
  selectLimit?: number;
}

// Shared props for fields with labels, subtext, and error messages.
export interface FieldWithLabelsProps {
  testID?: string;
  errorMessage?: string;
  errorMessageColor?: AllColors; // Default: red.
  label?: string;
  labelColor?: AllColors;
  helperText?: string;
  helperTextColor?: AllColors;
  children?: ReactChildren;
}

export interface DateTimeFieldProps extends FieldWithLabelsProps {
  label?: string;
  mode: "date" | "time" | "datetime";
  value: Date;
  onChange: (date: Date) => void;
  dateFormat?: string;
  pickerType?: "default" | "compact" | "inline" | "spinner";
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
  rounding?: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
  children?: ReactChild;
  onClick?: () => void;
  target?: null | "blank";
}

export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeadingProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: AllColors;
  overflow?: "normal" | "breakWord"; // default "breakWord"
  size?: "sm" | "md" | "lg";
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
  disabled?: boolean;
  hasError?: boolean;
  indeterminate?: boolean;
  name?: string;
  onClick?: any;
  size?: "sm" | "md";
  color?: AllColors;
  radio?: boolean;

  label?: string;
  subLabel?: string;
  labelColor?: AllColors;
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
  color?: Color;
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
  backgroundColor?: AllColors;
  // Color for the initials when no src picture is present.
  textColor?: AllColors;
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
  // If `type` is set to "custom", a custom theme color should be provided.
  color?: AllColors;
  fontColor?: AllColors; // default "white"
  fontWeight?: TextProps["weight"]; // default "bold"
  iconProps?: IconProps;
  // The text to display inside the badge.
  title?: string;
  // Position relative to the text. Top should only be used with headings.
  position?: "bottom" | "top" | "middle"; // default "middle"
  rounding?: Rounding;
  size?: "xs" | "sm" | "md" | "lg"; // default "xs'
  // Some default badge types. Occasionally, a custom badge might be required for different color
  // schemes.
  type?: "info" | "error" | "warning" | "success" | "neutral" | "custom"; // default "info
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
  alignSelf?: FlexStyle["alignSelf"];
  children?: React.ReactElement;
  text: string;
  // TODO make this work for all colors
  color?: ButtonColor | Color;
  // default gray
  disabled?: boolean; // default false
  inline?: boolean; // default false
  size?: "xs" | "sm" | "md" | "lg"; // default md
  type?: "solid" | "ghost" | "outline"; // default solid
  loading?: boolean;
  onClick: any;
  icon?: IconName;
  iconPrefix?: IconPrefix;
  iconColor?: ButtonColor | Color;
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
  required?: boolean;
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
  iconColor: "darkGray" | ButtonColor | ThemeColor | Color;
  onClick: () => void;
  size?: IconSize;
  bgColor?:
    | "transparent"
    | "transparentDarkGray"
    | "gray"
    | "lightGray"
    | "white"
    | "primary" // used for active states
    | "background"
    | "backgroundSecondary"; // default transparent
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
  indicatorStyle?: {position: IndicatorDirection; color: AllColors};
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
  color?: Color;
  maxWidth?: number | string;
  keyboardOffset?: number;
  footer?: any;
  rightButton?: string;
  rightButtonOnClick?: () => void;
  children?: any;
  onError?: (error: Error, stack: any) => void;
}

export interface PogProps {
  active?: boolean;
  bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "blue";
  focused?: boolean;
  hovered?: boolean;
  selected?: boolean;
  iconColor?: AllColors;
  icon: IconName;
  iconPrefix?: IconPrefix;
  size?: IconSize;
}

export interface ProgressBarProps {
  color: Color;
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
  color?: Color;
}

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

export interface TextProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: AllColors;
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
  weight?: "bold" | "normal";
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
  bgColor?: "white" | "lightGray" | "gray" | "darkGray";
}

export interface LinkProps extends TextProps {
  href: string;
}

export interface WithLabelProps {
  children?: ReactChildren;
  show?: boolean;
  label?: string;
  labelInline?: boolean;
  labelColor?: AllColors;
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

export type ModelAdminDisplay = (instance: any) => {title: string; subtitle?: string};
export type ModelFieldOverride = {[id: string]: Partial<ModelAdminFieldConfig>};

// The props for a custom column component for ModelAdmin.
export interface ModelAdminFieldComponentProps extends Omit<FieldProps, "name"> {
  doc: any; // The rest of the document.
  fieldKey: string; // Dot notation representation of the field.
  // user: User;
  editing: boolean; // Allow for inline editing of the field.
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
  CustomComponent?: (props: ModelAdminFieldComponentProps) => React.ReactElement | null;
}

export interface ModelAdminProps {
  navigate: (params: {model?: string; id?: string; page?: number; sort?: string}) => void;
  // TODO move this in so we can use model admin without openapi admin.
  useList: any;
  page?: number;
  sort?: string;
  model: string;
  overrides?: {[id: string]: Partial<ModelAdminFieldConfig>};
}

export interface OpenAPISpec {
  paths: {
    [key: string]: any;
  };
}

// This needs better typing.
export type ModelFieldConfig = any;

export interface OpenAPIAdminProps {
  navigate: OpenAPIAdminNavigate;

  // The OpenAPI SDK to use for interacting with the API.
  sdk: any;

  // Used for displaying either a model overview page (along with page and sort) or a specific
  // model instance
  model?: string;
  id?: string;
  page?: number;
  sort?: string;
  // Override in the table view
  modelOverrides?: {[modelName: string]: ModelFieldOverride};
  // Override in the instance view
  instanceOverrides?: {[modelName: string]: InstanceFieldOverride};
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
};

export type ModelFields = {
  type: "object" | "array";
  required: string[];
  properties: {[name: string]: OpenApiProperty};
};

export interface OpenAPIContextType {
  spec: OpenAPISpec | null;
  getModelFields: (modelName: string) => ModelFields | null;
  getModelField: (modelName: string, field: string) => OpenApiProperty;
}

export interface OpenAPIProviderProps {
  children: React.ReactElement;
  specUrl?: string;
}

export interface ColumnSortInterface {
  column: number | undefined;
  direction: "asc" | "desc" | undefined;
}

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
