class suggestionDTO{
    constructor(suggestion){
        this._id=suggestion._id,
        this.title=suggestion.title,
        this.description=suggestion.description,
        this.poster={
            _id:suggestion.poster._id,
            id:suggestion.poster.id,
            Fname:suggestion.poster.Fname,
            Lname:suggestion.poster.Lname,
            role:suggestion.poster.role,
        }
        this.createdAt=suggestion.createdAt
    }
}

module.exports = suggestionDTO;
