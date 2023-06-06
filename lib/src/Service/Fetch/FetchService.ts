export interface FetchService {
    fetch(): Promise<void>;

    fetchNextPage(): Promise<void>;

    fetchPage(page: number): Promise<void>;
}
