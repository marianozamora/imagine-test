import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { Page, Document, Text, View, StyleSheet } from "@react-pdf/renderer";

import { textToCapitalize } from "./customFn";
const styles = StyleSheet.create({
	page: {
		fontFamily: "Helvetica",
		fontSize: 12,
		paddingTop: 30,
		paddingLeft: 60,
		paddingRight: 60,
		paddingBottom: 30,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 10,
	},
	table: {
		display: "table",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		marginBottom: 10,
	},
	tableRow: {
		flexDirection: "row",
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 0,

	},
	tableHeader: {
		backgroundColor: "#f2f2f2",
		fontWeight: "bold",
		borderStyle: "solid",
		borderBottomWidth: 1,
		borderColor: "#000",
		padding: 5,
		flex: 1,
	},
	tableCell: {
		borderStyle: "solid",
		borderBottomWidth: 1,
		borderColor: "#000",
		padding: 5,
		flex: 1,
	},
});

export const InventoryPDF = ({ inventoryData, name }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View>
				<Text style={styles.title}>Inventory Report { textToCapitalize(name) }</Text>
				<Text style={styles.subtitle}>Product List</Text>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<Text fontWeight="bold" style={styles.tableCell}>Product Name</Text>
						<Text style={styles.tableCell}>Quantity</Text>
						<Text style={styles.tableCell}>Price</Text>
						<Text style={styles.tableCell}>Description</Text>
					</View>
					{inventoryData.map((product, index) => (
						<View style={styles.tableRow} key={index}>
							<Text style={styles.tableCell}>{product.name}</Text>
							<Text style={styles.tableCell}>
								{product.quantity}
							</Text>
							<Text style={styles.tableCell}>
								{product.price}
							</Text>
							<Text style={styles.tableCell}
								borderWidth={1}
								borderColor={"#000"}
								borderStyle={"solid"}
							>
								{product.description}
							</Text>
						</View>
					))}
				</View>
			</View>
		</Page>
	</Document>
);
export const PDFDownload = ({ data, name }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<>
			{isClient ? (
				<PDFDownloadLink
					style={{ backgroundColor: '#ec4848', padding: 10, color: 'white', borderRadius: 5 }}

					document={<InventoryPDF inventoryData={data} name={name} />}
					fileName="example.pdf"
				>
					{({ blob, url, loading, error }) =>
						loading ? "Loading document..." : "Download PDF"
					}
				</PDFDownloadLink>
			) : null}
		</>
	);
};
