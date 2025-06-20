import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
        <Breadcrumbs/>
{children}
    </div>
  )
}