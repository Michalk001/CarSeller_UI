import { combineReducers } from "redux";
import { carProducer } from "./CarProducer";
import { paramsSearch } from "./ParamsSearch";
import { fuelType } from "./FuelType";
import { carOfferList } from "./CarOfferList";
import {isLogin} from "./IsLogin"
export default combineReducers({
    paramsSearch, carProducer, fuelType, carOfferList,isLogin
    
});