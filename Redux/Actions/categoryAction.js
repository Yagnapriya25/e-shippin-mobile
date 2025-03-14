import { categoryDeleteFail, categoryDeleteRequest, categoryDeleteSuccess, categoryGetAllFail, categoryGetAllRequest, categoryGetAllSuccess, categoryGetSingleFail, categoryGetSingleRequest, categoryGetSingleSuccess, categoryPostFail, categoryPostRequest, categoryPostSuccess, categoryProductFail, categoryProductRequest, categoryProductSuccess } from "../Slices/categorySlice";







const categoryPost = (credential)=>async(dispatch)=>{
try {
    dispatch(categoryPostRequest());
    const {name,photo}= credential;
    const res = await fetch(`${process.env.REACT_APP_URL}/category/create`,{
        method:"POST",
        body:JSON.stringify(credential),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const data = await res.json();
    console.log(data);
    if(res.ok){
        dispatch(categoryPostSuccess(data));
    }
    else{
        dispatch(categoryPostFail(data.message))

    }

} catch (error) {
    dispatch(categoryPostFail(error.message))
}
}

const categoryGetAll = ()=>async(dispatch)=>{
    try {
        dispatch(categoryGetAllRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/category/getall`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryGetAllSuccess(data));
        }
        else{
            dispatch(categoryGetAllFail(data.message))
        }
    } catch (error) {
        dispatch(categoryGetAllFail(error.message))

    }
}
const categoryGetSingle = (categoryInfo)=>async(dispatch)=>{
    try {
         dispatch(categoryGetSingleRequest());
         const {cat_id} = categoryInfo;
         const res = await fetch(`${process.env.REACT_APP_URL}/category/getsingle/${cat_id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
         })
         const data = await res.json();
         console.log(data);
         if(res.ok){
            dispatch(categoryGetSingleSuccess(data));
         }
         else{
            dispatch(categoryGetAllFail(data.message));
         }

    } catch (error) {
        dispatch(categoryGetSingleFail(error.message))
    }
}
const deleteCategory = (categoryInfo)=>async(dispatch)=>{
    try {
        dispatch(categoryDeleteRequest());
        const {cat_id}=categoryInfo;
        const res = await fetch(`${process.env.REACT_APP_URL}/category/remove/${cat_id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryDeleteSuccess(data));
        }
        else{
            dispatch(categoryDeleteFail(data.message))
        }
    } catch (error) {
        dispatch(categoryDeleteFail(error.message))
    }
}
const getCategoryProducts = (categoryInfo)=>async(dispatch)=>{
    try {
        const {cat_id}=categoryInfo;
        dispatch(categoryProductRequest());
        const res = await fetch(`${process.env.REACT_APP_URL}/category/${cat_id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(categoryProductSuccess(data))
        }
        else{
            dispatch(categoryProductFail(data.message))
        }
    } catch (error) {
        dispatch(categoryProductFail(error.message))
    }
}

export 
{
    categoryPost,
    categoryGetAll,
    categoryGetSingle,
    deleteCategory,
    getCategoryProducts
};