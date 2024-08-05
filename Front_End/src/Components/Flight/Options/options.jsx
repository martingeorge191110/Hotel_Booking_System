import React, {useState, useRef, useEffect} from "react";


export default function Options () {

    const listOneRef = useRef(null)
    const flightsList = useRef(null)
    const listTwoRef = useRef(null)
    const [listOne,setListOne] = useState()
    const [listTwo,setListTwo] = useState()
    const [attend,setAttend] = useState({
      adult:1,
      seniors:0,
      children:0,
      condition:true
    })
    const [travelers,setTraverlers] = useState(1)
    
    useEffect(() => {
      setListOne(listOneRef.current.children[1].children[0].textContent)
      setListTwo(listTwoRef.current.children[1].children[0].textContent)
    } , [])

      function listHandler (event) {
        if (event.children[1].classList.contains('activeList') ){
          event.children[1].classList.remove("activeList")
        } else {
          event.children[1].classList.add("activeList")
        }

        if (!event.children[0].children[0].classList.contains("activeI"))
        {
            event.children[0].children[0].classList.add("activeI")
        } else {
            event.children[0].children[0].classList.remove("activeI")
        }
      }    

      function listOneValue (event) {
        let eventParent = event.parentElement
        let spanIClass = eventParent.parentElement.children[0].children[0].classList

        setListOne(event.textContent)
        if (eventParent.classList.contains('activeList') ){
          eventParent.classList.remove("activeList")
        } else {
          eventParent.classList.add("activeList")
        }

        spanIClass.remove("activeI")
      }
      useEffect(() => {
          if (flightsList.current.children[1].textContent == listOne){
          document.querySelector(".toCal").classList.add("idol")
          } else {
          document.querySelector(".toCal").classList.remove("idol")
          }
          
      }, [listOne])

      function listTwoValue (event) {
        let eventParent = event.parentElement
        let spanIClass = eventParent.parentElement.children[0].children[0].classList

        setListTwo(event.textContent)
        if (eventParent.classList.contains('activeList') ){
          eventParent.classList.remove("activeList")
        } else {
          eventParent.classList.add("activeList")
        }

        spanIClass.remove("activeI")
      }

      function addingAttend ( type) {
        if (type ===  1)
          setAttend({
            ...attend,adult: attend.adult + 1
          })
        if (type === 2)
          setAttend({
            ...attend,seniors: attend.seniors + 1
          })
        if (type === 3)
        {
          setAttend({
            ...attend, children: (attend.adult > 0 || attend.seniors > 0) ? attend.children + 1 : 0
          })
          
        }
        setTraverlers(travelers + 1)
      }

      function removeAttend (type) {
        let condition = true
        if (type ===  1)
        {
          setAttend({
            ...attend,adult: attend.adult > 1 ? attend.adult - 1  : (attend.seniors === 0 ? 1 : 0)
          })
          if ((attend.adult - 1 === 0 && attend.seniors === 0) || attend.adult - 1 === -1)
              condition = false
        }
        if (type === 2){
          setAttend({
            ...attend,seniors: attend.seniors > 1 ? attend.seniors - 1 : (attend.adult === 0 ? 1 : 0)
          })
          if ((attend.seniors - 1 === 0 && attend.adult === 0) || attend.seniors - 1 === -1)
            condition = false
        }
        if (type === 3){
          setAttend({
            ...attend,children: attend.children > 0  ? attend.children - 1 : 0
          })
          if (attend.children - 1 === -1)
              condition = false
        }

        if (condition)
          setTraverlers(travelers - 1)
      }

    return (
        <>
            <div className="options">
                <div className="option" ref={listOneRef}>
                  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{listOne}<i className="bi bi-chevron-down"></i></span>
                  <ul ref={flightsList}>
                    <li onClick={(e) => {listOneValue(e.currentTarget)}} value="Return">Return</li>
                    <li onClick={(e) => {listOneValue(e.currentTarget)}} value="One Way">One Way</li>
                    {/* <li onClick={(e) => {listOneValue(e.currentTarget)}} value="Multi Ways">Multi Ways</li> */}
                  </ul>
                </div>
                <div className="option">
                  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{travelers} Travelers<i className="bi bi-chevron-down"></i></span>
                  <ul>
                    <li value="One Way">
                        <span>
                          Adult
                        </span>
                        <button onClick={() => {removeAttend(1)}}>-</button>
                        {attend.adult}
                        <button onClick={(e) => {addingAttend(1)}}>+</button>
                    </li>
                    <li value="Return">
                    <span>
                          Seniors
                        </span>
                        <button onClick={() => {removeAttend(2)}}>-</button>
                        {attend.seniors}
                        <button onClick={() => {addingAttend(2)}}>+</button>
                    </li>
                    <li value="Return">
                    <span>
                          Children
                        </span>
                        <button onClick={() => {removeAttend(3)}}>-</button>
                        {attend.children}
                        <button onClick={() => {addingAttend(3)}}>+</button>
                    </li>
                  </ul>
                </div>
                <div className="option" ref={listTwoRef}>
                  <span onClick={(event) => {listHandler(event.currentTarget.parentElement)}}>{listTwo}<i class="bi bi-chevron-down"></i></span>
                  <ul>
                    <li onClick={(e) => {listTwoValue(e.currentTarget)}} value="One Way">Economy</li>
                    <li onClick={(e) => {listTwoValue(e.currentTarget)}} value="Return">Buissnes</li>
                    <li onClick={(e) => {listTwoValue(e.currentTarget)}} value="Multi Ways">First Claas</li>
                  </ul>
                </div>
                </div>
        </>
    )
}