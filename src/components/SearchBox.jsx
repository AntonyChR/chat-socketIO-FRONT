import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {types} from "../types/types";

const SearchBox = () => {
    const {logout} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const purgeAndLogout = () => {
        logout();
        dispatch({
            type: types.purgeChat
        })

    }

    return (
        <div className='headind_srch'>
            <div className='recent_heading mt-2'>
                <h4>Recientes</h4>
            </div>
            <div className='srch_bar'>
                <div className='stylish-input-group'>
                    <button onClick = {purgeAndLogout} className='btn text-danger'>Salir</button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
