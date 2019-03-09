var mongoose = require("mongoose");
var Comment = require("./models/comment");
var Campground = require("./models/campground");


var data = [
    { name : "cam",
      image:"https://cdn.pixabay.com/photo/2014/08/12/20/40/duck-416972__340.jpg",
      description : "Peter Rabbit, the mischievous and adventurous hero who has captivated generations of readers, now takes on the starring role of his own cheeky, contemporary comedy with attitude. In the film, Peter's feud with Mr. McGregor (Domhnall Gleeson) escalates to greater heights than ever before as they rival for the affections of the warm-hearted animal lover who lives next door (Rose Byrne). James Co..."
    },
    { name : "cam",
      image:"https://cdn.pixabay.com/photo/2014/08/12/20/40/duck-416972__340.jpg",
      description : "Peter Rabbit, the mischievous and adventurous hero who has captivated generations of readers, now takes on the starring role of his own cheeky, contemporary comedy with attitude. In the film, Peter's feud with Mr. McGregor (Domhnall Gleeson) escalates to greater heights than ever before as they rival for the affections of the warm-hearted animal lover who lives next door (Rose Byrne). James Co..."
    },
    { name : "cam",
      image:"https://cdn.pixabay.com/photo/2014/08/12/20/40/duck-416972__340.jpg",
      description : "Peter Rabbit, the mischievous and adventurous hero who has captivated generations of readers, now takes on the starring role of his own cheeky, contemporary comedy with attitude. In the film, Peter's feud with Mr. McGregor (Domhnall Gleeson) escalates to greater heights than ever before as they rival for the affections of the warm-hearted animal lover who lives next door (Rose Byrne). James Co..."
    }
    ]

function seedDB(){
//remove all campground post
        Campground.remove({},function(err){
            if(err){
                console.log(err);
           }//else{
        //         console.log("remove campground!!");
        //         // add a few campground post
        //       data.forEach(function(seed){
        //       Campground.create(seed,function(err, campground){
        //          if(err){
        //              console.log(err);
        //          }else{
        //              console.log("added a campground!!!");
        //              //create a comment
        //              Comment.create({
        //                  text : "this is comment by...",
        //                  author : "Homer"
        //              },function(err,comment){
        //                  if(err){
        //                      console.log(err);
        //                  }else{
        //                      //console.log(campground.comments.find({}));
        //                      campground.comments.push(comment);
        //                      campground.save();
        //                      console.log("Create a new comment!!");
        //                  }
        //              })
        //          }
        //      });
        //  });
        //     }
           });

}

module.exports = seedDB;