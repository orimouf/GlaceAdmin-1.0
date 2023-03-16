import React from 'react'
import "./confirmbox.scss"

const Confirmbox = () => {

  return (
    <div className="modal">
        <div className="modalDialog">
            <div className="modalContent">
                <div className="modalHeader">
                    <h5 className="modalTitle">Modal title</h5>
                    <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modalBody">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modalFooter">
                    <button type="button" className="btnClose">Close</button>
                    <button type="button" className="btnConfirm">Save changes</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Confirmbox