
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
import { green, red, yellow } from "@material-ui/core/colors";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Button, Grid, InputAdornment } from "@material-ui/core";
import { createComment, createTransaction, getQuestions, createAssignedDeacon, updateUserSelectedQuestions, changeFileStatus } from "../../helpers/db";
import { Autocomplete } from "@material-ui/lab";
import SelectQuestions from "./select-questions";
import EditForm from "./edit-form";
import EditBudget from "./edit-budget";
import EditChurchResponse from "./edit-church-response";
import EditCaseCommitteeForm from "./edit-case-committee-form";










  
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
    { id: 'view', numeric: false, disablePadding: false, label: 'View Form' },
    { id: 'editform', numeric: false, disablePadding: false, label: 'Edit Form' },
  ];

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

  function XTableRow({ row, index, handleEditOpen, handleViewOpen}){
    const labelId = `enhanced-table-checkbox-${index}`;
 
   
    return (
        <React.Fragment>
            
            <TableRow
               
                key={row.id}
            >
                <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.data.name}
                </TableCell>
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleViewOpen(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
                </TableCell>
                <TableCell align="left">
                <div id={row.id} onClick={() => {handleEditOpen(row)}}>
                    <IconButton edge="end" aria-label="delete" id={row.id}>
                        <MoreIcon></MoreIcon>
                    </IconButton>
                </div>
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
  

export default function CaseCommitteeList({users, setUsers, questions, fullQuestions, deacons, resetData}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [editOpen, setEditOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = React.useState(false);
   
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
  
    const handleEditOpen = (row) => {
     
        setCurrentProfile(row)
        setEditOpen(true);
      };

    const handleViewOpen = (row) => {
    
      setCurrentProfile(row)
      setViewOpen(true);
    };

    const handleCloseView = () => {
      setViewOpen(false);
    };


    const handleCloseEdit = () => {
      setEditOpen(false);
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
                        <XTableRow key={index} row={row} index={index} handleEditOpen={handleEditOpen} handleViewOpen={handleViewOpen} />
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
          <Dialog id={1} fullScreen open={viewOpen} onClose={handleCloseView} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseView} aria-label="close">
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
                 
                 <h2>Case Committee Benevolence Case Summary</h2>

                  {currentProfile.data.ccReview ? (
                  <>
                  <h4>Family Name:</h4> 
                  <p>{currentProfile.data.ccReview.familyName}</p>
                  <h4>Family Members:</h4> 
                  <p>{currentProfile.data.ccReview.familyMembers}</p>
                  <h4>Date Initiated:</h4> 
                  <p>{currentProfile.data.ccReview.dateInitiated}</p>
                  <h4>Deacon / Team:</h4> 
                  <p>{currentProfile.data.ccReview.deaconTeam}</p>
                  <h4>Budget Form Completed: {currentProfile.data.ccReview.budgetCompleted}</h4> 
                  <h4>Action Plan Completed: {currentProfile.data.ccReview.actionPlanCompleted}</h4> 
                  <h4>Are Goals Realistic: {currentProfile.data.ccReview.goalsRealistic}</h4> 
                  <h4>Is CFC Able to Meet the Goal Partnering Needs: {currentProfile.data.ccReview.cfcAble}</h4> 
                  <h4>Timeline, Needs, Milestones:</h4> 
                  <p>{currentProfile.data.ccReview.timelineNeedsMilestones}</p>
                  <h4>Outside Agencies Involves:</h4> 
                  <p>{currentProfile.data.ccReview.outsideAgencies}</p>
                  <h4>Milestones:</h4> 
                  <p>{currentProfile.data.ccReview.milestone1}</p>
                  <p>{currentProfile.data.ccReview.milestone2}</p>
                  <p>{currentProfile.data.ccReview.milestone3}</p>
                  <p>{currentProfile.data.ccReview.milestone4}</p>
                  <h4>Obstacles:</h4> 
                  <p>{currentProfile.data.ccReview.obstacles}</p>
                  <h4>Financial Forecaset:</h4> 
                  <p>{currentProfile.data.ccReview.financial1}</p>
                  <p>{currentProfile.data.ccReview.financial2}</p>
                  <p>{currentProfile.data.ccReview.financial3}</p>
                  <p>{currentProfile.data.ccReview.financial4}</p>
                  <p>{currentProfile.data.ccReview.financial5}</p>
                  <h4>Support Network / Bible Study Referral Contact:</h4> 
                  <p>{currentProfile.data.ccReview.supportNetwork}</p>
                  <h4>Other Ministry – i.e., Stephens, Financial Counseling, Parenting, Personal Accountability etc.</h4> 
                  <p>{currentProfile.data.ccReview.otherMinistry}</p>
                  <h2>Case Committee Review and Plan</h2>
                  <h4>Approved to Accept Case: {currentProfile.data.ccReview.approved}</h4> 
                  <h4>Input on Case Plan, Notes From Review:</h4> 
                  <p>{currentProfile.data.ccReview.input}</p>
                  <h4>Follow up Timeline:</h4> 
                  <p>{currentProfile.data.ccReview.followUp}</p>
                  <h4>Financial Forecast - Overall Budget:</h4> 
                  <p>{currentProfile.data.ccReview.financialForecast}</p>
                  <h4>Sent to Treasurer: {currentProfile.data.ccReview.sentToTreasurer}</h4> 
                  <h4>Record:</h4> 
                  <p>{currentProfile.data.ccReview.record}</p>
                  <h4>Case Closed Date:</h4> 
                  <p>{currentProfile.data.ccReview.closedDate}</p>
                  <h4>Success: {currentProfile.data.ccReview.success}</h4> 
                  <h4>If “NO”  - Describe reason including if “outside factor”  or “client non-compliance”:</h4> 
                  <p>{currentProfile.data.ccReview.reason}</p>
                  </>
                  ) : (
                  <> 
                  <h3>No Case Committee Response for this profile</h3>
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
          <Dialog id={5} fullScreen open={editOpen} onClose={handleCloseEdit} TransitionComponent={Transition}>
          {currentProfile ? (
            <>
                <AppBar className={classes.appBar}>
                
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseEdit} aria-label="close">
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
                
                <EditCaseCommitteeForm user={currentProfile.data} resetData={resetData} uid={currentProfile.id}></EditCaseCommitteeForm>
                
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