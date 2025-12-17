// This runs before jest-expo's setup, so we need to initialize globalThis.expo early
// Mock expo-modules-core global
if (typeof globalThis.expo === "undefined") {
  const EventEmitterClass = class EventEmitter {
    addListener = jest.fn();
    removeListener = jest.fn();
    removeAllListeners = jest.fn();
    emit = jest.fn();
  };

  globalThis.expo = {
    EventEmitter: EventEmitterClass,
    NativeModule: class NativeModule {},
    SharedObject: class SharedObject {},
  } as any;
}
