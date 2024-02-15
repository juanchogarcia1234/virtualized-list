import styles from './index.module.css'

export default function Header() {
	return <div className={styles.header}><h1>Virtualized List</h1><button className={styles.button}>Add new item</button></div>
}
