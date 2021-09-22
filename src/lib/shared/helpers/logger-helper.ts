export const objectToString =(data:any)=>{
    if(typeof(data) == "object"){
        return JSON.stringify(data,null,4)
    }
    return data
}
export const getDateTime =()=>{
    return new Date().toISOString()
}