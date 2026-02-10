


export const userLetterGenerator = (name:string)=>{
    const result =  name.split(" ").filter(val=> val.length > 2).map((val)=> val[0]).join("").toUpperCase();
    return result;

}