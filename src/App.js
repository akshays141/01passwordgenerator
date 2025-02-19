
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef= useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]-+_=`~"

    for (let i = 1; i <length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);

    window.navigator.clipboard.writeText(password);

  },[password]);


  useEffect(()=>{
     passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className="App">
     <h1 className='text-center text-4xl'>Password Generator</h1>
    </div>
  );
}

export default App;
