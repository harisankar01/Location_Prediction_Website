import React,{useState,useRef} from 'react';
interface loc{
  name:string
}

function App() {
let final_array=new Array()
const [Prediction, setPrediction] = useState<Array<number>>()
const [location_array, setlocation_array] = useState<Array<loc>>()
if(Prediction){
  Prediction.map((e:number)=>(console.log(e)))
}
    let formdata:FormData;
  const CaptureFile=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files.length>0){
      const file:File=e.target.files[0]  
      formdata = new FormData();
      formdata.append('file', file);
      formdata.append('Name', "image_tobe_predicted");
    }
  }
    const Predict=async()=>{
      const prediction =await fetch('/predict',{
      method:"POST",
      body: formdata
      });
      let result:string=await prediction.json()
      const sub=result.substring(3,result.length-3)
      const predictions:string[]=sub.split(",")
      let problabilities:string[]=(predictions.filter((a:string)=>(parseFloat(a)>0.65))).sort((c,d)=>(parseFloat(d)-parseFloat(c)))
      problabilities.forEach(str => {
      final_array.push(Number(predictions.indexOf(str)));
      });
      setPrediction(final_array)
      const prediction_array={
        "array":final_array
      }            //JSON.stringify(final_array)
      const location=await fetch('/db',{
        method:"POST",
        body: JSON.stringify(prediction_array)
      });
      let display_results=await location.json()
      setlocation_array(display_results)
    }
  return (
    <div className="Starter">
    <input type='file' accept="image/*" name='loc' onChange={CaptureFile}/>
    <button type='button' onClick={Predict}></button>
    {location_array?(
      <>
      {
      (location_array.map((location:loc)=>{
        return(
          <>
            <h3>Location</h3>
            <h1>{location.name}</h1>
          </>
        )
      }))
      }
      <blockquote>
      That is alll
      </blockquote>
      </>
    ):(
      <>
      <h2>
        No data at the moment of time
      </h2>
      </>
    )
    }
    </div>
  );
}

export default App;
