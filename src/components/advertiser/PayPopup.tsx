import React, { useState } from "react";
import { usePayScheduledAdvertsMutation } from "../api/apiSlice";

interface PayPopupProps {
    balance: number;
    amountToPay: number;
    isOpen: boolean;
    onClose: () => void;
    id: number;
    onConfirmPayment: () => void;
}

const PayPopup: React.FC<PayPopupProps> = ({
    balance,
    amountToPay,
    isOpen,
    onClose,
    id, // Add id from props
    onConfirmPayment,
}) => {
    const [paymentMessage, setPaymentMessage] = useState<string>('');
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const [payScheduledAdverts] = usePayScheduledAdvertsMutation();

    const handleConfirmPayment = async () => {
        try {
            const response = await payScheduledAdverts(id);
            if ('data' in response) {
                setPaymentMessage('Payment was successful!');
                setPaymentSuccess(true);
            } else if ('error' in response) {
                setPaymentMessage('Payment failed. Please try again.');
                setPaymentSuccess(false);
            }
        } catch (error) {
            setPaymentMessage('An error occurred during payment.');
            setPaymentSuccess(false);
        }
        onConfirmPayment();
    };


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="rounded-3xl bg-white w-96 md:w-1/2 mx-auto shadow-lg z-50 p-8">
                <h2 className="text-2xl font-semibold mb-4">Pay for Ad</h2>
                <p className="text-lg mb-4">Balance in Wallet: kshs {balance}</p>
                <p className="text-lg mb-4">Amount to Pay: kshs {amountToPay}</p>

                {paymentMessage && (
                    <div className={paymentSuccess ? 'text-green-500' : 'text-red-500'}>
                        {paymentMessage}
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        onClick={handleConfirmPayment}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover-bg-green-600"
                    >
                        Pay Now
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover-bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayPopup;
