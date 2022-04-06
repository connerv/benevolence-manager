
import React, {useRef} from "react";
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
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
import MoreIcon from '@material-ui/icons/More';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Button, Grid, InputAdornment } from "@material-ui/core";
import { createComment, createTransaction, getQuestions, createAssignedDeacon, updateUserSelectedQuestions } from "../../helpers/db";
import { Autocomplete } from "@material-ui/lab";
import SelectQuestions from "./select-questions";
import EditForm from "./edit-form";


  function descendingComparator(a, b, orderBy) {
    let x = 0
   a.data.answers.forEach((e) =>{
       
       if(e.qid == orderBy){
        b.data.answers.forEach((f) =>{
            if(f.qid == orderBy){
                if (String(e.answer).toLowerCase() < String(f.answer).toLowerCase()) {
                    x = -1;
                }
                else if (String(e.answer).toLowerCase() > String(f.answer).toLowerCase()) {
                    x = 1;
                }
                
            }
        })
       }
       
    })
    return x
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
         
        if(element.data.answers){
            let vals = Object.values(element.data.answers)
            if(element.data.name){
              if(String(element.data.name).toLowerCase().includes(searchTerm.toLowerCase()) ){
                searchArray.push(element)
                return 
              }
            }
            if(element.data.email){
              if(String(element.data.email).toLowerCase().includes(searchTerm.toLowerCase()) ){
                searchArray.push(element)
                return
              }
            }
            if(element.data.initialContact){
              if(String(element.data.initialContact).toLowerCase().includes(searchTerm.toLowerCase()) ){
                searchArray.push(element)
                return
              }
            }
            
            vals.some( (val) =>{
              
                if(String(val.answer).toLowerCase().includes(searchTerm.toLowerCase()) ){
                    searchArray.push(element)
                    return true
                }
            })
          
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
  



  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    button: {
      marginLeft: '15px'
    },
    button2: {
      marginLeft: '15px',
      marginTop: '15px'
    },
    spacer: {
      marginTop: '30px'
    },
    formControl: {
      minWidth: 120,
    },
    sticky: {
      position: "sticky",
      left: 0,
      background: "white",
      boxShadow: "2px 2px 5px grey"
    }

  });

  function XTableRow({ row, index, questions }){
    const labelId = `enhanced-table-checkbox-${index}`;
   
    const classes = useRowStyles();
  
   
  
   
    return (
        <React.Fragment>
            
            <TableRow
                hover
                tabIndex={-1}
                key={row.id}
            >
                {questions.map((q)=>{
                    let ans = ""
                    let alt = false
                    
                    row.data.answers.forEach((x)=>{
                        
                        if(q.id == x.qid){
                            if(typeof x.answer === 'object' && x.answer !== null){
                              ans = new Date(x.answer.seconds * 1000).toString()
                            }else{
                              ans = x.answer
                            }
                            
                        }
                        if(q.id == 123){
                          if(row.data.transactions){
                            let total = 0
                            row.data.transactions.forEach(transaction => {
                              total += Number(transaction.transaction)
                            })
                            ans = "$" + total
                          }else{
                            ans = "$0"
                          }
                          
                        }
                        if(q.id == 456){
                          alt = true
                          if(row.data.initialContact){
                            ans = `${row.data.name} / ${row.data.email} / ${row.data.initialContact}`
                          }else{
                            ans = `${row.data.name} `
                          }
                          
                        }
                           
                    })
                    if(alt){
                      return(
                        <TableCell component="th" id={labelId} scope="row" padding="default" className={classes.sticky}>
                           <b>{ans}</b> 
                         </TableCell>
                    )  
                    }
                    return(
                        <TableCell component="th" id={labelId} scope="row" padding="default">
                            {ans}
                         </TableCell>
                    )
                })}
                
              
      
                 
                
            </TableRow>
           
            
        </React.Fragment>
    );
  }
  

  const useHeadStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    button: {
      marginLeft: '15px'
    },
    button2: {
      marginLeft: '15px',
      marginTop: '15px'
    },
    sizer: {
      minWidth: '160px'
    },
    formControl: {
      minWidth: 120,
    },
    sticky: {
      position: "sticky",
      left: 0,
      background: "white",
      boxShadow: "2px 2px 5px grey"
    }

  });

  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;

    const classes2 = useHeadStyles();

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
 
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, index) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
              className={classes2.sizer}
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
        
    },
    search:{
        position: 'absolute', left: '0%'
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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
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
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    spacer: {
        display: 'none'
    },
    tableContainer:{
        maxHeight: '70vh',
        maxWidth: '75vw'
    }

  }));
  

export default function AllAnswers({users, setUsers, questions, fullQuestions, deacons, resetData}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    
    let rows = users;
    let selected =[]
    const componentRef = React.createRef()



    const getAllTitles = () =>{
      
        let titles = []
        titles.push({
          id: 456,
          numeric: false,
          disablePadding: false,
          label: "Email / Name / Inital Contact"
      })
        fullQuestions.forEach((q) =>{
            titles.push({
                id: q.id,
                numeric: false,
                disablePadding: false,
                label: q.name
            })
        })
        titles.push({
          id: 123,
          numeric: false,
          disablePadding: false,
          label: "Financial Assistance Given"
      })
        return titles
    }

    const handleRequestSort = (event, property) => {
      console.log("prop", property)
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
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
            <Table stickyHeader
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
                headCells={getAllTitles()}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy), getSearchTerm(searchTerm))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                      return(
                        <XTableRow key={index} row={row} index={index} questions={getAllTitles()} />
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
            classes={
                {
                   spacer: classes.spacer,
                }
            }
          />
          
          
       
      </div>
    );
  }