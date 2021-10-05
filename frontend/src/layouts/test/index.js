import jsPDF from "jspdf";
import "jspdf-autotable"
import PrintIcon from '@material-ui/icons/Print'
import MaterialTable from 'material-table'
import Card from "@material-ui/core/Card";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Material-UI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";

// Custom styles for the Tables
import styles from "layouts/tables/styles";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

const studentData = [
    {
      id: 1,
      name: "Neeraj",
      email: "neeraj@gmail.com",
      year: 2015,
      fee: 167000,
    },
    {
      id: 2,
      name: "Vikas",
      email: "vikas@gmail.com",
      year: 2013,
      fee: 785462,
    },
  
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      year: 2020,
      fee: 784596,
    }
  ]

function Test() {
    const columns = [
      { title: "Name", field: "name", },
      { title: "Email", field: "email", },
      { title: "Year", field: "year", type: "numeric" },
      { title: "Fee", field: 'fee', type: "currency" }]
    
      const downloadPdf = () => {
        const doc = new jsPDF()
        doc.text("Student Details", 20, 10)
        doc.autoTable({
          theme: "grid",
          columns: columns.map(col => ({ ...col, dataKey: col.field })),
          body: studentData
        })
        doc.save('table.pdf')
      }
      return (
      <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6"></SuiTypography>
              <MaterialTable
            title="Student Details"
            columns={columns}
            data={studentData}
            actions={[
              {
                icon: () => <PrintIcon />,// you can pass icon too
                tooltip: "Export to Pdf",
                onClick: () => downloadPdf(),
                isFreeAction: true
              }
            ]}
          />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}
    
    export default Test;
