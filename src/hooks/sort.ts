import { useMemo, useState } from "react";

export type SortConfigKey = "available" | "price" | "quantity";
export type SortConfigDirection = "ascending" | "descending";
interface SortConfig {
  key: SortConfigKey;
  direction: SortConfigDirection;
}

function useSort<T>(
  items: T[],
  config: SortConfig = {
    key: "available",
    direction: "ascending",
  },
) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(config);

  const sortedItems = useMemo(() => {
    let sortResult: T[] = [...items];

    if (!!sortConfig?.key) {
      sortResult.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortResult;
  }, [items, sortConfig]);

  function setSort(key: SortConfigKey) {
    let direction: SortConfigDirection = "ascending";

    if (key === sortConfig.key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  }

  return { sortedItems, setSort, sortConfig };
}

export default useSort;
