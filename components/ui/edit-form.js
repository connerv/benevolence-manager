import styles from '../../styles/Home.module.scss'
import React from 'react';
import Grid from '@material-ui/core/Grid';

import CFCProgressDots from './progressdots';
// import { questions } from '../../../components/ui/questions/testquestions'
import CFCParseQuestion from './questions/questionbuilder'
import CFCNextPrevButtons from './nextPrevArrows';
import { sendUpdatedAnswersArray } from "../../helpers/db";

import CFCSubmitAnswers from './submitanswers';

import { useRouter } from 'next/router'
import { Icon, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


var counter = 0



export default function EditForm( {user, allQuestions, uid, handleCloseEditAnswers} ) {

  const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      visibility: drawerOpen ? 'hidden' : "visible", // Hides all elements so the drawer doesn't have to push anything over
    },
  }));
  var questionsBuilt = false
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery('(max-width:1600px)');

  const [input, updateInput] = React.useState([])
  const [numQuestions, setNumQuestions] = React.useState(0)
  const [questionComponentList, setQuestionComponentList] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [submitMessage, setSubmitMessage] = React.useState("hello")
  const [showEnd, setShowEnd] = React.useState(false)
  const [userAnswers, setUserAnswers] = React.useState([])
  const [questionRefs, setQuestionRefs] = React.useState([])
    // Keep track of which question we are viewing
  const [activeStep, setActiveStep] = React.useState(0);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setDrawerOpen(true);
      if(drawerOpen){
        handleDrawerClose()
      }
    };

    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };


  React.useEffect(() => {
    if(questionRefs[activeStep] != null && questionRefs[activeStep].current != null) {
      questionRefs[activeStep].current.focus()
    }
  }, [activeStep])

  React.useEffect(() => {
    
        if(user){
          if (!questionsBuilt) {
            let userQuestions = []
            let qids = user.questions
            qids.map((qid) => { 
                allQuestions.find((question) => {
                    if(qid == question.id) userQuestions.push(question)
                }
                    )
            })
            if (userQuestions.length > 0) {
              setUserAnswers(user.answers || [])
              setQuestions(userQuestions)
              setNumQuestions(userQuestions.length)
              buildQuestionComponents(questions)
            }
          }
        }else{
         
        }
    
    
  }, [numQuestions]);

  // creates a list of question components that we can iterate through, displaying one at a time
  const buildQuestionComponents = (questions) => {
    var i = 0
    var temp = questions.map((q) => {
      let ind = Number(i)
      // console.log(q)
      input.push(q) //Creating the state for each of the questions
      userAnswers.find((x) => {
       
        if (x.qid == input[ind].id)
        {
          input[ind].input = x.answer
        }
      })
      const focusRef = React.createRef()
      questionRefs[ind] = focusRef
      let temp2 = <CFCParseQuestion {...q} input={input} index={ind} updateInput={updateInput} inputRef={focusRef}></CFCParseQuestion>
      i++
      return temp2
    })
    setQuestionRefs([...questionRefs])
    setQuestionComponentList(temp)
    
    return
  }


  const checkCompleted = () => {
    let completed = true
    let completedNum = 0
    input.forEach((x) => {
      if(x.input != "" && x.input != null){
        completedNum++
      }else{
        completed = false
      }
    })
    if (completedNum === numQuestions) {
      setSubmitMessage("Looks like you've answered all our questions!")
    } else  { 
      setSubmitMessage("You've answered " + completedNum + " of " + numQuestions + " questions. Keep going!" )
    }
    // Added this, hope it doesn't break anything
    return completedNum
  }

  const handleNext = async () => {
     checkCompleted()
     setShowEnd(false)
    if (activeStep >= numQuestions - 1) {
      await sendAnswers();
      handleCloseEditAnswers()
    }
    else {
      sendAnswers();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handlePrev = () => {
    setShowEnd(false)
    if (activeStep > 0) {
      checkCompleted()
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      sendAnswers();
    }
  };

  const handleStep = () => {
    checkCompleted()
    sendAnswers();
  }

  // build and send answer array to the database
  const sendAnswers = async () => {

  let answersArray = []

    // Combine qids and answers for db
    for (var i = 0; i < input.length; i++) {
      
      answersArray.push({
        qid: input[i].id,
        answer: input[i].input || null
      })
    }
    console.log("here", answersArray)
    await sendUpdatedAnswersArray(answersArray, uid)
  }


  let authenticated = true;
    return (
      <>
      
       
        <div className={classes.root}>
      <CFCProgressDots steps={numQuestions} activeStep={activeStep} setActiveStep={setActiveStep} showEnd={showEnd} input={input} sendAnswer={handleStep} drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose}></CFCProgressDots>

        {/* <Head>
          <title>CFC Benevolence</title>
        </Head> */}
        

        {authenticated
        
        ? 

                // I got 88vh from trial and error there's a better way to do it if I wanted to mess with navbar
                // This grid takes care of the width
                <Grid container display='flex' direction='row' style={{height: '88vh'}}>
                  <Grid item xs={1} sm={2} md={3} lg={4}></Grid> 
                  <Grid item xs={10} sm={8} md={6} lg={4}>
                      {/* This is the vertical grid that spaces the elements */}
                      <Grid container display='flex' direction='column' justify='space-around' style={{height: '100%'}}>

                        
                        {/* Grid to space the progress bar */}
                          <Grid item>
                            <Grid container display='flex' direction='row' >

                              <Grid item xs={1} md={2}></Grid>
                              <Grid item xs={12} md={12}>
                                <IconButton color='primary' onClick={handleDrawerOpen}>
                                  { drawerOpen ? (<ArrowBackIcon></ArrowBackIcon>) : (<ArrowForwardIcon></ArrowForwardIcon>) }
                                </IconButton>
                              </Grid>
                              <Grid item xs={1} md={2}></Grid>
                              </Grid>
                            </Grid>
                            <Grid item style={{height: '50vh'}}>
                            <h2 style={{color: '#6A8FA8'}}>{activeStep + 1}.</h2>
                              {/* Whichever question is up will go here */}
                              {questionComponentList[activeStep]}
                              <CFCNextPrevButtons handleNext={handleNext} handlePrev={handlePrev} activeStep={activeStep} showEnd={showEnd}></CFCNextPrevButtons>
                            </Grid>

                        

                        <Grid item style={{padding: '0px 16px'}}>
                          

                          {/* <Grid container display='flex' justify='space-between'>
                            <Grid item>
                              <IconButton onClick={handleBack} color='primary'>
                                <ArrowBackIcon fontSize='large' />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton onClick={handleNext} color='primary'>
                                <ArrowForwardIcon fontSize='large' />
                              </IconButton>
                            </Grid>
                          </Grid> */}
                        </Grid>

                        

                        {/* <Grid item>
                          <CFCFilledButton></CFCFilledButton>
                        </Grid> */}

                      {/* <CFCLongAnswer display={"none"} question={"Describe your life."}></CFCLongAnswer>
                      <CFCShortAnswer question={"What do you do for a living?"}></CFCShortAnswer>
                      <CFCPickDateTime display={"none"}></CFCPickDateTime>
                      <CFCRadioButtons display={"none"}></CFCRadioButtons> */}
                      </Grid>
                    
                  </Grid>
                  <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                </Grid>
              // </div>

              
        :
          <h1 className={styles.title}>
          Please Login
          </h1>
        }
        
      </div>
      </>
    )
  }

