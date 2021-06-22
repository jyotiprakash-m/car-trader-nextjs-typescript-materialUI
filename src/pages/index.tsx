import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getMakes, Make } from '../database/getMakes';

export interface HomeProps {
    makes: Make[];
}


const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Home({ makes }: HomeProps) {
    const { query } = useRouter();

    const initialValues = {
        make: query.make || 'all',
        model: query.model || 'all',
        minPrice: query.minPrice || 'all',
        maxPrice: query.maxPrice || 'all',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={() => { }}>
            {({ values }) => (
                <Form>
                    <Paper elevation={5} style={{ maxWidth: 500, margin: 'auto', padding: 30 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="search-make">Make</InputLabel>
                                    <Field
                                        name="make"
                                        as={Select}
                                        labelId="search-make"
                                        label="Make"
                                    >
                                        <MenuItem value="all">
                                            <em>All Makes</em>
                                        </MenuItem>
                                        {makes.map((make) => (
                                            <MenuItem value={make.make}>
                                                {`${make.make} (${make.count})`}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                Model
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="search-min-price">Min Price</InputLabel>
                                    <Field
                                        name="minPrice"
                                        as={Select}
                                        labelId="search-min-price"
                                        label="Min Price"
                                    >
                                        <MenuItem value="all">
                                            <em>No Min</em>
                                        </MenuItem>
                                        {prices.map((price) => (
                                            <MenuItem value={price}>{price}</MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="search-max-price">Max Price</InputLabel>
                                    <Field
                                        name="maxPrice"
                                        as={Select}
                                        labelId="search-max-price"
                                        label="Max Price"
                                    >
                                        <MenuItem value="all">
                                            <em>No Max</em>
                                        </MenuItem>
                                        {prices.map((price) => (
                                            <MenuItem value={price}>{price}</MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Form>
            )}
        </Formik>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const makes = await getMakes();
    return { props: { makes } };
};