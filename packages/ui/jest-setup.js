// eslint-disable-next-line import/no-default-export
export default function () {
  process.env.TZ = "America/New_York";
  console.log("EXPO_OS");
  if (!process.env.EXPO_OS) {
    process.env.EXPO_OS = "ios";
  }
}
