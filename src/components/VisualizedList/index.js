'use client'
import styles from './index.module.css'
import { useEffect, useState, useRef } from 'react'

export default function VisualizedList({ items }) {
	const settings = {
		minIndex: 1,
		maxIndex: process.env.NEXT_PUBLIC_DATA_ROWS,
		startIndex: 6,
		itemHeight: 40,
		amount: 5,
		tolerance: 2,
	}

	const setInitialState = ({ minIndex, maxIndex, startIndex, itemHeight, amount, tolerance }) => {
		// 1) height of the visible part of the viewport (px)
		const viewportHeight = amount * itemHeight
		// 2) total height of rendered and virtualized items (px)
		const totalHeight = (maxIndex - minIndex + 1) * itemHeight
		// 3) single viewport outlet height, filled with rendered but invisible rows (px)
		const toleranceHeight = tolerance * itemHeight
		// 4) all rendered rows height, visible part + invisible outlets (px)
		const bufferHeight = viewportHeight + 2 * toleranceHeight
		// 5) number of items to be rendered, buffered dataset length (pcs)
		const bufferedItems = amount + 2 * tolerance
		// 6) how many items will be virtualized above (pcs)
		const itemsAbove = startIndex - tolerance - minIndex
		// 7) initial height of the top padding element (px)
		const topPaddingHeight = itemsAbove * itemHeight
		// 8) initial height of the bottom padding element (px)
		const bottomPaddingHeight = totalHeight - topPaddingHeight
		// 9) initial scroll position (px)
		const initialPosition = topPaddingHeight + toleranceHeight
		// initial state object
		return {
			settings,
			viewportHeight,
			totalHeight,
			toleranceHeight,
			bufferHeight,
			bufferedItems,
			topPaddingHeight,
			bottomPaddingHeight,
			initialPosition,
			data: [],
		}
	}

	const viewportElement = useRef(null)
	const [listConfig, setListConfig] = useState(setInitialState(settings))

	const getData = (offset, limit) => {
		const data = []
		const start = Math.max(settings.minIndex, offset)

		const end = Math.min(offset + limit - 1, settings.maxIndex)
		if (start <= end) {
			for (let i = start; i <= end; i++) {
				if (items[i]) data.push(items[i])
			}
		}
		return data
	}

	const runScroller = ({ target: { scrollTop } }) => {
		const {
			totalHeight,
			toleranceHeight,
			bufferedItems,
			settings: { itemHeight, minIndex },
		} = listConfig
		const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
		const data = getData(index, bufferedItems)
		const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
		const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)

		setListConfig({
			...listConfig,
			topPaddingHeight,
			bottomPaddingHeight,
			data,
		})
	}

	useEffect(() => {
		runScroller({ target: { scrollTop: 0 } })
	}, [])

	return (
		<div
			className={styles.container}
			ref={viewportElement}
			style={{ height: listConfig.viewportHeight }}
			onScroll={runScroller}>
			<table>
				<thead className={styles.header}>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ height: listConfig.topPaddingHeight }}></tr>
					{listConfig.data.map(({ id, itemName, itemDescription, itemPrice }) => (
						<tr key={id} className={styles.row}>
							<td>{itemName}</td>
							<td>{itemDescription}</td>
							<td>{itemPrice}</td>
						</tr>
					))}
					<tr style={{ height: listConfig.bottomPaddingHeight }}></tr>
				</tbody>
			</table>
		</div>
	)
}
