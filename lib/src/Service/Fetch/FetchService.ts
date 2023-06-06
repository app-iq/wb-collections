export interface FetchService {
    fetch(): Promise<void>;

    fetchMore(): Promise<void>;

    fetchPage(page: number): Promise<void>;
}
