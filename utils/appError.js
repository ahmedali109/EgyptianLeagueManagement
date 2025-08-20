class AppError extends Error{
  constructor(){
    super();
  }
  createError({status, message , text}){
    this.status = status;
    this.message = message;
    this.text = text;
    return this;
  }
}
module.exports = new AppError();
