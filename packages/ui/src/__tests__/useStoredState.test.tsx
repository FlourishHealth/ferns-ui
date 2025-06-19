import {act, renderHook} from "@testing-library/react-native";
import React from "react";

import {Unifier} from "../Unifier";
import {useStoredState} from "../useStoredState";

jest.mock("../Unifier", () => ({
  Unifier: {
    storage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  },
}));

describe("useStoredState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initialValue and isLoading=true on initial render", async () => {
    (Unifier.storage.getItem as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("stored value"), 100))
    );

    const {result} = renderHook(() => useStoredState("testKey", "initial value"));

    expect(result.current[0]).toBe("initial value");
    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[0]).toBe("stored value");
    expect(result.current[2]).toBe(false);
  });

  it("should update state and storage when setter is called", async () => {
    (Unifier.storage.getItem as jest.Mock).mockResolvedValue("stored value");
    (Unifier.storage.setItem as jest.Mock).mockResolvedValue(undefined);

    const {result} = renderHook(() => useStoredState("testKey", "initial value"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    await act(async () => {
      await result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    
    expect(Unifier.storage.setItem).toHaveBeenCalledWith("testKey", "new value");
  });

  it("should handle errors when reading from storage", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    (Unifier.storage.getItem as jest.Mock).mockRejectedValue(new Error("Storage error"));

    const {result} = renderHook(() => useStoredState("testKey", "initial value"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current[0]).toBe("initial value");
    expect(result.current[2]).toBe(false);
    expect(console.error).toHaveBeenCalled();
    
    console.error = originalConsoleError;
  });

  it("should handle errors when writing to storage", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    (Unifier.storage.getItem as jest.Mock).mockResolvedValue("stored value");
    (Unifier.storage.setItem as jest.Mock).mockRejectedValue(new Error("Storage error"));

    const {result} = renderHook(() => useStoredState("testKey", "initial value"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    await act(async () => {
      await result.current[1]("new value");
    });

    expect(result.current[0]).toBe("stored value");
    expect(console.error).toHaveBeenCalled();
    
    console.error = originalConsoleError;
  });

  it("should handle undefined initialValue", async () => {
    (Unifier.storage.getItem as jest.Mock).mockResolvedValue(null);

    const {result} = renderHook(() => useStoredState("testKey"));

    expect(result.current[0]).toBeUndefined();
    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current[0]).toBeNull();
    expect(result.current[2]).toBe(false);
  });

  it("should not update state if component unmounts before storage resolves", async () => {
    (Unifier.storage.getItem as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("stored value"), 100))
    );

    const {result, unmount} = renderHook(() => useStoredState("testKey", "initial value"));

    expect(result.current[0]).toBe("initial value");
    expect(result.current[2]).toBe(true);

    unmount();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(result.current[0]).toBe("initial value");
    expect(result.current[2]).toBe(true);
  });
});
