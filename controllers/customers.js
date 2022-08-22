const joi=require('joi');
const database = require('./database');


 module.exports= {
    addCustomer: async function (req, res,next) {
      const reqBody = req.body;

      const schema = joi.object({
        first_name: joi.string().required().min(2).max(100),
        last_name: joi.string().required().min(2).max(100),
        phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
        email: joi.string().required().regex(/^[^@]+@[^@]+$/),
    })
    
    const {error, value}=  schema.validate(reqBody);

    if (error){
      (`error adding customer ${error}`);
        return;
    }

    const sql =
    "INSERT INTO customers(first_name,last_name, phone, email)" +
    " VALUES(?,?,?,?);";
          
    
            try {    
                const result = await database.query(
                    sql,
                [value.first_name, value.last_name, value.phone, value.email]
                );

                value.id =result[0].insertId;
                res.json(value)
            }
            catch (err) {
                console.log(err);
                return;
            }
         

    },
    

    customersList: async function (req, res,next) {
    const sql = `SELECT * FROM customers;`;

        try {
            const result = await database.query(sql);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    
   

    deleteCustomer: async function(req, res, next) {
        const schema = joi.object({
            id: joi.number().required()
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            res.status(400).send('error delete customer');
            console.log(error.details[0].message);
            return;
        }

        const sql = `DELETE FROM customers WHERE id=?`;

        try {
            const result = await database.query(sql, [value.id]);
            res.json({
                id: value.id
            });
        }
        catch (err) {
            res.status(400).send('error delete customer');
            console.log(err.message);
        }
    },

    
    findCustomer: async function(req, res, next) {

        const param= req.query;
        const schema= joi.object({
            search: joi.string().required().min(2)
        });

        const {error, value} = schema.validate(param);

        if (error){
            res.status(400).send(`search error:${error}`);
            throw error;
        }

        const searchQuery =`%${value.search}%`;

        const sql = `
        SELECT customers.id, customers.name, customers.phone, customers.email,  
        countries.id AS country_id, countries.name AS country_name, countries.countryCode  
        FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
        WHERE customers.name LIKE ? or customers.email LIKE ?  or customers.country_id LIKE ?"+
        "ORDER BY customers.name ASC;`;

        try {    
            const result = await database.query( sql,[
                searchQuery,
                searchQuery,
                searchQuery , 
            ]);
            res.json(result[0]);
        } 
        catch (err) {
            res.status(400).send(`search error: ${err}`);
            throw error;
        }},



    updateCustomer: async function(req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            id:joi.number(),
            first_name: joi.string().min(2).max(100),
            last_name: joi.string().min(2).max(100),
            phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
            email: joi.string().required().regex(/^[^@]+@[^@]+$/),
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.status(400).send(`error update customer: ${error}`);
            return;
        }
  
        const keys = Object.keys(value);   
        const values = Object.values(value); 
   
        const fields = keys.map(key => `${key}=?`).join(',');
        values.push(req.body.id);
        const sql = `UPDATE customers SET ${fields} WHERE id=?`;

        try {
            const result = await database.query(sql, values);
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }


    },






}



