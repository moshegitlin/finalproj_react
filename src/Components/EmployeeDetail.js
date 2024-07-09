import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../CSS/EmployeeDetail.css';
import 'font-awesome/css/font-awesome.min.css';
import { AppContext } from "../Context/Context";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EmployeeDetail = () => {
    const { favourites, addFavourite, removeFavourite } = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const employeeCompany = searchParams.get('company');
    const employeeIndex = searchParams.get('index');
    const [employee, setEmployee] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!employeeCompany && employeeIndex) {
            setEmployee(favourites[employeeIndex]);
            return;
        }
        if (!employeeCompany || !employeeIndex) {
            return navigate('/error');
        }
        fetchEmployee().then(e =>{
            favourite(e)
        });
        // eslint-disable-next-line no-unused-expressions
    }, []);

    const fetchEmployee = async () => {
        try {
            const { data } = await axios.get(`https://randomuser.me/api/?results=10&seed=${employeeCompany}`);
            const employeeData = data.results[employeeIndex];
            if (!employeeData) {
                return navigate('/error');
            }
            setEmployee(employeeData);
            return employeeData;
        } catch (err) {
            console.error(err);
            navigate('/error');
        }
    };

    const favourite = (e) => {
        favourites.forEach(fav => {
            if (fav.login.uuid === e.login.uuid) {
                setIsFavourite(true);
            }
        });
    };

    const addFav = () => {
        addFavourite(employee);
        setIsFavourite(true);
    };

    const removeFav = () => {
        removeFavourite(employee);
        setIsFavourite(false);
    };

    return (
        employee && (
            <div className="employee-details">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left"></i> Back
                </button>
                <span onClick={() => isFavourite ? removeFav() : addFav()}
                      className={`star-icon ${isFavourite ? 'yellow' : 'gray'}`}><span className="fa fa-star"></span></span>
                <div className="employee-details-image-container">
                    <img src={employee.picture.large} alt={employee.name.first || 'Employee'}
                         className="employee-details-image"/>
                </div>
                <div className={"text-container"}>
                    <h1>{`${employee.name.first} ${employee.name.last}`}</h1>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phone}</p>
                    <p><strong>Age:</strong> {employee.dob.age}</p>
                    <p><strong>Country:</strong> {employee.location.country}</p>
                    <p><strong>Date:</strong> {employee.dob.date.substring(0, 10)}</p>
                </div>
                <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}
                              zoom={13} scrollWheelZoom={true} style={{height: "400px", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
                        <Tooltip>
                            {employee.location.street.name} {employee.location.city} {employee.location.state} {employee.location.country} {employee.location.postcode}
                        </Tooltip>
                    </Marker>
                </MapContainer>
            </div>
        )
    );
};

export default EmployeeDetail;
