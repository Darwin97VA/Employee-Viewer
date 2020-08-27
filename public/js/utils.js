
//#region Manipulate Arrays
function sortBy(arr, keys, keyChart = '~') {
	return arr.sort((i1, i2) => {
		const sortStr1 = keys.reduce((str, key) => str + keyChart + i1[key], '')
		const sortStr2 = keys.reduce((str, key) => str + keyChart + i2[key], '')
		return sortStr1.localeCompare(sortStr2)
	})
}
//#endregion



//#region Download to File
// Excel
function getTableData(tableID) {
	const tableSelect = document.getElementById(tableID)
	const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20")
	return tableHTML
}
function exportTableToExcel(tableID, filename = "") {
	const dataType = "application/vnd.ms-excel"
	let downloadLink

	filename = filename ? filename : "excel_data.xls"

	downloadLink = document.createElement("a")

	document.body.appendChild(downloadLink)

	let tableHtml = getTableData(tableID)
	if (navigator.msSaveOrOpenBlob) {
		let blob = new Blob(["ufeff", tableHtml], {
			type: dataType,
		})
		navigator.msSaveOrOpenBlob(blob, filename)
	} else {
		downloadLink.href = "data:" + dataType + ", " + tableHtml

		downloadLink.download = filename

		downloadLink.click()
	}
}

// CSV
function exportTableToCsv(tableID, filename) {
	let csv = [];
	let rows = document.querySelectorAll(`#${tableID} tr`);


	for (let i = 0; i < rows.length; i++) {
		let row = []
		let cols = rows[i].querySelectorAll("td, th");

		for (let j = 0; j < cols.length; j++) {
			if (cols[j].innerText)
				row.push(cols[j].innerText)
			else
				row.push("	")
		}

		row.join(",");
		row += "\r\n";
		csv.push(row);

	}

	csvFile = new Blob([csv.join("")], { type: "text/csv" })
	
	downloadLink = document.createElement("a")
	downloadLink.download = filename
	downloadLink.href = window.URL.createObjectURL(csvFile)
	downloadLink.click()
	downloadLink.remove()
}

// PDF
function exportTableToPdf(idTable, filename) {
	const doc = new jsPDF()
	doc.autoTable({ html: '#' + idTable })
	doc.save(filename)
}

//#endregion