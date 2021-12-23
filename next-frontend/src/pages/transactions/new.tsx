import { NextPage } from 'next';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { TransactionCategoryLabels, TransactionTypeLabels } from '../../models/transaction.model';
import { useForm } from 'react-hook-form';
import makeHttp from '../../utils/http';
import { useRouter } from 'next/router';
import { Page } from '../../components/Page';
import { useKeycloak } from '@react-keycloak/ssr';
import { Head } from '../../components/Head';

const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { initialized, keycloak } = useKeycloak();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('/transactions', data);
      router.push('/transactions');
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== 'undefined' &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
      <Head title="Nova transação"/>
      <Typography component="h1" variant="h4">
        New Transaction
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('payment_date')}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              {...register('name')}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              {...register('description')}
              label="Descrição"
              required
              fullWidth
            />
            <TextField
              {...register('category')}
              select
              required
              label="Categoria"
              fullWidth
            >
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>{i.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              {...register('amount', { valueAsNumber: true })}
              required
              type="number"
              label="Valor"
              fullWidth
            />
            <TextField
              {...register('type')}
              select
              required
              label="Tipo de operação"
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Page>) : null;
};

export default TransactionsNewPage;