import { ReactNode } from 'react';
import style from './Layout.module.sass';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={style.container}>{children}</div>;
}
