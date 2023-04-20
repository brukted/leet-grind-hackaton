
const advancedResults = (model, populate) => async (req, res, next) =>{
    
    let query;
    const reqQuery = {...req.query};
    // copy req query
    const removeFields = ['select', 'sort'];

    // loop to remove from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // find resource
    queryString = JSON.parse(queryString)
    if (queryString.tags){
        queryString.tags =  queryString.tags.split(',')
    }
//   filter tags and description condition
    const finalQueryString = {
        $or: [
            {tags: {$exists: true}},
            { $or: [
                {description:{$exists: true}}, 
                {description: {$regex: ''}}
            ]},  
        ],
    };

    if (queryString.tags) {
        finalQueryString.tags = {$in:  queryString.tags};
    }

    if (queryString.description) {
        finalQueryString.description = {$regex: queryString.description};
    }

 
    query = await model.find(finalQueryString).populate(
        populate
    );
    

    if (req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
     else {
        // console.log(typeof(query))
        // query = query.sort({ createdAt: -1 }).toArray(function(err, docs) {
        //     if (err) {
        //       console.log(err);
        //       return;
        //     }
        //     console.log(docs);
        //   });
          
          
    }

    // Executing query
    const results = await query;
    
    res.data = results

    next();
}

module.exports = advancedResults;