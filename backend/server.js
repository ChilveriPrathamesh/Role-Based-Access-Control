const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const candidateRoutes = require('./routes/candidateRoutes');
const jobRoutes = require('./routes/jobRoutes.js');
const applicationRoutes = require('./routes/applicationRoutes.js')
const{swaggerUi , swaggerSpec, swaggerDocs} = require('./swagger');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Swagger UI setup 

// app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerSpec))
swaggerDocs(app , process.env.PORT || 5000) ;

//Routes
app.use('/api/candidates' , candidateRoutes);
app.use('/api/jobs' ,jobRoutes )
app.use('/api/applications' , applicationRoutes)

//Default route
app.get('/' , (req,res)=> {
    res.send('Job Posting and Application Portal API is running')
})
const PORT =  process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);

})

module.exports = app ;