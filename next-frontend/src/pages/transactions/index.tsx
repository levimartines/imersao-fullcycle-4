import { Column, IntegratedPaging, PagingState, SearchState, SortingState } from '@devexpress/dx-react-grid';
import { Button, Typography } from '@material-ui/core';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import { NextPage } from 'next';
import makeHttp from '../../utils/http';
import { format, parseISO } from 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router';
import { Page } from '../../components/Page';
import { Transaction } from '../../models/transaction.model';
import { Head } from '../../components/Head';
import { withAuth } from '../../hof/withAuth';

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Pay day',
    getCellValue: (row, columnName) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
  {
    name: 'name',
    title: 'Name',
  },
  {
    name: 'category',
    title: 'Category',
  },
  {
    name: 'type',
    title: 'Operation',
  },
  {
    name: 'created_at',
    title: 'Created at',
    getCellValue: (row, columnName) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
];

const TransactionsPage: NextPage<TransactionsPageProps> = (props: any) => {
  const router = useRouter();
  return (
    <Page>
      <Head title="My transactions"/>
      <Typography component="h1" variant="h4">My transactions</Typography>
      <Button
        startIcon={<AddIcon/>}
        variant={'contained'}
        color="primary"
        onClick={() => router.push('/transactions/new')}
      >Create</Button>
      <Grid rows={props.transactions} columns={columns}>
        <Table/>
        <SortingState defaultSorting={[{ columnName: 'created_at', direction: 'desc' }]}/>
        <SearchState defaultValue="Paris"/>
        <PagingState defaultCurrentPage={0} pageSize={5}/>
        <TableHeaderRow showSortingControls/>
        <Toolbar/>
        <SearchPanel/>
        <PagingPanel/>
        <IntegratedPaging/>
      </Grid>
    </Page>
  );
};

export default TransactionsPage;

export const getServerSideProps = withAuth(async (ctx, { token }) => {
  const { data: transactions } = await makeHttp(token).get('/transactions');
  return {
    props: {
      transactions,
    },
  };
});
