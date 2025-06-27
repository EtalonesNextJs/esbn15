'use client';

import { useRouter } from 'next/navigation';
import { useLoader } from '@/context/LoaderContext';

export const useNavigationLoading = () => {
  const router = useRouter();
  const { showLoading } = useLoader();

  const pushWithLoading = (href: string) => {
    showLoading();
    router.push(href);
  };

  return { pushWithLoading };
};
