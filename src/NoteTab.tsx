import React from 'react'

function NoteTab() {

 const dragContainer = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('e', e)
    
  }



  return (
    <div className='note-tab' draggable='true' onDrag={(e)=>dragContainer(e)} >

    </div>
  )
}

export default NoteTab