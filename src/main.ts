import { getEnvelopes } from './envelopes/envelopes_main'
import { getTransactions, renderCreateTransactionForm } from './transactions/transactions_main'
import { getRemaining } from './statistics/statistics_main'

getEnvelopes();
renderCreateTransactionForm();
getTransactions();
getRemaining();