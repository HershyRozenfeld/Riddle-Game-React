export default function Riddle({name, level, question}:{name:string, level:string, question:string}) {
    return (
        <>
        <div>
        <h2>חידה: סכום המספרים</h2>
        <p>רמה: קל</p>
        <p>שאלה: מהו הסכום של 7 ו-5?</p>
        <div style={{ marginTop: "1rem" }}>
          <input type="text" placeholder="הכנס תשובה" />
        </div>
      </div>
            {/* <div>
                <div>
                    <span>{level}</span>
                    <button >Name:{name}</button></div><h2>{question}</h2><div ><input placeholder="Type your answer here..." type="text" value=""/><button>Submit Answer</button>
                </div>
            </div> */}
        </>
    )
}