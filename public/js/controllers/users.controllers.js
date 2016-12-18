var mongoose  = require('mongoose');
var User      = mongoose.model('User');
var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jsonwebtoken');
var registeredUser = '';

module
  .exports
  .register = function(req, res)
              {
                console.log('users.controllers - register: registering user');

                var username = req.body.username;
                var name = req.body.name || null;
                var password = req.body.password;

                User.create({
                              username: username,
                              name: name,
                              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                            },
                            function(err, user)
                            {
                              if (err)
                              {
                                console.log("users.controllers - register: ", err);
                                res.status(400).json(err);
                              } else
                              {
                                console.log('users.controllers - register: user created: ', user);
                                res.status(201).json(user);
                              }
                            });
              };

module
  .exports
  .login = function(req, res)
          {
            console.log('users.controllers - login: login in user');

            var username = req.body.username;
            var password = req.body.password;

            User
              .findOne({
                          username: username
                        })
              .exec(function(err, user)
                    {
                      if (err)
                      {
                        console.log('users.controllers - login: ', err);
                        res
                          .status(400)
                          .json(err);
                      } else
                      {
                        if (user && bcrypt.compareSync(password, user.password))
                        {
                          console.log('users.controllers - login: User found: ', user);

                          var token = jwt.sign({
                                                  username: user.username
                                                },
                                                's3cr3t',
                                                {
                                                  expiresIn: 3600
                                                });
                          registeredUser = username;
                          res
                            .status(200)
                            .json({
                                    success: true,
                                    token: token
                                  });
                        } else
                        {
                          res
                            .status(401)
                            .json('Unauthorized');
                        }
                      }
                    });
          };

module
  .exports
  .authenticate = function(req, res, next)
                  {
                    var headerExists = req.headers.authorization;

                    if (headerExists)
                    {
                      var token = req
                                    .headers
                                    .authorization
                                    .split(' ')[1]; // Authorization Bearer xxx

                      jwt
                        .verify(token,
                                's3cr3t',
                                function(error, decoded)
                                {
                                  if (error)
                                  {
                                    console.log('users.controllers - authenticate: ', error);
                                    res
                                      .status(401)
                                      .json('Unauthorized');
                                  } else
                                  {
                                    req.user = decoded.username;
                                    next();
                                  }
                                });
                    } else
                    {
                      res.status(403).json('No token provided');
                    }
                  };

module
  .exports
  .userProfileData = function(req, res)
                    {
                      console.log('users.controllers - userProfile: login in user');
                      console.log('obtaining user data');

                      User.find({'username': registeredUser},
                                function(err, user)
                                {
                                  console.log('users.controllers - user:', user);
                                  console.log('users.controllers - username:', user.username);
                                  console.log('users.controllers - user:', user.user);
                                  res.status(200).json(user);
                                });

                    };
