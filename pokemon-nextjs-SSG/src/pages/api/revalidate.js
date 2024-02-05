export default function handler(req, res){
    for(const url of req.body){

    }

    res.send(200).json({revalidate:true});
}