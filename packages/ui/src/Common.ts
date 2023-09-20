import React, {ReactElement, ReactNode, SyntheticEvent} from "react";
import {ListRenderItemInfo} from "react-native";

export interface BaseProfile {
  email: string;
  id: string;
  backOffice: {
    testUser?: boolean;
  };
}

export interface TrackingConfig {
  MIXPANEL_TOKEN: string;
  SENTRY_WEB_DSN: string;
  SENTRY_MOBILE_DSN: string;
  USER_PROPERTY_KEYS: string[];
}

export interface IConfig extends TrackingConfig {
  FEEDBACK_URL: string;
  PRIVACY_POLICY_URL: string;
  // The collection name to store profiles in for Firebase/redux.
  PROFILE_COLLECTION: string;
  TERMS_URL: string;
  BASE_URL: string;
  PRODUCTION: boolean;

  // Useful for generating:
  // http://paletton.com/#uid=72Q0u0kw0u8khBrpJx0z7nUEPiG
  primaryLighterColor: string;
  primaryLightColor: string;
  primaryColor: string;
  primaryDarkColor: string;
  primaryDarkerColor: string;

  secondaryLighterColor: string;
  secondaryLightColor: string;
  secondaryColor: string;
  secondaryDarkColor: string;
  secondaryDarkerColor: string;

  accentLighterColor: string;
  accentLightColor: string;
  accentColor: string;
  accentDarkColor: string;
  accentDarkerColor: string;

  tertiaryLighterColor: string;
  tertiaryLightColor: string;
  tertiaryColor: string;
  tertiaryDarkColor: string;
  tertiaryDarkerColor: string;

  // firebaseConfig: any;

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
  | "accentDarker";
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
export type AllColors = Color | ThemeColor | NeutralColor;

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

export const iconNumberToSize = (size = 16): IconSize => {
  let iconSize: IconSize;
  if (size < 8) {
    iconSize = "xs";
  } else if (size < 12) {
    iconSize = "sm";
  } else if (size < 14) {
    iconSize = "md";
  } else if (size < 20) {
    iconSize = "lg";
  } else {
    iconSize = "xl";
  }
  return iconSize;
};

export function getSectionColor(section: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "workouts") {
  return ({
    Breakfast: "orchid",
    Lunch: "blue",
    Dinner: "orange",
    Snack: "red",
    "Second Snack": "red",
    Workout: "pine",
    workouts: "pine",
  }[section] || "blue") as Color;
}

export type TextSize = "sm" | "md" | "lg";
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
// | "twitter"
// | "facebook"
// | "google";

export type IconPrefix = "far" | "fas";
// | "ant"
// | "entypo"
// | "evil"
// | "material"
// | "material-community";
// | "ionicon"
// | "octicon"
// | "zocial"
// | "simple-line"
// | "feather";

export interface ActionBannerProps {
  /** The text to show in the banner. */
  text: string;
  color?: AllColors;
  textColor?: TextColor;
  negativeXMargin?: number;
  onClick: () => void;
  shape?: Rounding;
}

export interface BlurBoxProps extends BoxProps {
  blurType?: "regular" | "dark" | "prominent";
}

export interface LayerProps {
  children: ReactChildren;
}

export interface ModalProps {
  header?: React.ReactNode;
  accessibilityModalLabel: string;
  children?: ReactChildren;
  closeOnOutsideClick?: boolean;
  footer?: ReactChild;
  heading?: string | ReactChild;
  onDismiss: () => void;
  role?: "alertdialog" | "dialog";
  size?: "sm" | "md" | "lg" | number;
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

export interface DrawerProps {
  animationOpenTime: number;
  animationCloseTime: number;
  direction: Direction;
  dismissWhenTouchOutside?: boolean;
  fadeOpacity?: number;
  drawerScreenWidth: number;
  drawerScreenHeight: number;
  style?: any;
  parent: any;
  dismiss?: any;
}

export type DrawerDirection = "left" | "right" | "bottom" | "top";

export interface ErrorBoundaryProps {
  onError?: (error: Error, stack: any) => void;
  children?: ReactNode;
}

export interface FaceBookButtonProps {
  errorMessageColor?: "red" | "white";
  signUp: boolean;
}

export interface IconProps {
  prefix?: IconPrefix; // For support FA solid/regular/light/duotone, as well as other icon packs in the future.
  name: IconName;
  color?: AllColors;
  size?: IconSize;
  iconStyle?: any;
  containerStyle?: any;
}

export interface NavigatorProps {
  config?: any;
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
  paddingX?: number;
  paddingY?: number;

  // Required for type=numberRange
  min?: number;
  max?: number;
}

export type TextAreaProps = TextFieldProps;

export interface SubmittingFormProps {
  onSubmitEditting: () => void;
}

export interface SwitchProps extends FieldWithLabelsProps {
  id?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  name?: string;
  switched: boolean;
  // Pattern Addition
  label?: string;
}

export interface SpinnerProps {
  size?: "sm" | "md";
  color?: Color;
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
}

export interface BodyProps {
  scroll?: boolean;
  loading?: boolean;
  useBox?: boolean; // defaults false
  style?: any;
  padding?: UnsignedUpTo12;
  height?: number | string;
  avoidKeyboard?: boolean; // default true
  children?: ReactNode;
}

export interface ChatPaneProps {
  messagesView: any;
  textFormView: any;
  ref: any;
}

export interface ScrollViewProps {
  scrollTo?: (
    y?: number | {x?: number; y?: number; animated?: boolean},
    x?: number,
    animated?: boolean
  ) => void;
  /**
   * These styles will be applied to the scroll view content container which
   * wraps all of the child views. Example:
   *
   *   return (
   *     <ScrollView contentContainerStyle={styles.contentContainer}>
   *     </ScrollView>
   *   );
   *   ...
   *   const styles = StyleSheet.create({
   *     contentContainer: {
   *       paddingVertical: 20
   *     }
   *   });
   */
  contentContainerStyle?: any;

  /**
   * When true the scroll view's children are arranged horizontally in a row
   * instead of vertically in a column. The default value is false.
   */
  horizontal?: boolean | null;

  /**
   * If sticky headers should stick at the bottom instead of the top of the
   * ScrollView. This is usually used with inverted ScrollViews.
   */
  // invertStickyHeaders?: boolean;

  /**
   * Determines whether the keyboard gets dismissed in response to a drag.
   *   - 'none' (the default) drags do not dismiss the keyboard.
   *   - 'onDrag' the keyboard is dismissed when a drag begins.
   *   - 'interactive' the keyboard is dismissed interactively with the drag
   *     and moves in synchrony with the touch; dragging upwards cancels the
   *     dismissal.
   */
  // keyboardDismissMode?: "none" | "interactive" | "on-drag";

  /**
   * Determines when the keyboard should stay visible after a tap.
   * - 'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
   * - 'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
   * - 'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor).
   * - false, deprecated, use 'never' instead
   * - true, deprecated, use 'always' instead
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Called when scrollable content view of the ScrollView changes.
   * Handler function is passed the content width and content height as parameters: (contentWidth, contentHeight)
   * It's implemented using onLayout handler attached to the content container which this ScrollView renders.
   *
   */
  // onContentSizeChange?: (w: number, h: number) => void;

  /**
   * Fires at most once per frame during scrolling.
   * The frequency of the events can be contolled using the scrollEventThrottle prop.
   */
  onScroll?: (event: any) => void;

  /**
   * Fires if a user initiates a scroll gesture.
   */
  // onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when a user has finished scrolling.
   */
  // onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when scroll view has finished moving
   */
  // onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Fires when scroll view has begun moving
   */
  // onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * When true the scroll view stops on multiples of the scroll view's size
   * when scrolling. This can be used for horizontal pagination. The default
   * value is false.
   */
  // pagingEnabled?: boolean;

  /**
   * When false, the content does not scroll. The default value is true
   */
  // scrollEnabled?: boolean; // true

  /**
   * Experimental: When true offscreen child views (whose `overflow` value is
   * `hidden`) are removed from their native backing superview when offscreen.
   * This canimprove scrolling performance on long lists. The default value is
   * false.
   */
  // removeClippedSubviews?: boolean;

  /**
   * When true, shows a horizontal scroll indicator.
   */
  // showsHorizontalScrollIndicator?: boolean;

  /**
   * When true, shows a vertical scroll indicator.
   */
  // showsVerticalScrollIndicator?: boolean;

  /**
   * Style
   */
  style?: any;

  /**
   * A RefreshControl component, used to provide pull-to-refresh
   * functionality for the ScrollView.
   */
  // refreshControl?: React.ReactElement<RefreshControlProps>;

  /**
   * When `snapToInterval` is set, `snapToAlignment` will define the relationship of the the snapping to the scroll view.
   *      - `start` (the default) will align the snap at the left (horizontal) or top (vertical)
   *      - `center` will align the snap in the center
   *      - `end` will align the snap at the right (horizontal) or bottom (vertical)
   */
  // snapToAlignment?: "start" | "center" | "end";

  /**
   * When set, causes the scroll view to stop at multiples of the value of `snapToInterval`.
   * This can be used for paginating through children that have lengths smaller than the scroll view.
   * Used in combination with `snapToAlignment` and `decelerationRate="fast"`. Overrides less
   * configurable `pagingEnabled` prop.
   */
  // snapToInterval?: number;

  /**
   * When set, causes the scroll view to stop at the defined offsets. This can be used for
   * paginating through variously sized children that have lengths smaller than the scroll view.
   * Typically used in combination with `decelerationRate="fast"`. Overrides less configurable
   * `pagingEnabled` and `snapToInterval` props.
   */
  // snapToOffsets?: number[];

  /**
   * Use in conjuction with `snapToOffsets`. By default, the beginning of the list counts as a
   * snap offset. Set `snapToStart` to false to disable this behavior and allow the list to scroll
   * freely between its start and the first `snapToOffsets` offset. The default value is true.
   */
  // snapToStart?: boolean;

  /**
   * Use in conjuction with `snapToOffsets`. By default, the end of the list counts as a snap
   * offset. Set `snapToEnd` to false to disable this behavior and allow the list to scroll freely
   * between its end and the last `snapToOffsets` offset. The default value is true.
   */
  // snapToEnd?: boolean;

  /**
   * When true, the scroll view stops on the next index (in relation to scroll position at release)
   * regardless of how fast the gesture is. This can be used for horizontal pagination when the page
   * is less than the width of the ScrollView. The default value is false.
   */
  // disableIntervalMomentum?: boolean;

  /**
   * When true, the default JS pan responder on the ScrollView is disabled, and full control over
   * touches inside the ScrollView is left to its child components. This is particularly useful
   * if `snapToInterval` is enabled, since it does not follow typical touch patterns. Do not use
   * this on regular ScrollView use cases without `snapToInterval` as it may cause unexpected
   * touches to occur while scrolling. The default value is false.
   */
  // disableScrollViewPanResponder?: boolean;
  // scrollToEnd(options?: {animated: boolean}): void;
  // getScrollResponder(): JSX.Element;
  // getScrollableNode(): any;
}

type ItemT = any;
type ViewStyle = any;
export interface StyleProp {
  [key: string]: any;
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

interface RenderItemData {
  item: any;
  index: number;
}

export interface FlatListProps extends ScrollViewProps {
  /**
   * Rendered in between each item, but not at the top or bottom
   */
  ItemSeparatorComponent?: React.ComponentType<any> | null;

  /**
   * Rendered when the list is empty.
   */
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Rendered at the very end of the list.
   */
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Styling for internal View for ListFooterComponent
   */
  ListFooterComponentStyle?: ViewStyle | null;

  /**
   * Rendered at the very beginning of the list.
   */
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Styling for internal View for ListHeaderComponent
   */
  ListHeaderComponentStyle?: ViewStyle | null;

  /**
   * Optional custom style for multi-item rows generated when numColumns > 1
   */
  columnWrapperStyle?: StyleProp;

  /**
   * Determines when the keyboard should stay visible after a tap.
   * - 'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
   * - 'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
   * - 'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor).
   * - false, deprecated, use 'never' instead
   * - true, deprecated, use 'always' instead
   */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
   * Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout.
   * Items should all be the same height - masonry layouts are not supported.
   */
  numColumns?: number;

  /**
   * The default accessor functions assume this is an Array<{key: string}> but you can override
   * getItem, getItemCount, and keyExtractor to handle any type of index-based data.
   */
  data?: any;

  /**
   * `debug` will turn on extra logging and visual overlays to aid with debugging both usage and
   * implementation, but with a significant perf hit.
   */
  debug?: boolean;

  /**
   * DEPRECATED: Virtualization provides significant performance and memory optimizations, but fully
   * unmounts react instances that are outside of the render window. You should only need to disable
   * this for debugging purposes.
   */
  disableVirtualization?: boolean;

  /**
   * A marker property for telling the list to re-render (since it implements `PureComponent`). If
   * any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the
   * `data` prop, stick it here and treat it immutably.
   */
  extraData?: any;

  /**
   * A generic accessor for extracting an item from any sort of data blob.
   */
  getItem?: (data: any, index: number) => ItemT;

  /**
   * Determines how many items are in the data blob.
   */
  getItemCount?: (data: any) => number;

  getItemLayout?: (
    data: any,
    index: number
  ) => {
    length: number;
    offset: number;
    index: number;
  };

  horizontal?: boolean | null;

  /**
   * How many items to render in the initial batch. This should be enough to fill the screen but not
   * much more. Note these items will never be unmounted as part of the windowed rendering in order
   * to improve perceived performance of scroll-to-top actions.
   */
  initialNumToRender?: number;

  /**
   * Instead of starting at the top with the first item, start at `initialScrollIndex`. This
   * disables the "scroll to top" optimization that keeps the first `initialNumToRender` items
   * always rendered and immediately renders the items starting at this initial index. Requires
   * `getItemLayout` to be implemented.
   */
  initialScrollIndex?: number | null;

  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   */
  inverted?: boolean | null;

  keyExtractor?: (item: ItemT, index: number) => string;

  listKey?: string;

  /**
   * The maximum number of items to render in each incremental render batch. The more rendered at
   * once, the better the fill rate, but responsiveness my suffer because rendering content may
   * interfere with responding to button taps or other interactions.
   */
  maxToRenderPerBatch?: number;

  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null;

  onEndReachedThreshold?: number | null;

  onLayout?: (event: LayoutChangeEvent) => void;

  /**
   * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
   * sure to also set the `refreshing` prop correctly.
   */
  onRefresh?: (() => void) | null;

  /**
   * Used to handle failures when scrolling to an index that has not been measured yet.
   * Recommended action is to either compute your own offset and `scrollTo` it, or scroll as far
   * as possible and then try again after more items have been rendered.
   */
  onScrollToIndexFailed?: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;

  /**
   * Called when the viewability of rows changes, as defined by the
   * `viewabilityConfig` prop.
   */
  onViewableItemsChanged?: ((info: {viewableItems: any[]; changed: any[]}) => void) | null;

  /**
   * Set this when offset is needed for the loading indicator to show correctly.
   * @platform android
   */
  progressViewOffset?: number;

  /**
   * Set this true while waiting for new data from a refresh.
   */
  refreshing?: boolean | null;

  /**
   * Note: may have bugs (missing content) in some circumstances - use at your own risk.
   *
   * This may improve scroll performance for large lists.
   */
  removeClippedSubviews?: boolean;

  /**
   * Render a custom scroll component, e.g. with a differently styled `RefreshControl`.
   */
  renderScrollComponent?: (props: ScrollViewProps) => React.ReactElement<ScrollViewProps>;

  /**
   * Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off
   * screen. Similar fill rate/responsiveness tradeoff as `maxToRenderPerBatch`.
   */
  updateCellsBatchingPeriod?: number;

  viewabilityConfig?: any;

  viewabilityConfigCallbackPairs?: any;

  /**
   * Determines the maximum number of items rendered outside of the visible area, in units of
   * visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will
   * render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
   * this number will reduce memory consumption and may improve performance, but will increase the
   * chance that fast scrolling may reveal momentary blank areas of unrendered content.
   */
  windowSize?: number;

  renderItem: (info: RenderItemData) => React.ReactElement | null;
}

export interface PickerProps {
  onValueChange?: (itemValue: any, itemPosition: number) => void;
  selectedValue?: any;
  style?: StyleProp;
  testID?: string;
  itemStyle?: StyleProp;
  enabled?: boolean;
  mode?: "dialog" | "dropdown";
  prompt?: string;
}

export interface SplitPageProps {
  /**
   * can accept either one React Child or any array of ReactChild. If this is not provided,
   * renderContent must return one or many ReactChild.
   */
  children?: ReactChild | ReactChild[] | null;
  /**
   * The names of the tabs that will be generated per ReactChild provided. Tabs will not be generated if renderContent is provided in place of children
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

export type LogLevel = "fatal" | "error" | "warning" | "info" | "debug" | "critical";
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

export interface TrackingProperties {
  [name: string]: any;
}

export function isTestUser(profile?: BaseProfile) {
  return (
    profile &&
    profile.email &&
    (profile.email.indexOf("nang.io") > -1 || profile.email.indexOf("example.com") > -1)
  );
}

export interface TrackerInterface {
  initFinished: boolean;
  init: (config: TrackingConfig) => void;
  trackPages: () => void;
  setUser: (user: BaseProfile) => void;
  setUserProperty: (property: string, value: string | {object: {[id: string]: any}}) => void;
  track: (eventName: string, properties?: TrackingProperties) => void;
  trackNavigation: (screen: string, properties?: TrackingProperties) => void;
  trackLogin: (method: string, success: boolean, properties?: TrackingProperties) => void;
  trackSignup: (method: string, success: boolean, properties?: TrackingProperties) => void;
  trackSignOut: () => void;
  log: (message: string, properties?: TrackingProperties, level?: LogLevel) => void;
  error: (message: string, properties?: TrackingProperties) => void;
  warn: (message: string, properties?: TrackingProperties) => void;
  debug: (message: string, properties?: TrackingProperties) => void;
  handleErrorAlert: (text: string, exception?: Error, showAlert?: boolean) => void;
  trackPermission: (kind: PermissionKind, status: PermissionStatus, requested: boolean) => void;
  updateAppInfo: () => void;
}

export interface NavConfig {
  url?: string;
  wrapper?: (component: any) => any;
  store?: any;
  provider?: any;
}

export interface ProgressBarProps {
  color: Color;
  completed: number;
}

export interface AddressInterface {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
}

// TODO: Tighten up type to exclude string, which is almost never an acceptable type for React Native children
//  (except Heading or Text for example.).
export type ReactChild = ReactNode;
export type ReactChildren = ReactNode;
export type WithChildren<P> = P & {children?: ReactNode};
