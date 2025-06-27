// 'use client';

// import { useLoader } from '@/context/LoaderContext';
// import Link from 'next/link';

// export function LoadingLink({ href, children, ...props }: React.ComponentProps<typeof Link>) {
//   const { showLoading } = useLoader();

//   const handleClick = () => {
//     showLoading();
//   };

//   return (
//     <Link href={href} {...props} onClick={handleClick}>
//       {children}
//     </Link>
//   );
// }
'use client';

import Link from 'next/link';
import { useLoader } from '@/context/LoaderContext';

export function LoadingLink(props: React.ComponentProps<typeof Link>) {
  const { showLoading } = useLoader();

  return (
    <Link
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        showLoading();
      }}
    />
  );
}
