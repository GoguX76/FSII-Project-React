import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReceipt = (purchaseData, options = {}) => {
    const doc = new jsPDF();


    doc.setFontSize(20);
    doc.text("Midnight Phonk Store", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Comprobante de Pago", 105, 22, { align: "center" });


    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date(purchaseData.purchaseDate).toLocaleString()}`, 14, 35);
    doc.text(`Cliente: ${purchaseData.userName}`, 14, 40);
    doc.text(`Email: ${purchaseData.userId}`, 14, 45);

    if (purchaseData.id) {
        doc.text(`Orden #: ${purchaseData.id}`, 14, 50);
    } else if (purchaseData.orderCode) {
        doc.text(`Orden #: ${purchaseData.orderCode}`, 14, 50);
    }


    const ship = purchaseData.shippingDetails;
    doc.text("Dirección de Facturación:", 14, 60);
    doc.text(`${ship.address}, ${ship.city}`, 14, 65);
    doc.text(`CP: ${ship["postal-code"]}`, 14, 70);


    const tableColumn = ["Producto", "Cantidad", "Precio Unit.", "Total"];
    const tableRows = [];

    purchaseData.items.forEach((item) => {
        const itemData = [
            item.title,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.price * item.quantity).toFixed(2)}`,
        ];
        tableRows.push(itemData);
    });

    autoTable(doc, {
        startY: 75,
        head: [tableColumn],
        body: tableRows,
        theme: "striped",
    });


    const finalY = doc.lastAutoTable.finalY || 75;
    doc.setFontSize(12);
    doc.text(`Total a Pagar: $${purchaseData.totalAmount.toFixed(2)}`, 14, finalY + 10);


    doc.setFontSize(10);
    doc.text("¡Gracias por tu compra!", 105, finalY + 30, { align: "center" });

    if (options.returnBase64) {
        return doc.output('datauristring').split(',')[1];
    }


    doc.save(`boleta_midnight_phonk_${purchaseData.orderCode || Date.now()}.pdf`);
};
