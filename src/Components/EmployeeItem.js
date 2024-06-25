import React, {useContext, useEffect, useState} from 'react';
import '../CSS/EmployeeItem.css';
import {AppContext} from "../Context/Context";
import {useNavigate} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

const EmployeeItem = ({ employee ,url,setIsFav,isFav}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const {favourites, addFavourite,removeFavourite} = useContext(AppContext);
    const nav = useNavigate()
    // בדיקה אם employee קיים, אם לא - החזר null או הודעת שגיאה
    if (!employee) {
        return <div>No employee data available</div>;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        Favourite()
    },[])

    const Favourite = ()=>{
        // eslint-disable-next-line array-callback-return
        favourites.map(fav=>{
            if(fav.login.uuid === employee.login.uuid){
                setIsFavourite(true);
            }
        })
    }
    const addFav = ()=>{
        addFavourite(employee)
        setIsFavourite(true)
    }
    const removeFav = ()=>{
        removeFavourite(employee)
        if(url.includes("favourites")) {
            setIsFav(!isFav)
        }
        setIsFavourite(false)
    }
    const moreInfo =  ()=>{
        return nav(url)
    }

    return (
        <div className="employee-card">
            <div className="image-container">
                {employee.picture ? (
                    <img src={employee.picture.large} alt={employee.name.first || 'Employee'} className="employee-image" />
                ) : (
                    <div className="placeholder-image">No Image</div>
                )}
            </div>
            <div className="info-container">
                <h5 className="employee-name">{employee.name.first +" "+ employee.name.last  || 'Unknown'}</h5>
                <p className="employee-detail">גיל: {employee.dob.age || 'N/A'}</p>
                <p className="employee-detail">מדינה: {employee.location.country || 'N/A'}</p>
                <button className="more-info-btn" onClick={moreInfo}>עוד מידע</button>
            </div>
            <span onClick={() => isFavourite ? removeFav() : addFav()}
                  className={`star-icon ${isFavourite ? 'yellow' : 'gray'}`}><span className="fa fa-star"></span></span>
        </div>
    );
}

export default EmployeeItem;