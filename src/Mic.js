import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic} from '@mui/icons-material';


const Micro = ({value}) => {
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
value={transcript}
console.log(value)
}
 
  return (
    <>
    <div>
      <button onClick={inputValue}
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