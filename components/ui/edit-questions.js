
import React from "react";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { updateQuestions } from "../../helpers/db";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";








  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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
        
        if(element.name.toLowerCase().includes(searchTerm.toLowerCase()) || element.question.toLowerCase().includes(searchTerm.toLowerCase())){
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
    { id: 'question', numeric: false, disablePadding: false, label: 'Question' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Question Type' },
    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
    { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
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
            Questions
          </Typography>
        )}
        <TextField
                        id="search"
                        label="Search"
                        placeholder="question"
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
    formControl: {
      margin: theme.spacing(1),
      width: "25ch",
    },
    tableContainer:{
      maxHeight: '70vh',
  }
  }));
  

export default function SelectQuestions({setSelected, selected, questions, setQuestions}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentQ, setCurrentQ] = React.useState({})
    const [showEditor, setShowEditor] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [newOption, setNewOption] = React.useState("")
    
    const rowTypes = {
      SA: "Short Answer",
      LA: "Long Answer",
      OP: "Options",
      DT: "Date / Time",
      TI: "Time",
      DA: "Date",
      PH: "Phone Number"
    }
    
    const rowCategories = {
      'identifying-info': 'Identifying Information',
      'finances': 'Finances',
      'current-situation': 'Current Situation and Reason for Request',
      'housing': 'Housing Situation',
      'education': 'Education/Work History',
      'action': 'Action Plan',
      'health': 'Spiritual/Social/Emotional/Mental Health',
    }


    let rows = questions;
    
    const handleEditorOpen = () => {
        setShowEditor(true);
      };
    
      const handleEditorClose = () => {
        updateQuestions(questions)
        setShowEditor(false);
      };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const onSearchTermChange = (term) => {
        setSearchTerm(term)
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleNameChange = (e) => {
        const id = currentQ.id
        const items = questions;
       
        questions.find(function(value, index) {
            if(value.id == id){
                items[index] = {id: value.id, name: e.target.value, options: value.options, question: value.question, type: value.type, category: value.category}
                setCurrentQ({id: value.id, name: e.target.value, options: value.options, question: value.question, type: value.type, category: value.category})
            }
            
        });

        console.log(questions)
        setQuestions([...items]);
    };

    const handleQuestionChange = (e) => {
        const id = currentQ.id
        
        const items = questions;
       
        questions.find(function(value, index) {
            if(value.id == id){
                items[index] = {id: value.id, name: value.name, options: value.options, question: e.target.value, type: value.type, category: value.category}
                setCurrentQ({id: value.id, name: value.name, options: value.options, question: e.target.value, type: value.type, category: value.category})
            }
            
        });
       
        console.log(questions)
        setQuestions([...items]);
    };

    const handleTypeChange = (e) => {
      const id = currentQ.id
      
      const items = questions;
     
      questions.find(function(value, index) {
          if(value.id == id){
              items[index] = {id: value.id, name: value.name, options: value.options, question: value.question, type: e.target.value, category: value.category}
              setCurrentQ({id: value.id, name: value.name, options: value.options, question: value.question, type: e.target.value, category: value.category})
          }
          
      });
     
      console.log(questions)
      setQuestions([...items]);
  };

  const handleCategoryChange = (e) => {
    const id = currentQ.id
    
    const items = questions;
   
    questions.find(function(value, index) {
        if(value.id == id){
            items[index] = {id: value.id, name: value.name, options: value.options, question: value.question, type: value.type, category: e.target.value}
            setCurrentQ({id: value.id, name: value.name, options: value.options, question: value.question, type: value.type, category: e.target.value})
        }
        
    });
   
    console.log(questions)
    setQuestions([...items]);
};

    const handleSaveQuestion = () => {
        handleEditorClose()
    }

    const handleEdit = (e) => {

        const id = e.currentTarget.getAttribute("id")
        const items = questions;
       
        questions.find(function(value, index) {
            if(value.id == id){
                setCurrentQ(value)
                setShowEditor(true)
                //items[index] = {id: value.id, name: value.name, options: value.options, question: value.question +" editted", type: value.type}
            }
            
        });

        //setQuestions([...items]);
        
 
    }
    const handleOptionsChange = (e) => {

        currentQ.options.push(newOption)

        const id = currentQ.id
        const items = questions;
       
        questions.find(function(value, index) {
            if(value.id == id){
                items[index] = {id: value.id, name: value.name, options: currentQ.options, question: value.question, type: value.type}
            }
            
        });

        console.log(questions)
        setQuestions([...items]);
        
    };

    const handleNewOptions = (e) => {

        setNewOption(e.target.value)

    };

    const handleDeleteOption = (e) => {
        
        console.log(e.currentTarget.getAttribute("data-index"))
        currentQ.options.splice(e.currentTarget.getAttribute("data-index"), 1)

        const id = currentQ.id
        const items = questions;
       
        questions.find(function(value, index) {
            if(value.id == id){
                items[index] = {id: value.id, name: value.name, options: currentQ.options, question: value.question, type: value.type}
            }
            
        });

        setQuestions([...items]);
        console.log(questions)
       
    }

    const handleDelete = (e) => {

        const id = e.currentTarget.getAttribute("id")
        const items = questions;
        const copy = items.filter((row) => row.id != id);
        setQuestions(copy);
        updateQuestions(copy)
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
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                      >
                        
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.question}</TableCell>
                        <TableCell align="left">{rowTypes[row.type]}</TableCell>
                        <TableCell align="left">{rowCategories[row.category] || 'none'}</TableCell>
                        <TableCell align="left">
                       
                        <div id={row.id} onClick={handleEdit}>
                            <IconButton edge="end" aria-label="edit" >
                                <EditIcon></EditIcon>
                            </IconButton>
                        </div>
                        </TableCell>
                        <TableCell align="left">
                        <div id={row.id} onClick={handleDelete}>
                            <IconButton edge="end" aria-label="delete" id={row.id}>
                                <DeleteIcon></DeleteIcon>
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
          <Dialog open={showEditor} onClose={handleEditorClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
            <DialogContent>
            <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Question Type</InputLabel>
                      <Select
                        labelId="type-label"
                        id="aType"
                        value={currentQ.type}
                        onChange={handleTypeChange}
                      >
                        <MenuItem value={'SA'}>Short Answer</MenuItem>
                        <MenuItem value={'LA'}>Long Answer</MenuItem>
                        <MenuItem value={'DT'}>Date Time</MenuItem>
                        <MenuItem value={'DA'}>Date</MenuItem>
                        <MenuItem value={'TI'}>Time</MenuItem>
                        <MenuItem value={'OP'}>Options</MenuItem>
                        <MenuItem value={'PH'}>Phone Number</MenuItem>
                      </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Category</InputLabel>
                      <Select
                        labelId="type-label"
                        id="aType"
                        value={currentQ.category}
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value={'identifying-info'}>Identifying Information</MenuItem>
                        <MenuItem value={'finances'}>Finances</MenuItem>
                        <MenuItem value={'current-situation'}>Current Situation and Reason for Request</MenuItem>
                        <MenuItem value={'housing'}>Housing Situation</MenuItem>
                        <MenuItem value={'education'}>Education/Work History</MenuItem>
                        <MenuItem value={'action'}>Action Plan</MenuItem>
                        <MenuItem value={'health'}>Spiritual/Social/Emotional/Mental Health</MenuItem>
                      </Select>
                      </FormControl>

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Question Name"
                variant="outlined"
                type="text"
                onChange={handleNameChange}
                fullWidth
                value={currentQ.name}
            />
            <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                id="question"
                onChange={handleQuestionChange}
                label="Question"
                type="text"
                fullWidth
                value={currentQ.question}
            />
            {currentQ.type == "OP" ? (
                <div>
                    <List>
            <ListItem>
                <TextField
                    id="newQ"
                    label="New Option"
                    placeholder="New Option"
                    variant="outlined"
                    onChange={handleNewOptions}
                    type="text"
                    value={newOption}
                    //onKeyDown={}
                    size="small"
                    //className={classes.search}
                    /> 
                    
                    <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={handleOptionsChange}>
                    <AddCircleIcon></AddCircleIcon>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
           {currentQ.options.map((option, index) =>
                <ListItem >
                <ListItemText primary={option}/>
                <ListItemIcon>
                <div data-index={index} onClick={handleDeleteOption}>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </div>
                   
                </ListItemIcon>
                </ListItem>
            )}
            
        </List>
                </div>
            ):(
                <></>
            )}

            </DialogContent>
            <DialogActions>
            <Button onClick={handleSaveQuestion} color="primary">
                Save
            </Button>
            
            </DialogActions>
        </Dialog>
       
      </div>
    );
  }