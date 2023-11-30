import PaymentCards from "../../../Components/PaymentCards";


const PaySubs = () => {
    return (

        <div>
            <div className="text-3xl font-semibold text-center my-5">
                <h1>Choose the best plan for you.</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
                <PaymentCards fee={10} plan='Increase limits to 200' type='Pro'></PaymentCards>
                <PaymentCards fee={20} plan='Increase limits to 450' type='Business'></PaymentCards>
                <PaymentCards fee={50} plan='Increase limits to 1500' type='Special'></PaymentCards>
            </div>
        </div>
    );
};

export default PaySubs;