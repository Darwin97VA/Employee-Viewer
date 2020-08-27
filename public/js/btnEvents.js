const btnExcel = document.getElementById('btnExcel')
const btnCSV = document.getElementById('btnCSV')
const btnPDF = document.getElementById('btnPDF')

btnExcel.addEventListener('click', e => 
  exportTableToExcel('employeesTable', 'employees-data.xls'))

btnCSV.addEventListener('click', e => 
  exportTableToCsv('employeesTable', 'employees-data.csv'))

btnPDF.addEventListener('click', e => 
  exportTableToPdf('employeesTable', 'employees-data.pdf'))
