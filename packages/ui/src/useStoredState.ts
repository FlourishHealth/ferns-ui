import {useEffect, useState} from "react";

import {Unifier} from "./Unifier";

export const useStoredState = <T>(
  key: string,
  initialValue?: T
): [T | undefined | null, (value: T | undefined | null) => Promise<void>] => {
  const [state, setState] = useState<T | undefined | null>(initialValue);

  useEffect(() => {
    // Function to fetch data from AsyncStorage
    const fetchData = async (): Promise<void> => {
      try {
        const storedValue = await Unifier.storage.getItem(key);
        setState(storedValue);
      } catch (error) {
        console.error("Error reading data from AsyncStorage:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [key]);

  const setAsyncStorageState = async (newValue: T | undefined | null): Promise<void> => {
    try {
      await Unifier.storage.setItem(key, newValue);
      setState(newValue);
    } catch (error) {
      console.error("Error writing data to AsyncStorage:", error);
    }
  };

  return [state, setAsyncStorageState];
};
