
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
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';


  
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
  ];
  
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
    const { numSelected, onSearchTermChange, handleSelectCategoryClick } = props;
    const handleSearchChange = (e) =>{
        onSearchTermChange(e.target.value)
    } 
  
    return (
      <div>
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
      
      </div>
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
  }));
  

export default function SelectQuestions({setSelected, selected, questions}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
   
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const rowTypes = {
      SA: "Short Answer",
      LA: "Long Answer",
      OP: "Options",
      DT: "Date / Time",
      DA: "Date",
      TI: "Time",
      PH: "Phone Number",
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
    
    const rows = questions;
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const onSearchTermChange = (term) => {
        setSearchTerm(term)
    };
  

    const handleSelectCategoryClick = (event) => {
      
      if (event.target.checked) {
        const newSelecteds = []
        rows.map((n) => {
          if(n.category == event.target.name){
            newSelecteds.push(n.id)
          }
        });
        let union = [...new Set([...selected, ...newSelecteds])];
        
        setSelected([...union]);
        return;
      }
      
      const newSelecteds = [...selected]
      selected.map((n) => {
        
        const found = rows.find((e) => e.id == n)
        
        if(found.category == event.target.name){
          const index = newSelecteds.indexOf(found.id)
          console.log(index)
          if(index >= 0){
            newSelecteds.splice(index, 1)
          }
        }
      });
      
      setSelected([...newSelecteds])
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
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
        
          <EnhancedTableToolbar numSelected={selected.length} onSearchTermChange={onSearchTermChange} handleSelectCategoryClick={handleSelectCategoryClick} />
          <TableContainer>
          <FormGroup row>
          
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="identifying-info"
                color="primary"
              />
            }
            label="Identifying Information"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="current-situation"
                color="primary"
              />
            }
            label="Current Situation"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="finances"
                color="primary"
              />
            }
            label="Finances"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="housing"
                color="primary"
              />
            }
            label="Housing Situation"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="education"
                color="primary"
              />
            }
            label="Education/Work History"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="action"
                color="primary"
              />
            }
            label="Action Plan"
          />
          <FormControlLabel
            control={
              <Switch
                onChange={handleSelectCategoryClick}
                name="health"
                color="primary"
              />
            }
            label="Spiritual/Social/Emotional/Mental Health"
          />
      
      </FormGroup>
            <Table
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
                
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy), getSearchTerm(searchTerm))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.question}</TableCell>
                        <TableCell align="left">{rowTypes[row.type]}</TableCell>
                        <TableCell align="left">{rowCategories[row.category] || 'none'}</TableCell>
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
       
      </div>
    );
  }