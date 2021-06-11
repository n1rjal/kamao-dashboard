declare module PaginationBar {
  interface PaginatonBarPropsInterface {
    limit: number;
    skip: number;
    setLimit: (limit: number) => void;
    setSkip: (number: number) => void;
    totalPages: number;
    paginationItemName: string;
    dependency: string | number | undefined;
    totalCount: number;
  }
}
