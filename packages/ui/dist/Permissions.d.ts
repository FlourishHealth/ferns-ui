import { PermissionKind, PermissionStatus } from "./Common";
export declare function requestPermissions(kind: PermissionKind): Promise<PermissionStatus>;
