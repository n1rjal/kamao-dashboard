import { useEffect, useMemo, useState } from "react";

const useHttpArray = <T, P>(
  functionToCall: (arg0: P) =>
    | {
        data: T[] | undefined;
        error: any;
      }
    | Promise<{ data: T[]; error: any }>,
  paramsObject: P,
  dependency: string | number
): { data: T[] | undefined; error: any; loading: boolean } => {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  useMemo(() => {
    const performHttpRequests = async () => {
      const { data, error }: any = await functionToCall(paramsObject);
      setError(error);
      setData(data);
      setLoading(false);
    };
    setLoading(true);
    performHttpRequests();
  }, [dependency]);
  return { data, error, loading };
};

const useHttpObject = <T, P>(
  functionToCall: (
    arg0: P
  ) => { data: T | undefined; error: any } | Promise<{ data: T; error: any }>,
  paramsObject: P,
  dependency: string | number
): { data: T | undefined; error: any; loading: boolean } => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>("");
  useEffect(() => {
    const performHttpRequests = async () => {
      const response: { data: T | undefined; error: any } =
        await functionToCall(paramsObject);
      setData(response.data);
      setError(response.error);
      setLoading(false);
    };
    setLoading(true);
    performHttpRequests();
  }, [dependency]);

  return { data, error, loading };
};

export { useHttpArray, useHttpObject };
