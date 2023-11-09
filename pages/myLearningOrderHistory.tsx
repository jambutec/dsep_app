import { Box } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader'
import MyLearning from '../components/orderHistory/my-learning'
import { useLanguage } from '../hooks/useLanguage'
import useRequest from '../hooks/useRequest'
import { RetailItem } from '../lib/types/products'
import { getOrderPlacementTimeline } from '../utilities/confirm-utils'

const MyLearningOrderHistory = () => {
    const [coursesOrders, setCoursesOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { data, loading, error, fetchData } = useRequest()
    const [items, setItems] = useState([])
    const router = useRouter()

    const { t } = useLanguage()
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const searchPayload = {
        context: {
            domain: 'retail',
        },
        message: {
            criteria: {
                dropLocation: '12.9715987,77.5945627',
                categoryName: 'Cursos',
                searchString: 'a',
            },
        },
    }

    const fetchDataForSearch = () =>
        fetchData(`${apiUrl}/client/v2/search`, 'POST', searchPayload)

    useEffect(() => {
        fetchDataForSearch()
    }, [])

    useEffect(() => {
        if (data) {
            const allItems = data.message.catalogs.flatMap((catalog: any) => {
                if (
                    catalog.message &&
                    catalog.message.catalog &&
                    catalog.message.catalog['bpp/providers'].length > 0
                ) {
                    const providers = catalog.message.catalog['bpp/providers']
                    return providers.flatMap((provider: any) => {
                        if (provider.items && provider.items.length > 0) {
                            return provider.items.map((item: RetailItem) => {
                                return {
                                    bpp_id: catalog.context.bpp_id,
                                    bpp_uri: catalog.context.bpp_uri,
                                    ...item,
                                    providerId: provider.id,
                                    locations: provider.locations,
                                    bppName:
                                        catalog.message.catalog[
                                            'bpp/descriptor'
                                        ].name,
                                }
                            })
                        }
                        return []
                    })
                }
                return []
            })
            localStorage.setItem('searchItems', JSON.stringify(allItems))
            setItems(allItems)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const fetchCoursesOrders = async () => {
        const bearerToken = Cookies.get('authToken')
        let myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${bearerToken}`)

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        } as RequestInit

        fetch(`${strapiUrl}/orders?filters[category]=1`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCoursesOrders(result.data)
                setIsLoading(false)
            })
            .catch((error) => console.error('error', error))
    }

    useEffect(() => {
        fetchCoursesOrders()
    }, [])

    useEffect(() => {
        if (items.length) {
            localStorage.setItem(
                'selectedItemForTransaction',
                JSON.stringify(items)
            )
        }
    }, [items])

    if (isLoading || loading) {
        return (
            <Loader
                stylesForLoadingText={{ fontWeight: '600' }}
                loadingText={t.fetchingCourses}
            />
        )
    }

    if (!coursesOrders.length || !items.length) {
        return <></>
    }

    return (
        <Box
            className="hideScroll"
            maxH={'calc(100vh - 100px)'}
            overflowY="scroll"
        >
            {coursesOrders.map((courseOrder: any, index) => (
                <MyLearning
                    key={index}
                    heading={courseOrder.attributes.items[0].descriptor.name}
                    time={getOrderPlacementTimeline(
                        courseOrder.attributes.createdAt
                    )}
                    id={courseOrder.id}
                    myLearingStatus={courseOrder.attributes.delivery_status}
                    handleViewCourses={() => {
                        const selectedCourseItemId =
                            courseOrder.attributes.items[0].id

                        router.push(
                            `/coursePlayer?itemId=${selectedCourseItemId}`
                        )
                    }}
                />
            ))}
        </Box>
    )
}

export default MyLearningOrderHistory
