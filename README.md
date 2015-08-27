# luluuscm
Luluu supply chain management

Setting up mongodb

1. download install mongodb
2. create a dir for data
    $mkdir -p /data/db
3. start mongod db
    $ mongod - if you get any permission error run $ sudo chown USERNAME /data/db and try again.
4. open another terminal and run
    $ mongo
    
Setting up the database
  > use scmdb - create a database and use
  
  Import table data
  > load("customers.js")
  > load("orders.js")
  > load("products.js")
  
  or
  
  > db.customers.insert( [{....}] );
  
  All set for database... :-)

Install node dependencies

    $ npm install
    $ node server/server.js
  
