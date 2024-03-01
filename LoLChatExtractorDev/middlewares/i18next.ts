import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

i18n.use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng : 'en',
        backend :{
            loadPath : './locales/{{lng}}/translation.json',
        }
    })

export default i18n;