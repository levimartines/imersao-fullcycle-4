import { Column, IntegratedPaging, PagingState, SearchState, SortingState } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import { GetServerSideProps, NextPage } from 'next';
import { Box, Button, Container, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeHttp, { http } from '../../utils/http';
import { Token, validateAuth } from '../../utils/auth';
import { Transaction } from '../../models/transaction.model';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';

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
    <Container>
      <Typography component="h1" variant="h4">My transactions</Typography>
      <Box marginTop={4}>
        <Button
          startIcon={<AddIcon/>}
          variant={'contained'}
          color="primary"
          onClick={() => router.push('/transactions/new')}
        >Create</Button>
      </Box>
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
    </Container>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authToken = validateAuth(ctx.req);
  if (!authToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const token = (authToken as Token).token;
  const { data: transactions } = await makeHttp(token).get('/transactions');
  return {
    props: {
      transactions,
    },
  };
};
