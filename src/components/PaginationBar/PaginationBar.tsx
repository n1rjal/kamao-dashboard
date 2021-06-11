import React, { useEffect, useMemo, useState } from "react";

const PaginationBar = (props: PaginationBar.PaginatonBarPropsInterface) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPages = Math.floor(props.totalCount / props.limit + 1);

  useEffect(() => {
    setCurrentPage(Math.floor(props.skip / props.limit + 1));
  }, [props.limit, props.skip]);

  useMemo(() => {
    setLoading(false);
  }, [props.dependency]);

  return (
    <div>
      <p className="m-3">
        {currentPage && currentPage > 1 && (
          <button
            className="btn btn-custom-primary mx-2"
            disabled={loading}
            onClick={(e) => {
              if (props.setSkip) {
                props.setSkip(+props.skip - +props.limit);
                setLoading(true);
              }
            }}
          >
            {"<"}
          </button>
        )}
        {currentPage} of {totalPages}
        {currentPage && currentPage < totalPages && (
          <button
            disabled={loading}
            className="btn btn-custom-primary mx-2"
            onClick={(e) => {
              setLoading(true);
              if (props.setSkip) props.setSkip(+props.limit + +props?.skip);
            }}
          >
            {">"}
          </button>
        )}
      </p>
    </div>
  );
};

export default PaginationBar;
