import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationUi({ onChange, prev, next, first, last }) {
  return (
    <div className="mt-5">
      <Pagination >
        <PaginationContent>
          {prev && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => onChange(prev)}
              />
            </PaginationItem>
          )}
          {first && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={prev == null}
                onClick={() => onChange(first)}
              >
                {first}
              </PaginationLink>
            </PaginationItem>
          )}
          {prev && prev - first > 0 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {prev && next && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={true}
                onClick={() => onChange(prev + 1)}
              >
                {prev + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {next && last - next > 0 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {last && (
            <PaginationItem>
              <PaginationLink
                isActive={last == null}
                onClick={() => onChange(last)}
              >
                {last}
              </PaginationLink>
            </PaginationItem>
          )}

          {next && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => onChange(next)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationUi;
