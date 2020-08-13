import { CalendarDetailsDataContainer, CalendarDetailsState, Transaction } from '../data_container/calendar_details_data_container';

test('makes sure state is set', () => {
    let detailsContainer: CalendarDetailsDataContainer = CalendarDetailsDataContainer.getInstance();

    let transaction: Transaction = {
        date: new Date(), 
        transaction: "a_test_transaction",
        category: "Test",
        method: "Chase Card",
        amount: 123.32,
        categoryId: 1,
        methodId: 3
    };
    let transactions: Array<Transaction> = new Array();
    transactions.push(transaction);
    let calendarDetailsState: CalendarDetailsState = {transactions: transactions};

    detailsContainer.setState(calendarDetailsState);
    expect(detailsContainer.getState()).toEqual({transactions: transactions});
})