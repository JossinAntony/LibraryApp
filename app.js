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

app.get('/',(req,res)=>{
    res.render('books',
    {
        nav:navlink, title:"Library"
    });
});


app.get('/books',(req,res)=>{
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