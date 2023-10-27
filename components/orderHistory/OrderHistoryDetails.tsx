import React from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import completedIcon from '../../public/images/completed.svg'
import { useLanguage } from '../../hooks/useLanguage'

interface OrderHistoryDetailsPropsModel {
    createdAt: string
    orderId: string
    totalAmount: number
    quantity: number
    orderState: string
    orderedItemName: string
}

const OrderHistoryDetails: React.FC<OrderHistoryDetailsPropsModel> = (
    props
) => {
    const { t } = useLanguage()

    return (
        <Box>
            <Text
                fontWeight="600"
                pb={'5px'}
                fontSize={'12px'}
            >
                <span style={{ fontWeight: '700' }}>
                    {props.orderedItemName}
                </span>
            </Text>
            <Text
                pb={'5px'}
                fontSize={'10px'}
            >
                {t.orderPlacedAt} {props.createdAt}
            </Text>

            <Text
                pb={'5px'}
                fontSize={'10px'}
            >
                {t.orderId}: {props.orderId}
            </Text>
            <Text
                fontWeight="600"
                pb={'5px'}
                fontSize={'12px'}
            >
                {t.currencySymbol} {props.totalAmount}
            </Text>
            <Flex
                fontSize={'10px'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Text>
                    {props.quantity} {t.items}
                </Text>
                <Flex>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        src={completedIcon}
                        paddingRight={'6px'}
                    />
                    <Text>{t.purchased}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default OrderHistoryDetails
