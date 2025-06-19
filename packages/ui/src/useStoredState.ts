import {useCallback, useEffect, useRef, useState} from "react";

import {Unifier} from "./Unifier";

export const useStoredState = <T>(
  key: string,
  initialValue?: T
): [T | undefined, (value: T | undefined) => Promise<void>, boolean] => {
  const [state, setState] = useState<T | undefined>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

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
    void fetchData().then((value) => {
      if (isMounted.current) {
        setState(value);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
      if (isMounted.current) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAsyncStorageState = async (newValue: T | undefined): Promise<void> => {
    try {
      await Unifier.storage.setItem(key, newValue);
      if (isMounted.current) {
        setState(newValue);
      }
    } catch (error) {
      console.error("Error writing data to AsyncStorage:", error);
    }
  };

  return [state, setAsyncStorageState, isLoading];
};
