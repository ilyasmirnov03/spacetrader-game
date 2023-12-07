interface Terms {
    deadline: string;
    payment: Payment;
    deliver: Deliver[];
}

interface Payment {
    onAccepted: number;
    onFulfilled: number;
}

interface Deliver {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
}

export interface ContractModel {
    id: string;
    factionSymbol: string;
    type: string;
    terms: Terms;
    accepted: boolean;
    fulfilled: boolean;
    expiration: string;
    deadlineToAccept: string;
}