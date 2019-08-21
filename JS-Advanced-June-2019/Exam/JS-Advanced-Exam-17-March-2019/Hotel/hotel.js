class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;

        this.rooms = {
            single: Math.floor(this.capacity * 0.5),
            double: Math.floor(this.capacity * 0.3),
            maisonette: Math.floor(this.capacity * 0.2)
        }

        this.roomsPricing = {
            single: 50,
            double: 90,
            maisonette: 135
        };

        this.servicesPricing = {
            food: 10,
            drink: 15,
            housekeeping: 25
        };
    }

    rentARoom(clientName, roomType, nights) {

        if (this.rooms[roomType] <= 0) {
            let output = [`No ${roomType} rooms available!`];

            Object.entries(this.rooms).filter(([type, availаble]) => availаble > 0)
                .forEach(([type, availаble]) => {
                    output.push(`Available ${type} rooms: ${availаble}.`);
                });

            return output.join(' ').trim();
        }

        const client = {
            clientName,
            roomType,
            nights,
            roomNumber: this.currentBookingNumber
        };

        this.bookings.push(client);
        this.currentBookingNumber += 1;
        this.rooms[roomType] -= 1;
        return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${client.roomNumber}.`;
    }

    roomService(currentBookingNumber, serviceType) {
        const client = this.bookings[currentBookingNumber - 1];

        if (!client) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        if (!this.servicesPricing.hasOwnProperty(serviceType)) {
            return `We do not offer ${serviceType} service.`;
        }

        if (!client.hasOwnProperty('services')) {
            client['services'] = [];
        }

        client.services.push(serviceType);
        return `Mr./Mrs. ${client.clientName}, Your order for ${serviceType} service has been successful.`;
    }

    checkOut(currentBookingNumber) {
        const client = this.bookings[currentBookingNumber - 1];

        if (!client) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        this.rooms[client.roomType] += 1;
        let totalMoney = this.roomsPricing[client.roomType] * client.nights;
        const clientIndex = this.bookings.indexOf(client);
        this.bookings.splice(clientIndex, 1);
        const output = [];

        if (client.services) {
            let serviceMoney = 0;

            client.services.forEach((service) => {
                serviceMoney += this.servicesPricing[service];
            });

            output.unshift(`You have used additional room services, costing ${serviceMoney} BGN.`);
            totalMoney += serviceMoney;
        }

        output.unshift(`The total amount of money you have to pay is ${totalMoney} BGN.`)
        output.unshift(`We hope you enjoyed your time here, Mr./Mrs. ${client.clientName}.`);
        return output.join(' ').trim();
    }

    report() {
        const output = [];
        output.push(`${this.name.toUpperCase()} DATABASE:`);
        output.push('-'.repeat(20));

        if (this.bookings.length === 0) {
            output.push('There are currently no bookings.');
            return output.join('\n').trim();
        }

        this.bookings.forEach((client) => {
            output.push(`bookingNumber - ${client.roomNumber}`);
            output.push(`clientName - ${client.clientName}`);
            output.push(`roomType - ${client.roomType}`);
            output.push(`nights - ${client.nights}`);

            if (client.services) {
                output.push(`services: ${client.services.join(', ')}`);
            }

            output.push('-'.repeat(10));
        });

        return output.slice(0, -1).join('\n').trim();
    }
}
