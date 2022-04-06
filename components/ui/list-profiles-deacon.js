
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
import EditBudget from "./edit-budget";
import { green, red, yellow } from "@material-ui/core/colors";
import EditChurchResponse from "./edit-church-response";








  
  function descendingComparator(a, b, orderBy) {
    
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
        //|| element.data.email.toLowerCase().includes(searchTerm.toLowerCase())
        if(element.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ){
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
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'info', numeric: false, disablePadding: false, label: 'Full Info' },
    { id: 'editform', numeric: false, disablePadding: false, label: 'Edit Survey' },
    { id: 'editanswers', numeric: false, disablePadding: false, label: 'Edit Answers' },
    { id: 'budget', numeric: false, disablePadding: false, label: 'Budget' },
    { id: 'churchresponse', numeric: false, disablePadding: false, label: 'Church Response' },
  ];

  const forOptions = [
    'Rent', 
    'Security Deposit',
    'Late Fees',
    'Mortgage',
    'Utilities (Gas/Water/Electric)',
    'Phone (Home/Cell)',
    'TV/Internet',
    'Insurance',
    'Home Repair',
    'Auto Payment',
    'Auto Repair',
    'Auto Fuel',
    'Bus/Uber/Transportation',
    'Clothing',
    'Tuition/School Expenses',
    'Groceries',
    'Medical/Dental',
    'Credit Card/Debt Payment',
    'Taxes',
    'Moving Expenses',
    'Household Misc',
    'Child Care/Child Support/Alimony',
    'Other',
  ]

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

  });

  function XTableRow({ row, index, handleOpenProfile, resetData, handleEditAnswers, handleEditQuestions, handleBudget, handleChurchResponse }){
    const labelId = `enhanced-table-checkbox-${index}`;
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("")
    const [transaction, setTransaction] = React.useState("")
    const [transactionFor, setTransactionFor] = React.useState("")
    const [xtransactionFor, setxTransactionFor] = React.useState(null)
    const [deacon, setDeacon] = React.useState("")

    let total = 0
    const classes = useRowStyles();
    
    const handleMore = async (row) => {
        handleOpenProfile(row)
    }
    const addComment = async (id) => {
     await createComment(comment, id)
      setComment("")
      resetData()

    } 
    const assignDeacon = async (id) => {
      let deaconID = deacon
      let name = ""
      deacons.forEach((d) => {
        if(d.id == deaconID){
          name = d.name
        }
      })
      console.log(id, name, deaconID)
      await createAssignedDeacon(id, name, deaconID)
      setDeacon("")
      resetData()

    } 
    const addTransaction = async (id) => {
      await createTransaction(transaction, transactionFor, id)
      setTransaction("")
      setTransactionFor("")
      resetData()
    }   
    const handleCommentChange = (e) =>{
      setComment(e.target.value)
  } 
    const handleTransactionChange = (e) =>{
      setTransaction(e.target.value)
  } 
    const handleTransactionForChange = (e) =>{
      setTransactionFor(e.target.value)
  } 
  const handleDeaconChange = (e) =>{
    setDeacon(e.target.value)
} 
   
    return (
        <React.Fragment>
            
            <TableRow
                hover
                tabIndex={-1}
                key={row.id}
            >
                <TableCell padding="checkbox">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.data.name}
                </TableCell>
                <TableCell align="left" >
                {row.data.status ? 
                  ( 
                    <>
                    {row.data.status == 'active' ? 
                  <h3 style={{color: green[500]}}> Active </h3>
                  :
                  <></>
                  }
                  
                  {row.data.status == 'hold' ? 
                <h3 style={{color: yellow[500]}}> Hold </h3>
                :
                <></>
                }
               
                {row.data.status == 'closed' ? 
              <h3 style={{color: red[500]}}> Closed </h3>
              :
              <></>
              }
              </>
                  )
              :
              <h3 style={{color: green[500]}}> Active </h3>
              }
                </TableCell>
                
                
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleMore(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleEditQuestions(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleEditAnswers(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleBudget(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
                <TableCell>
                <div id={row.id} onClick={() => {handleChurchResponse(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Deacon(s) assigned: {row.data.deacons ? (
                          <>
                          {row.data.deacons.map( (d, index) =>{
                            if(index == 0){
                              return (
                                <>{d.name}</>
                                )
                            }else{
                              return (
                                <>, {d.name} </>
                                )
                            }
                            
                          })}
                          </>
                        ) : (
                          <> 
                         none
                          </>
                        )}
                    </Typography>
                    <div className={classes.spacer}></div>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell>Comments</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">By</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.data.comments ? (
                          <>
                          {row.data.comments.map((comment, index) => {
                            return (
                              <TableRow>
                            <TableCell component="th" scope="row">
                              {comment.comment}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right"> {comment.by}</TableCell>
                            <TableCell align="right">
                              {new Date(comment.date).toDateString()} 
                            </TableCell>
                            </TableRow>
                            )
                          })}
                          </>
                        ) : (
                          <> 
                          <TableRow>
                            <TableCell component="th" scope="row">
                              
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                               
                            </TableCell>
                            </TableRow>
                          </>
                        )}
                            
                      
                        </TableBody>
                        
                        <TableRow>
                        <TextField
                        id="comment"
                        label="Comment"
                        placeholder="comment"
                        variant="outlined"
                        size="small"
                        multiline 
                        rows="4"
                        value={comment}
                        onChange={handleCommentChange}
                        type="text"
                      />
                        </TableRow>
                        <TableRow>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          className={classes.button}
                          onClick={() => {addComment(row.id)}}
                        >
                         Add New Comment
                        </Button>
                        </TableRow>
                        <div className={classes.spacer}></div>
                        
                        <TableHead>
                        
                        <TableRow>
                            <TableCell>Financial Assistance Given</TableCell>
                            <TableCell>For</TableCell>
                            <TableCell align="right">Logged By</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.data.transactions ? (
                          <>
                          {row.data.transactions.map((transaction, index) => {
                           total = (total + Number(transaction.transaction))
                            return (
                              <TableRow>
                            <TableCell component="th" scope="row">
                              ${transaction.transaction}
                            </TableCell>
                            <TableCell>{transaction.for}</TableCell>
                            <TableCell align="right"> {transaction.by}</TableCell>
                            <TableCell align="right">
                              {new Date(transaction.date).toDateString()}
                            </TableCell>
                            </TableRow>
                            )
                          })}
                          </>
                        ) : (
                          <> 
                          <TableRow>
                            <TableCell component="th" scope="row">
                              
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                               
                            </TableCell>
                            </TableRow>
                          </>
                        )}
                            
                      
                        </TableBody>
                        <TableHead>
                        <TableRow>
                            <TableCell>Total: ${total}</TableCell>
                          
                        </TableRow>
                        </TableHead>
                       
                          <TableRow>
                          <TextField
                          id="transaction"
                          label="Transaction"
                          placeholder="0"
                          variant="outlined"
                          size="small"
                          value={transaction}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                          }}
                          onChange={handleTransactionChange}
                          type="number"
                        />
                         <Autocomplete
                          id="combo-box"
                          options={forOptions.map((option) => option)}
                          freeSolo
                          style={{ width: 300 }}
                          value={transactionFor}
                          onChange={(event, newValue) => {
                            setTransactionFor(newValue);
                          }}
                          onInputChange={(event, newInputValue) => {
                             setTransactionFor(newInputValue);
                          }}
                          
                          renderInput={(params) => <TextField {...params}
                            id="transactionFor"
                            label="For"
                            variant="outlined"
                            
                          />}
                        />
                         
                        </TableRow>
                        <TableRow>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.button}
                            onClick={() => {addTransaction(row.id)}}
                          >
                          Add New Transaction
                          </Button>
                          </TableRow>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            
        </React.Fragment>
    );
  }
  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
 
  
    return (
      <TableHead>
        <TableRow>
        <TableCell padding="checkbox">
            
        </TableCell>
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
    tableContainer:{
      maxHeight: '70vh',
  }
  }));
  

export default function ListProfilesDeacon({users, questions, fullQuestions, resetData}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [selectedQuestions, setSelectedQuestions] = React.useState([]);

    const [profileOpen, setProfileOpen] = React.useState(false);
    const [editQuestionsOpen, setEditQuestionsOpen] = React.useState(false);
    const [editAnswersOpen, setEditAnswersOpen] = React.useState(false);
    const [budgetOpen, setBudgetOpen] = React.useState(false);
    const [churchResponseOpen, setChurchResponseOpen] = React.useState(false);

    const [currentProfile, setCurrentProfile] = React.useState(null);
   
    let total = 0
    let rows = users;
    let selected =[]
    const componentRef = React.createRef()

    const print =
      useReactToPrint({
        content: () => componentRef.current,
      });

    const handleRequestSort = (event, property) => {
      console.log(property)
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

    const answerToString = (x) =>{
      if(typeof x  === 'object' && x !== null){
        return x.toDate().toDateString()
      }else{
        return x
      }
    }

    const qidToQuestion = (x) =>{
      
      return questions[x] || "question not found"
        
    }
  
    const handleOpenProfile = (row) => {
     
        setCurrentProfile(row)
        setProfileOpen(true);
      };

    const handleEditAnswers = (row) => {
   
        setCurrentProfile(row)
        setEditAnswersOpen(true);
      };

    const handleBudget = (row) => {
  
      setCurrentProfile(row)
      setBudgetOpen(true);
    };
    const handleChurchResponse = (row) => {
      setCurrentProfile(row)
      setChurchResponseOpen(true)
  };

    const handleEditQuestions = (row) => {
      
        setCurrentProfile(row)
        setSelectedQuestions(row.data.questions || [])
        setEditQuestionsOpen(true);
      };

    const saveEditQuestions = async () =>{
      await updateUserSelectedQuestions(currentProfile.id, selectedQuestions)
      resetData()
      handleCloseEditQuestions()
    };
    
    const handleCloseProfile = () => {
      setProfileOpen(false);
    };

    const handleCloseEditAnswers = () => {
      resetData()
      setEditAnswersOpen(false);
    };

    const handleCloseEditQuestions = () => {
      setEditQuestionsOpen(false);
    };
    const handleCloseBudget = () => {
      setBudgetOpen(false);
    };

    const handleCloseChurchResponse = () => {
      setChurchResponseOpen(false)
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
                      return(
                        <XTableRow key={index} row={row} index={index} handleOpenProfile={handleOpenProfile} handleChurchResponse={handleChurchResponse} handleBudget={handleBudget} handleEditQuestions={handleEditQuestions} handleEditAnswers={handleEditAnswers} resetData={resetData} />
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
          <Dialog id={1} fullScreen open={profileOpen} onClose={handleCloseProfile} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseProfile} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {currentProfile.data.name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={print}>
                    print
                    </Button>
                </Toolbar>
                </AppBar>
                <Grid container spacing={3} ref={componentRef}>
                  <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <List >
                 <ListItem>
                   <h1> {currentProfile.data.name}</h1>
                 </ListItem>
                 <ListItem>
                    <Table>
                   
                        <Typography variant="h6" gutterBottom component="div">
                            Deacon(s) assigned: {currentProfile.data.deacons ? (
                              <>
                              {currentProfile.data.deacons.map( (d, index) =>{
                                if(index == 0){
                                  return (
                                    <>{d.name}</>
                                    )
                                }else{
                                  return (
                                    <>, {d.name} </>
                                    )
                                }
                                
                              })}
                              </>
                            ) : (
                              <> 
                            none
                              </>
                            )}
                        </Typography>
                        
                        
                        <Table size="small" >
                            <TableHead>
                            <TableRow>
                                <TableCell>Comments</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">By</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {currentProfile.data.comments ? (
                              <>
                              {currentProfile.data.comments.map((comment, index) => {
                                return (
                                  <TableRow>
                                <TableCell component="th" scope="row">
                                  {comment.comment}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right"> {comment.by}</TableCell>
                                <TableCell align="right">
                                  {new Date(comment.date).toDateString()} 
                                </TableCell>
                                </TableRow>
                                )
                              })}
                              </>
                            ) : (
                              <> 
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  
                                </TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">
                                  
                                </TableCell>
                                </TableRow>
                              </>
                            )}
                                
                          
                            </TableBody>
                            
                           
                          
                            
                            <TableHead>
                            
                            <TableRow>
                                <TableCell>Financial Assistance Given</TableCell>
                                <TableCell>For</TableCell>
                                <TableCell align="right">Logged By</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {currentProfile.data.transactions ? (
                              <>
                              {currentProfile.data.transactions.map((transaction, index) => {
                              total = (total + Number(transaction.transaction))
                                return (
                                  <TableRow>
                                <TableCell component="th" scope="row">
                                  ${transaction.transaction}
                                </TableCell>
                                <TableCell>{transaction.for}</TableCell>
                                <TableCell align="right"> {transaction.by}</TableCell>
                                <TableCell align="right">
                                  {new Date(transaction.date).toDateString()}
                                </TableCell>
                                </TableRow>
                                )
                              })}
                              </>
                            ) : (
                              <> 
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">
                                  
                                </TableCell>
                                </TableRow>
                              </>
                            )}
                                
                          
                            </TableBody>
                            <TableHead>
                            <TableRow>
                                <TableCell>Total: ${total}</TableCell>
                              
                            </TableRow>
                            </TableHead>
                          
            
                       </Table>
                        
                </Table>
                 </ListItem>
                  

                  
                  {currentProfile.data.answers ? (
                    <>
                    <h2> Client Survey Answers</h2>
                    {currentProfile.data.answers.map((row, index) => {
                      return(
                      <ListItem key={index}>
                        <ListItemText primary={qidToQuestion(row.qid) } secondary={answerToString(row.answer)} />
                      </ListItem>
                      )
                    
                    
                    
                    })}
                  </>
                  ) : (
                    <> 
                    <h2>No Data for this profile</h2>
                    </>
                  )}
                  
                  
                  
                  
                    <h2> Church Assessment / Response</h2>

                    {currentProfile.data.churchResponse ? (
                    <>
                     <h4>Client Belief:</h4> 
                     <p>{currentProfile.data.churchResponse.belief}</p>
                     <h4>Assessment:</h4> 
                     <p>{currentProfile.data.churchResponse.assessment}</p>
                     <h4>Response:</h4> 
                     <p>{currentProfile.data.churchResponse.response}</p>
                   </>
                  ) : (
                    <> 
                    <h3>No Church Response for this profile</h3>
                    </>
                  )}
                    

                      </List>
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>
                
                    </>
                  ) : (
                    <></>
                  )

                  }
                
                
          </Dialog>
          <Dialog id={2} fullScreen open={editQuestionsOpen} onClose={handleCloseEditQuestions} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseEditQuestions} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {currentProfile.data.name}
                    </Typography>
                    
                    
                </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <SelectQuestions setSelected={setSelectedQuestions} selected={selectedQuestions} questions={fullQuestions}></SelectQuestions>
                <Button
                          variant="outlined"
                          color="primary"
                          onClick={saveEditQuestions}
                        >
                         Save Profile
                        </Button>
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>

                
                    </>
                  ) : (
                    <></>
                  )

                  }
                
                
          </Dialog>
          <Dialog id={3} fullScreen open={editAnswersOpen} onClose={handleCloseEditAnswers} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseEditAnswers} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {currentProfile.data.name}
                    </Typography>
                    
                    
                </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                <Grid item xs={10}>

                <EditForm user={currentProfile.data} allQuestions={fullQuestions} uid={currentProfile.id} handleCloseEditAnswers={handleCloseEditAnswers}></EditForm>
                
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>

                
                    </>
                  ) : (
                    <></>
                  )

                  }
                
                
          </Dialog>
          <Dialog id={4} fullScreen open={budgetOpen} onClose={handleCloseBudget} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseBudget} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {currentProfile.data.name}
                    </Typography>
                    
                    
                </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                <Grid item xs={10}>

                <EditBudget user={currentProfile.data} resetData={resetData} uid={currentProfile.id}></EditBudget>
                
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>

                
                    </>
                  ) : (
                    <></>
                  )

                  }
                
                
          </Dialog>
          <Dialog id={5} fullScreen open={churchResponseOpen} onClose={handleCloseChurchResponse} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseChurchResponse} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {currentProfile.data.name}
                    </Typography>
                    
                    
                </Toolbar>
                </AppBar>
                <Grid container spacing={3}>
                  <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                
                <EditChurchResponse user={currentProfile.data} resetData={resetData} uid={currentProfile.id}></EditChurchResponse>
                
                </Grid>
                <Grid item xs={1}></Grid>
                </Grid>

                
                    </>
                  ) : (
                    <></>
                  )

                  }
                
                
          </Dialog>
          
          
       
      </div>
    );
  }