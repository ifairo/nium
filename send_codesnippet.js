/*
 * Steps not covered in this code snippet but are essential:
 *  1. Obtain TOKEN by using your client_key and client_secret 
 *  2. Obtain FX Rate Signature for a currency pair (say USD to AUD in this example)
 *  3. Lock FX Rate (using the rate_signature) and obtain fx_hold_id. You will use the fx_hold_id to call Create Payment (POST).
 */

//Create Payment
console.log('Submitting payment instruction');
const response = await instance.post(
    `${process.env.API_URL}/api/v2/payouts`,
    {
        fee_payer: "OUR",
        request_id: reqId,
        transaction_number: trxNo,
        source_account: sourceAccount,
        source_amount: 100,
        destination_currency: dest_currency,
        original_remitter_fi: "",
        statement_narrative: "Invoice_5565",
        beneficiary: {
            name: "Nelson Mandela",
            address: "22  Parkes Road",
            city: "MELBOURNE",
            country_code: "AU",
            email: "example@mail.com",
            account_type: "Individual",
            contact_number: "918675467869",
            contact_country_code: "+61",
            state: "Victoria",
            postcode: "3004",
            bank_account_type: "Checking",
            bank_name: "CBA Bank",
            bank_code: "009",
            identification_type: "CUIT",
            identification_value: "23208992279",
            relationship: "Employee",
            account_number: "2484588"
        },
        remitter: {
            name: "Peace On Earth",
            given_name: true,
            account_type: "Company",
            bank_account_number: "107951265676",
            identification_type: "Company Registration No",
            identification_number: "IN1244654",
            country_code: "US",
            address: "1359 Meadow View Drive",
            purpose_code: "IR003",
            source_of_income: "Business Sales",
            contact_number: "1234567890",
            city: "Hartford",
            postcode: "06103",
            state: "Connecticut",
            source_of_funds: "POE International"
        },
        routing_code_type_1: "BSB CODE",
        routing_code_value_1: "762148",
        payout_options: {
            fx_hold_id: holdFx.data.fx_hold_id,
            deduct_amount: 10
        }
    },
    { 
        headers: 
        { 
            'authorization': `Bearer ${TOKEN}`,
            'content-type': 'application/json',
        } 
    }
);
console.log(`payment_id: ${response.data.payment_id}\n`);



//What to show in the 'console' as the user types the above instruction in the program editor

After line 9 - show:
Submitting payment instruction

After line 72 - show:
payment_id: UATPY103151613