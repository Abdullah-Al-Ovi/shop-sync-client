import PaymentCards from "../../../Components/PaymentCards";


const PaySubs = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-4">
            
            <PaymentCards fee={10} plan='Increase limits to 200' type='Pro'></PaymentCards>
            <PaymentCards fee={20} plan='Increase limits to 450' type='Business'></PaymentCards>
            <PaymentCards fee={50} plan='Increase limits to 1500' type='Special'></PaymentCards>
        </div>
    );
};

export default PaySubs;