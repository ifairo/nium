const clientObject = {
  clientId: 'client_id_for_your_program',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
  serverUrl: 'right_end_point_url',
}

const apiConfig = {
  payerObject(data) {
    return {
      url: `${clientObject.serverUrl}/client/${clientObject.clientId}/payer`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${clientObject.token}`,
      },
      form: data,
      storeVariables: 'payerId'
    }
  },
  
  paymentRequestObject(data) {
    return {
      url: `${clientObject.serverUrl}/client/${clientObject.clientId}/payer/${clientObject.payerId}/paymentRequest`,
      method: 'POST',
      form: data,
      headers: {
        'authorization': `Bearer ${clientObject.token}`,
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
      storeVariables: 'paymentRequestId',
    }
  }
}

const requestObject = {
  'payerReq': {
    'payerType': 'COMPANY',
    'companyName': 'POE Enterprise',
    'website': 'https://www.peaceonearth.com',
    'payerName': 'Albert Einstein',
    'email': 'albert.einstein@poe.com',
    'countryCode': 'DE'
  },
  'paymentRequest': generateFormData({
    "clientId": `${clientObject.clientId}`,
    "payerId": `${clientObject.payerId}`,
    "amount": "1000",
    "currencyCode": "EUR",
    "label": "LOCAL",
    "payReqDocs": file
  })
}

const apiCall = async function (obj, logic) {
  const apiResponse = await logic(obj);
  if (obj.storeVariables) {
    clientObject[obj.storeVariables] = apiResponse[obj.storeVariables]
  }
  return JSON.stringify(apiResponse);
};

const receiveAPIs = async function () {
  try {
    const payer = await apiCall(apiConfig.payerObject(requestObject.payerReq), requestJson)
    console.log(chalk.yellow('Payer Created Successfully----->', payer))
    const paymentRequest = await apiCall(apiConfig.paymentRequestObject(requestObject.paymentRequest), requestForm)
    console.log(chalk.blue('Payment Request Created Successfully', paymentRequest))
  } catch (error) {
    console.log(`found error on api calling -----> ${error}`)
  }
}

//What to show in the 'console' as the user types the above instruction in the program editor
After line 65 - show:
Payer Created Successfully-----> {"payerId":"57fa0597-8fa1-4921-bbdc-cccdc6c79b13"}

After line 67 - show:
Payment Request Created Successfully {"paymentRequestId":"bb70f699-618e-4c9f-812e-9c83d31524dc","virtualAccount":"4502222253","bankAccountName":"Skyline Pvt. Ltd","bankName":"Bank of Lithuania","bankAddress":"Gedimino pr. 6 ","bankRoutingDetails":{"routing_code_1":"BIC","routing_value_1":"LIABLT20001"}}
