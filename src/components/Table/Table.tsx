import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import { useTable } from "react-table";
import { FaFileCsv } from "react-icons/fa";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

import axios from "axios";
import "./table.css";

interface DataInterface {
  [_id: string]: string;
  created_at: string;
  updated_at: string;
}

const generateCsvData = (rows: any) => {
  let dataTable: any[] = [];
  let rowData: any[] = [];
  rows.forEach((row: any) => {
    let entry: any = {};
    Object.keys(row.values).forEach((key) => {
      if (
        typeof row.values[key] === "string" ||
        typeof row.values[key] === "number"
      ) {
        entry[key] = row.values[key];
      }
    });
    rowData.push(entry);
    entry = {};
  });
  dataTable = rowData;
  return dataTable;
};

const Table = <D extends DataInterface, K>(
  props: TableComponent.TableProps<D>
) => {
  const [data, setData] = useState<D[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlParams, setUrlParams] = useState<any>({});

  const tableInstance = useTable({ columns: props.columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    const params = props.urlParams.reduce(
      (accumulator: any, param: Record<string, string | number>) => {
        accumulator[param.name] = param.defaultValue;
        return accumulator;
      },
      {}
    );
    setUrlParams(params);
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    async function fetchData() {
      try {
        const url = `${props.url}?${new URLSearchParams(urlParams).toString()}`;
        const response = await axios.get(url, {
          method: "GET",
          cancelToken: source.token,
        });
        const data = await response.data;
        setData(data);
        setLoading(false);
      } catch (e) {
        axios.isCancel(e);
      }
    }
    setLoading(true);
    fetchData();
    return () => source.cancel();
  }, [urlParams]);

  const getLimit = () => {
    let data = props.urlParams.find((param) => param.as === "limit")?.name;
    return (data && urlParams[data]) || 0;
  };

  const getSkip = () => {
    let data = props.urlParams.find((param) => param.as === "skip")?.name;
    return (data && urlParams[data]) || 0;
  };

  return (
    <div className="table-responsive my-5 bg-custom-light">
      <h3 className="p-2 table__tableHeader">{props.type} TABLE</h3>
      <div className="d-flex justify-content-end">
        <p className="mx-2 text-right">
          <CSVLink
            filename={`Kamao ${
              props.type
            } report ${new Date().toDateString()}.csv`}
            data={generateCsvData(rows)}
            className="mx-2"
          >
            <FaFileCsv style={{ fontSize: "23px" }} />
          </CSVLink>
        </p>
      </div>
      <>
        {loading && (
          <div
            className="justify-content-center d-flex p-2"
            style={{
              borderBottom: "1px solid black",
              width: "100%",
              backgroundImage:
                "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
            }}
          >
            <div className="spinner-border text-success mx-3"></div>
            <h6 className="font-weight-bold text-light">
              Loading data from server
            </h6>
          </div>
        )}

        <table className="table p-3" {...getTableProps()}>
          {!loading && (
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps()}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setUrlParams({
                            ...urlParams,
                            sort_by: column.id,
                            order: urlParams.order === "ASC" ? "DSC" : "ASC",
                          });
                        }}
                      >
                        {
                          <>
                            {urlParams.sort_by === column.id ? (
                              urlParams.order === "ASC" ? (
                                <FaSortUp style={{ color: "red" }}></FaSortUp>
                              ) : (
                                <FaSortDown style={{ color: "green" }} />
                              )
                            ) : (
                              <FaSort className="mx-2" />
                            )}
                            {column.render("Header")}
                          </>
                        }
                      </th>
                    ))
                  }
                </tr>
              ))}
            </thead>
          )}

          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {props.openLink ? (
                              <Link
                                to={`${props.type.toLowerCase()}/${
                                  cell.row.original._id
                                }`}
                              >
                                {cell.render("Cell")}
                              </Link>
                            ) : (
                              <>{cell.render("Cell")}</>
                            )}
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </>
      <div className="paginator m-2">
        <div className="">
          Showing{" "}
          <select
            value={getLimit()}
            onChange={(e) => {
              props.onLimitChange(
                urlParams,
                setUrlParams,
                +e.target.value || 10
              );
            }}
          >
            <option value={0}>0</option>

            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>{" "}
          datas
        </div>
        <br />
        <div>
          Jump by{" "}
          <select
            value={getSkip()}
            onChange={(e) => {
              props.onSkipChange(urlParams, setUrlParams, +e.target.value || 0);
            }}
          >
            <option value={0}>0</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
            <option value={70}>70</option>
          </select>{" "}
          Data
        </div>
      </div>
    </div>
  );
};

export default Table;
