import { useState } from 'wb-core-provider';
import { State } from '../Data/State';

export interface PagingData {
    currentPage: number;
    pageSize?: number;
    totalCount: number;
    pageCount: number;
    nextPage?: number;
    previousPage?: number;
    firstPage: number;
    lastPage: number;
}

export function usePagingData(): PagingData {
    const state = useState<State>();
    const pageCount = state.pageSize ? Math.ceil(state.totalCount / state.pageSize) : 1;
    const lastPage = state.pageSize ? pageCount - 1 : 0;

    return {
        currentPage: state.page,
        pageSize: state.pageSize,
        totalCount: state.totalCount,
        pageCount: pageCount,
        firstPage: 0,
        lastPage: lastPage,
        nextPage: state.page + 1 >= pageCount ? undefined : state.page + 1,
        previousPage: state.page - 1 < 0 ? undefined : state.page - 1,
    };
}
