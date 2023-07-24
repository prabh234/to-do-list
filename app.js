let exp = require("express");
let app = exp();
let bp = require("body-parser");
let date = require(__dirname+"/date.js");
const mongoose = require('mongoose');


app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended:true}));
app.use(exp.static('public'));


mongoose.connect('mongodb+srv://singhpabi000:hNPWvmQMEl9gd2Qg@cluster0.k8fltt3.mongodb.net/todolistDB');

const itemSchema = new mongoose.Schema({
    name : String
});
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})
const Item = mongoose.model("item",itemSchema);
const List = mongoose.model('list',listSchema);


// List.collection.drop().then(()=>{console.log('collection dropped')});
app.get("/",function(req,res){
    let day = date.getDate();
    
    Item.find({}).then(function(result){
            res.render('list',{title:day,addItem:result})
            

    }).catch(err=>{console.log(err);});
});


app.get("/:listTitle",function (req,res) {
    const newList = req.params.listTitle;
    let itemName = req.body.items;

   List.findOne({name:newList}).then((result)=>{
        if(!result){
            console.log('no exist');
            list.save().then(()=>{
                console.log('list created');
                res.redirect('/'+newList)
            }).catch(err=>{console.log(err);});
        }
        else{
            console.log(result.items);
            res.render('list',{title: result.name, addItem: result.items });
        }
        }).catch(er=>{console.log(er);})
        
        
        let list = new List({
            name: newList,
            items: itemName
        });  
    
});



app.post("/",function(req,res){
    let itemName = req.body.items;
    let listName = req.body.list;
    let day = date.getDate();
    let newItem = new Item({
        name : itemName
    })
    if(listName === day){
        newItem.save();
        res.redirect('/');  
    }
    else{
        List.findOne({name: listName}).then(ele =>{
            ele.items.push(newItem);
            ele.save();
            res.redirect('/'+listName);
        })
    }
    
});
app.post('/del',(req,res)=>{
    let itemId = req.body.checkedItem;
    let list = req.body.list;
     let day = date.getDate();
    if(list === day){
        Item.findByIdAndRemove(itemId).then(()=>{console.log('checked item deleted');}).catch(e=>{console.log(e);})
        res.redirect('/');
    }
    else{
        List.findOneAndUpdate({name:list},{$pull:{items:{_id:itemId}}}).catch(er=>{console.log(er);});
        res.redirect("/"+list);
    }
});

app.listen(3000,function(){
    console.log("server running");
})