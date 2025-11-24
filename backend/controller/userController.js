import userModel from "../models/userModel.js"

//Getting User
export const getCurrentUser = async(req, res)=> {
    try {
        let user = await userModel.findById(req.userId).select("-password")

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json(user)
    } catch(error) {
        res.status(500).json({message: `getCurrentUser error ${error}`})
    }
}



//Getting Admin
// export const getAdmin = async(req, res)=> {
//     try{
//         let adminEmail = req.adminEmail;

//         if(!adminEmail) {
//             return res.status(201).json({
//                 email: adminEmail,
//                 role: "admin"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({message: `getAdmin error ${error}`})
//     }
// }




