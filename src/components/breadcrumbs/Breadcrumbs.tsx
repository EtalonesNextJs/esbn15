'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { formatLabel } from '@/lib/labels'




export function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb className="w-max max-w-screen-xl ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Главная</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

       {pathSegments.map((segment, index) => {
  const href = '/' + pathSegments.slice(0, index + 1).join('/')
  const isLast = index === pathSegments.length - 1
  const decodedSegment = decodeURIComponent(segment)

  return (
    <React.Fragment key={href}>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        {isLast ? (
          <BreadcrumbPage>{formatLabel(decodedSegment)}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={href}>{formatLabel(decodedSegment)}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    </React.Fragment>
  )
})}

      </BreadcrumbList>
    </Breadcrumb>
  )
}
