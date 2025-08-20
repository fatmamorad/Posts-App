import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Context/userContext'

function Pagination(props) {
  let { pageNumber, setPageNumber } = useContext(UserContext)

  let [previous, setPrevious] = useState(props.paged.currentPage || 1)
  let [next, setNext] = useState(
    Math.min((props.paged.currentPage || 1) + 4, props.paged.numberOfPages)
  )
  useEffect(() => {
    setPrevious(props.paged.currentPage)
    setNext(Math.min(props.paged.currentPage + 4, props.paged.numberOfPages))
  }, [props.paged.currentPage, props.paged.numberOfPages])

  function NEXT() {
    if (next < props.paged.numberOfPages) {
      setPrevious(previous + 1)
      setNext(next + 1)
    }
  }

  function PreviousFn() {
    if (previous > 1) {
      setPrevious(previous - 1)
      setNext(next - 1)
    }
  }

  function pagin(el) {
    setPageNumber(el)
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex fixed bottom-2.5 start-1/2 -translate-x-1/2 -space-x-px text-sm">
          <li onClick={PreviousFn}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>

          {Array.from({ length: next - previous + 1 }, (_, i) => previous + i).map((el) => {
            return (
              <li key={el} onClick={() => pagin(el)}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 leading-tight border 
                    ${
                      Number(el) === Number(props.paged.currentPage)
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  {el}
                </a>
              </li>
            )
          })}

          <li
            onClick={NEXT}
            className={`${next === props.paged.numberOfPages ? 'cursor-not-allowed' : ''}`}
          >
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
