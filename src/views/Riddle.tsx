export default function Riddle({name, level, question}:{name:string, level:string, question:string}) {
    return (
        <>
        <div>
            <div>
                <span>{level}</span>
                <button >Name:{name}</button></div><h2>{question}</h2><div ><input placeholder="Type your answer here..." type="text" value=""/><button>Submit Answer</button>
            </div>
        </div>
        </>
    )
}