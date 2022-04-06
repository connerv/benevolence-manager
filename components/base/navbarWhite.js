import React from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from "../../helpers/auth";
import Context from '../../helpers/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#ffffff',
    paddingTop: 30,
    paddingBottom: 30,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.main,
  },
  logo: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
}));

export default function NavbarWhite() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = React.useState({name: '', roles: ['']});
  const user = React.useContext(Context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  
  
  const isAdmin = () => {
    if(user.userData.roles){
      return (user.userData.roles.includes('admin') || user.userData.roles.includes('committee') || user.userData.roles.includes('deacon'))
    }
    return false
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(()=>{
  //   let ignore = false;

  //   const getUserData = async () => {
  //     let data = await getUserInfo()
  //     // console.log(data)
  //      if (!ignore) setUserData(data)
  //   };

  //   getUserData()
  //   return () => { ignore = true; }
  // })
  

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
        <div>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <a target="_blank" href="https://www.cfcpca.org/"><MenuItem>CFC Website</MenuItem></a>
            {user.auth ? (
                
              
                <div>
                  { isAdmin() ? (
                    <>
                    
                      <MenuItem onClick={() => router.push('/admin-dashboard')}>Admin Dashboard</MenuItem>
                      <MenuItem onClick={() => router.push('/account-info')}>Account Info</MenuItem>
                      <MenuItem onClick={() => router.push('/resources')}>Resources</MenuItem>
                      <MenuItem onClick={() => {logout(); router.push('/login'); handleClose()}}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => router.push('/')}>Questions</MenuItem>
                      <MenuItem onClick={() => router.push('/budget')}>Budget Helper</MenuItem>
                      <MenuItem onClick={() => router.push('/resources')}>Resources</MenuItem>
                     
                    </>
                  )}
                  
                </div>
            ) : (
                <MenuItem onClick={() => router.push('/login')}>Login</MenuItem>
            )}
          </Menu>
        </div>
          <Typography variant="h6" className={classes.title}>
           {/* CFC Benevolence */}
          </Typography>
          <Link href="/">
          <div className={classes.logo}>
           
          <svg xmlns="http://www.w3.org/2000/svg" width="115.201" height="89.452" viewBox="0 0 115.201 89.452">
            <g id="Layer_2" data-name="Layer 2" transform="translate(-19.642 -15.251)">
              <g id="Layer_1" data-name="Layer 1" transform="translate(19.642 15.251)">
                <path id="Path_135" data-name="Path 135" d="M77.121,0,66.8,10.314l4.958,4.958,5.363-5.363,26.512,26.52a37.931,37.931,0,0,0,3.892-6.04Z" transform="translate(-14.804)" fill="#6A8FA8"/>
                <path id="Path_136" data-name="Path 136" d="M63.429,23.137l-3.184-3.176L55.287,15,47.394,7.11,28.9,25.6a37.868,37.868,0,0,0,2.9,7.005L47.371,17.042l2.942,2.942,4.974,4.943,3.184,3.184L41.961,44.6a37.363,37.363,0,0,0,6.048,3.853l15.42-15.412L68.38,28.1l.342-.342L86.866,45.9A38.872,38.872,0,0,0,92.26,41.39L68.722,17.844Z" transform="translate(-6.405 -1.576)" fill="#6A8FA8"/>
                <path id="Path_137" data-name="Path 137" d="M0,84.753V77.646c0-2,1.059-3.246,3.059-3.246s3.067,1.245,3.067,3.246v1.4H4.157V77.49c0-.864-.413-1.222-1.035-1.222s-1.043.358-1.043,1.222v7.395c0,.864.413,1.206,1.043,1.206s1.035-.327,1.035-1.183v-1.93H6.126v1.775c0,2.039-1.059,3.254-3.067,3.254S0,86.792,0,84.753Z" transform="translate(0 -16.488)" fill="#6A8FA8"/>
                <path id="Path_138" data-name="Path 138" d="M13.406,85.278H11l-.358,2.584H8.72L10.868,74.63h2.818l2.156,13.233H13.764Zm-.265-1.8-.95-6.671-.918,6.671Z" transform="translate(-1.932 -16.539)" fill="#6A8FA8"/>
                <path id="Path_139" data-name="Path 139" d="M19.5,76.531H17.33V74.64h6.429v1.891H21.588V87.865H19.5Z" transform="translate(-3.841 -16.541)" fill="#6A8FA8"/>
                <path id="Path_140" data-name="Path 140" d="M29.736,85.278h-2.39l-.358,2.584H25.05L27.206,74.63h2.818L32.18,87.863H30.1Zm-.265-1.8-.942-6.671L27.6,83.48Z" transform="translate(-5.551 -16.539)" fill="#6A8FA8"/>
                <path id="Path_141" data-name="Path 141" d="M35.47,74.64h2.078V85.981h3.417v1.884h-5.5Z" transform="translate(-7.861 -16.541)" fill="#6A8FA8"/>
                <path id="Path_142" data-name="Path 142" d="M43.82,74.64H45.9V87.873H43.82Z" transform="translate(-9.711 -16.541)" fill="#6A8FA8"/>
                <path id="Path_143" data-name="Path 143" d="M48.48,74.64h2.569l2.1,7.916V74.64H55V87.873H52.9l-2.569-9.652v9.652H48.48Z" transform="translate(-10.744 -16.541)" fill="#6A8FA8"/>
                <path id="Path_144" data-name="Path 144" d="M62.806,85.278h-2.4l-.366,2.584H58.12L60.276,74.63h2.81l2.156,13.233H63.164Zm-.265-1.8-.95-6.671-.918,6.671Z" transform="translate(-12.88 -16.539)" fill="#6A8FA8"/>
                <path id="Path_145" data-name="Path 145" d="M72.42,74.64h5.5v1.891H74.5v3.682h2.678V82.1H74.5v5.76H72.42Z" transform="translate(-16.049 -16.541)" fill="#6A8FA8"/>
                <path id="Path_146" data-name="Path 146" d="M80.57,84.675V77.724c0-2.117,1.121-3.324,3.16-3.324s3.152,1.206,3.152,3.324v6.951c0,2.117-1.113,3.331-3.152,3.331S80.57,86.792,80.57,84.675Zm4.234.132V77.591c0-.942-.413-1.3-1.074-1.3s-1.082.358-1.082,1.3v7.216c0,.95.42,1.308,1.082,1.308s1.066-.35,1.066-1.308Z" transform="translate(-17.856 -16.488)" fill="#6A8FA8"/>
                <path id="Path_147" data-name="Path 147" d="M90.28,84.675V77.724c0-2.117,1.121-3.324,3.16-3.324s3.114,1.206,3.114,3.324v6.951c0,2.117-1.113,3.331-3.114,3.331S90.28,86.792,90.28,84.675Zm4.234.132V77.591c0-.942-.413-1.3-1.074-1.3s-1.043.358-1.043,1.3v7.216c0,.95.42,1.308,1.082,1.308S94.514,85.764,94.514,84.807Z" transform="translate(-20.007 -16.488)" fill="#6A8FA8"/>
                <path id="Path_148" data-name="Path 148" d="M101.562,76.531H99.39V74.64h6.422v1.891H103.64V87.865h-2.078Z" transform="translate(-22.026 -16.541)" fill="#6A8FA8"/>
                <path id="Path_149" data-name="Path 149" d="M108.93,74.64h2.078v5.386h2.226V74.64h2.086V87.873h-2.086V81.926h-2.226v5.947H108.93Z" transform="translate(-24.141 -16.541)" fill="#6A8FA8"/>
                <path id="Path_150" data-name="Path 150" d="M119.13,74.64h2.078V87.873H119.13Z" transform="translate(-26.401 -16.541)" fill="#6A8FA8"/>
                <path id="Path_151" data-name="Path 151" d="M123.79,74.64h2.078V85.981h3.417v1.884h-5.5Z" transform="translate(-27.434 -16.541)" fill="#6A8FA8"/>
                <path id="Path_152" data-name="Path 152" d="M132.14,74.64h2.078V85.981h3.417v1.884h-5.5Z" transform="translate(-29.284 -16.541)" fill="#6A8FA8"/>
                <path id="Path_153" data-name="Path 153" d="M140,84.675V83.9h1.962v.934c0,.942.42,1.284,1.082,1.284s1.09-.342,1.09-1.323-.451-1.775-1.814-2.966c-1.736-1.557-2.335-2.631-2.335-4.141,0-2.078,1.074-3.285,3.114-3.285s3.02,1.206,3.02,3.324v.545h-1.962v-.677c0-.942-.381-1.3-1.043-1.3s-1.059.358-1.059,1.261.475,1.642,1.837,2.833c1.736,1.557,2.335,2.608,2.335,4.258,0,2.148-1.1,3.363-3.114,3.363S140,86.792,140,84.675Z" transform="translate(-31.022 -16.488)" fill="#6A8FA8"/>
                <path id="Path_154" data-name="Path 154" d="M45.43,107.753v-7.107c0-2.039,1.059-3.246,3.067-3.246s3.059,1.245,3.059,3.246v1.4H49.587V100.49c0-.864-.413-1.222-1.035-1.222s-1.043.358-1.043,1.222v7.395c0,.864.42,1.206,1.043,1.206s1.035-.342,1.035-1.206v-1.93h1.969v1.775c0,2.039-1.059,3.254-3.059,3.254S45.43,109.792,45.43,107.753Z" transform="translate(-10.068 -21.585)" fill="#6A8FA8"/>
                <path id="Path_155" data-name="Path 155" d="M54.88,97.64h2.078v5.386h2.226V97.64h2.078v13.233H59.184v-5.947H56.958v5.947H54.88Z" transform="translate(-12.162 -21.639)" fill="#6A8FA8"/>
                <path id="Path_156" data-name="Path 156" d="M65,107.719V97.6h2.078v10.275c0,.942.4,1.284,1.059,1.284s1.059-.342,1.059-1.284V97.631h2V107.75c0,2.117-1.059,3.331-3.114,3.331S65,109.836,65,107.719Z" transform="translate(-14.405 -21.63)" fill="#6A8FA8"/>
                <path id="Path_157" data-name="Path 157" d="M74.83,97.64h3.114c2.156,0,3.114,1,3.114,3.043v.778c0,1.362-.436,2.234-1.362,2.608h0c1.035.319,1.378,1.308,1.378,2.794V109.2a3.962,3.962,0,0,0,.226,1.6H79.119a4.126,4.126,0,0,1-.187-1.619v-2.421c0-1.23-.358-1.627-1.3-1.627h-.724V110.8H74.83Zm2.833,5.667c.778,0,1.253-.335,1.253-1.393v-1.02c0-.95-.327-1.362-1.059-1.362h-.95v3.775Z" transform="translate(-16.583 -21.639)" fill="#6A8FA8"/>
                <path id="Path_158" data-name="Path 158" d="M84.42,107.753v-7.107c0-2.039,1.059-3.246,3.059-3.246s3.067,1.207,3.067,3.246v1.4H88.577V100.49c0-.864-.413-1.222-1.035-1.222s-1.043.358-1.043,1.222v7.395c0,.864.42,1.206,1.043,1.206s1.035-.342,1.035-1.206v-1.93h1.969v1.775c0,2.039-1.059,3.254-3.067,3.254S84.42,109.792,84.42,107.753Z" transform="translate(-18.709 -21.585)" fill="#6A8FA8"/>
                <path id="Path_159" data-name="Path 159" d="M93.87,97.64h2.078v5.386h2.226V97.64h2.078v13.233H98.174v-5.947H95.948v5.947H93.87Z" transform="translate(-20.803 -21.639)" fill="#6A8FA8"/>
              </g>
            </g>
          </svg>
          </div>
          </Link>
         
          {user.auth ? (
            <div>
            <h4 style={{color: '#6A8FA8'}}>Hi, {user.userData.name} </h4>
            
            </div>
          ) : (
            <Button color='primary' onClick={() => router.push('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}