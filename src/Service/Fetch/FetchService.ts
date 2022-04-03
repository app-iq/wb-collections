export interface FetchService {
    fetch(): Promise<void>;
    fetchNextPage(): Promise<void>;
}