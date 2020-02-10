const statusMessage = {
    200: 'Done',
    201: 'Created',
    400: 'Invalid format',
    500: 'Internal error',
    
}




exports.success = function(request, response, message, status){
    //
    
    if(!status){
        status = 200
    }

    response.status(status || 200).send(message)


}

exports.error = function(request, response, message, status, log){
    //
    console.log('[response error]: ' + log);
    response.status(status || 500).send(message)
}