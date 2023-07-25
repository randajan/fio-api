
const _cols = {};
const _aliases = {};

export const getColumn = (idOrAlias, throwError=true)=>{
    if (_cols.hasOwnProperty(idOrAlias)) { return _cols[idOrAlias]; }
    if (_aliases.hasOwnProperty(idOrAlias)) { return _cols[_aliases[idOrAlias]]; }
    if (throwError) { throw Error(`FIO column '${idOrAlias}' was not found`); }
}

export const addColumnAlias = (idOrAlias, ...aliases)=>{
    const col = getColumn(idOrAlias);
    for (const alias of aliases) {
        const c = getColumn(alias, false);
        if (c) { throw Error(`FIO column '${alias}' is allready defined as '${c.desc}'`); }
        col.aliases.push(alias);
        _aliases[alias] = col.id;
    }
};

export const defineColumn = (id, desc, ...aliases)=>{
    _cols[id] = {
        id,
        desc,
        aliases:[],
        trait:v=>v
    }
    
    addColumnAlias(id, ...aliases);
};

export const addTrait = (idOrAlias, trait)=>{
    const col = getColumn(idOrAlias);
    if (typeof trait !== "function") { throw Error("FIO trait must be function"); }
    const ct = col.trait;
    col.trait = v=>trait(ct(v), v);
}

