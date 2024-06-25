import EmployeeList from "../Components/EmployeeList";
import SearchBar from "../Components/SearchBar";
import "../CSS/Home.css";
import Stripe from "../Components/Stripe";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import MapPage from "../Components/MapPage";

const Home = () => {
    const [search] = useSearchParams();
    const [company, setCompany] = useState('google');
        const companySearch = search.get('search')
    useEffect(() => {
        if(companySearch){
            setCompany(companySearch)
        }
    },[search]);
    return (
        <div>
            {!companySearch&&<Stripe/>}
            <div className="homeContainer">
                <SearchBar/>
                <EmployeeList company={company}/>

            </div>
        </div>
    );
}
export default Home;