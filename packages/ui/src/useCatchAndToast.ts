import {useToast} from "./Toast";
import {isAPIError, printAPIError} from "./Utilities";

export function useCatchAndToast(): (message: string, e: any) => void {
  const toast = useToast();
  return (message: string, e: any) => {
    let exceptionMsg;
    if (isAPIError(e)) {
      // Get the error without details.
      exceptionMsg = `${message}: ${printAPIError(e)}`;
      console.error(exceptionMsg);
    } else {
      exceptionMsg = e?.message ?? e?.error ?? String(e);
      console.error(`${message}: ${exceptionMsg}`);
    }
    toast.show(exceptionMsg, {variant: "error"});
  };
}
