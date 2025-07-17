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
      <Pagination>
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
          {prev && prev - first > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {first !== prev && prev > 2 && next && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onChange(prev - 1)}>
                {prev - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {first !== prev && prev && next && next - prev > 1 && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onChange(prev)}>
                {prev}
              </PaginationLink>
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
          {next !== last && prev && next && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onChange(prev + 2)}>
                {prev + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {next !== last && prev && last - next > 1 && next && (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => onChange(prev + 3)}>
                {prev + 3}
              </PaginationLink>
            </PaginationItem>
          )}

          {next && last - next > 2 && (
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
