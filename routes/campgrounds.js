var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware/index");


//INDEX --show all campgrounds
router.get("/",function(req,res){
   campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            //console.log(allCampgrounds);
            res.render("campgrounds/index",{campgrounds : allCampgrounds, currentUser: req.user});   
        }
    });
    
});

//CREATE -- add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.desc;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    
    var newCampground = {name:name,image:image,description:description,author:author};
    //create a new campground and save db
    campground.create(newCampground,function(err,newlyCreate){
        if(err){
            console.log(err);    
            }else{
             //redirect back to campground page
             console.log(newlyCreate);
             res.redirect("/campgrounds");
            }
         });
});

//NEW --show form to create to new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//SHOW --show more info about one campground
router.get("/:id",function(req, res){
//find the campground with provided id
     campground.findById(req.params.id).populate("comments").exec( function( err , foundCampground){
         if(err){
             console.log(err);
         }else
         {   //console.log(foundCampground);
            //console.log(foundCampground.name);
            // res.render("show",{camp : foundCampground});   
            //render show template with that campground
            res.render("campgrounds/show",{campground : foundCampground});
            //console.log(foundCampground.name);
         }
     });
   
    //res.render("show");
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        campground.findById(req.params.id,function(err, foundCampground){
                        res.render("campgrounds/edit",{ campground : foundCampground});
    });
});

//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update correct campground
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
             res.redirect("/campgrounds");
        }
    });
});

//middleware



module.exports = router;