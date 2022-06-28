import React,{useState,useRef} from 'react';


function App() {
let final_array=new Array()
const [Prediction, setPrediction] = useState<Array<number>>()
if(Prediction){
  let few:number[]=Prediction.filter((a:number)=>(a>0.6))
  few.map((e:number)=>(console.log(e)))
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
      predictions.forEach(str => {
      final_array.push(Number(str));
      });
      setPrediction(final_array)
    }
  return (
    <div className="Starter">
    <input type='file' accept="image/*" name='loc' onChange={CaptureFile}/>
    <button type='button' onClick={Predict}></button>
    {Prediction?(
      <>
      {
      (Prediction.filter((a:number)=>(a>0.65))).map((num:number)=>{
        return(
            <h1>{num}</h1>
        )
      })
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
