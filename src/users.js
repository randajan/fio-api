

const _users = {};

export const addUserAlias = (user, alias)=>{

    if (!_users.hasOwnProperty(user)) { _users[user] = alias; return; }
    throw Error(`FIO user '${user}' has allready defined alias as '${_users[user]}'`);
};


export const getUser = (user, throwError=true)=>{
    if (_users.hasOwnProperty(user)) { return _users[user]; }
    if (throwError) { throw Error(`FIO user '${user}' was not found`); }
}