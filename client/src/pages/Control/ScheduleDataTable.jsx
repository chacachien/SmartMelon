import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";


function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('Pump', '1-4-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '30-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '29-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '28-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '27-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '26-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Light', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '20-3-2023', '9:00 pm', '4:00 am'),
  createData('Pump', '20-3-2023', '9:00 pm', '4:00 am'),
];

export default function ScheduleDataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
         <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ padding: "20px" }}
          >
            Schedule
          </Typography>
      <TableContainer sx={{ maxHeight: '600px' }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Kind
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '200px' }}>
                    Date
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Start
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    End
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '80px' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.code}</TableCell>
                        <TableCell align="left">{row.population}</TableCell>
                        <TableCell align="left">{row.size}</TableCell>
                        <TableCell align="left">
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}