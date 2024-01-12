const router = require('express').Router();
const withAuth = require('../utils/auth');
const History = require('../models/searchHistory');


//Goes to Landing Page 
router.get('/', async (req, res) => {
  res.render('landingPage', {
    loggedIn: req.session.logged_in,
  });
});

//Directs you to login
router.get('/login', async (req, res) => {
  res.render('login', {
    loggedIn: req.session.logged_in,
  });
});

//Allows you to search jobs
router.get('/job-search', withAuth, async (req, res) => {
  res.render('jobSearch', {
    loggedIn: req.session.logged_in,
  });
});



router.post('/job-search/', async (req, res) => {
  try {
    const jobData = await History.findOne({
      where: {
        term: req.body.searchTerm
      },
      attributes: {
        exclude: ['id', 'term']
      }
    })

    if (jobData !== null ) {
      console.log('yes',20)
      res.json({ data: jobData.result });
    } else {
      console.log('null',20)
      res.send({ data: null })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.get('/job-search/:searchTerm', async (req, res) => {
  try {
    const jobData = await History.findOne({
      where: {
        term: req.params.searchTerm
      },
      attributes: {
        exclude: ['id', 'term']
      }
    })

    res.render('jobsearch', {jobResults: jobData.result})
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.get('/job-search/:searchTerm/:job/:isMobile', async (req, res) => {
  try {
    const jobData = await History.findOne({
      where: {
        term: req.params.searchTerm
      }
    });

    const jobResults = jobData.result;
    const fullInfo = jobResults.find((job) => job.job_title === req.params.job);

    if (req.params.isMobile === 'true') {
      res.render('jobsearchmobile', { fullInfo })
    } else {

      res.render('jobsearch', { jobResults, fullInfo })
    }
  } catch (err) {
    res.status(500)
  }
})

module.exports = router;




