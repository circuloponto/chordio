import React from 'react'

export default function SaveModal({ setShowModal }) {
  const closeModal = () => {
    setShowModal(false)
    return
  }
  return (
    <div className='modal'>
      <p className='Label'>You need to input a song and check its chords before saving</p>
      <button className='closeModal' onClick={closeModal}>close</button>

    </div>
  )
}
