import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack'
import "./editDialog.scss"
import { useRef } from 'react';

export default function ScrollDialog(props) {
  const item = props.paramsRow
  
  const [isCheck, setIsCheck] = React.useState((item.isCheck === "Check") ? true : false);
  const [isCredit, setIsCredit] = React.useState((item.isCredit === "Credit") ? true : false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const typeOrder = (item.isCredit !== "Payment") ? "Order" : "Payment"
  const { enqueueSnackbar } = useSnackbar();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const inputRef7 = useRef();
  const inputRef8 = useRef();
  const inputRef9 = useRef();

  const handleClickVariant = (msg ,variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  // scroll=body OR scroll=paper
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitch = (type) => {
    if (type === "check") { setIsCheck(!isCheck) } else { setIsCredit(!isCredit) }    
  };

  const handleSave = () => {
    const clientId = inputRef1.current.value
    const clientName = inputRef2.current.value
    const date = inputRef3.current.value
    const camion = inputRef4.current.value
    const totalToPay = inputRef7.current.value
    const verssi = inputRef8.current.value
    const rest = inputRef9.current.value

    if (clientId !== "" && clientName !== "" && date !== "" && camion !== "" &&
        totalToPay !== "" && verssi !== "" && rest !== "" ) {
            const newEdit = {
                "_id": item._id,
                "clientName": clientName,
                "clientId": clientId,
                "totalToPay": totalToPay,
                "verssi": verssi,
                "rest": rest,
                "date": date,
                "camion": camion,
                "isCheck": isCheck,
                "isCredit": isCredit
              }

            props.editSelected(newEdit, typeOrder)
            handleClose()
    } else {
        // popup msg Error with snackbar
        handleClickVariant(`Empty field.`, 'error')
    }
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <div className="action Edit" onClick={handleClickOpen('paper')}>Edit</div> 
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Edit {typeOrder}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <div className="form" >
                <div className="formLeft">
                    <div className="formInput mb-4">
                        <label>Server _id :  {item._id}</label>
                    </div>
                    <div className="formInput mb-4">
                        <label>Client Id</label>
                        <input ref={inputRef1} id="inputId" type="text" placeholder="Client Id" defaultValue={item.clientId} />
                    </div>
                    <div className="formInput mb-4">
                        <label>Client Name</label>
                        <input ref={inputRef2} id="inputName" type="text" placeholder="Client Name" defaultValue={item.clientName} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Date</label>
                        <input ref={inputRef3} id="inputDate" type="text" placeholder={typeOrder + " Date"} defaultValue={item.date} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Camion</label>
                        <input ref={inputRef4} id="inputCamion" type="text" placeholder={typeOrder + " Camion"} defaultValue={item.camion} />
                    </div>
                    <div className="formInput flexSB mb-4">
                        <label className='lh2'>{typeOrder} isCheck</label>
                        <Switch ref={inputRef5} checked={isCheck} onClick={() => handleSwitch("check")} inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                    {(typeOrder !== "Payment") && 
                    <div className="formInput flexSB mb-4">
                        <label className='lh2'>{typeOrder} isCredit</label>
                        <Switch ref={inputRef6} checked={isCredit} onClick={() => handleSwitch("credit")} inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                    }
                    
                    <div className="formInput mb-4">
                        <label>{typeOrder} Total To Pay</label>
                        <input ref={inputRef7} id="inputTotalToPay" type="text" placeholder={typeOrder + " Total To Pay"} defaultValue={item.totalToPay} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Verssi</label>
                        <input ref={inputRef8} id="inputVerssi" type="text" placeholder={typeOrder + " Verssi"} defaultValue={item.verssi} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Rest</label>
                        <input ref={inputRef9} id="inputRest" type="text" placeholder={typeOrder + " Rest"} defaultValue={item.rest} />
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
