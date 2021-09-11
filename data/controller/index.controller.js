

const getIndex= (request, response)=> {
    response.send(
        "Hello ♥️   "
    );
};

const getHello= (req, res) =>{ 
        res.send('nice') 
    }


    module.exports = {
    
    getIndex,
    getHello
      }