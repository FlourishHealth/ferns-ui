// Mock for expo-modules-core/src/uuid/uuid.web
// This file is required by jest-expo but doesn't exist in the actual package
// The actual file is at expo-modules-core/src/uuid/index.web.ts

function uuidv4(): string {
  // Use node:crypto in test environment like the real implementation
  if (typeof require !== "undefined") {
    try {
      return require("node:crypto").randomUUID();
    } catch (e) {
      // Fallback if node:crypto is not available
      return "mock-uuid-v4-" + Math.random().toString(36).substring(2, 15);
    }
  }
  return "mock-uuid-v4-" + Math.random().toString(36).substring(2, 15);
}

function uuidv5(name: string, namespace: string): string {
  return "mock-uuid-v5-" + Math.random().toString(36).substring(2, 15);
}

const Uuidv5Namespace = {
  DNS: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  URL: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  OID: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  X500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
};

const uuid = {
  v4: uuidv4,
  v5: uuidv5,
  namespace: Uuidv5Namespace,
};

export default uuid;
export {uuidv4, uuidv5, Uuidv5Namespace};
