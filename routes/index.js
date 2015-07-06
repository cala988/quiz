var express = require('express');
var router = express.Router();

//añadimos el enrutador del quiz
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//ponemos rutas de la 1a pregunta y la 1a respuesta
router.get('/quizes/question', 	quizController.question);
router.get('/quizes/answer', 	quizController.answer);

module.exports = router;
