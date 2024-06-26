use("restaurant");
db.orders.findOne();

db.orders.find({},{counters:0}).sort({createdAt:-1});

db.orders.find({billCompleted:false},{counters:0}).sort({createdAt:-1});

db.orders.deleteMany({billCompleted:false})

db.orders.find({},{counters:1});

db.orders.aggregate([
  { "$project": { "counters": "$$ROOT.counters.item", "_id": 0 } }
])


db.orders.aggregate([
  { "$project": { "counters": 1, "_id": 0 } },
  {$unwind: "$counters"},
  {$project:{"itemName":"$$ROOT.counters.item.itemName", "counters.qty":1, "counters.amt":1 }}
  
])


db.orders.aggregate([
  { "$project": { "counters": "$$ROOT.counters.item",  "sold": "$$ROOT.counters.qty","_id": 0 } }
])


db.orders.aggregate([
    { "$project": { "counters": "$$ROOT.counters.item", "_id": 0 } },
    { "$unwind": "$counters" }
])



db.orders.aggregate([{
    $project: {count:{$size: "$counters"}}
}]);


db.orders.find({"billCompleted":true, "billNo":{$exists: false}}).count();

db.orders.find({"billCompleted":true},{"billNo":1, });


db.orders.aggregate([{
    $project: {
        billNo:1,
        count:{$size: "$counters"},
        "total_amt": { "$sum": "$counters.amt" }
    }
}]);