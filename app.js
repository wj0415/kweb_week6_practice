const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const router = require("./router");

const app = express();

app.set("view engine", "ejs");

app.use(logger("dev")); //log pretty
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router); //routing 설정

app.use((req, res, next) => {
    next(createError(404));
}); //routing 처리안된애들을 다 에러처리

//에러처리방법 여긴 그냥 send, log 띄워줌
app.use((err, req, res, next) => {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // error page
    res.status(err.status || 500);
    res.send(`${err.message} ${err.status}<br>${err.stack}`);
});

module.exports = app;
//밖에서 사용할수있게한다.