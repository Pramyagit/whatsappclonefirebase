import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic} from '@mui/icons-material';


const Micro = ({value,input,setInput}) => {
  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
 const startListening=()=>{
  SpeechRecognition.startListening({ continuous: true });

 }
const inputValue=()=>{
console.log(transcript);
setInput=transcript;
const inputs=document.getElementById('input');
console.log(inputs.value=setInput)
}
 
  return (
    <>
    <div>
      <button onClick={inputValue}
      value={transcript}
      onTouchStart={startListening}
      onMouseDown={startListening}
      onTouchEnd={SpeechRecognition.stopListening}
      onMouseUp={SpeechRecognition.stopListening}
      ><Mic/></button>
      
    </div>
   </>
  ) 
}

export default Micro