import { Header } from './Header';
import { Footer } from './Footer';
import { useRouter } from 'next/router';
import styles from '@/styles/layout.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const isHomePage = router.pathname === '/';
  const isSelectGamePage = router.pathname === '/select-game';

  return (
    <>
      {!isHomePage && <Header />}
      {isHomePage || isSelectGamePage ? (
        <main>
          <div className="content_container min-h-screen pb-20">{children}</div>
        </main>
      ) : (
        <main className={styles.mainContent}>
          <div className="content_container min-h-screen pb-20">{children}</div>
        </main>
      )}
      <Footer />
    </>
  );
};
