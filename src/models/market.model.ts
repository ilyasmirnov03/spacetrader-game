interface TradeMaterial {
    symbol: string;
    name: string;
    description: string;
}

export interface Transaction {
    waypointSymbol: string;
    shipSymbol: string;
    tradeSymbol: string;
    type: string;
    units: number;
    pricePerUnit: number;
    totalPrice: number;
    timestamp: string;
}

interface TradeGood {
    symbol: string;
    type: string;
    tradeVolume: number;
    supply: string;
    activity: string;
    purchasePrice: number;
    sellPrice: number;
}

export interface Market {
    symbol: string;
    exports: TradeMaterial[];
    imports: TradeMaterial[];
    exchange: TradeMaterial[];
    transactions?: Transaction[];
    tradeGoods?: TradeGood[];
}