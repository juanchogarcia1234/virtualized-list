import Header from "@/components/Header";
import styles from "./page.module.css";
import VisualizedList from "@/components/VisualizedList";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <VisualizedList />
    </main>
  );
}
