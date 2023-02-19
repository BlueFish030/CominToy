function App() {
  const handleClick = ()=>{
    const btnC = document.getElementById('startBtnContainer')
    const btn = document.getElementById('startBtn')
    btnC.classList.add('ani');
    btn.classList.add('ani');
    setTimeout(()=>{
      btnC.classList.add('none')
    },1000)
  }
  return (
    <div className="container" id="startBtnContainer">
      <button id="startBtn" onClick={handleClick}>Start</button>
    </div>
  );
}

export default App;
