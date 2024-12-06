import React, {FC} from 'react';
import {ApiProduct} from '~/api-client/types';
import {useSnackbar} from "notistack";
import {useMutationProductsDelete} from "~/services/products";
import {CardProduct} from "~/routes/products+/components/card";
import {Grid2, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

type ProductsProps = {
    data?: ApiProduct[];
    isLoading: boolean;
};
export const ProductsList: FC<ProductsProps> = ({data, isLoading}) => {
    const {t} = useTranslation(['common']);
    const {enqueueSnackbar} = useSnackbar();
    const deleteItem = useMutationProductsDelete();
    const handleDeleteProduct = (item: ApiProduct) => {
        if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;
        deleteItem.mutate(
            {id: item.productId},
            {
                onSuccess: async result => {
                    result?.meta?.message && enqueueSnackbar(result?.meta?.message, {variant: 'success'});
                },
                onError: err => {
                    enqueueSnackbar(err?.message || 'unknown error', {variant: 'error'});
                },
            },
        );
    };
    return (
        <Grid2 container spacing={1}>
            {!isLoading ? data?.map(product => (
                <CardProduct product={product} handleDelete={handleDeleteProduct} />
            )): <Typography variant="body2" color="textSecondary">Loading...</Typography>}
        </Grid2>
    );
};