import styles from './index.module.css'

export default function VisualizedList({items}) {
	return <div>
		{items.map((item) => <div key={item.id} className={styles.list}>{item.id}</div>)}
	</div>
}
