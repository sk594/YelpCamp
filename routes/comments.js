var express = require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");


//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,campground){
          if(err){
              console.log(err);
          }else{
              res.render("comments/new", {campground : campground});
          }       
    })
});

//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    
            campground.findById(req.params.id,function(err,campground){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                }else{
                    comment.create(req.body.comment,function(err,comment){
                        if(err){
                            req.flash("error","Something went wrong");
                            console.log(err);
                        }else{
                            //add username and id to comment 
                            comment.author.id = req.user._id;
                            comment.author.username = req.user.username;
                            //save comments
                            comment.save();
                            campground.comments.push(comment);
                            campground.save();
                    //redirect show page
                            req.flash("success","Successfully added comment!");
                            res.redirect("/campgrounds/"+campground._id);
                        }
                    })
                }
            })

});

//comment edit routes
router.get("/:comment_id/edit", function(req,res){
    comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
}); 

router.put("/:comment_id", function(req, res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOnwership,  function(req, res){
    //find by id and remove
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//middleware



module.exports = router;
