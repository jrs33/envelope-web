export default interface Transaction {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly transaction: string;

    readonly categoryId: number;
    readonly category: string;

    readonly methodId: number;
    readonly method: string;
    
    readonly detail?: string;
    readonly amount: number;
}