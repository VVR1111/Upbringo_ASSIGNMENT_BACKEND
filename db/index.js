const mysql=require('mysql');

const pool=mysql.createPool({
    host:process.env.DB_host,
    port:process.env.DB_port,
    connectionLimit:10,
    user:process.env.DB_user,
    password:process.env.DB_password,      
    database:process.env.DB_db
});

let shopdb={};

shopdb.all = ()=>{

    return new Promise((resolve,reject)=>{

           pool.query('select distinct * from store join  invoice on store.Store_Name=invoice.Store_Name join items on invoice.Buyer_No=items.Buyer_No',(err,results)=>{
               if(err){
                  return reject(err);
               }
            //    console.log(results);
               return resolve(results);
           })
    })

}
shopdb.store=(a)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select * from store where Store_Name=?',[a],(err,results)=>{
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        })
    })
}
shopdb.storePost =(value)=>{
    
    let sn=value[0];
    let ad=value[1];
    let number=value[2];
    let em=value[3];
    let sql='insert into store (Store_Name,Address,Contact_Number,Email_id) values (?,?,?,?)';
    let todo=[sn,ad,number,em]
    
        return new Promise((resolve,reject)=>{
            pool.query(sql,todo,(err,results,fields)=>{
                if(err)
                {
                    return reject(err);
                }
                return resolve(results);
            })
        })

}

shopdb.invoice=(a)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select * from invoice where Buyer_No=?',[a],(err,results)=>{
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        })
    })
}
shopdb.invoicePost=(data)=>{
    let a=data[0];
    let b=data[1];
    let c=data[2];
    let sql='insert into invoice (Buyer_Name,Buyer_No,Store_Name) values (?,?,?)';
    let todo=[a,b,c];
    return new Promise((resolve,reject)=>{
        pool.query(sql,todo,(err,results)=>{
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });
    });
}
shopdb.item=(a)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select * from items where Buyer_No=?',[a],(err,results)=>{
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

shopdb.itemPost=(data)=>{
    let a=data[0];
    let b=data[1];
    let c=data[2];
    let d=data[3];
    let e=data[4];
    let f=data[5];
    let g=data[6];
    let sql='insert into items (Buyer_No,Item_name,quantity,price_per_quantity,discount,GST,total_amount_of_item) values (?,?,?,?,?,?,?)';
    let todo=[a,b,c,d,e,f,g];
    return new Promise((resolve,reject)=>{
        pool.query(sql,todo,(err,results)=>{
            if(err)
            {
                return reject(err);
            }
            
            return resolve(results);
        });
    });
}
module.exports=shopdb;

