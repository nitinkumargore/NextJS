const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

let corsOptions = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};


app.get('/',(req,res)=>{
    res.send('<h1>This is home page</h1><div>Try with some filepath in URL.</div>');
})

app.get('*',cors(corsOptions),(req,res)=>{
    const reqPath = req.protocol+ '://' + req.get('host') + req.originalUrl;
    const reqUrl = req.originalUrl;
    switch(reqUrl){
        case '/assets/index.json':
        case '/assets/original.json':
            res.sendFile(__dirname+reqUrl);
            break;
        default:
            // JSON paths '/assets/pokemon/1.json to 809.json':
            // IMAGE paths '/assets/images/index.json':
            const JSONPATH = '/assets/pokemon/';
            const regex = /\b([1-9]|[1-9][0-9]|[1-7][0-9][0-9]|80[0-9])\b/; // regex for number range from 1 to 809
            let numberStr = (reqUrl.includes('/assets/pokemon/') && reqUrl.includes('.json'))?
                            reqUrl.substring(reqUrl.indexOf(JSONPATH)+JSONPATH.length, reqUrl.indexOf('.json'), ) : '';

            if(reqUrl.includes('/assets/images/') || (numberStr && regex.test(numberStr))){
                res.sendFile(__dirname+reqUrl);
            }else{
                res.send('Requested path not found -  \n requested path => '+reqPath+'      \n reqUrl=>'+reqUrl);
            }
    }
})



app.listen(3010,()=>{console.log('server listening on 3010 port')})