import prisma from ".";

export async function createCompany(company) {
	let inventory;
	let companyFromDB;

	try {
		await prisma.$transaction(async (prisma) => {
			companyFromDB = await prisma.company.create({
				data: {
					...company,
				},
				include: {
					inventory: true,
				},
			});

			inventory = await prisma.inventory.create({
				data: {
					company: {
						connect: {
							nit: companyFromDB.nit,
						},
					},
				},
			});


		});
		return { company: companyFromDB, inventory };
	} catch (error) {
		return { error };
	}
}

export async function getCompanies() {
	try {
		const companies = await prisma.company.findMany({
		});
		return { companies };
	} catch (error) {
		return { error };
	}
}

export async function getCompanyById(id) {
	try {
		const company = await prisma.company.findUnique({
			where: {
				nit:id,
			},
			include: {
				inventory: {
					include: {
						product: true,
					}
				},
			},
		});
		return { company };
	} catch (error) {
		return { error };
	}
}

export async function updateCompany(company) {
	const dataWithoutNIT = { ...company };
	delete dataWithoutNIT.nit;

	try {
		const companyFromDB = await prisma.company.update({
			where: {
				nit: company.nit,
			},
			data: dataWithoutNIT,
		});
		return { company: companyFromDB };
	} catch (error) {
		return { error };
	}
}

export async function deleteCompany(id) {
	try {
		const companyFromDB = await prisma.company.delete({
			where: {
				nit:id,
			},
		});
		return { company: companyFromDB };
	} catch (error) {
		return { error };
	}
}
