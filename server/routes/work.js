var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');

    }
    next();
}

let Work = require('../model/work');
const work = require('../model/work');
let workController = require('../controllers/work.js')

router.get('/',async(req,res,next)=>{
try{
    const WorkList = await Work.find();
    res.render('Work/list',{
        title:'Work',
        displayName: req.user?req.user.displayName:'',
        WorkList:WorkList
    })}
    catch(err){
        console.error(err);
        res.render('Work/list',{
            error:'Error on the server'
        })
    }
    });
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Work/add',{
            title: 'Add Work',
            displayName: req.user?req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Work/list',{
            error:'Error on the server'
        })
    }
});
router.post('/add',async(req,res,next)=>{
    try{
        let newWork = Work({
            "Name": req.body.Name,
            "Sun": req.body.Sun,
            "Mon": req.body.Mon,
            "Tue": req.body.Tue,
            "Wed": req.body.Wed,
            "Thu": req.body.Thu,
            "Fri": req.body.Fri,
            "Sat": req.body.Sat
        });
        Work.create(newWork).then(()=>{
            res.redirect('/workslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Work/list',{
            error:'Error on the server'
        })
    }
});
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const workToEdit= await Work.findById(id);
        res.render('Work/edit',
            {
                title:'Edit Work',
                displayName: req.user?req.user.displayName:'',
                Work:workToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); 
    }
});
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedWork = Work({
            "_id": id,
            "Name": req.body.Name,
            "Sun": req.body.Sun,
            "Mon": req.body.Mon,
            "Tue": req.body.Tue,
            "Wed": req.body.Wed,
            "Thu": req.body.Thu,
            "Fri": req.body.Fri,
            "Sat": req.body.Sat
        });
        Work.findByIdAndUpdate(id, updatedWork).then(() => {
            res.redirect('/workslist');
        });
    } catch (err) {
        console.error(err);
        res.render('Work/list', {
            error: 'Error on the server'
        });
    }
});
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Work.deleteOne({_id:id}).then(()=>{
            res.redirect('/workslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Work/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;