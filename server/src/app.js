import express from 'express';
import cors from 'cors';
 

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));


//health 
app.get('/', (req, res)=>{
    res.status(200).json({
        messgae:"Docu Chat API is runningggg!!!"
    })
})

export default app