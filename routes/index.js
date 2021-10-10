const { json } = require("body-parser");
const express=require("express");
const db=require('../db/index.js');
const router=express.Router();

router.get('/', async (req,res)=>{
    try {
        let data=await db.all();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500);        
    }    
});
router.post('/',async (req,res)=>{
    try {
        let data=[
            req.body.Store_Name,
            req.body.Address,
            req.body.Contact_Number,
            req.body.Email_id
        ]
        let a=req.body.Store_Name;
        let final=await db.storePost(data);
        if(final.protocol41)
        {
            let ans=await db.store(a);
            res.json(ans);
        }
        else{console.log("ERROR");}
    } catch (error) {
        console.log(error);
    }      
});
router.post('/invoice',async (req,res)=>{
      try {
          let data=[
              req.body.name,req.body.no,req.body.storename
          ]
          let  a=req.body.no;
          let final=await db.invoicePost(data);
            if(final.protocol41)
            {
                let ans=await db.invoice(a);
                res.json(ans);
            }
            else{console.log("error");}
      } catch (error) {
          
      }
});
router.post('/item',async (req,res)=>{
   try {
    let data=[req.body.Buyer_No,req.body.Item_name,req.body.quantity,req.body.price,req.body.discount,req.body.gst,req.body.total_amount];
    let a=req.body.Buyer_No;
    let final=await db.itemPost(data);
    if(final.protocol41)
    {
        let ans=await db.item(a);
        let invoice=await db.invoice(a);
        let b=invoice[0].Store_Name;
        let store=await db.store(b);
        let t=0;
        let i=0;        
        ans.forEach(element => {
            let val=(ans[i].price_per_quantity)*(ans[i].quantity);
            let d=((ans[i].discount/100)*val + (ans[i].GST/100)*val);      
             val=val-d;            
            ans[i].total_amount_of_item=val;           
            t+=val;       
            i++;
        });
        invoice[0].Total=t;
        let last=JSON.stringify(store);
        last+=JSON.stringify(ans);
        last+=JSON.stringify(invoice);
        if(t!=0){
        res.json(last + "PAID");
        }
        else
        {
            res.json(last + "NOTPAID");
        }
    }
    else{console.log("error");}

   } catch (error) {
       
   }
    

})
module.exports= router;