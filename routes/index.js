var express = require('express');
var router = express.Router();

//añadimos el enrutador del quiz
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//Ruta para los creditos
router.get('/author', 	quizController.author);


module.exports = router;
