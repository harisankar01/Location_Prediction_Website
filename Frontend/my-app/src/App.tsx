import React,{useState,useRef} from 'react';


function App() {

 const [Image, setImage] = useState<string>("")
const [Prediction, setPrediction] = useState("")  

    let formdata:FormData;
  const CaptureFile=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files.length>0){
      const file:File=e.target.files[0]  
      formdata = new FormData();
      formdata.append('file', file);
      formdata.append('Name', "image_tobe_predicted");
      console.log(formdata);
    }
  }
    const Predict=async()=>{
      const prediction =await fetch('/predict',{
      method:"POST",
      body: formdata
      });
      const result=await prediction.json()
      setPrediction(result);
      console.log(result);
      
    }
  return (
    <div className="Starter">
    <input type='file' accept="image/*" name='loc' onChange={CaptureFile}/>
    <button type='button' onClick={Predict}></button>
    </div>
  );
}

export default App;
