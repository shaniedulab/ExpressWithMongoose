class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        var queryString=JSON.stringify(this.queryStr)
        const queryObj = JSON.parse(queryString.replace(/\b(get|gt|let|lt)\b/g, (match) => `$${match}`))
        this.query=this.query.find(queryObj)
        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy= this.queryStr.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    limitFilters(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ')
            this.query=this.query.select(fields)
        }else{
            this.query=this.query.select('__v')
        }
        return this;
    }

    paginate(){
        const page=this.queryStr.page*1 || 1
        const limit=this.queryStr.limit*1 || 10
        const skip=(page - 1) * limit
        this.query=this.query.skip(skip).limit(limit)

        // if(this.queryStr.page){
        //     const movieCount=await Movie.countDocuments();
        //     if(skip >= movieCount){
        //         throw new Error('this page not found')
        //     }
        // }
        return this
    }


}

module.exports=ApiFeatures;