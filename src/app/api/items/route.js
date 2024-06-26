const { faker } = require('@faker-js/faker');

export async function GET(request, res) {
	const generateFakeData = (rowCount) => {
		const data = []

		for (let i = 0; i < rowCount; i++) {
			const fakeRow = {
        		id: i,
				itemName: faker.commerce.productName(),
				itemDescription: faker.commerce.productDescription(),
				itemPrice: faker.commerce.price()
			}

			data.push(fakeRow)
		}

		return data
	}

	const rowCount = process.env.NEXT_PUBLIC_DATA_ROWS
	const fakeData = generateFakeData(rowCount)
 
  return Response.json(fakeData)
}
