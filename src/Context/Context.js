import {createContext, useLayoutEffect, useState} from "react";
export const AppContext = createContext(null);

export default function ContextProvider(props) {
    const [favourites, setFavourites] = useState([]);
    useLayoutEffect(() => {
        const fav = localStorage.getItem('favourites');
        if(fav){
            console.log(1);
            setFavourites(JSON.parse(fav));
        }
    }, [])
    const addFavourite = (employee) => {
        if(favourites.find((fav) => fav.login.uuid===employee.login.uuid)){
            console.log("Already in favourites");
        }
        else{
            localStorage.setItem('favourites', JSON.stringify([...favourites, employee]));
            setFavourites([...favourites, employee]);
        }
    }
    const removeFavourite = (employee) => {
        const deleteFav= favourites.filter((fav) => fav.login.uuid !== employee.login.uuid);
        setFavourites(deleteFav)
        localStorage.setItem('favourites', JSON.stringify(deleteFav))
    }
    const globalValue = {
        favourites, addFavourite ,removeFavourite
    };
    return (
        <AppContext.Provider value={globalValue}>
            {props.children}
        </AppContext.Provider>
    );
}