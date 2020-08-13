export default interface Transaction {
    readonly date: Date;
    readonly transaction: string;

    readonly categoryId: number;
    readonly category: string;

    readonly methodId: number;
    readonly method: string;
    
    readonly detail?: string;
    readonly amount: number;
}