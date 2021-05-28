const express = require('express');
const routes = express.Router();
const authRoute = require('./auth.js');
const userRoute = require('./userCRUD.js');
const babyRoute = require('./babyCrud.js');
const bottleRoute = require('./bottleCrud.js');
const foodRoute = require('./foodCRUD.js');
const heightRoute = require('./hieghtCRUD.js');
const vaccinRoute = require('./vaccinCRUD');
const headRoute = require('./headCRUD');
const tempRoute = require('./temperatureCRUD');
const drugRoute = require('./drugCRUD.js');
const coucheRoute = require('./coucheCRUD.js');
const sleepRoute = require('./sleepCRUD.js');
const weightRoute = require('./weightCRUD.js');
const pediatreRoute = require('./pediatreCRUD.js');
const taskRoute = require('./taskCRUD.js');
const rappelRoute = require('./rappelCRUD.js');
const articleRoute = require('./articleCRUD.js');
const allergieRoute=require('./AllergieCRUD')
const croissanceRoute=require('./CroissanceCRUD')

routes.use('/user', userRoute);
routes.use('/auth', authRoute);
routes.use('/baby', babyRoute);
routes.use('/bottle', bottleRoute);
routes.use('/food',foodRoute);
routes.use('/height',heightRoute);
routes.use('/vaccin',vaccinRoute);
routes.use('/head',headRoute);
routes.use('/temp',tempRoute);
routes.use('/drug',drugRoute)
routes.use('/couche',coucheRoute);
routes.use('/sleep',sleepRoute);
routes.use('/weight',weightRoute);
routes.use('/pediatre',pediatreRoute);
routes.use('/task',taskRoute);
routes.use('/rappel',rappelRoute);
routes.use('/article',articleRoute)
routes.use('/allergie',allergieRoute);
routes.use('/croissance',croissanceRoute);



module.exports = routes;