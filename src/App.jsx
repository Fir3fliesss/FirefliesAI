import { useState } from "react";
import { requestToGroqAI }  from "./utils/groq";
import { Light as SyntaxHighLight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import "./App.css";

function App() {
  const[data, setData] = useState("");

  const handleSubmit = async () => {
    const Fireflies = await requestToGroqAI(content.value);
    setData(Fireflies);
  };
  return(
    <main className='flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto'>
      <h1 className='text-4xl text-indigo-500'>Fireflies AI</h1>
      <form className='flex flex-col gap-4 py-4 w-full'>
        <input
          placeholder='Masukkan promt'
          className='py-2 px-4 text-md rounded-md'
          id='content'
          type='text'
        />
        <button
          onClick={handleSubmit}
          type='button'
          className='bg-indigo-500 py-2 px-4 font-bold text-white rounded-md'>Kirim</button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {data ? (
          <SyntaxHighLight
            language="swift" style={darcula} wrapLongLines={true}>
              {data}
          </SyntaxHighLight>
        ) : null}
      </div>
    </main>
  )
}

export default App
