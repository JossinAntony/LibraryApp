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

app.get('/',(req,res)=>{
    res.render('index',
    {
        nav:navlink, title:"Library"
    });
});



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running at http://localhost:3000")
})