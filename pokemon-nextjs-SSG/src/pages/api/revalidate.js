export default async function handler(req, res){
    for(const url of req.body){
        await res.unstable_revalidate(url)
    }

    res.send(200).json({revalidate:true});
}