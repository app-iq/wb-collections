export interface FetchService {
    fetch(): Promise<void>;
    fetchMore(): Promise<void>;
}