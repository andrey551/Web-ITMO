import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tableStyle.css'
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPoints } from '../../../redux/modules/table';

const columns = [
  { field: 'id', headerName: <b>ID</b>, width: 70 },
  { field: 'x', headerName: <b>X</b>, width: 70 },
  { field: 'y', headerName: <b>Y</b>, width: 70 },
  { field: 'r', headerName: <b>R</b>, width: 70 },
  {
    field: 'result',
    headerName: <b>Result</b>,
    width: 90,
    renderCell : (result)=>RenderResult(result) 
  },
  {
    renderCell: () => RenderDelete()
  }
];

const ResultTable = () => {
    const {points} = useSelector((state => state.table))
    const dispatch = useDispatch()

    for(let i = 0; i < points.length; ++i) {
      points[i]["id"] = i;
    }

    useEffect(() => {
      dispatch(getPoints())
    }, [])

    return (
        <div style={{ height: 480, width: 500}}>
          <DataGrid
            rows={points}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick = 'false'
          />
        </div>
      );
}

const RenderResult = (result) => {
    if( result.value === 'Hit') {
        return(
            <img src={require('../../../assets/result/hit.png')} style={{width: 40}} />
        )
    }
    if( result.value === "Miss") {
        return (
          <img src={require('../../../assets/result/miss.png')} style={{width: 40}} />
        )
    }

  //  return <img src={require('../../../assets/result/miss.png')} style={{width: 40}} />
}

const RenderDelete = () =>{
    return  (
    <Button>
        <img src={require('../../../assets/result/delete.png')} style={{width: 40}} />
    </Button>)
}

export default ResultTable;