const Express=require('express');

var app=new Express();

app.set('view engine', 'ejs');
app.use(Express.static(__dirname+"/public"));

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


library=[
    {
        'Title':'Pride & Prejudice',
        'Author':'Jane Austen',
        'Publisher': 'T. Egerton, Whitehall',
        'Year': '1813',
        'src':'/img/PrideAndPrejudice.jpg'
    },
    {
        'Title':'Never Let Me Go',
        'Author':'Kazuo Ishiguro',
        'Publisher': 'Faber and Faber',
        'Year': '2005',
        'src':'/img/NeverLetMeGo.jpg'
    },
    {
        'Title':'Beloved',
        'Author':'Toni Morrison',
        'Publisher': 'Alfred A. Knopf Inc.',
        'Year': '1987',
        'src':'/img/Beloved.jpg'
    },
    {
        'Title':'Things Fall Apart',
        'Author':'Chinua Achebe',
        'Publisher': 'William Heinemann Ltd.',
        'Year': '1958',
        'src':'/img/ThingsFallApart.jpg'
    },
    {
        'Title':'Frankenstein',
        'Author':'Mary Shelly',
        'Publisher': 'Lackington, Mavor & Jones',
        'Year': '1818',
        'src':'/img/Frankenstein.jpg'
    },
    {
        'Title':'The God of Small things',
        'Author':'Arundhati Roy',
        'Publisher': 'IndiaInk, India',
        'Year': '1997',
        'src':'/img/GodOfSmallThings.jpg'
    },
    {
        'Title':'To Kill a Mocking Bird',
        'Author':'Harper Lee',
        'Publisher': 'J. B. Lippincott & Co.',
        'Year': '1960',
        'src':'/img/ToKillaMockingBird.jpg'
    },
    {
        'Title':'The Great Gatsby',
        'Author':'F. Scott Fitzgerald',
        'Publisher': 'Charles Scribner\'s Sons',
        'Year': '1925',
        'src':'/img/GreatGatsby.jpg'
    },
    {
        'Title':'The Handmaid’s Tale',
        'Author':'Margaret Atwood',
        'Publisher': 'McClelland and Stewart',
        'Year': '1985',
        'src':'/img/HMT.jpg'
    },
    {
        'Title':'All About Love',
        'Author':'Bell Hooks',
        'Publisher': 'Harper',
        'Year': '2000',
        'src':'/img/AllAboutLove.jpg'
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

app.get('/books',(req,res)=>{
    res.render('books',
    {
        nav:navlink, title:"Books", library
    });
});

app.get('/',(req,res)=>{
    res.render('books',
    {
        nav:navlink, title:"Books", library
    });
});

app.get('/booksingle/:id',(req,res)=>{
    const x = req.params.id;
    res.render('booksingle',
    {
        title:"Book", nav:navlink, 'book_single':library[x]
    });
});

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