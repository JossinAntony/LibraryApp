const Express=require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser')
const request = require('request');

var app=new Express();

app.set('view engine', 'ejs');
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));


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




authors=[
    {
        'name':'Jane Austen',
        'dob':'December 16, 1775',
        'country':'England',
        'otherworks':'Emma, Persuasion, Lady Susan',
        'src':'/img/austen.jpg',
    },
    {
        'name':'Kazuo Ishiguro',
        'dob':'November 8, 1954',
        'country':'Japan',
        'otherworks':'The Remains of the Day, The Unconsoled, When We Were Orphans',
        'src':'/img/ishiguro.jpg',
    },
    {
        'name':'Toni Morrison',
        'dob':'February 18, 1931',
        'country':'USA',
        'otherworks':'Song of Solomon, Tar Baby, The Bluest Eye',
        'src':'/img/toni.jpg',
    },
    {
        'name':'Chinua Achebe',
        'dob':'November 16, 1930',
        'country':'Japan',
        'otherworks':'No Longer at Ease, Arrow of God, A Man of the People, Anthills of the Savannah',
        'src':'/img/achebe.jpg',
    },
    {
        'name':'Mary Shelly',
        'dob':'1797',
        'country':'England',
        'otherworks':'The Last Man, The Fortunes of Perkin Warbeck, Lodore, Falkner',
        'src':'/img/shelley.jpg',
    },
    {
        'name':'Arundhati Roy',
        'dob':'November 24, 1961',
        'country':'India',
        'otherworks':'The End of Imagination, The Cost of Living. Flamingo, The Greater Common Good, The Algebra of Infinite Justice',
        'src':'/img/roy.jpg',
    },
    {
        'name':'Harper Lee',
        'dob':'April 28, 1926',
        'country':'USA',
        'otherworks':'Go Set a Watchman',
        'src':'/img/lee.jpg',
    },
    {
        'name':'F. Scott Fitzgerald',
        'dob':'September 24, 1896',
        'country':'Japan',
        'otherworks':'This Side of Paradise, The Beautiful and Damned, Tender is the Night, The Last Tycoon',
        'src':'/img/scott.jpg',
    },
    {
        'name':'Margaret Atwood',
        'dob':'November 18, 1939',
        'country':'Canada',
        'otherworks':'The Edible Woman, Surfacing, Lady Oracle, Life Before Man',
        'src':'/img/atwood.jpg',
    },
    {
        'name':'Bell Hooks',
        'dob':'November 16, 1930',
        'country':'Japan',
        'otherworks':'Bone Black: Memories of Girlhood, Wounds of passion: a writing life, Remembered rapture: the writer at work, Justice: childhood love lessons',
        'src':'/img/hooks.jpg',
    }
];
///////////////////////////
Mongoose.connect('mongodb://localhost:27017/LibraryDB');

const BooksSchema = Mongoose.model('Books',{
Title:String,
Author:String,
Publisher:String,
Year:String,
src:String
});

//save books API
app.post('/saveBooksAPI',(req,res)=>{
    var details = req.body;
    console.log(details)
    var book = new BooksSchema(details);
    book.save(book,(error, data)=>{
        if(error){
            throw error;
            res.send(error);
        }else{
            res.send("<script>alert('New book added to library!')</script>")
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
const retrieveBooksAPILink = 'http://localhost:3000/retrieveBooksAPI';

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

app.get('/',(req,res)=>{
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
    const retrieveSingleBookAPILink = 'http://localhost:3000/retrieveSingleBookAPI/?q='+ item;
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
        author.save(author,(error, data)=>{
            if(error){
                throw error;
                res.send(error);
            }else{
                res.send("<script>alert('New book added to library!')</script>")
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
    const retrieveAuthorsAPILink = 'http://localhost:3000/retrieveAuthorsAPI';
    
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
                console.log(data);
                //res.render('authorsingle',{nav:navlink, title:"Authors",author_singlename:data});
            }
        })
    });

    const retrieveSingleAuthorAPILink = 'http://localhost:3000/retrieveSingleAuthorAPI';

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

// app.get('/booksingle',(req,res)=>{
//     const x = req.params.id;
//     res.render('booksingle',
//     {
//         title:"Book", nav:navlink, 'book_single':library[1]
//     });
// });


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at http://localhost:3000")
})