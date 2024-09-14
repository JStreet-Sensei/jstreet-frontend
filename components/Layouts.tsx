import { Header } from './Header';
import { Footer } from './Footer';
import { useRouter } from 'next/router';
import styles from '@/styles/layout.module.css';
import gameStyles from '@/styles/Game.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const isHomePage = router.pathname === '/';
  const isSelectGamePage = router.pathname === '/select-game';
  const isGamePage = router.pathname === '/game/find-pair';
  console.log(router.pathname);

  return (
    <>
      {!isHomePage && <Header />}
      {isGamePage ? (
        <main className={`${gameStyles.pattern_bg} flex flex-grow min-h-screen overflow-auto`}>
          <div className="content_container flex-grow pb-20">{children}</div>
        </main>
      ) : isHomePage || isSelectGamePage ? (
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
