function pdfFromHTML(elemId, name) {
    var doc = new jsPDF('p', 'pt');
    var elem = document.getElementById(elemId);
    var res = doc.autoTableHtmlToJson(elem);
    doc.autoTable(res.columns, res.data);
    doc.save(`${name}.pdf`);
}