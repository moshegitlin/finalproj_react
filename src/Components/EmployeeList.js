import { useEffect, useState} from "react";
import axios from "axios";
import EmployeeItem from "./EmployeeItem";
import "../CSS/EmployeeList.css";

const EmployeeList = ({company=null}) => {
    const [employees, setEmployees] = useState([]);
    const [isFav, setIsFav] = useState(false);
    const [url, setUrl] = useState("")
    useEffect(() => {
        if(!company){
            const fav = localStorage.getItem('favourites');
            if(fav){
            setEmployees(JSON.parse(fav));
            }
            setUrl("/favourites/employee?index=")
        }else {
            doApi()
            setUrl ("/employee?company=" + company + "&index=")
        }
    }, [company,isFav]);
    const doApi = async () => {
       const url = `https://randomuser.me/api/?results=10&seed=${company}`
       const {data} = await axios.get(url);
       setEmployees(data.results);
    }
    return (
        <div className="container">
            <h2>Search results for the company: {company}</h2>
            <div className="containerList">
            {employees.map((employee, index) => {
                return (
                   <EmployeeItem key={employee.login.uuid} isFav={isFav} setIsFav={setIsFav} url={url+`${index}`}  employee={employee} />
                );
            })}
        </div>
        </div>
    )
}
export default EmployeeList;