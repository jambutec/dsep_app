import { useRouter } from 'next/router'
import pt from '../locales/pt'

export const useLanguage = () => {
    // const { locale } = useRouter()
    let locale = 'pt'
    const t = pt
    // const t = locale === 'en' ? en : pt
    return { t, locale }
}
