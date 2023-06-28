import prisma from ".";

export async function createProduct(inventoryId, product) {
	try {
		const productFromDB = await prisma.product.create({
			data: {
				...product,
				inventory: {
					connect: {
						id: inventoryId,
					},
				},
			},
		});
		return { product: productFromDB };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function getProductById(id) {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
		});
		return { product };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function updateProduct(id, product) {
	try {
		const productUpdated = await prisma.product.update({
			where: {
				id,

			},
			data: {
				...product,
			},


		});
		return { product: productUpdated };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function deleteProduct(id) {
	try {
		const product = await prisma.product.delete({
			where: {
				id,
			},
		});
		return { product };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

