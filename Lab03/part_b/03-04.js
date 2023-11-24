const { v4: uuidv4 } = require('uuid');

const validateCard = (cardNumber) => {
    console.log(`Проверка карты: ${cardNumber}`);
    return Math.random() < 0.5;
}

const proceedToPayment = (orderId) => {
    return new Promise((resolve, reject) => {
        console.log(`Заказ ${orderId} передан на оплату`);
        if (Math.random() < 0.5) {
            resolve('Payment successful');
        } else {
            reject('Payment failed');
        }
    });
}

const createOrder = (cardNumber) => {
    return new Promise((resolve, reject) => {
        if (!validateCard(cardNumber)) {
            reject('Card is not valid');
            return;
        }
        setTimeout(() => {
            const orderId = uuidv4();
            resolve(orderId);
        }, 5000);
    });
}

createOrder('1234 5678 9012 4562')
    .then((orderId) => {
        console.log(`Заказ успешно создан: ${orderId}`);
        return proceedToPayment(orderId);
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });