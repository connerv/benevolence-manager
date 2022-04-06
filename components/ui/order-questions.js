
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

import { updateQuestions } from "../../helpers/db";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@material-ui/core";
  
 
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
    maxHeight: '60vh',
}
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Row({ row, index }) {
  return (
    <Draggable draggableId={String(row.id)} index={index}>
      {provided => (
         <TableRow
         hover
         tabIndex={-1}
         key={row.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
         
          <TableCell component="th" scope="row" padding="none">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.question}</TableCell>
          <TableCell align="left">{rowTypes[row.type]}</TableCell>
          <TableCell align="left">{rowCategories[row.category] || 'none'}</TableCell>
          
        </TableRow>
         
      )}
    </Draggable>
  );
}

const QuestionList = React.memo(function QuestionList({ questions }) {
  return questions.map((row, index) => (
    <Row row={row} index={index} key={row.id} />
  ));
});

export default function OrderQuestions({questions, setQuestions}) {
    const classes = useStyles();
   
    const saveOrder = () => {
      console.log(questions)
      updateQuestions(questions)
    }
    
    function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
  
      if (result.destination.index === result.source.index) {
        return;
      }
  
      const newQuestions = reorder(
        questions,
        result.source.index,
        result.destination.index
      );
  
      setQuestions([...newQuestions]);
    }

    return (
      <div className={classes.root}>
        
        
          <TableContainer className={classes.tableContainer}>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
              <TableHead>
              <TableRow>
                <TableCell>Name / Question / Type / Category</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <QuestionList questions={questions} />
                    {provided.placeholder}
                  </div>
                )}
                </Droppable>
              </DragDropContext>
    
              </TableBody>
            </Table>
          </TableContainer>

         
          <Button
            style={{marginTop: "20px"}}
            variant="outlined"
            color="primary"
            onClick={saveOrder}
                        >
            Save Order
          </Button>
         
       
      </div>
    );
  }