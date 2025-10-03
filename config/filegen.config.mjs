import { tableOfContents as toc1 } from './admin-guide-box.toc.js'; // Импорт содержания, который прописан в файле admin-guide-box.toc.js.
import { tableOfContents as toc2 } from './admin-guide-gov.toc.js'; // Импорт содержания, который прописан в файле admin-guide-gov.toc.js.
import { tableOfContents as toc3 } from './admin-guide-cer.toc.js'; // Импорт содержания, который прописан в файле admin-guide-cer.toc.js.
import { tableOfContents as toc4 } from './admin-guide-pg.toc.js'; // Импорт содержания, который прописан в файле admin-guide-pg.toc.js.

export const config = {
    docsRelativePath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    resultRelativePath: '/d11n-data/result', // Абсолютный путь до папки с временными файлами, если null, то ./tmp
    documents: [
        { // Первый документ
            buildPoints: ['box'], // Для каких окружений собрать документ
            description: 'Руководство администратора', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'admin-guide-box', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                system: 'Private Cloud',
                doctitle: 'Руководство администратора', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: 'Версия 4.2.2', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc1, // Подстановка содержания из файла user-guide-box.toc.js
        },
        { // Второй документ
            buildPoints: ['gov'],
            description: 'Руководство администратора для ГО',
            key: 'admin-guide-gov',
            htmlTemplate: null,
            fodtTemplate: 'fodt-template',
            fodtParams: {
                system: 'Private Cloud от VK',
                doctitle: 'Руководство администратора',
                revnumber1: 'master',
                revdate1: process.env?.date1 ?? ' от 12.09.2019',
            },
            tableOfContents: toc2, // Подстановка содержания из файла user-guide-gov.toc.js
        },
        { // Третий документ
            buildPoints: ['cer'],
            description: 'Руководство администратора для сертификации',
            key: 'admin-guide-cer',
            htmlTemplate: null,
            fodtTemplate: 'fodt-template',
            fodtParams: {
                system: 'Private Cloud от VK',
                doctitle: 'Руководство администратора',
                revnumber1: 'RU.19678296.00006-02 РА 01',
                revdate1: process.env?.date1 ?? ' от 12.09.2019',
            },
            tableOfContents: toc3, // Подстановка содержания из файла user-guide-cer.toc.js
        },
        { // Четвертый документ, содержит описание Postgres Pro
            buildPoints: ['pg'],
            description: 'Руководство администратора с Postgres Pro',
            key: 'admin-guide-pg',
            htmlTemplate: null,
            fodtTemplate: 'fodt-template',
            fodtParams: {
                system: 'Private Cloud ',
                doctitle: 'Руководство администратора',
                revnumber1: 'Версия 4.2.2',
                revdate1: process.env?.date1 ?? ' от 12.09.2019',
            },
            tableOfContents: toc4, // Подстановка содержания из файла user-guide-pg.toc.js
        }
    ]
};