import React,{useState,useRef, useEffect} from 'react';
import Navbar from './components/Navbar/index'
import {Background} from './components/background/index'
import { Button, Snackbar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Container } from './globalstyle';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import  SimpleBackdrop from './components/Backdrop'
import FullScreenDialog from './components/Popup'
import {FooterContainer} from './components/Footer/index'
interface loc{
  name:string
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
let final_array=new Array()
const [loading, setloading] = useState<Boolean>(false)
const [open, setopen] = useState<boolean>(false)
const [resultBox, setresultBox] = useState<boolean>(false)
const [location_array, setlocation_array] = useState<Array<loc>>()
const [fomr_data, setfomr_data] = useState<FormData>()
const image=useRef<HTMLInputElement>(null);
const setBox=(val:boolean):void=>{
  setresultBox(val);
}
const trigger=():void=>{
  image.current?.click()
}

let formdata:FormData=new FormData()
  const CaptureFile=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files.length>0){
      const file:File=e.target.files[0]  
      formdata.append('file', file);
      formdata.append('Name', "image_tobe_predicted");
      setfomr_data(formdata)
    }
    setopen(true);
  }
  const Predict=async()=>{
      setloading(true);
      console.log(formdata.entries().next);
      const prediction =await fetch('/predict',{
      method:"POST",
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
      },
      body: fomr_data
      });
      let result:string=await prediction.json()
      const sub=result.substring(3,result.length-3)
      const predictions:string[]=sub.split(",")
      let problabilities:string[]=(predictions.filter((a:string)=>(parseFloat(a)>0.65))).sort((c,d)=>(parseFloat(d)-parseFloat(c)))
      problabilities.forEach(str => {
      final_array.push(Number(predictions.indexOf(str)));
      });
      const prediction_array={
        "array":final_array
      }  
      const location=await fetch('/db',{
        method:"POST",
        headers:{
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "POST",
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(prediction_array)
      });
      let display_results=await location.json()
      setlocation_array(display_results)
      setloading(false)
      setresultBox(true)
    }
    
  return (
    <>
    <input type='file'  accept="image/*" name='loc' ref={image} value=""  style={{display: 'none'}} onChange={CaptureFile}/>
    <Navbar></Navbar>
    <Background>
    <Container>
    <Button variant="contained" onClick={()=>{trigger()}} startIcon={<CloudUploadIcon/>}>
    Upload
    </Button>
     <Snackbar open={open} autoHideDuration={6000} onClose={()=>{setopen(false)}}>
        <Alert onClose={()=>{setopen(false)}} severity="success" sx={{ width: '100%' }}>
          Uploaded Successfully
        </Alert>
      </Snackbar>
    <Button variant="contained" onClick={Predict} style={{marginTop:40}}>Predict</Button>
      {loading && <SimpleBackdrop/>}
    </Container>
    </Background>
    {(location_array && resultBox)?(
    <FullScreenDialog locations={location_array} open={resultBox} setOpen={setBox}></FullScreenDialog>
    ):(
      <FooterContainer></FooterContainer>
    )
    }
    </>
  );
}

export default App;
