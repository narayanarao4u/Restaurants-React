import React, { useState, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from "react-dom";
import style from './Modal.module.css'

const Modal = forwardRef((props, ref) => {

  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close()
    }
  });

  const open = () => {
    setDisplay(true)
  }

  const close = (event) => {
    let targets = ['backdrop', 'close']
    if(targets.includes(event.target.id))
    setDisplay(false)

  }
  
  
if(display) {
  return ReactDOM.createPortal(
   
    <div className={style.wrapper}>
      <div className={style.backdrop} onClickCapture={close} id="backdrop">
        <div className={style.box}>
            
          {props.children}
          <button  className={style.fixedTopRight +  ' btn btn-sm  btn-warning'}>          
                <i onClickCapture={close} id="close" className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div> ,
      document.getElementById("modal-root")  
  )
} else {
  return null
}
  
})

export default Modal