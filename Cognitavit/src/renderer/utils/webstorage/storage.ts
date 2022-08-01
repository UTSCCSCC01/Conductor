/*
    Store your json data here, to be retrieved later. 
    Must be type json.

    ----------------------
    Add your items below.
    1) key: auth, value: authtoken
*/
function sessionStorage_save(key:string, value:any){
    if(value == undefined){
        sessionStorage.setItem(key, value);
    }else{
        sessionStorage.setItem(key,  JSON.stringify(value));
    }
    return 1;
}

function sessionStorage_get(key:string){
    
    let storage_res = sessionStorage.getItem(key);
    if(storage_res == undefined || storage_res === "undefined"){
        return undefined;
    }
    console.log("Item stored is not json")
    let result;

    try{
        result = JSON.parse(sessionStorage.getItem(key) || ''); //bug?
        console.log("Item is not json")
    }catch{
        result= sessionStorage.getItem(key)
    }

    return result;
}

export {sessionStorage_save, sessionStorage_get}

