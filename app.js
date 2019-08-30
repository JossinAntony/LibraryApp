const Express=require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser')
const request = require('request');

var app=new Express();

app.set('view engine', 'ejs');
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );
    // res.setHeader('Access-Control-Allow-Origin', 'https://studentdb1-jossin.herokuapp.com' ); // request origin/ name of app.

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

navlink=[
    {
        'link': '/books',
        'title': 'Books'
    },{
        'link': '/authors',
        'title': 'Authors'
    },{
        'link': '/addBooks',
        'title': 'Add Books'
    },
    {
        'link': '/addAuthors',
        'title': 'Add Authors'
    }
    ];
///////////////////////////
// Mongoose.connect('mongodb://localhost:27017/LibraryDB', { useNewUrlParser: true }, (err, res) => {
//     if (err) throw err;
//     //console.log('Database online');
//     });

Mongoose.connect('mongodb+srv://jossin:jossin@cluster0-arjkd.mongodb.net/test?retryWrites=true&w=majority');



const BooksSchema = Mongoose.model('Books',{
Title:String,
Author:String,
Publisher:String,
Year:String,
src:String
});

const userSchema = Mongoose.model('users',{
    uname:String,
    upass:String
    });


//save user deatils(username & password)API
app.post('/saveUserDetailsAPI',(req,res)=>{
    var details = req.body;
    var user = new userSchema(details);
    user.save((error,data)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            res.send(data)
        }
    })
})

//const saveUserDetailsAPILink = "http://localhost:3052/saveUserDetailsAPI";
const saveUserDetailsAPILink = "http://libraryapp-ict.herokuapp.com/saveUserDetailsAPI";

//retrieve user from username
app.get('/retrieveUser',(req,res)=>{
    var user = req.query.q;
    userSchema.find({uname:user},(error,data)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            res.send(data)
            // console.log(data);
        }
    })
})
//const retrieveUserAPILink = "http://localhost:3052/retrieveUser";
const retrieveUserAPILink = "http://libraryapp-ict.herokuapp.com/retrieveUser";

//save user details from sign up page
app.post('/saveUser',(req,res)=>{
    var username = req.body.uname;
    var pwd = req.body.upass;
    var cpwd = req.body.cpass;
    request(retrieveUserAPILink+"/?q="+username,(error,response,body)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            var data = JSON.parse(body);
       }

        if(data.length <= 0){
        var user = new userSchema(req.body);
        var result = user.save((error,data)=>{
            if(error)
            {
                throw error;
                res.send(error);
            }
            else
            {
                res.send("<script>alert('Sign up successful!')</script><script>window.location.href='/login'</script>");
            }
        });
        }else{
            res.send("<script>alert('username taken!')</script><script>window.location.href='/signup'</script>");
        }
    }); 
});

app.post('/logInAPI',(req, res)=>{
    var username = req.body.uname;
    var pwd =req.body.upass;
    request(retrieveUserAPILink+"/?q="+username,(error, response, body)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            var data = JSON.parse(body);
        }
        if(data.length <= 0){
            res.send("<script>alert('username not found, please sign up!')</script><script>window.location.href='/signup'</script>");
        }else{
            var result = userSchema.find({$and:[{uname:username},{upass:pwd}]},(error,response)=>{
                if(error)
                {
                    throw error;
                    res.send(error);
                }
                else
                {
                   var userInfo = (response);
                }

                if(userInfo.length <= 0){
                    res.send("<script>alert('username and password do not match, please try again!')</script><script>window.location.href='/login'</script>");
                }else{
                    res.send("<script></script><script>window.location.href='/books'</script>");
                }
            })
        }
    })
})



//save books API
app.post('/saveBooksAPI',(req,res)=>{
    var details = req.body;

    var book = new BooksSchema(details);
    book.save((error, data)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            res.send(data)
            //console.log(data);
        }
    })
});

//retrieve book API
app.get('/retrieveBooksAPI',(req,res)=>{
    var retrieve = BooksSchema.find((error,data)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            //console.log(data);
            res.send(data)
        }
    })
})

//apiLink
//const retrieveBooksAPILink = 'http://localhost:3052/retrieveBooksAPI';
const retrieveBooksAPILink = 'http://libraryapp-ict.herokuapp.com/retrieveBooksAPI';


app.get('/books',(req,res)=>{
    request(retrieveBooksAPILink,(error,response,body)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            var data = JSON.parse(body);
            //console.log(data);
            res.render('books',{nav:navlink, title:"Books",'library':data})
        }
    });
});

// app.get('/',(req,res)=>{
//     request(retrieveBooksAPILink,(error,response,body)=>{
//         if(error){
//             throw error;
//             res.send(error);
//         }else{
//             var data = JSON.parse(body);
//             //console.log(data);
//             res.render('books',{nav:navlink, title:"Books",'library':data})
//         }
//     });
// });


app.get('/',(req,res)=>{
            res.render('login');
        }
    );

    app.get('/login',(req,res)=>{
        res.render('login');
    });

app.get('/signup',(req,res)=>{
    res.render('signup');
    }
);


//retrieve single book
//Define single book retrievel API
app.get('/retrieveSingleBookAPI',(req,res)=>{
    var id = req.query.q;
    BooksSchema.find({_id:id},(error,data)=>{  
        if(error){
            throw error;
        }else{
            res.send(data);
            //console.log(data);
        }
    });
});

// single book retrievel API link
//function to use the single book retrievel API link
app.get('/retrieveSingleBook/:id',(req,res)=>{
    var item = req.params.id;
   //const retrieveSingleBookAPILink = 'http://localhost:3052/retrieveSingleBookAPI/?q='+ item;
     const retrieveSingleBookAPILink = 'http://libraryapp-ict.herokuapp.com/retrieveSingleBookAPI/?q='+ item;
    request(retrieveSingleBookAPILink,(error,response,body)=>{
        if(error){
            throw error;
        }else{
            var data = JSON.parse(body);
            console.log(data);
res.render('booksingle',{title:"Books",nav:navlink, 'book_single':data});
        }
    })
});


///////////
//Authorsschema & retrievel
    const AuthorsSchema = Mongoose.model('Authors',{
        name:String,
        dob:String,
        country:String,
        otherworks:String,
        src:String
        });
    
    
    //save authors API
    app.post('/saveAuthorsAPI',(req,res)=>{
        var details = req.body;
        console.log(details)
        var author = new AuthorsSchema(details);
        author.save((error, data)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                res.send(data);
                console.log(data);
            }
        })
    });
    
    //retrieve authors API
    app.get('/retrieveAuthorsAPI',(req,res)=>{
        var retrieve = AuthorsSchema.find((error,data)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                //console.log(data);
                res.send(data)
            }
        })
    })
    
    //apiLink
    
  // const retrieveAuthorsAPILink = 'http://localhost:3052/retrieveAuthorsAPI';
     const retrieveAuthorsAPILink = 'http://libraryapp-ict.herokuapp.com/retrieveAuthorsAPI';
    
    app.get('/authors',(req,res)=>{
        request(retrieveAuthorsAPILink,(error,response,body)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                var data = JSON.parse(body);
                //console.log(data);
                res.render('authors',{nav:navlink, title:"Authors",'authors':data})
            }
        });
    });

    //Retrieve single author API

    app.get('/retrieveSingleAuthorAPI',(req,res)=>{
        var id = req.query.q;
        console.log(id);
        AuthorsSchema.find({_id:id},(error,data)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                res.send(data);
            }
        })
    });
    
   // const retrieveSingleAuthorAPILink = 'http://localhost:3052/retrieveSingleAuthorAPI';
    const retrieveSingleAuthorAPILink = 'http://libraryapp-ict.herokuapp.com/retrieveSingleAuthorAPI';

    //Retrieve single author function
    app.get('/retrieveSingleAuthor/:q',(req, res)=>{
        var id = req.params.q;
        request(retrieveSingleAuthorAPILink+"/?q="+id,(error, response, body)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                data = JSON.parse(body);
                console.log(data[0]);
                res.render('authorsingle', {nav:navlink, title:"Author", author_single:data[0]});
            }
        });
    });

////////////////
app.get('/authors',(req, res)=>{
    res.render('authors',
        {
            nav:navlink, 'title':'Authors', authors
        });
});

app.get('/addBooks',(req, res)=>{
    res.render('addBooks',
        {
            nav:navlink, 'title':'Add Books'
        });
});

app.get('/addAuthors',(req, res)=>{
    res.render('addAuthors',
        {
            nav:navlink, 'title':'Add Authors'
        });
});

app.get('/authorsingle/:id',(req, res)=>{
    i = req.params.id;
    res.render('authorsingle',{
        title:'Author', nav:navlink, 'author_single':authors[i]
    })
});

app.listen(process.env.PORT || 3052,()=>{
    console.log("Server running at http://localhost:3052")
})