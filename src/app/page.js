import Header from "@/components/Header";
import styles from "./page.module.css";
import VisualizedList from "@/components/VisualizedList";

//Dont cache for now for testing pourposes
export const dynamic = 'force-dynamic'

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`);
  const items = await response.json()

  return (
    <main className={styles.main}>
      <Header />
      <VisualizedList items={items} />
    </main>
  );
}