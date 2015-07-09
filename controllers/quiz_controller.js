//método GET de la pregunta /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

//método GET de la respuesta /quizes/answer
exports.answer = function(req, res){
	//Comprobamos si la respuesta es correcta y renderizamos las vistas
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	}	
	else{
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
}

//método GET de la respuesta /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Senor X', srcImagen:'/images/senorX.png'});
}