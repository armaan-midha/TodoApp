import Config from "react-native-config";

export default {
    logAxiosErrorResponse: false,
    logAxiosResponse: false
}

interface ConfigType{
    urls:{
        TODO_REST_API_SERVICE: string
    }
}

export const config: Record<'UAT' | 'PROD', ConfigType> = {
    UAT:{
        urls: {
            TODO_REST_API_SERVICE: 'http://localhost:8080'
        }
    },
    PROD: {
        urls: {
            TODO_REST_API_SERVICE: 'http://localhost:8080'
        }
    }
}

const getEnviromentConfig = () => {
    const env = Config.ENV;
    if(env === 'production'){
        return config.PROD;
    } else {
        return config.UAT;
    }
}

export const appConfig = getEnviromentConfig();