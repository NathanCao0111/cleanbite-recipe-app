const resClientData = (res, status, data, message) => {
  res.status(status).send({
    data: data ? data : null,
    success: !!data,
    message: message ? message : data ? "Success" : "Failed",
  });
};

module.exports = resClientData;
