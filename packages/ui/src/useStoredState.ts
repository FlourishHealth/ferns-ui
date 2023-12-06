import {useCallback, useEffect, useState} from "react";

import {Unifier} from "./Unifier";

export const useStoredState = <T>(
  key: string,
  initialValue?: T
): [T | undefined, (value: T | undefined) => Promise<void>] => {
  const [state, setState] = useState<T | undefined>(initialValue);

  // Function to fetch data from AsyncStorage
  const fetchData = useCallback(async (): Promise<T | undefined> => {
    try {
      return await Unifier.storage.getItem(key);
    } catch (error) {
      console.error("Error reading data from AsyncStorage:", error);
      return initialValue;
    }
  }, [initialValue, key]);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData().then((value) => {
      setState(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAsyncStorageState = async (newValue: T | undefined): Promise<void> => {
    try {
      await Unifier.storage.setItem(key, newValue);
      setState(newValue);
    } catch (error) {
      console.error("Error writing data to AsyncStorage:", error);
    }
  };

  return [state, setAsyncStorageState];
};
