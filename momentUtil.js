/**
 * 
 * 仿momentjs，支持year()/month()/date()/daysInMonth()/format()等  后续再拓展
 * @param date 时间格式yyyy/mm/dd  其他格式在ios下会识别异常【坑】
 */

export const momentUtil = date => {
    const dateObject = date ? new Date(date) : new Date()
    dateObject.year = function () {
        return dateObject.getFullYear()
    }
    dateObject.month = function () {
        return dateObject.getMonth()
    }
    dateObject.date = function () {
        return dateObject.getDate()
    }
    dateObject.daysInMonth = function () {
        return dateObject.getDate()
    }
    dateObject.add = function (number = 1, type = 'D') {
        const translateType = {
            [['d', 'D', 'days'].includes(type)]: 'D',
            [['m', 'M', 'month'].includes(type)]: 'M',
            [['y', 'Y', 'year'].includes(type)]: 'Y',
        }[true]
        const translateDate = {
            'D': () => {
                return dateObject.valueOf() + number * 1000 * 60 * 60 * 24
            },
            'M': () => {
                const y = dateObject.year();
                const m = dateObject.month(); // 0-11
                const d = dateObject.date();
                const addM = number + m;
                const addMto12 = addM % 12 >= 0 ? addM % 12 : 12 + addM % 12

                const _y = y + Math.floor(addM / 12)
                const _m = Math.abs(addMto12)
                const maxD = new Date(_y, _m + 1, 0).getDate()
                const _d = maxD <= d ? maxD : d
                return `${_y}/${_m + 1}/${_d}`
            },
            'Y': () => {
                const y = dateObject.year() + number;
                const m = dateObject.month(); // 0-11
                const d = dateObject.date();
                const maxD = new Date(y, m + 1, 0).getDate()
                const _d = maxD <= d ? maxD : d
                return `${y}/${m + 1}/${_d}`
            },
        }[translateType]()
        return momentUtil(translateDate)
    }
    dateObject.format = function () {
        const y = dateObject.year();
        const m = dateObject.month(); // 0-11
        const d = dateObject.date();
        return `${y}/${m + 1}/${d}`
    }
    return dateObject
}
