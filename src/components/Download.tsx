"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { Order } from "@/lib/types";
import { styles } from "@/lib/Data/PDFStyle";
import { User } from "next-auth";

interface InvoiceData {
  order: Order;
  user: User;
  invoiceNumber: string;
  invoiceDate: string;
}

const OrderInvoicePDF = ({ invoice }: { invoice: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>ORDER INVOICE</Text>
        <Text style={styles.subtitle}>Thank you for your purchase</Text>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.value}>#{invoice.invoiceNumber}</Text>

            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.value}>
              {new Date(invoice.invoiceDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.label}>Order Number:</Text>
            <Text style={styles.value}>#{invoice.order.id.slice(0, 8)}</Text>

            <Text style={styles.label}>Order Date:</Text>
            <Text style={styles.value}>
              {new Date(invoice.order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{invoice.user.name}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{invoice.user.email}</Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>
              {invoice.order.paymentMethod.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Item</Text>
            <Text style={styles.tableHeaderCell}>Price</Text>
            <Text style={styles.tableHeaderCell}>Qty</Text>
            <Text style={styles.tableHeaderCell}>Total</Text>
          </View>
          {invoice.order.products.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Image
                  src={item.product.logoImage}
                  style={styles.productImage}
                />
                <Text>{item.product.title}</Text>
                {item.product.category && (
                  <Text style={{ fontSize: 10, color: "#666" }}>
                    {item.product.category}
                  </Text>
                )}
              </View>
              <Text style={styles.tableCell}>
                {item.product.price.toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>
                {(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Subtotal:</Text>

            <Text style={styles.label}>Tax:</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.value}>
              {invoice.order.totalAmount.toFixed(2)}
            </Text>

            <Text style={styles.value}>₹0.00</Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>
            {invoice.order.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Status</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10 }}>Status:</Text>
          <Text
            style={{
              backgroundColor:
                invoice.order.paymentStatus === "paid"
                  ? "#4CAF50"
                  : invoice.order.paymentStatus === "processing" ||
                    invoice.order.paymentStatus === "verification_pending"
                  ? "#FFC107"
                  : "#F44336",
              color: "white",
              padding: "3px 10px",
              borderRadius: 10,
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            {invoice.order.paymentStatus}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>Thank you for shopping with us!</Text>
        <Text>If you have any questions, please contact our support team.</Text>
      </View>
    </Page>
  </Document>
);

interface DownloadOrderInvoiceProps {
  order: Order;
  user: User;
}

const DownloadOrderInvoice = ({ order, user }: DownloadOrderInvoiceProps) => {
  const invoiceData: InvoiceData = {
    order,
    user,
    invoiceNumber: `INV-${order.id.slice(0, 8).toUpperCase()}`,
    invoiceDate: new Date().toISOString(),
  };

  return (
    <PDFDownloadLink
      document={<OrderInvoicePDF invoice={invoiceData} />}
      fileName={`Invoice-${order.id.slice(0, 8)}.pdf`}
      className="px-4 py-2 bg-[#A92EDF] text-white rounded hover:bg-[#A92EDF]/90 transition-colors"
    >
      {({ loading }) =>
        loading ? "Generating invoice..." : "Download Invoice"
      }
    </PDFDownloadLink>
  );
};

export default DownloadOrderInvoice;
