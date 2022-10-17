let _user

function setUser(user){
  _user = user;
}

function getUser(){
  return _user
}

export {setUser, getUser}