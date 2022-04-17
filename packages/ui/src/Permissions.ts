/* eslint-disable @typescript-eslint/no-unused-vars */
// import {Tracking} from "./Tracking";
// import capitalize from "lodash/capitalize";
// import Permissions from "react-native-permissions";
import {PermissionKind, PermissionStatus} from "./Common";

export async function requestPermissions(kind: PermissionKind): Promise<PermissionStatus> {
  return new Promise(async (resolve, reject) => {
    return "denied";
  });
  // const userPropertyKey = `PermissionsFor${capitalize(kind)}`;

  //   let k = kind;
  //   let options: any = undefined;
  //   if (kind === "locationAlways") {
  //     k = "location";
  //     options = { type: "always" };
  //   }
  //   if (Platform.OS === "android" && k === "notification") {
  //     return;
  //   }

  //   // TODO check soft request status.

  //   const current = await Permissions.check(MAP[k] as any);
  //   // Tracking.log(`[permissions] ${k} permissions are ${current}`);
  //   if (current === "denied" || current === "limited") {
  //     // Tracking.setUserProperty(userPropertyKey, "false");
  //     return reject(MAP_RESULTS[current]);
  //   } else if (current === "granted") {
  //     // Tracking.setUserProperty(userPropertyKey, "true");
  //     return resolve("authorized");
  //   }

  //   const response = await Permissions.request(MAP[k] as any, options);
  //   if (response === "granted") {
  //     // Tracking.setUserProperty(userPropertyKey, "true");
  //     return resolve("authorized");
  //   } else {
  //     // Tracking.setUserProperty(userPropertyKey, "false");
  //     return reject(MAP_RESULTS[response]);
  //   }
  // });
}
