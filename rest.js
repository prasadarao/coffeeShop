var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

  router.post("/add",function(req,res){
      var query = "INSERT INTO ??(??,??) VALUES (?,?)";
      var table = ["orders","user_name","total",req.body.user_name, req.body.total];
      query = mysql.format(query,table);
      var orderId = "";
      connection.query(query,function(err,rows){
          if(err) {
              return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          }
          orderId = rows.insertId;

          for(i=0; i < req.body.items.length; i++) {
            var product = req.body.items[i];
            var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
            var table = ["orders_items","order_id","product_id", "amount", "quantity", orderId, product.id, product.price, product.quantity];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
              if(err) {
                  return res.json({"Error" : true, "Message" : "Error executing MySQL query......"});
              }
            });
          }
          res.json({"Error" : false, "Message" : "User Added !"});
      });
  });

  router.post("/addProduct",function(req,res){
      var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
      var table = ["products","name","size","model","type","price", req.body.name, req.body.size, req.body.model, req.body.type, req.body.price];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "User Added !"});
          }
      });
  });

  router.get("/orders",function(req,res){
      var query = "select *  from ??";
      var table = ["orders"];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "orders" : rows});
          }
      });
  });

  router.get("/orders/:order_id",function(req,res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["orders","user_id",req.params.user_id];
      query = mysql.format(query,table);
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "Users" : rows});
          }
      });
  });

  router.get("/products",function(req,res){
      var query = "select products.*, sizes.name as size_name, models.name as model_name, types.name as type_name  from products, sizes, models, types where products.size =  sizes.id and products.model = models.id and products.type = types.id";
      connection.query(query,function(err,rows){
          if(err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          } else {
              res.json({"Error" : false, "Message" : "Success", "products" : rows});
          }
      });
  });

  router.get("/productOptions",function(req,res){
      var sizes_query = "select * from sizes where status='active'";
      var returnObj = {};
      connection.query(sizes_query,function(err,rows){
          if(err) {
              return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
          }
          returnObj['sizes'] = rows;

          var types_query = "select * from types where status='active'";
          connection.query(types_query,function(err,rows){
              if(err) {
                  return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
              }
              returnObj['types'] = rows;

              var models_query = "select * from models where status='active'";
              connection.query(models_query,function(err,rows){
                  if(err) {
                      return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                  }
                  returnObj['models'] = rows;
                  returnObj['Error'] = false;
                  returnObj['Message']= 'Success';
                  res.json(returnObj);
              });

          });
      });
  });

}

module.exports = REST_ROUTER;
