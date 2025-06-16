'use client';

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string; // например: "/vacancies/page"
}

export function PaginationNavigation({ currentPage, totalPages, basePath }: Props) {
  const createPageLink = (page: number) => `${basePath}/${page}`;

  const getPageRange = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }
    return range;
  };

  const pageRange = getPageRange();

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageLink(currentPage - 1)} className="w-max p-1">
              <ArrowLeft/>Назад
            </PaginationLink>
          </PaginationItem>
        )}

        {pageRange[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageLink(1)}>1</PaginationLink>
            </PaginationItem>
            {pageRange[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageLink(page)}
              className={page === currentPage ? "font-bold underline" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageRange[pageRange.length - 1] < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={createPageLink(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={createPageLink(currentPage + 1)} className="w-max p-1">
              Вперёд <ArrowRight/>
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
