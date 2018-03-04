const UsersApi = require('./../components/users/api');
const PhotosApi = require('./../components/photos/api');
const con = require('./../components/core/db_connection')
require('./../components/users/private/model');

class ApiV1 {
    initialize(app) {

      app.use('/api/users', UsersApi);
      app.use('/api/photos', PhotosApi);

      app.get('/', (req, res) => {
        return res.send("Welcome")
        });
        app.get('/login', (req,res) =>{
            if( !req.query.username || req.query.password)
            {
                return res.send("Username or password is incorect.")
            }
            user = {
                username: req.query.username,
                password: req.query.password
            }
            con.model('users').findOne(user, (err, user) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                if(!user){
                    return res.send("You entered an incorrect username or password.")
                }
                res.send(user);
            })

        })
      };

}


module.exports = new ApiV1();
