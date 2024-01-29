import { useEffect, useState } from "react"

const App = () => {

  const [data, setData] = useState("");

  useEffect(() => {

    fetch("http://localhost:8000/test").then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
      })

  }, [])

  return (
    <div>
      <h1> {data.data} </h1>
    </div>
  )
}

export default App;