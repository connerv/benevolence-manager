import React from 'react';
import Head from "next/head";
import Navbar from "../components/base/navbar";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateAccount from '../components/create-account'
import ManageQuestions from "../components/manage-questions"
import ManageUsers from '../components/manage-users';
import Context from '../helpers/user';
import AllInfo from '../components/all-info';
import UserDatabase from '../components/user-database';
import CaseCommittee from '../components/case-committee';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    
   
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: '200px'
  },
  tabPanel: {
    flexGrow: 1,
  }
}));



export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = React.useContext(Context);
 
  const isAdmin = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('admin')
    }
    return false
  }

  const isDeacon = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('deacon')
    }
    return false
  }

  const isComittee = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('committee')
    }
    return false
  }

  React.useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

  }, []);

 
  
  return (
      <div>
          
    <Head>
    <title>CFC Benevolence</title>
    </Head>
    <Navbar></Navbar>
    {user.auth ? (
    <div className={classes.root}>

      {(isAdmin()) ?
                <>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  className={classes.tabs}
                >
                  <Tab label="Client Overview" {...a11yProps(0)} />
                  <Tab label="Create New User" {...a11yProps(1)} />
                  <Tab label="Manage Questions" {...a11yProps(2)} />
                  <Tab label="Manage Users" {...a11yProps(3)} />
                  <Tab label="Client Database" {...a11yProps(4)} />
                  <Tab label="Case Committee Reviews" {...a11yProps(5)} />
                  {/* <Tab label="Item five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} /> */}
                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                  <AllInfo></AllInfo>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <CreateAccount></CreateAccount>
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabPanel}>
                  <ManageQuestions></ManageQuestions>
                </TabPanel>
                <TabPanel value={value} index={3} className={classes.tabPanel}>
                  <ManageUsers></ManageUsers>
                </TabPanel>
                <TabPanel value={value} index={4} className={classes.tabPanel}>
                  <UserDatabase></UserDatabase>
                </TabPanel>
                <TabPanel value={value} index={5} className={classes.tabPanel}>
                  <CaseCommittee></CaseCommittee>
                </TabPanel>
                </>
              :
              <div></div>
              }

      {(isComittee()) ?
                <>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  className={classes.tabs}
                >
                  <Tab label="Client Overview" {...a11yProps(0)} />

                
                  <Tab label="Client Database" {...a11yProps(1)} />
                  <Tab label="Case Committee Review" {...a11yProps(2)} />
                  {/* <Tab label="Item five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} /> */}
                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                  <AllInfo></AllInfo>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <UserDatabase></UserDatabase>
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabPanel}>
                  <CaseCommittee></CaseCommittee>
                </TabPanel>
                </>
              :
              <div></div>
              }


      {(isDeacon()) ?
                <>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  className={classes.tabs}
                >
                  <Tab label="Client Overview" {...a11yProps(0)} />
                  <Tab label="Manage Users" {...a11yProps(1)} />
                  
                  {/* <Tab label="Item five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} /> */}
                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                  <AllInfo></AllInfo>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <ManageUsers></ManageUsers>
                </TabPanel>
                </>
              :
              <div></div>
              }
      
    </div>
          ) : (
            <div>
          <h2>You must be authenticated to use this page</h2>
        </div>
          )
}
    </div>
  );
}