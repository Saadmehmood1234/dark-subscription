import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #eee",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#A92EDF",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    width: "48%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  value: {
    marginBottom: 5,
  },
  table: {
    width: "100%",
    marginTop: 15,
    border: "1 solid #eee",
  },
  tableHeader: {
    backgroundColor: "#0C1B44",
    color: "white",
    flexDirection: "row",
  },
  tableHeaderCell: {
    padding: 8,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #eee",
  },
  tableCell: {
    padding: 8,
    flex: 1,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    flex: 3,
    textAlign: "right",
    paddingRight: 10,
  },
  totalValue: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTop: "1 solid #eee",
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
  productImage: {
    width: 40,
    height: 40,
    margin: "0 auto",
  },
});
