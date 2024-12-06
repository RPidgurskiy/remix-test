import React, {FC} from 'react';
import {ApiProduct} from "~/api-client/types";
import {useTranslation} from "react-i18next";
import {Box, Button, Card, CardContent, CardMedia, Stack, Typography} from '@mui/material';
import {formatRelative} from "date-fns";
import {AppButton} from "~/global/components/app-button";
import {DeleteOutline, EditOutlined} from "@mui/icons-material";
interface CardProps {
    product: ApiProduct;
    handleDelete: (item: ApiProduct) => void;
}

export const CardProduct: FC<CardProps> = ({product, handleDelete}) => {
    const {t} = useTranslation(['common', 'products']);
    const title = product.title.en || product.title.ar
    const img = 'https://picsum.photos/200/300';
    const productData = [
        { label: t('products:sku'), value: product?.sku },
        { label: t('products:quantity'), value: product?.quantity },
        { label: t('products:price'), value: Number(product?.price).toLocaleString() || "---" },
        { label: t('products:priceSale'), value: Number(product?.priceSale).toLocaleString() || "---" },
        { label: t('common:createdAt'), value: formatRelative(new Date(product?.createdAt), new Date()) },
        { label: t('common:updatedAt'), value: formatRelative(new Date(product?.updatedAt ? product?.updatedAt : ''), new Date()) },
    ];
    return (
        <Card sx={{display: 'flex', flexDirection: 'column', width: '100%', mb: 1}}>
            <CardMedia
                component="img"
                height={320}
                image={product?.image || img}
                alt={title} sx={{mb: 5}}
            />
            <Box display={"flex"} justifyContent={'center'}><Typography fontWeight={600}>{title}</Typography></Box>
            <CardContent>
                {product.isActive && (
                    <Typography variant="caption" fontSize={'18px'} color="success" fontWeight={600}>
                        {t('common:active')}
                    </Typography>
                )}
                {productData.map((item, index) => (
                    <Box key={index} display="flex" gap={1}>
                        <Typography variant="body2">
                            {item?.label}:
                        </Typography>
                        <Typography fontWeight={500} variant="body2">{item?.value || '---'}</Typography>
                    </Box>
                ))}
                <Stack direction="row" spacing={2} alignItems="end" justifyContent={'flex-end'} mt={2}>
                    <AppButton variant="outlined" size="small" color={'primary'} to={`/products/${product.productId}`}>
                        <EditOutlined />
                    </AppButton>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDelete(product)}
                        color="error"
                    >
                        <DeleteOutline />
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};