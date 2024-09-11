import { Header } from './Header';
import { Footer } from './Footer';
import { useRouter } from 'next/router';
import styles from '@/styles/layout.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const isHomePage = router.pathname === '/';
  const isSelectGamePage = router.pathname === '/selectGame';

  return (
    <>
      <Header />
      {isHomePage || isSelectGamePage ? (
        <main>{children}</main>
      ) : (
        <main className={styles.mainContent}>
          <div className="content-container">{children}</div>
        </main>
      )}
      <Footer />
    </>
  );
};
