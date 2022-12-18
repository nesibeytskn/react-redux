import { Fragment, useEffect, useState } from "react";
import Loading from "../../components/loading";
import useApi from "../../hooks/useApi";
import Box from "./box";



function Pagination(props) {
    console.log('>> Pagination Props', props)
  
    const api = useApi()
  const [rows, setrows] = useState(null)

  // pagination states
  const [pageLength, setPageLength] = useState(6)
  const [pageStart, setPageStart] = useState(0)
  const [totalPageCount, setTotalPageCount] = useState(0)

  useEffect(() => {
    getRowsFromApi(pageLength, pageStart)
  }, [])

  useEffect(() => {
    getRowsFromApi(pageLength, pageStart)
  }, [pageLength, pageStart])

  const getRowsFromApi = (length, start) => {
    api.get('/public/categories/listMainCategories', {params: {length, start}})
      .then(result => {
        //console.log('>> API RESULT', result)
        setrows(result.data.data)
        setTotalPageCount(Math.ceil(parseInt(result.data.recordsTotal) / pageLength))

        
      })
      .catch(err => {
        console.error('>> API Hatası', err)
      })
  }
  let rowArray = []

  if (rows) {
    // kategori listesini componentlere ekle
    rows.map((item, index) => {
      rowArray.push(
        <Box
          key={index}
          id={item.id}
          name={item.name}
          href={`#/category/${item.slug}`}
          image={item.image}
        />,
      )
    })
  } else {
    // loading ekranı göster
    rowArray.push(<Loading key="0" />)
  }

  const pageComponents = []

  for (let i = 0; i < totalPageCount; i++) {
    pageComponents.push(
      <button
        key={i}
        onClick={() => setPageStart(i * pageLength)}
        className="btn btn-primary mx-2">
        {i}
      </button>,
    )
  }

  const lengthSelectComponents = []
  for (let i = 0; i < 3; i++) {
    // 0, 1, 2

    lengthSelectComponents.push(
      <button
        key={i}
        onClick={() => setPageLength((i + 1) * 3)}
        className="btn btn-primary mx-2">
        {(i + 1) * 3}
      </button>,
    )
  }





  return (
    <Fragment>

      <h2 className="display-6 text-center mb-4">
        {props.title}
      </h2>


         <div className="row mb-3 text-center">
        <div className="col-12">
          <h2>
            Page Count:
            &nbsp;
            {totalPageCount}
          </h2>
          <br />

          Pages:
          {pageComponents}
          <br />

          Rows:
          {lengthSelectComponents}
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {rowArray}
      </div>

    </Fragment>
  )
}
  export default Pagination