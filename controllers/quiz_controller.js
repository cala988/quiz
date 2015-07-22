var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
/*Anterior
exports.index = function(req, res) {
    models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};*/

//GET /quizes. Buscamos la pregunta 
exports.index = function(req, res) {
  var buscar = ("%" + req.query.search + "%").replace(/ /g, '%');
  
  //Si existe la variable buscar...
  if(req.query.search) {
    models.Quiz.findAll({
		where: ["UPPER(pregunta) LIKE ?", buscar.toUpperCase()], 
		order: [['pregunta',  'ASC']]}
	).then(function(quizes) {
		res.render('quizes/index', { quizes: quizes});
	}).catch(function(error)  {next(error);})
    
  }else {
	models.Quiz.findAll().then(
        function(quizes) {
			res.render('quizes/index', { quizes: quizes});
		}
      ).catch(function(error){ next(error); })
  }
 };

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//método GET de la respuesta /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Senor X', srcImagen:'/images/senorX.png'});
}