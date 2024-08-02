import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { useSnackbar } from 'notistack'
import "./editDialog.scss"

export default function ScrollDialog(props) {
  const [isCheck, setIsCheck] = React.useState(true);
  const [isCredit, setIsCredit] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const item = props.paramsRow
  const typeOrder = (item.isCredit !== "Payment") ? "Order" : "Payment"
  const { enqueueSnackbar } = useSnackbar();

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

  const handleChange = (event) => {
    setIsCheck(!event.target.checked);
  };

  const handleSave = () => {
    const clientId = document.getElementById("inputId").value
    const clientName = document.getElementById("inputName").value
    const date = document.getElementById("inputDate").value
    const camion = document.getElementById("inputCamion").value
    const isCheck = document.getElementById("inputIsCheck").value
    const isCredit = document.getElementById("inputIsCredit").value
    const totalToPay = document.getElementById("inputTotalToPay").value
    const verssi = document.getElementById("inputVerssi").value
    const rest = document.getElementById("inputRest").value

    if (clientId !== "" && clientName !== "" && date !== "" && camion !== "" && isCheck !== "" && isCredit !== "" &&
        totalToPay !== "" && verssi !== "" && rest !== "" ) {
            const newEdit = {
                "clientName": clientName,
                "clientId": {
                  "$oid": clientId
                },
                "totalToPay": totalToPay,
                "verssi": verssi,
                "rest": rest,
                "date": date,
                "camion": camion,
                "isCheck": (isCheck === "1") ? true : false,
                "isCredit": (isCredit === "1") ? true : false
              }
            props.editSelected(newEdit)
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
                        <input id="inputId" type="text" placeholder="Client Id" defaultValue={item.clientId} />
                    </div>
                    <div className="formInput mb-4">
                        <label>Client Name</label>
                        <input id="inputName" type="text" placeholder="Client Name" defaultValue={item.clientName} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Date</label>
                        <input id="inputDate" type="text" placeholder={typeOrder + " Date"} defaultValue={item.date} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Camion</label>
                        <input id="inputCamion" type="text" placeholder={typeOrder + " Camion"} defaultValue={item.camion} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} isCheck</label>
                        <input id="inputIsCheck" type="text" placeholder={typeOrder + " isCheck"} defaultValue={item.isCheck} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} isCredit</label>
                        <input id="inputIsCredit" type="text" placeholder={typeOrder + " isCredit"} defaultValue={item.isCredit} />
                        <Switch checked={isCheck} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Total To Pay</label>
                        <input id="inputTotalToPay" type="text" placeholder={typeOrder + " Total To Pay"} defaultValue={item.totalToPay} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Verssi</label>
                        <input id="inputVerssi" type="text" placeholder={typeOrder + " Verssi"} defaultValue={item.verssi} />
                    </div>
                    <div className="formInput mb-4">
                        <label>{typeOrder} Rest</label>
                        <input id="inputRest" type="text" placeholder={typeOrder + " Rest"} defaultValue={item.rest} />
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
