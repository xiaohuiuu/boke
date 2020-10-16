import axios from 'axios'

export function request(config,err,success){
    let getdata = axios.create({
        baseURL:'http://47.93.208.160:3001',
        timeout:5000
    })

    return getdata(config)
}