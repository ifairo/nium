const instance = axios.create({
    httpsAgent: agent
});


async function addCustomer() {
    try {
        console.log('Let us now add a new customer...');
        const response = await instance.post(`${process.env.API_URL}/client/${process.env.CLIENT_HASH_ID}/customer`, {
            firstName: "John",
            lastName: "Smith",
            preferredName: "John",
            dateOfBirth: "1992-12-18",
            nationality: "SG",
            email: "john.smith@someco.com",
            countryCode: "SG",
            mobile: "81334300",
            deliveryAddress1: "#20-05, Hong Leong Building",
            deliveryCity: "Singapore",
            deliveryState: "Singapore",
            deliveryZipCode: " 048581",
            deliveryCountry: "SG",
            billingAddress1: "#20-05, Hong Leong Building",
            billingCity: "Singapore",
            billingState: "Singapore",
            billingZipCode: "048581",
            billingCountry: "SG",
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.X_API_KEY
            }
        });
        console.log(`Customer Hash Id: ${response.data.customerHashId}`)
        console.log(`Wallet Hash Id: ${response.data.walletHashId}`)
        return response;
    } catch (err) {
        console.error(err);
    }
}

async function addCard() {
    try {
        const customer = await addCustomer();
        if (customer) {
            console.log('Let us now add a new card to the customer...');
            const response = await instance.post(`${process.env.API_URL}/client/${process.env.CLIENT_HASH_ID}/customer/${customer.data.customerHashId}/wallet/${customer.data.walletHashId}/card`, {
                cardIssuanceAction: "NEW",
                cardFeeCurrencyCode: "SGD",
                cardExpiry:"1222",
                cardType: "GPR_VIR",
                logoId: "100",
                plasticId: "757020201"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.X_API_KEY
                }
            });
            console.log(`Card Hash Id: ${response.data.cardHashId}`);
            console.log(`Masked Card Number: ${response.data.maskedCardNumber}`);
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

addCard();
app.listen(port, () => {});




///Notes
after line 69... just show the following texts... one after the another
Let us now add a new customer...
Customer Hash Id: 5d0926d1-a40a-47a2-b67b-ea277ba15ba9
Wallet Hash Id: 8a2b14c7-03c4-44be-b93d-82c5663eab3e
Let us now add a new card to the customer...
Card Hash Id: 8f50303e-c293-4dca-8054-18fffe7f3aa1
Masked Card Number: 4611-35xx-xxxx-4102
