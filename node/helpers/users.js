const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
const properties = require('../utilities/properties');

module.exports.getUserByUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.login, [username]).then(user => {
                res(user);
                obj.done();
            }).catch(err => {
                rej(err);
            });
        }).catch(err => {
            rej(err);
        });
    })
};

module.exports.getUserById = id => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.getUserById, [id]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej("User doesn't exists");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.register = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.checkUsernameAndEmail, [user.username, user.email]).then(data => {
                if(data === null) {
                    obj.one(properties.register, [user.username, user.name, user.password, user.email]).then(user => {
                        const beautifulUser = {
                            id: user.user_id,
                            username: user.user_username,
                            name: user.user_name,
                            typeId: user.type_id,
                            creationTime: new Date(user.user_creation_time).getTime(),
                            email: user.user_email
                        };
                        res(beautifulUser);
                        obj.done()
                    }).catch(err => {
                        rej({ status: 500, message: "Query Error" });
                    })           
                } else {
                    rej({ status: 409, messsage: "Username or Email already in use." })
                }
            })
        }).catch(err => {
            rej({ status: 500, message: "Database Error" });
        })
    })
};

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) rej(err);
            res(isMatch);
        })
    })
};

module.exports.modify = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyUserData, [user.username, user.name, user.id]).then(data => {
                res(user);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.changePassword = (password, id) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyUserPassword, [password, id]).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.changeEmail = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.modifyUserEmail, [user.email, user.id]).then(data => {
                res(user);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.getUsers = () => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.many(properties.getUsers).then(data => {
                res(data);
                obj.done();
            }).catch(err => {
                rej("No users found");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.getPassword = id => {
  return new Promise((res, rej) => {
      db.connect().then(obj => {
          obj.one(properties.getPassword, [id]).then(data => {
              res(data);
              obj.done();
          }).catch(err => {
              console.log(err);
              rej('Database Error');
          });
      }).catch(err => {
          console.log(err);
          rej('Database Error');
      });
  });
};