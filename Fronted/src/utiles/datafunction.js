let  getOrderDetails = async (id) => {
    let returndata = []

    let findData = {
      _id: id,
    };

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(findData),
    };

    await fetch("http://localhost:3005/api-order/find", options)
      .then((response) => response.json())
      .then((data) => {
        returndata = data
      });


      return returndata
  };

  export { getOrderDetails } 

