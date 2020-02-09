const statusMessage = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal error',
    
}




exports.success = function(request, response, message, status){
    //
    //response.send(message)

    let statusCode = status
    let statusMessage = message

    if(!status){
        status = 200
    }

    if(!message){
        statusMessage = statusMessage[status]
    }

    response.status(status || 200).send({
        error: '',
        body: message
    })


}

exports.error = function(request, response, message, status, log){
    //
    console.log('[response error]: ' + log);
    response.status(status || 500).send({
        error: message,
        body: ''
    })
}