//all middleware goes here 

var campground = require("../models/campground");
var comment = require("../models/comment");
var middlewareObj = {};

// middlewareObj.test =  function (req, res, next){
//     console.log("here");
//     next();
    
// }
    

middlewareObj.checkCampgroundOwnership =  function (req, res, next){
    //console.log("here");
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err, foundCampground){
                if(err){
                    req.flash("error","Campground not found!");
                    res.redirect("back");
                }else{
                     // does user own the campground ? 
                     if(foundCampground.author.id.equals(req.user._id)){
                         console.log("this is not you");
                      next();
                     }else{
                          req.flash("error","You don't have permission to do that");
                          res.redirect("back");
                     }
                  }
      });
    }else{
         req.flash("error", "You need to be logged in to do that!!");
         res.redirect("back");
      // console.log("this is not you");
    }
}

middlewareObj.checkCommentOnwership= function (req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err, foundComment){
                if(err){
                     console.log("this is not you");
                    res.redirect("back");
                }else{
                     // does user own the comment ? 
                
                     if(foundComment.author.id.equals(req.user._id)){
                         console.log("this is not you");
                       next();
                     }else{
                          req.flash("error","You don't have permission to do that");
                          res.redirect("back");
                     }
                }
      });
    }else{
         req.flash("error", "You need to be logged in to do that!!");
         res.redirect("back");
       // console.log("this is not you");
    }
}

middlewareObj.isLoggedIn=  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!");
    res.redirect("/login");
}



module.exports = middlewareObj;