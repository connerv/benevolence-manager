
import React from "react";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send'
import { closeUserFile, removeUser, sendLoginLink } from "../../helpers/functions";
import { CheckBox, Lock, NotInterested } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { isConstructorDeclaration } from "typescript";
import { Button } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  function descendingComparator(a, b, orderBy) {
    
    if(orderBy == "type"){
      
      if (String(b.data.permissions[0]).toLowerCase() < String(a.data.permissions[0]).toLowerCase()) {
        return -1;
      }
      if (String(b.data.permissions[0]).toLowerCase() > String(a.data.permissions[0]).toLowerCase()) {
        return 1;
      }
      return 0;
    }
    if (String(b.data[orderBy]).toLowerCase() < String(a.data[orderBy]).toLowerCase()) {
      return -1;
    }
    if (String(b.data[orderBy]).toLowerCase() > String(a.data[orderBy]).toLowerCase()) {
      return 1;
    }
    return 0;
    
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function getSearchTerm(searchTerm) {
    return searchTerm
  }
  
  function stableSort(array, comparator, searchTerm) {
    let searchArray = []
    array.forEach(element => {
        
        if(element.data.name.toLowerCase().includes(searchTerm.toLowerCase()) || element.data.email.toLowerCase().includes(searchTerm.toLowerCase())){
            searchArray.push(element)
        }
    });  
    const stabilizedThis = searchArray.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'loginlink', numeric: false, disablePadding: false, label: 'Login Link Sent?' },
    { id: 'sendlink', numeric: false, disablePadding: false, label: 'Send Login Link' },
  ];
  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
 
  
    return (
      <TableHead>
        <TableRow>
         
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    search:{
        position: 'absolute', right: '0%'
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, onSearchTermChange } = props;
    const handleSearchChange = (e) =>{
        onSearchTermChange(e.target.value)
    } 
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            
          </Typography>
        )}
        <TextField
                        id="search"
                        label="Search"
                        placeholder="search"
                        variant="outlined"
                        onChange={handleSearchChange}
                        type="text"
                        //onKeyDown={}
                        size="small"
                        className={classes.search}
                      />
          
       
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
      tableContainer:{
        maxHeight: '70vh',
    },
  }));
  

export default function ListUsersDeacon({users, setUsers, resetData}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
    const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [bdOpen, setBdOpen] = React.useState(false);
    
 
    let rows = users;
    let selected =[]
    

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleFailClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setErrorMessage({open: false, message: ''});
      setSuccessMessage({open: false, message: ''});
    };

    const onSearchTermChange = (term) => {
        setSearchTerm(term)
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.data.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleDelete = async (e) => {

        const id = e.currentTarget.getAttribute("id")
        console.log(id)
        setBdOpen(true)
        let res = await removeUser(id)

      
      if(res.type === "success"){
        users.find(function(value, index) {
            console.log(value)
            if(value && value.id == id){
                users.splice(index, 1)
                

            }
        });
        setUsers([...users])
        setBdOpen(false)
        console.log(res.message)

      } else {
        setBdOpen(false)
        console.log(res.message)
      }
    }

    const handleLockAccount = async (e) => {

      const id = e.currentTarget.getAttribute("id")
      console.log(id)
      setBdOpen(true)
      let res = await closeUserFile(id)

    
      if(res.type === "success"){
        setBdOpen(false)
        setSuccessMessage({open: true, message: res.message});
  
      } else {
        setBdOpen(false)
        setErrorMessage({open: true, message: res.message});
    
      }
      resetData()
  }
    

    const handleSendLink = async (id, email) => {

      setBdOpen(true)
      let res = await sendLoginLink(email, id)
      
    
    if(res.type === "success"){
      setBdOpen(false)
      setSuccessMessage({open: true, message: res.message});

    } else {
      setBdOpen(false)
      setErrorMessage({open: true, message: res.message});
  
    }
    resetData()
  }
    const changeNameToUser = (type) =>{
      if(type == "user"){
        return "client"
      }
      return type
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        
          <EnhancedTableToolbar numSelected={selected.length} onSearchTermChange={onSearchTermChange} />
          <TableContainer className={classes.tableContainer}>
            <Table
            stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy), getSearchTerm(searchTerm))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.data.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                      >
                        
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.data.name}
                        </TableCell>
                        <TableCell align="left">{row.data.email}</TableCell>
                       
                        <TableCell align="left">{row.data.loginSent ? (
                          <>
                          {row.data.loginSent == true ? (
                            <><CheckBox style={{ color: green[500] }}></CheckBox></>
                          ) : (<><NotInterested style={{ color: red[500] }}></NotInterested></>)}
                        </>): (<><NotInterested style={{ color: red[500] }}></NotInterested></>)}</TableCell>
                        <TableCell align="left">
                       
                       <div id={row.id} onClick={() => {handleSendLink(row.id,row.data.email)}}>
                           <IconButton edge="end" aria-label="send" >
                               <SendIcon></SendIcon>
                           </IconButton>
                       </div>
                       </TableCell>
                        
                     
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Backdrop className={classes.backdrop} open={bdOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar open={errorMessage.open} autoHideDuration={6000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="error">
              {errorMessage.message}
              </Alert>
            </Snackbar>
            <Snackbar open={successMessage.open} autoHideDuration={6000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="success">
              {successMessage.message}
              </Alert>
            </Snackbar>
          
       
      </div>
    );
  }