import styles from './index.module.css'

export default function VisualizedList({ items }) {
	return (
		<div className={styles.container}>
			<table>
				<thead className={styles.header}>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{items.map(({id, itemName, itemDescription, itemPrice}) => (
						<tr key={id} className={styles.row}>
							<td>{itemName}</td>
							<td>{itemDescription}</td>
							<td>{itemPrice}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
