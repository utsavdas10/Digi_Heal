import {React, useContext} from 'react';
import Navbar from '../components/navbar';
import Card from '../components/card';
// import { AuthContext } from "../shared/context/auth-context";
import "./Home.css"

const Home = () => {
    // const auth = useContext(AuthContext);
    return (
        <div>
            {/* {auth.isLoggedIn && <Navbar />} */}\
            <Navbar />
            <Card />
        </div>
    );
};

export default Home;
