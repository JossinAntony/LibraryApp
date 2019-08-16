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
        'src':'https://images-eu.ssl-images-amazon.com/images/I/411hk0zXCKL.jpg'
    },
    {
        'Title':'Never Let Me Go',
        'Author':'Kazuo Ishiguro',
        'Publisher': 'Faber and Faber',
        'Year': '2005',
        'src':'https://pictures.abebooks.com/isbn/9780571224135-us.jpg'
    },
    {
        'Title':'Beloved',
        'Author':'Toni Morrison',
        'Publisher': 'Alfred A. Knopf Inc.',
        'Year': '1987',
        'src':'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1354708524l/578529.jpg'
    },
    {
        'Title':'Things Fall Apart',
        'Author':'Chinua Achebe',
        'Publisher': 'William Heinemann Ltd.',
        'Year': '1958',
        'src':'https://upload.wikimedia.org/wikipedia/en/6/65/ThingsFallApart.jpg'
    },
    {
        'Title':'Frankenstein',
        'Author':'Mary Shelly',
        'Publisher': 'Lackington, Mavor & Jones',
        'Year': '1818',
        'src':'https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487580_9780743487580_lg.jpg'
    },
    {
        'Title':'The God of Small things',
        'Author':'Arundhati Roy',
        'Publisher': 'IndiaInk, India',
        'Year': '1997',
        'src':'https://images-na.ssl-images-amazon.com/images/I/91EFcae8moL.jpg'
    },
    {
        'Title':'To Kill a Mocking Bird',
        'Author':'Harper Lee',
        'Publisher': 'J. B. Lippincott & Co.',
        'Year': '1960',
        'src':'https://images-na.ssl-images-amazon.com/images/I/51IXWZzlgSL.jpg'
    },
    {
        'Title':'The Great Gatsby',
        'Author':'F. Scott Fitzgerald',
        'Publisher': 'Charles Scribner\'s Sons',
        'Year': '1925',
        'src':'https://images-eu.ssl-images-amazon.com/images/I/513XpOgZtiL.jpg'
    },
    {
        'Title':'The Handmaid’s Tale',
        'Author':'Margaret Atwood',
        'Publisher': 'McClelland and Stewart',
        'Year': '1985',
        'src':'https://i5.walmartimages.com/asr/4b48b130-021f-4dab-b643-ac2cf6304af6_1.f7d18db468073e9144e643e7d9394170.jpeg'
    },
    {
        'Title':'All About Love',
        'Author':'Bell Hooks',
        'Publisher': 'Harper',
        'Year': '2000',
        'src':'https://dynamic.indigoimages.ca/books/0060959479.jpg?altimages=true&scaleup=true&maxheight=515&width=380&quality=85&sale=7&lang=en'
    }
];

app.get('/',(req,res)=>{
    res.render('index',
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