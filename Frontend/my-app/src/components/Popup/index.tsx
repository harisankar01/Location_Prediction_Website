import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface loc{
  name:string
}
interface props{
  locations:loc[],
  open:boolean,
  setOpen:(val:boolean)=>void
}
const FullScreenDialog:React.FC<props>=({locations,open,setOpen})=> {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <h2>The image may be any of the following predicted places</h2>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {
            locations.map((value: loc, index: number, array: loc[])=>{
                return(
                <>
                <ListItem >
                  <ListItemText primary={value.name} />
                </ListItem>
                <Divider />
                </>
                )
            })
          }
        </List>
      </Dialog>
    </div>
  );
}
export default FullScreenDialog;