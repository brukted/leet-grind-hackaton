
const advancedResults = (model, populate) => async (req, res, next) =>{

    let query;

    const reqQuery = {...req.query};
    console.log("aa")
    console.log(req.query);
    console.log("aa");
    // copy req query
    const removeFields = ['select', 'sort'];

    // loop to remove from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // find resource

    console.log("sad", queryString)
    
    query = await model.find(JSON.parse(queryString)).populate(
        populate
    );
    // select fields


    if (req.query.select){
        console.log("fields")
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        console.log("fields")
        query = query.select(fields);
    }
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Executing query
    const results = await query;

    

    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    };

    next();
}

module.exports = advancedResults;