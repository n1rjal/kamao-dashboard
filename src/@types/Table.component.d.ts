declare module TableComponent {
  interface DataInterface {
    [_id: string]: string;
    created_at: string;
    updated_at: string;
  }

  interface TableProps<D> {
    url: string;
    columns: ColumnInterface[];
    onLimitChange: (
      urlParams: any,
      setUrlParams: (params: any) => void,
      targetValue: number
    ) => void;
    onSkipChange: (
      urlParams: any,
      setUrlParams: (params: any) => void,
      targetValue: number
    ) => void;
    openLink?: boolean;
    type: string;
    urlParams: {
      name: string;
      defaultValue: string | number;
      as?: string;
    }[];
  }
}
