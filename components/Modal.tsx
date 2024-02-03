import React, { Dispatch, SetStateAction } from 'react'
//import styles from '../styles/Modal.module.scss'
import { useRouter } from 'next/navigation'

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  setOverlay: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ setModal, setOverlay }: Props) => {
  const router = useRouter()
  const goToLogin = () => {
    router.push('/login')
  }
  const xBtn = () => {
    setModal(false)
    setOverlay(false)
  }
  return (
    <div className='modal'>
      <p className='Label'>You need to go to account - Login to use the save functionality </p>
      <button className='loginBtn' onClick={goToLogin}>Go to Login</button>
      <button onClick={xBtn} className='btn'>X</button>
    </div>
  )
}

export default Modal
