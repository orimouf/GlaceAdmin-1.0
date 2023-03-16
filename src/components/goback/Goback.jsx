import React from 'react'
import "./goback.scss"
import {useNavigate} from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
 
const Goback = ({title, btn, className="goback"}) => {

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
    return (
        <div className={className}>
            <ReplyAllIcon className="goBackIcon" onClick={goBack} />
            {title}
            {btn}
        </div>
    )
}

export default Goback