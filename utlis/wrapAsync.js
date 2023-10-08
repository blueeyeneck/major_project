module.exports=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catct(next);
    }
}

