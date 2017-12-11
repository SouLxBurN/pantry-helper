import React from 'react'

export const EmptyTableHeaderMessage = (props) => {
  return (
    <table className='table table-striped'>
      <thead className='thead-dark'>
        <tr>
          <th>{props.message}</th>
        </tr>
      </thead>
    </table>
  );
}
