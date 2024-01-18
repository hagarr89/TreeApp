import useLocalStorage from "./useLocalStorage";
import { IFile, fetchFilesFromServer } from "../services/fileSystem";
import { useEffect } from "react";

export const useFiels = () => {
  const [storeValue, setValue] = useLocalStorage<IFile[] | []>("FILES", []);

  const loadFiels = async () => {
    try {
      const res: IFile[] | null = (await fetchFiels())
      if (res) {
        setValue(res);
      }
    } finally {
    }
  };

  const handelFetchFiels = async (node?: IFile) => {
    try {
      if (!node || node?.type === "Folder") {
        const nodes = (await fetchFilesFromServer()) as IFile[];
        return nodes;
      }
    } catch {
      throw  new Error('no fectch fiels');
    }
    return null;
  };

  const handelSaveFiels = (nodes: IFile[] | []) => {
    setValue(nodes);
  };

  useEffect(() => {
    if (!storeValue?.length) loadFiels();
  }, []);

  return {
    fiels:storeValue,
    handelFetchFiels,
    handelSaveFiels,
  };
};
