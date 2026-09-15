import type { ReactNode } from 'react';

function PageContainer({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>;
}

export default PageContainer;
