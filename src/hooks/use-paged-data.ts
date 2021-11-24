import React, { useState, useEffect } from 'react'

export interface PagedData<T> {
  data: T[];
  count: number;
}

export function usePagedData<T>(all: T[], page: number, pageSize: number): PagedData<T> {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    setData(all.slice(page * pageSize, (page + 1) * pageSize))
  }, [all, page, pageSize])

  return { 
    data,
    count: Math.ceil(all.length / pageSize)
  }
}