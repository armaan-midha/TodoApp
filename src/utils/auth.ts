import { MMKV } from "react-native-mmkv";

const TOKEN_KEY = 'AuthToken';
const storage = new MMKV();

export const TokenManager = {
    get(){
        try{
            return storage.getString(TOKEN_KEY);
        }catch(error){
            return null;
        }
    },
    set(token: string){
        try{
            storage.set(TOKEN_KEY, token);
        }catch(error){
            return null;
        }
    },
    reset(){
        try{
            storage.clearAll();
        }catch(error){
            return null;
        }
    }
}